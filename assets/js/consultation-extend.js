(function(){
  function ready(fn){ if(document.readyState!=='loading') fn(); else document.addEventListener('DOMContentLoaded', fn); }
  function path(){ return location.pathname; }
  function addScriptOnce(src){
    if(document.querySelector('script[src*="'+src+'"]')) return;
    var s=document.createElement('script'); s.src=src; document.body.appendChild(s);
  }
  function injectHomeCTA(){
    // Home: add a Book consultation button near hero buttons
    var p = path();
    if(!(p === "/" || p.endsWith("/index.html"))) return;
    if(document.querySelector('[data-mcc-consult][data-tier]')) return; // already present
    var wrap = document.querySelector('.section .wrap') || document.querySelector('.wrap');
    if(!wrap) return;
    var div = document.createElement('div');
    div.style.cssText = "display:flex;gap:10px;flex-wrap:wrap;margin-top:10px";
    var tiers = ["No‑Code Playbook","Integration (AI Assist)","White‑Label Ecosystem","Enterprise Transformation"];
    tiers.forEach(function(t){
      var a = document.createElement('a');
      a.className = "btn" + (t==="Enterprise Transformation"?" gold":"");
      a.href = "#";
      a.setAttribute("data-mcc-consult","");
      a.setAttribute("data-tier", t);
      a.textContent = "Book consultation — " + (t==="Enterprise Transformation"?"$1M+":"");
      if(t==="No‑Code Playbook") a.textContent="Book consultation — No‑Code";
      if(t==="Integration (AI Assist)") a.textContent="Book consultation — Integration";
      if(t==="White‑Label Ecosystem") a.textContent="Book consultation — White‑Label";
      wrap.appendChild(div);
      div.appendChild(a);
    });
  }
  function injectPlaybooksIndexCTA(){
    // /playbooks/index.html: add a row of CTAs below the teaser/cards
    var p = path();
    if(!(p.includes("/playbooks/") && (p.endsWith("/index.html") || p.endsWith("/playbooks/") || /\/playbooks\/?$/.test(p)))) return;
    if(document.getElementById("mcc_playbooks_cta_row")) return;
    var container = document.querySelector('.section .wrap') || document.querySelector('.wrap');
    if(!container) return;
    var row = document.createElement('div');
    row.id = "mcc_playbooks_cta_row";
    row.style.cssText = "display:flex;gap:10px;flex-wrap:wrap;margin:12px 0 16px 0";
    var tiers = ["No‑Code Playbook","Integration (AI Assist)","White‑Label Ecosystem","Enterprise Transformation"];
    tiers.forEach(function(t){
      var a = document.createElement('a');
      a.className = "btn" + (t==="Enterprise Transformation"?" gold":"");
      a.href = "#";
      a.setAttribute("data-mcc-consult","");
      a.setAttribute("data-tier", t);
      a.textContent = "Book " + (t==="Enterprise Transformation"?"Enterprise ($1M+)":t);
      row.appendChild(a);
    });
    container.appendChild(row);
  }
  ready(function(){
    // best-effort load of consultation.js from root or parent
    var srcRoot = "assets/js/consultation.js";
    var srcSub  = "../assets/js/consultation.js";
    if(location.pathname.indexOf("/playbooks/")===0 || location.pathname.indexOf("/training/")===0 || location.pathname.indexOf("/services/")===0){
      addScriptOnce(srcSub);
    } else {
      addScriptOnce(srcRoot);
    }
    injectHomeCTA();
    injectPlaybooksIndexCTA();
  });
})();