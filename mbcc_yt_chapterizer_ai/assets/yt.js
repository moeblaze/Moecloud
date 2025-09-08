// JS added in previous cell is long; re-create a compact version with AI first, heuristic fallback.
(function(){
  const $ = (s,c=document)=>c.querySelector(s);
  const status = (m)=>{ const el=$('#status'); el.textContent=m; setTimeout(()=>el.textContent='',3000); };
  const title=$('#title'), duration=$('#duration'), transcript=$('#transcript');
  const chaptersEl=$('#chapters'), hooksEl=$('#hooks'), thumbsEl=$('#thumbs'), hashtagsEl=$('#hashtags'), tagsEl=$('#tags'), pinnedEl=$('#pinned'), shortsEl=$('#shorts');
  const kpiCh=$('#kpi-chapters'), kpiSh=$('#kpi-shorts'), kpiHash=$('#kpi-hashtags');
  $('#upload').addEventListener('click',()=>$('#file').click());
  $('#file').addEventListener('change',()=>{ const f=$('#file').files[0]; if(!f)return; const r=new FileReader(); r.onload=()=>{ transcript.value=r.result; status('Loaded file'); }; r.readAsText(f); });
  $('#clear').addEventListener('click',()=>{ transcript.value=''; chaptersEl.innerHTML=''; hooksEl.innerHTML=''; thumbsEl.innerHTML=''; hashtagsEl.innerHTML=''; tagsEl.innerHTML=''; pinnedEl.textContent=''; shortsEl.innerHTML=''; kpiCh.textContent='0'; kpiSh.textContent='0'; kpiHash.textContent='0'; });
  const fmt=(s)=>{const h=Math.floor(s/3600),m=Math.floor((s%3600)/60),x=s%60,p=n=>String(n).padStart(2,'0'); return (h?`${h}:`:'')+p(m)+':'+p(x); };
  const render=(p)=>{ chaptersEl.innerHTML=''; (p.chapters||[]).forEach(ch=>{ const d=document.createElement('div'); d.className='item'; d.textContent=`${fmt(ch.t)} — ${ch.title}`; chaptersEl.appendChild(d); });
    hooksEl.innerHTML=(p.hooks||[]).map(h=>`<div>• ${h}</div>`).join(''); thumbsEl.innerHTML=(p.thumbs||[]).map(t=>`<div>• ${t}</div>`).join('');
    hashtagsEl.textContent=(p.hashtags||[]).join(' '); tagsEl.textContent=(p.tags||[]).join(', '); pinnedEl.textContent=p.pinned||'';
    shortsEl.innerHTML=(p.shorts||[]).map(s=>`<div class='item'>${fmt(s.start)}–${fmt(s.end)} — ${s.label}</div>`).join('');
    kpiCh.textContent=(p.chapters||[]).length; kpiSh.textContent=(p.shorts||[]).length; kpiHash.textContent=(p.hashtags||[]).length; };
  async function tryAI(t,txt,min){ const ctrl=new AbortController(); const to=setTimeout(()=>ctrl.abort(),15000); try{ const r=await fetch('/api/yt-chapterize',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({title:t||'',transcript:txt,duration:Number(min)||0}),signal:ctrl.signal}); clearTimeout(to); if(!r.ok) throw 0; const j=await r.json(); if(!j||!Array.isArray(j.chapters)) throw 0; return j; }catch(e){ clearTimeout(to); return null; } }
  function heuristics(t,txt,min){
    const stop=new Set('a,an,and,are,as,at,be,by,for,from,how,i,in,is,it,of,on,or,so,the,that,to,this,was,will,with,what,when,why,you,your,we,our,they,them,he,she,his,her,its,im'.split(','));
    const sign=/(chapter|tip|step|now|next|first|second|third|finally|conclusion|recap|summary|secret|mistake|warning|pro tip|key|important)/i, ts=/(?:(\d{1,2}):)?(\d{1,2}):(\d{2})/, cue=/^\s*\d+\s*$/, arrow=/-->/;
    const lines=txt.replace(/\r/g,'').split('\n').map(x=>x.trim()).filter(Boolean); const cues=[]; let last=0;
    const toS=(str)=>{const m=str.match(ts); if(!m)return null; const h=+(m[1]||0),m1=+m[2],s=+m[3]; return h*3600+m1*60+s; };
    for(let i=0;i<lines.length;i++){ const L=lines[i]; if(arrow.test(L)&&i+1<lines.length){ const t1=toS(L.split('-->')[0])??last; i++; cues.push({t:t1,text:lines[i]}); last=t1; } else if(ts.test(L)){ const t1=toS(L); const nx=(i+1<lines.length && !ts.test(lines[i+1]) && !arrow.test(lines[i+1]) && !cue.test(lines[i+1]))?lines[i+1]:''; if(nx)i++; cues.push({t:t1??last,text:nx||''}); last=t1??last; } else if(!cue.test(L)&&!arrow.test(L)){ cues.push({t:last,text:L}); } }
    if(cues.every(c=>c.t===0)){ const step=Math.max(20, Math.floor((+min||10)*60/Math.max(1,Math.floor(cues.length/60)))); let t0=0; cues.forEach(c=>{c.t=t0; t0+=step;}); }
    const kw=(s)=>s.toLowerCase().replace(/[^a-z0-9\s]/g,'').split(/\s+/).filter(w=>w&&!stop.has(w)&&w.length>2);
    const top=(s,n=6)=>{ const f=new Map(); kw(s).forEach(w=>f.set(w,(f.get(w)||0)+1)); return Array.from(f.entries()).sort((a,b)=>b[1]-a[1]).slice(0,n).map(x=>x[0]); };
    const MIN=60,MAX=150; const seg=[], cur={ t:cues[0]?.t||0, text:[] };
    for(const c of cues){ cur.text.push(c.text); const since=c.t-(cur.t||0); const isS=(sign.test(c.text) || /(^|\s)(tip|step)\s+\d+/i.test(c.text)); if((isS && since>MIN)|| since>MAX){ seg.push({t:cur.t,raw:cur.text.join(' ')}); cur.t=c.t; cur.text=[]; } }
    if(cur.text.length) seg.push({t:cur.t,raw:cur.text.join(' ')});
    seg.forEach(s=>{ const terms=top(s.raw,6); const m=s.raw.match(/(tip|step)\s+\d+[^\.\!\?]*/i) || s.raw.match(/(secret|mistake)[^\.\!\?]*/i); s.title=(m?m[0]:terms.slice(0,3).map(w=>w[0].toUpperCase()+w.slice(1)).join(' ')).slice(0,60); });
    const all=cues.map(c=>c.text).join(' '); const terms=Array.from(new Set(top(all,12)));
    return { chapters: seg.sort((a,b)=>a.t-b.t).map(x=>({t:x.t,title:x.title})), hooks:[`You’re doing ${(terms[0]||'this')} wrong — here’s the fix`,`Before you edit another video, watch this ${(terms[0]||'workflow')} trick`,`${(terms[0]||'Editing')} in 60s: do this, not that`], thumbs:[`${(terms[0]||'EDIT').toUpperCase()} HACKS`,`DON’T DO THIS`,`${(terms[0]||'EDIT').toUpperCase()} → ${(terms[1]||'FASTER').toUpperCase()}`], hashtags:Array.from(new Set([...(terms.slice(0,3).map(w=>'#'+w.replace(/[^a-z0-9]/gi,''))),'#YouTubeCreator','#VideoEditing','#ContentCreator','#Shorts','#YouTubeTips'])).slice(0,12), tags:Array.from(new Set([...terms.slice(0,8),'youtube creator','content creation','video editing','shorts ideas'])), pinned:`🔥 Resources from this video:\n1) Guide: <link>\n2) Preset Pack: <link>\n3) Free Checklist: <link>\n\n👇 Comment your biggest takeaway.\n— ${title.value||'Thanks for watching!'}`, shorts:cues.filter(c=>/[!?]/.test(c.text)||/(tip|secret|mistake|don’t|never|always|warning)/i.test(c.text)).slice(0,6).map(c=>({start:Math.max(0,c.t-5),end:Math.max(15,Math.min(c.t+45,c.t+45)),label:c.text.slice(0,60)}))}; }
  $('#copy-desc').addEventListener('click',()=>{ const lines=Array.from(chaptersEl.querySelectorAll('.item')).map(x=>x.textContent); navigator.clipboard.writeText(lines.join('\n')).then(()=>status('Copied!')); });
  $('#download-csv').addEventListener('click',()=>{ const rows=Array.from(chaptersEl.querySelectorAll('.item')).map(x=>{const [time,...r]=x.textContent.split(' — '); return `"${time}","${r.join(' — ').replace(/"/g,'""')}"`;}); const csv='time,title\n'+rows.join('\n'); const blob=new Blob([csv],{type:'text/csv'}); const url=URL.createObjectURL(blob); const a=document.createElement('a'); a.href=url; a.download='chapters.csv'; document.body.appendChild(a); a.click(); setTimeout(()=>{URL.revokeObjectURL(url); a.remove();},100); });
  $('#analyze').addEventListener('click', async ()=>{ const txt=transcript.value.trim(); if(!txt){ alert('Paste a transcript (or upload .srt/.vtt)'); return; } status('Generating…'); const ai=await (async()=>await tryAI(title.value,txt,duration.value||10))(); if(ai){ render(ai); status('AI results'); } else { render(heuristics(title.value,txt,duration.value||10)); status('Local results'); } });
})();
