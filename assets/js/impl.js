(function(){
  const cfg = (window.MCC_CONFIG||{});

  function loadGA(id){
    if(!id || !(cfg.enableGA!==false)) return;
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
    if(cfg.newsletterGate===false) return;
    document.querySelectorAll('a[href]').forEach(a=>{
      const href = a.getAttribute('href')||'';
      const pref = (cfg.docsPrefix||'/docs/');
      if(href.includes(pref)){
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

  function pathPrefix(){
    // Decide "../" vs "" for links based on current path depth
    const parts = location.pathname.split('/').filter(Boolean);
    // depth of 0 => "", depth >=1 under a section => "../"
    if (parts.length === 0) return "";
    // if we're under a top-level section (training, playbooks, services), use "../"
    if (['training','playbooks','services'].some(s => parts.includes(s))) return "../";
    return "";
  }

  function ensureHomeNav(){
    try{
      const nav = document.querySelector('header .nav');
      if(!nav) return;
      const links = Array.from(nav.querySelectorAll('a')).map(a => (a.getAttribute('href')||'').replace(location.origin,''));
      const hasHome = links.some(h => h.endsWith('/index.html') || h === '/' || h === '');
      if(!hasHome){
        const a = document.createElement('a');
        const pref = pathPrefix();
        a.href = pref ? pref + 'index.html' : 'index.html';
        a.textContent = 'Home';
        nav.insertBefore(a, nav.firstChild);
      }
    }catch(e){/* noop */}
  }

  function ensurePlaybooksNav(){
    try{
      const nav = document.querySelector('header .nav');
      if(!nav) return;
      const links = Array.from(nav.querySelectorAll('a')).map(a => (a.getAttribute('href')||'').replace(location.origin,''));
      const has = links.some(h => h.endsWith('/playbooks/index.html') || h.endsWith('/playbooks/') || h === '/playbooks');
      if(!has){
        const a = document.createElement('a');
        const pref = pathPrefix();
        a.href = pref + 'playbooks/index.html';
        a.textContent = 'Playbooks';
        nav.appendChild(a);
      }
    }catch(e){/* noop */}
  }

  function injectBackLink(){
    try{
      // Try to add to breadcrumbs if present
      const bc = document.querySelector('.breadcrumbs');
      const a = document.createElement('a');
      a.href = 'javascript:void(0)';
      a.setAttribute('role','button');
      a.setAttribute('aria-label','Go back');
      a.textContent = '‹ Back';
      a.style.marginRight = '12px';
      a.addEventListener('click', function(ev){
        ev.preventDefault();
        if (document.referrer && document.referrer !== location.href) {
          history.back();
        } else {
          // Fallback to Home
          const pref = pathPrefix();
          location.href = pref ? pref + 'index.html' : 'index.html';
        }
      });
      if(bc){
        // Prepend back link before existing crumbs
        bc.insertBefore(a, bc.firstChild);
      } else {
        // Otherwise create a light bar under header
        const bar = document.createElement('div');
        bar.style.padding = '10px 0';
        bar.style.margin = '0 auto';
        bar.style.maxWidth = '1200px';
        bar.style.width = '90%';
        bar.appendChild(a);
        const header = document.querySelector('header.site-header');
        if(header && header.parentNode){
          header.parentNode.insertBefore(bar, header.nextSibling);
        } else {
          document.body.insertBefore(bar, document.body.firstChild);
        }
      }
    }catch(e){/* noop */}
  }

  document.addEventListener('DOMContentLoaded', function(){
    loadGA((window.MCC_CONFIG||{}).gaId);
    gateDownloads();
    wireROIEvents();
    ensureHomeNav();
    ensurePlaybooksNav();
    injectBackLink();
  });
})();