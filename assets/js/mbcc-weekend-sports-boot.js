
// MBCC Weekend Sports Boot — injects head assets + adds "Weekend Sports" to nav safely
(function(){
  try{
    // 1) <head> hygiene (Google Fonts: Inter + preconnect)
    var head = document.getElementsByTagName('head')[0];
    function ensureTag(tagName, attrs){
      var sel = tagName + Object.keys(attrs).map(k=>`[${k}="${attrs[k]}"]`).join('');
      if (!document.querySelector(sel)){
        var el = document.createElement(tagName);
        Object.keys(attrs).forEach(k=>el.setAttribute(k, attrs[k]));
        head.appendChild(el);
      }
    }
    ensureTag('link', { rel:'preconnect', href:'https://fonts.googleapis.com' });
    ensureTag('link', { rel:'preconnect', href:'https://fonts.gstatic.com', crossorigin:'' });
    ensureTag('link', { rel:'stylesheet', href:'https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800&display=swap' });

    // 2) Add "Weekend Sports" to common nav patterns (no duplicates)
    var targets = [
      document.querySelector('#topnav ul'),
      document.querySelector('header nav ul'),
      document.querySelector('nav ul')
    ].filter(Boolean);
    if (targets.length){
      if (!document.querySelector('a[href*="/sports-weekend/index.html"]')){
        var li = document.createElement('li');
        var a  = document.createElement('a');
        a.href = '/sports-weekend/index.html';
        a.textContent = 'Weekend Sports';
        a.style.whiteSpace = 'nowrap';
        li.appendChild(a);
        targets.forEach(function(ul){ try{ ul.appendChild(li.cloneNode(true)); }catch(e){} });
      }
    }

  }catch(e){ /* no‑op */ }
})();
