// Hazel Video Creation — front-end wiring for API + polling
window.HazelVideo = (function(){
  const el = (id)=>document.getElementById(id);
  const state = { projectId: null, storyboardId: null, renderId: null };
  const save = ()=>localStorage.setItem('hazelState', JSON.stringify(state));
  const load = ()=>{ try{ Object.assign(state, JSON.parse(localStorage.getItem('hazelState')||'{}')); }catch(_){} };

  function alert(msg, ok=false){
    const div = document.createElement('div');
    div.className = 'alert ' + (ok?'alert-ok':'alert-error');
    div.innerText = msg;
    el('alerts').prepend(div);
    setTimeout(()=>div.remove(), 6000);
  }

  function setStatus(t){ el('status').textContent = t || ''; }
  function setRenderInfo(t){ el('renderInfo').textContent = t || ''; }
  function setProgress(pct){ el('progressBar').style.width = (pct||0)+'%'; }

  function api(method, path, body){
    const base = el('apiBase').value.trim();
    if(!base){ throw new Error('Set API Base URL first.'); }
    const headers = { 'Content-Type':'application/json' };
    const tok = el('apiToken').value.trim();
    if(tok) headers['Authorization'] = 'Bearer ' + tok;
    headers['Idempotency-Key'] = crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).slice(2);
    return fetch(base.replace(/\/$/,'') + path, { method, headers, body: body?JSON.stringify(body):undefined })
      .then(async r=>{
        if(!r.ok){ const txt = await r.text(); throw new Error('API '+r.status+': '+txt); }
        return r.json();
      });
  }

  async function saveProject(){
    try{
      setStatus('Saving project...');
      const body = {
        title: el('title').value || 'Untitled Project',
        ratio: el('ratio').value,
        style: el('style').value,
        voice: el('voice').value,
        script: el('script').value || ''
      };
      const res = await api('POST', '/v1/projects', body);
      state.projectId = res.projectId;
      save();
      setStatus('Project saved: '+state.projectId);
      alert('Project saved', true);
    }catch(e){
      alert(e.message||String(e));
      setStatus('');
    }
  }

  async function storyboard(){
    try{
      if(!state.projectId){ await saveProject(); }
      setStatus('Queuing storyboard...');
      const res = await api('POST', `/v1/projects/${state.projectId}/storyboard`, { scenesHint: ['Hook','Value','CTA'], maxScenes: 6 });
      state.storyboardId = res.storyboardId; save();
      el('storyboard').innerHTML = '<em>Storyboard queued...</em>';
      setStatus('Storyboard job queued: '+state.storyboardId);
      alert('Storyboard queued', true);
    }catch(e){
      alert(e.message||String(e));
      setStatus('');
    }
  }

  function renderPreview(){
    el('preview').textContent = 'Rendering preview… (front-end mock). Connect API to enable real renders.';
    setTimeout(()=>{ el('preview').textContent = 'Preview ready — this area will show a thumbnail or short preview when backend is connected.'; }, 1200);
  }

  async function pollRender(renderId){
    try{
      for(let i=0;i<300;i++){ // ~5 min at 1s intervals
        const r = await api('GET', `/v1/renders/${renderId}`);
        setRenderInfo(`Status: ${r.status}${r.percent!=null?` • ${r.percent}%`:''}`);
        setProgress(r.percent|| (r.status==='completed'?100:0));
        if(r.status === 'completed' && r.downloadUrl){
          el('videoContainer').innerHTML = `<video controls style="max-width:100%;border-radius:12px;border:1px solid rgba(255,255,255,.15)">
            <source src="${r.downloadUrl}" type="video/mp4">Your browser does not support the video tag.
          </video>
          <div class="small" style="margin-top:8px"><a class="btn" href="${r.downloadUrl}" target="_blank" rel="noopener">Download Video</a></div>`;
          alert('Render complete', true);
          return;
        }
        if(['failed','cancelled'].includes(r.status)){ alert('Render '+r.status); return; }
        await new Promise(res=>setTimeout(res, 1000));
      }
      alert('Timed out waiting for render status.');
    }catch(e){
      alert(e.message||String(e));
    }
  }

  async function generateVideo(){
    try{
      if(!state.projectId){ await saveProject(); }
      if(!state.storyboardId){ await storyboard(); }
      setStatus('Creating render job...');
      setRenderInfo('Queuing render...');
      setProgress(0);
      const res = await api('POST', '/v1/renders', { projectId: state.projectId, storyboardId: state.storyboardId, quality: 'hd', codec: 'h264' });
      state.renderId = res.renderId; save();
      alert('Render queued: '+state.renderId, true);
      setStatus('Render queued. Polling status...');
      pollRender(state.renderId);
    }catch(e){
      alert(e.message||String(e));
      setStatus('');
    }
  }

  // expose
  load();
  return { saveProject, storyboard, renderPreview, generateVideo };
})();