// Minimal AI helpers for MCC
(function(){
  function postJSON(url, payload){
    return fetch(url, {method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(payload)}).then(r=>r.json());
  }
  window.MCCAI = {
    leadQualify: (data)=>postJSON('/api/ai/lead-qualify', data),
    roiAdvice:   (data)=>postJSON('/api/ai/roi-advice', data),
    qa:          (data)=>postJSON('/api/ai/qa', data),
    // UI helpers
    attachChat: function(containerId, placeholder){
      const c = document.getElementById(containerId);
      if(!c) return;
      c.innerHTML = '<div class="card"><h3>Ask the Playbook</h3><div id="'+containerId+'_log" class="micro" style="min-height:100px"></div><div style="display:flex;gap:8px;margin-top:8px"><input id="'+containerId+'_q" style="flex:1" placeholder="'+(placeholder||'Ask a question...')+'"><button class="btn" id="'+containerId+'_btn">Send</button></div></div>';
      const log = document.getElementById(containerId+'_log');
      const input = document.getElementById(containerId+'_q');
      document.getElementById(containerId+'_btn').onclick = async function(){
        const q = input.value.trim(); if(!q) return;
        log.innerHTML += '<p><b>You:</b> '+q+'</p>';
        input.value = '';
        try{
          const res = await MCCAI.qa({question:q, context: location.pathname});
          log.innerHTML += '<p><b>Assistant:</b> '+(res.answer||'…')+'</p>';
          try{ gtag('event','ai_qa'); }catch(e){}
        }catch(e){
          log.innerHTML += '<p class="micro">Sorry, something went wrong.</p>';
        }
      };
    },
    attachRoiCoach: function(buttonId, readInputs){
      const btn = document.getElementById(buttonId);
      if(!btn) return;
      btn.addEventListener('click', async function(){
        try{
          const payload = (typeof readInputs==='function') ? readInputs() : {};
          const res = await MCCAI.roiAdvice(payload);
          alert(res.summary || 'Check console for ROI advice.');
          try{ gtag('event','ai_roi_advice'); }catch(e){}
        }catch(e){ alert('ROI assistant error.'); }
      });
    }
  };
})();