(function(){
  function ready(fn){ if(document.readyState!=='loading'){ fn(); } else { document.addEventListener('DOMContentLoaded', fn); } }
  ready(function(){
    try{
      if (document.querySelector('a[data-mcc-nav="weekend-tf"]')) return; // already injected
      // Heuristics: find a top nav <ul> that already contains Newsletter or Apps or Optimizer
      var candidates = Array.from(document.querySelectorAll('nav ul, .nav ul, header nav ul, .top-nav ul, #topnav ul'));
      var targetUl = null;
      candidates.some(function(ul){
        var html = ul.innerHTML.toLowerCase();
        if(html.includes('newsletter') || html.includes('apps') || html.includes('optimizer')){ targetUl = ul; return true; }
        return false;
      });
      if(!targetUl){ 
        // fallback: first UL in a nav
        var nav = document.querySelector('nav');
        targetUl = nav ? nav.querySelector('ul') : null;
      }
      if(!targetUl) return;

      var li = document.createElement('li');
      var a = document.createElement('a');
      a.href = "/weekend-track-preview.html";
      a.textContent = "Weekend T&F Preview";
      a.setAttribute('data-mcc-nav','weekend-tf');
      // Try to match site's classes if present on siblings
      var sampleA = targetUl.querySelector('a');
      if(sampleA){
        a.className = sampleA.className || '';
      }
      li.appendChild(a);

      // Insert after Newsletter link if present, else append
      var after = Array.from(targetUl.querySelectorAll('a')).find(function(x){
        var t = (x.textContent||"").toLowerCase();
        return t.includes('newsletter');
      });
      if(after && after.parentElement && after.parentElement.parentElement === targetUl){
        after.parentElement.insertAdjacentElement('afterend', li);
      } else {
        targetUl.appendChild(li);
      }
    }catch(e){
      console && console.warn && console.warn("MCC nav inject failed:", e);
    }
  });
})();