(function(){
  const KEY='mcc_cookie_ok';
  function ready(fn){ if(document.readyState!=='loading') fn(); else document.addEventListener('DOMContentLoaded',fn); }
  ready(function(){
    try{
      if(localStorage.getItem(KEY)==='true') return;
    }catch(e){/* no localStorage */}
    const bar=document.createElement('div');
    bar.style.cssText='position:fixed;left:0;right:0;bottom:0;z-index:9999;background:#111;color:#fff;padding:10px 16px;display:flex;gap:12px;align-items:center;flex-wrap:wrap';
    bar.innerHTML='<span>This site uses cookies for analytics and improving your experience.</span>';
    const link=document.createElement('a');
    link.href='cookies.html'; link.textContent='Learn more'; link.style.color='#ffd86b';
    const btn=document.createElement('button');
    btn.className='btn gold'; btn.textContent='Accept';
    btn.onclick=function(){
      try{ localStorage.setItem(KEY,'true'); }catch(e){}
      bar.remove();
    };
    bar.appendChild(link); bar.appendChild(btn);
    document.body.appendChild(bar);
  });
})();