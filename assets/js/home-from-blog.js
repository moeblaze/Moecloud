(function(){
  function ready(fn){ if(document.readyState!=='loading') fn(); else document.addEventListener('DOMContentLoaded', fn); }
  function isHome(){ return location.pathname==='/' || location.pathname.endsWith('/index.html'); }
  function inject(){
    if(!isHome() || document.getElementById('mcc_from_blog')) return;
    var section = document.createElement('section'); section.className='section'; section.id='mcc_from_blog';
    section.innerHTML = '<div class="wrap">'
      + '<h2 class="section-title">From the Blog</h2>'
      + '<div class="grid cards three">'
      +   '<div class="card rise"><h3><a href="blog/zero-trust-saves-millions.html">Why Zero Trust Saves Companies Millions</a></h3><p class="micro">How a zero-trust baseline cuts risk, cloud waste, and downtime.</p></div>'
      +   '<div class="card rise"><h3><a href="blog/ai-playbooks-revenue.html">AI Playbooks: Turning Automation Into Revenue</a></h3><p class="micro">Shift from pilots to profit with repeatable AI motions.</p></div>'
      +   '<div class="card rise"><h3><a href="blog/enterprise-1m-playbook.html">The $1M Enterprise Playbook Explained</a></h3><p class="micro">Why top-tier transformation pays for itself.</p></div>'
      + '</div>'
      + '<div style="margin-top:12px"><a class="btn ghost" href="blog/index.html">Read all posts</a></div>'
      + '</div>';
    var before = document.querySelector('footer.site-footer');
    if(before && before.parentNode){ before.parentNode.insertBefore(section, before); } else { document.body.appendChild(section); }
  }
  ready(inject);
})();