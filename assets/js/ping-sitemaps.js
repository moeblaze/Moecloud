(function(){
  function ready(fn){ if(document.readyState!=='loading') fn(); else document.addEventListener('DOMContentLoaded', fn); }
  function ping(){
    var url = location.origin + '/sitemap.xml';
    ['https://www.google.com/ping?sitemap=','https://www.bing.com/ping?sitemap='].forEach(function(base){
      try{ fetch(base + encodeURIComponent(url), { mode:'no-cors' }); }catch(e){}
    });
  }
  ready(function(){
    if(location.pathname==='/' || location.pathname.endsWith('/index.html') || location.pathname.endsWith('/blog/index.html')){
      setTimeout(ping, 2000);
    }
  });
})();