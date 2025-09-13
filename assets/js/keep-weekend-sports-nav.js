/* MBCC: Keep "Weekend Sports" in the top nav without touching page content.
   - Looks for #topnav ul, header nav ul, or nav ul
   - Inserts link only if missing
   - Runs on every page you include it on
*/
(function(){
  try{
    var targets = [
      document.querySelector('#topnav ul'),
      document.querySelector('header nav ul'),
      document.querySelector('nav ul')
    ].filter(Boolean);
    if (!targets.length) return;
    if (document.querySelector('a[href="/sports-weekend/index.html"], a[href*="/sports-weekend/index.html"])) return;
    var li = document.createElement('li');
    var a  = document.createElement('a');
    a.href = '/sports-weekend/index.html';
    a.textContent = 'Weekend Sports';
    a.style.whiteSpace = 'nowrap';
    li.appendChild(a);
    // insert after 'Sports' if present; otherwise append to the end
    targets.forEach(function(ul){
      var links = ul.querySelectorAll('a');
      var inserted = false;
      for (var i=0;i<links.length;i++){
        if (/\/sports\.html?$/.test(links[i].getAttribute('href')||'')) {
          var liSports = links[i].closest('li') || links[i];
          if (liSports && liSports.parentNode) {
            liSports.parentNode.insertBefore(li.cloneNode(true), liSports.nextSibling);
            inserted = true;
          }
        }
      }
      if (!inserted) ul.appendChild(li.cloneNode(true));
    });
  }catch(e){}
})();