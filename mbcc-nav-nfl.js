(function(){
  "use strict";
  function ready(fn){ if(document.readyState!=="loading") fn(); else document.addEventListener("DOMContentLoaded", fn); }
  ready(function(){
    try{
      var navs = Array.from(document.querySelectorAll('nav, header nav, .nav'));
      if(!navs.length) return;
      navs.forEach(function(nav){
        var sportsLink = Array.from(nav.querySelectorAll('a')).find(function(a){
          var href=(a.getAttribute('href')||'').trim();
          return href==='/sports.html' || href==='/sports.html#' || href.endsWith('/sports.html');
        });
        var nflExists = Array.from(nav.querySelectorAll('a')).some(function(a){
          return (a.getAttribute('href')||'').trim()==='/sports.html#nfl';
        });
        if(sportsLink && !nflExists){
          var nfl = document.createElement('a');
          nfl.href = '/sports.html#nfl';
          nfl.textContent = 'NFL';
          nfl.style.marginLeft = '4px';
          sportsLink.insertAdjacentElement('afterend', nfl);
        }
      });
    }catch(e){ console.warn('mbcc-nav-nfl: ', e); }
  });
})();