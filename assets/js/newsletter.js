// Auto-wire the first form with an email input to POST /api/subscribe
(function(){
  function findEmailForm(){
    const forms = Array.from(document.querySelectorAll('form'));
    for(const f of forms){ if(f.querySelector('input[type=email],input[name=email]')) return f; }
    return null;
  }
  async function subscribe(email){
    const res = await fetch('/api/subscribe',{
      method:'POST', headers:{'Content-Type':'application/json'},
      body: JSON.stringify({ email })
    });
    const data = await res.json().catch(()=>({}));
    alert(data.message || 'Thanks! Check your email to confirm.');
  }
  function init(){
    const form = findEmailForm(); if(!form) return;
    if(form.dataset.mccWired==='1') return; form.dataset.mccWired='1';
    form.addEventListener('submit', async (e)=>{
      e.preventDefault();
      const email = form.querySelector('input[type=email],input[name=email]')?.value;
      if(!email) return alert('Enter an email');
      subscribe(email);
    });
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',init); else init();
})();