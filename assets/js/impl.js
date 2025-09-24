(function(){
  const cfg = (window.MCC_CONFIG||{});
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
  function isSubscribed(){ try { return JSON.parse(localStorage.getItem('mccNewsOK')||'false')===true; } catch(e){ return false; } }
  function gateDownloads(){
    if(!cfg.newsletterGate) return;
    document.querySelectorAll('a[href]').forEach(a=>{
      const href = a.getAttribute('href')||'';
      if(href.includes(cfg.docsPrefix||'/docs/')){
        a.addEventListener('click', function(e){
          if(!isSubscribed()){
            e.preventDefault();
            alert("Please subscribe to the newsletter to access downloads.");
            const isTraining = location.pathname.includes('/training/');
            location.href = isTraining ? '../newsletter.html' : 'newsletter.html';
          }
        });
      }
    });
  }
  function wireROIEvents(){
    const w = window;
    if(typeof w.calcROI === 'function'){
      const orig = w.calcROI;
      w.calcROI = function(){ try{ gtag('event','roi_calculated'); }catch(e){} return orig.apply(this, arguments); };
    }
    if(typeof w.exportROICSV === 'function'){
      const orig2 = w.exportROICSV;
      w.exportROICSV = function(){ try{ gtag('event','roi_export'); }catch(e){} return orig2.apply(this, arguments); };
    }
  }
  function ensurePlaybooksNav(){
    try{
      const nav = document.querySelector('header .nav');
      if(!nav) return;
      const links = Array.from(nav.querySelectorAll('a')).map(a => (a.getAttribute('href')||'').replace(location.origin,''));
      const has = links.some(h => h.endsWith('/playbooks/index.html') || h.endsWith('/playbooks/') || h === '/playbooks');
      if(!has){
        const a = document.createElement('a');
        // Compute prefix based on depth: if current path has /training/ or /playbooks/ or /services/, use "../"
        const depth = location.pathname.split('/').filter(Boolean);
        const isDeep = depth.includes('training') || depth.includes('playbooks') || depth.includes('services');
        a.href = isDeep ? '../playbooks/index.html' : 'playbooks/index.html';
        a.textContent = 'Playbooks';
        nav.appendChild(a);
      }
    }catch(e){/*noop*/}
  }
  document.addEventListener('DOMContentLoaded', function(){
    loadGA((window.MCC_CONFIG||{}).gaId);
    gateDownloads();
    wireROIEvents();
    ensurePlaybooksNav();
  });
})();