
// YT Chapterizer + Shorts Planner — front-end only, heuristic segmentation
(function(){
  const $ = (sel, ctx=document)=>ctx.querySelector(sel);
  const status = (m)=> { const el=$('#status'); el.textContent=m; setTimeout(()=>el.textContent='', 3000); };
  const stopwords = new Set("a,an,and,are,as,at,be,by,for,from,how,i,in,is,it,of,on,or,so,the,that,to,this,was,will,with,what,when,why,you,your,we,our,they,them,he,she,his,her,its,im,im".split(','));
  const signposts = /(chapter|tip|step|now|next|first|second|third|finally|conclusion|recap|summary|secret|mistake|warning|pro tip|key|important)/i;
  const tsRe = /(?:(\d{1,2}):)?(\d{1,2}):(\d{2})/;
  const srtCue = /^\s*\d+\s*$/;
  const vttArrow = /-->/;

  const title = $('#title');
  const duration = $('#duration');
  const transcript = $('#transcript');
  const fileBtn = $('#upload');
  const fileInput = $('#file');
  const analyze = $('#analyze');
  const clearBtn = $('#clear');

  const chaptersEl = $('#chapters');
  const hooksEl = $('#hooks');
  const thumbsEl = $('#thumbs');
  const hashtagsEl = $('#hashtags');
  const tagsEl = $('#tags');
  const pinnedEl = $('#pinned');
  const shortsEl = $('#shorts');

  const kpiCh = $('#kpi-chapters'), kpiSh = $('#kpi-shorts'), kpiHash = $('#kpi-hashtags');

  fileBtn.addEventListener('click', ()=> fileInput.click());
  fileInput.addEventListener('change', ()=>{
    const f=fileInput.files[0]; if(!f) return;
    const reader=new FileReader();
    reader.onload=()=>{ transcript.value = reader.result; status('Loaded file'); };
    reader.readAsText(f);
  });

  clearBtn.addEventListener('click', ()=>{
    transcript.value=''; chaptersEl.innerHTML=''; hooksEl.innerHTML=''; thumbsEl.innerHTML=''; hashtagsEl.innerHTML=''; tagsEl.innerHTML=''; pinnedEl.textContent=''; shortsEl.innerHTML='';
    kpiCh.textContent='0'; kpiSh.textContent='0'; kpiHash.textContent='0';
  });

  function parseTimestamp(str){
    const m = str.match(tsRe);
    if(!m) return null;
    const h = parseInt(m[1]||'0',10), mn=parseInt(m[2]||'0',10), s=parseInt(m[3]||'0',10);
    return h*3600 + mn*60 + s;
  }
  function fmtTime(sec){
    const h=Math.floor(sec/3600), m=Math.floor((sec%3600)/60), s=sec%60;
    const p=(n)=>String(n).padStart(2,'0');
    return (h>0? `${h}:` : '') + p(m) + ':' + p(s);
  }

  function linesFromTranscript(t){
    return t.replace(/\r/g,'').split('\n').map(x=>x.trim()).filter(Boolean);
  }

  function extractCues(lines){
    const cues=[];
    let lastT=0;
    for(let i=0;i<lines.length;i++){
      const line = lines[i];
      if(vttArrow.test(line) && i+1<lines.length){
        const times = line.split('-->');
        const t = parseTimestamp(times[0]) ?? lastT;
        i++;
        cues.push({t, text: lines[i]});
        lastT = t;
      } else if(tsRe.test(line)){
        const t = parseTimestamp(line);
        const next = (i+1<lines.length && !tsRe.test(lines[i+1]) && !vttArrow.test(lines[i+1]) && !srtCue.test(lines[i+1])) ? lines[i+1] : '';
        if(next) i++;
        cues.push({t: t ?? lastT, text: next || ''});
        lastT = t ?? lastT;
      } else if(!srtCue.test(line) && !vttArrow.test(line)){
        cues.push({t:lastT, text:line});
      }
    }
    if(cues.every(c=>c.t===0)){
      const totalMin = Math.max(1, parseInt(duration.value||'10',10));
      const totalSec = totalMin*60;
      const step = Math.max(20, Math.floor(totalSec / Math.max(1, Math.floor(cues.length/60))));
      let t=0; cues.forEach(c=>{ c.t=t; t+=step; });
    }
    return cues;
  }

  function keywords(text){
    return text.toLowerCase().replace(/[^a-z0-9\s]/g,'').split(/\s+/).filter(w=>w && !stopwords.has(w) && w.length>2);
  }
  function topTerms(text, n=5){
    const freq = new Map();
    keywords(text).forEach(w=> freq.set(w, (freq.get(w)||0)+1));
    return Array.from(freq.entries()).sort((a,b)=>b[1]-a[1]).slice(0,n).map(x=>x[0]);
  }

  function segmentChapters(cues){
    const MIN_WIN = 60, MAX_WIN = 150;
    const chapters = [];
    let current = {t: cues[0]?.t || 0, text: []};

    for(let i=0;i<cues.length;i++){
      const c = cues[i];
      current.text.push(c.text);
      const since = c.t - (current.t||0);
      const isSignpost = (signposts.test(c.text) || /(^|\s)(tip|step)\s+\d+/i.test(c.text));
      const longEnough = since > MIN_WIN;
      const tooLong = since > MAX_WIN;

      if((isSignpost && longEnough) || tooLong){
        const chunkText = current.text.join(' ');
        chapters.push({t: current.t, raw: chunkText});
        current = {t: c.t, text: []};
      }
    }
    if(current.text.length){
      chapters.push({t: current.t, raw: current.text.join(' ')});
    }
    chapters.forEach(ch=>{
      const terms = topTerms(ch.raw, 6);
      let title = '';
      if(/(tip|step|secret|mistake)/i.test(ch.raw)){
        const m = ch.raw.match(/(tip|step)\s+\d+[^\.!\?]*/i) || ch.raw.match(/(secret|mistake)[^\.!\?]*/i);
        title = m ? m[0].replace(/\s+/g,' ').trim() : terms.slice(0,2).join(' ').toUpperCase();
      } else {
        title = terms.slice(0,3).map(w=> w.length>3 ? w[0].toUpperCase()+w.slice(1) : w).join(' ');
      }
      ch.title = (title || 'Segment').slice(0, 60);
    });
    return chapters.sort((a,b)=>a.t-b.t);
  }

  function makeHooks(title, mainTerms){
    const key = (mainTerms[0]||'This');
    return [
      `You’re doing ${key} wrong — here’s the fix`,
      `Before you edit another video, watch this ${key} trick`,
      `${key} in 60 seconds: do this, not that`,
    ];
  }
  function makeThumbs(mainTerms){
    const a = (mainTerms[0]||'Edit').toUpperCase();
    const b = (mainTerms[1]||'Faster').toUpperCase();
    return [ `${a} HACKS`, `DON’T DO THIS`, `${a} → ${b}` ];
  }
  function makeHashtags(mainTerms){
    const base = ['#YouTubeCreator','#VideoEditing','#ContentCreator','#Shorts','#Algorithm','#YouTubeTips','#Workflow','#Productivity'];
    const extras = mainTerms.slice(0,3).map(w=>'#'+w.replace(/[^a-z0-9]/gi,''));
    // Unique and limited to ~12
    const set=new Set(); const out=[];
    [...extras, ...base].forEach(h=>{ if(!set.has(h.toLowerCase())){ set.add(h.toLowerCase()); out.push(h); }});
    return out.slice(0,12);
  }
  function makeTags(mainTerms){
    const base = ['youtube creator','youtube tips','content creation','video editing','shorts ideas','channel growth'];
    const set=new Set(); const out=[];
    [...mainTerms.slice(0,8), ...base].forEach(t=>{ const k=t.toLowerCase(); if(!set.has(k)){ set.add(k); out.push(t); } });
    return out;
  }
  function makePinned(title){
    return `🔥 Resources from this video: 
1) Guide: <link>
2) Preset Pack: <link>
3) Free Checklist: <link>

👇 Comment your biggest takeaway. I’ll pick one to pin next week.

— ${title || 'Thanks for watching!'}`;
  }
  function findShorts(cues){
    const picks=[];
    for(let i=0;i<cues.length;i++){
      const c=cues[i];
      if(/[!?]/.test(c.text) || /(tip|secret|mistake|don’t|never|always|warning)/i.test(c.text)){
        const start = Math.max(0, c.t - 5);
        const end = Math.min(start + 45, (cues[i+10]?.t || c.t + 45));
        if(end - start >= 15){
          picks.push({start, end, label: c.text.slice(0,60)});
        }
      }
    }
    const uniq=[]; const seen=new Set();
    for(const p of picks){
      const key = Math.round(p.start/10);
      if(!seen.has(key)){ seen.add(key); uniq.push(p); }
      if(uniq.length>=6) break;
    }
    return uniq;
  }

  function renderChapters(chaps){
    chaptersEl.innerHTML='';
    chaps.forEach(ch=>{
      const div=document.createElement('div');
      div.className='item';
      div.textContent = `${fmtTime(ch.t)} — ${ch.title}`;
      chaptersEl.appendChild(div);
    });
    kpiCh.textContent = chaps.length;
  }

  function copy(text){ navigator.clipboard.writeText(text).then(()=>status('Copied!')).catch(()=>alert('Copy failed'));}
  $('#copy-desc').addEventListener('click', ()=>{
    const lines = Array.from(chaptersEl.querySelectorAll('.item')).map(x=>x.textContent);
    copy(lines.join('\n'));
  });

  $('#download-csv').addEventListener('click', ()=>{
    const rows = Array.from(chaptersEl.querySelectorAll('.item')).map(x=>{
      const [time, ...rest] = x.textContent.split(' — ');
      return `"${time}","${rest.join(' — ').replace(/"/g,'""')}"`;
    });
    const csv = 'time,title\n' + rows.join('\n');
    const blob = new Blob([csv], {type:'text/csv'});
    const url = URL.createObjectURL(blob); const a=document.createElement('a');
    a.href=url; a.download='chapters.csv'; document.body.appendChild(a); a.click();
    setTimeout(()=>{URL.revokeObjectURL(url); a.remove();}, 100);
  });

  $('#copy-hooks').addEventListener('click', ()=>{
    copy(Array.from(document.querySelectorAll('#hooks div')).map(x=>x.textContent).join('\n'));
  });
  $('#copy-hashtags').addEventListener('click', ()=>{
    copy(document.querySelector('#hashtags').textContent.trim());
  });
  $('#copy-tags').addEventListener('click', ()=>{
    copy(document.querySelector('#tags').textContent.trim());
  });

  document.querySelector('#analyze').addEventListener('click', ()=>{
    const text = transcript.value.trim();
    if(!text){ alert('Paste a transcript (or upload .srt/.vtt)'); return; }
    const lines = text.replace(/\r/g,'').split('\n').map(x=>x.trim()).filter(Boolean);
    const cues = extractCues(lines);
    const chaps = segmentChapters(cues);
    renderChapters(chaps);

    const allText = cues.map(c=>c.text).join(' ');
    const terms = Array.from(new Set(topTerms(allText, 12)));
    const hooks = makeHooks(title.value, terms);
    const thumbs = makeThumbs(terms);
    const hashtags = makeHashtags(terms);
    const tags = makeTags(terms);
    const shorts = findShorts(cues);

    document.querySelector('#hooks').innerHTML = hooks.map(h=>`<div>• ${h}</div>`).join('');
    document.querySelector('#thumbs').innerHTML = thumbs.map(t=>`<div>• ${t}</div>`).join('');
    document.querySelector('#hashtags').textContent = hashtags.join(' ');
    document.querySelector('#tags').textContent = tags.join(', ');
    document.querySelector('#pinned').textContent = makePinned(title.value);
    document.querySelector('#shorts').innerHTML = shorts.map(s=>`<div class="item">${fmtTime(s.start)}–${fmtTime(s.end)} — ${s.label}</div>`).join('');

    kpiSh.textContent = shorts.length;
    kpiHash.textContent = hashtags.length;
    status('Generated chapters and assets');
  });
})();
