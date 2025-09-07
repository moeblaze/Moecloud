
(function(){
  function $(sel,ctx){ return (ctx||document).querySelector(sel); }
  function $all(sel,ctx){ return Array.from((ctx||document).querySelectorAll(sel)); }
  const obs = new IntersectionObserver((ents)=>{ ents.forEach(e=>{ if(e.isIntersecting) e.target.classList.add('in-view'); }); }, {threshold:.15});
  $all('.reveal').forEach(el=>obs.observe(el));
  const form = document.querySelector('form[data-newsletter]');
  if (form){
    form.addEventListener('submit', async (e)=>{
      e.preventDefault();
      const msg = form.querySelector('[data-msg]');
      const data = Object.fromEntries(new FormData(form).entries());
      const payload = { tool:'newsletter-signup', ts:new Date().toISOString(), input:data };
      msg.textContent = 'Sending…';
      try{
        if (typeof window.mbccSaveDraft === 'function'){
          await window.mbccSaveDraft(payload);
          msg.textContent = 'You’re in! Please check your inbox.';
        } else {
          const a = JSON.parse(localStorage.getItem('mbccNewsletter')||'[]'); a.push(payload);
          localStorage.setItem('mbccNewsletter', JSON.stringify(a));
          msg.textContent = 'Saved locally — we’ll follow up soon.';
        }
        form.reset();
      }catch(err){ console.error(err); msg.textContent = 'Something went wrong. Try again.'; }
    });
  }
  async function renderPreviews(){
    try{
      const r = await fetch('assets/news/news-data.json');
      if (!r.ok) return;
      const data = await r.json();
      const list = document.querySelector('.article-list');
      if (!list) return;
      const cats = ['ai','tech','health','funny'];
      const items = [];
      cats.forEach(c=> (data[c]?.headlines||[]).slice(0,2).forEach(x=> items.push(x)));
      list.innerHTML = items.slice(0,6).map(a => `
        <div class="article">
          <a href="${a.url}" target="_blank" rel="noopener">${a.title}</a>
          ${a.source ? `<div class="src">${a.source}${a.date ? ' • ' + a.date : ''}</div>` : ''}
        </div>
      `).join('');
    }catch(e){}
  }
  renderPreviews();
  $all('[data-open]').forEach(btn=> btn.addEventListener('click', (e)=>{ e.preventDefault(); const m = $(btn.getAttribute('data-open')); if (m) m.classList.add('show'); }));
  $all('[data-close]').forEach(btn=> btn.addEventListener('click', (e)=>{ e.preventDefault(); btn.closest('.modal').classList.remove('show'); }));
})();
