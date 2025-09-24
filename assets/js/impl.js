(function(){
  const cfg = (window.MCC_CONFIG||{});
  // GA loader (optional)
  function loadGA(id){
    if(!id || !cfg.enableGA) return;
    if(document.querySelector('script[src*="googletagmanager.com/gtag/js"]')) return;
    const s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id='+id;
    document.head.appendChild(s);
    window.dataLayer = window.dataLayer || [];
    window.gtag = function(){ dataLayer.push(arguments); };
    gtag('js', new Date());
    gtag('config', id);
  }
  function isSubscribed(){
    try { return JSON.parse(localStorage.getItem('mccNewsOK')||'false')===true; } catch(e){ return false; }
  }
  function gateDownloads(){
    if(!cfg.newsletterGate) return;
    const anchors = document.querySelectorAll('a[href]');
    anchors.forEach(a=>{
      try{
        const href = a.getAttribute('href')||'';
        if(href.includes(cfg.docsPrefix)){
          a.addEventListener('click', function(e){
            if(!isSubscribed()){
              e.preventDefault();
              alert("Please subscribe to the newsletter to access downloads.");
              // compute newsletter path relative to current
              const isTraining = location.pathname.includes('/training/');
              location.href = isTraining ? '../newsletter.html' : 'newsletter.html';
            }
          });
        }
      }catch(e){/*noop*/}
    });
  }
  function wireROIEvents(){
    // Fire events if ROI functions are called
    const w = window;
    if(typeof w.calcROI === 'function'){
      const orig = w.calcROI;
      w.calcROI = function(){
        try{ gtag && gtag('event','roi_calculated'); }catch(e){}
        return orig.apply(this, arguments);
      };
    }
    if(typeof w.exportROICSV === 'function'){
      const orig2 = w.exportROICSV;
      w.exportROICSV = function(){
        try{ gtag && gtag('event','roi_export'); }catch(e){}
        return orig2.apply(this, arguments);
      };
    }
  }
  document.addEventListener('DOMContentLoaded', function(){
    loadGA(cfg.gaId);
    gateDownloads();
    wireROIEvents();
  });
})();