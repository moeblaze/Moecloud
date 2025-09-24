(function(){
  function ready(fn){ if(document.readyState!=='loading') fn(); else document.addEventListener('DOMContentLoaded', fn); }
  function insertLink(){
    var nav = document.querySelector('.site-header .nav');
    if(!nav || document.getElementById('nav-packages-deep')) return;
    var a = document.createElement('a');
    a.href = (location.pathname.indexOf('/playbooks/')===0
      ? 'packages_longform.html'
      : (location.pathname==='/'||location.pathname.endsWith('/index.html')
        ? 'playbooks/packages_longform.html'
        : '../playbooks/packages_longform.html'));
    a.textContent = 'Packages (Deep Dive)';
    a.id = 'nav-packages-deep';
    nav.appendChild(a);
  }
  ready(insertLink);
})();