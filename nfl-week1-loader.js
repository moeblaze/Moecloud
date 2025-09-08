// nfl-week1-loader.js — injects the nfl-week1-2025.html under the NFL section
(function(){
  function ready(fn){ if(document.readyState!=='loading') fn(); else document.addEventListener('DOMContentLoaded', fn); }
  ready(async function(){
    const mount = document.getElementById('nfl-week1-mount');
    if(!mount){ console.warn('[NFL Week1] mount not found'); return; }
    try{
      const res = await fetch('nfl-week1-2025.html', { cache: 'no-store' });
      if(!res.ok) throw new Error('nfl-week1-2025.html missing');
      const html = await res.text();
      const tmp = document.createElement('div');
      tmp.innerHTML = html.trim();
      mount.replaceWith(tmp.firstElementChild);
    }catch(e){
      console.warn('[NFL Week1] loader error:', e);
    }
  });
})();