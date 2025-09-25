document.addEventListener('DOMContentLoaded', () => {
  const links = Array.from(document.querySelectorAll('.nav-list a[href^="#"]'));
  const sections = links.map(a => document.querySelector(a.getAttribute('href'))).filter(Boolean);
  const onScroll = () => {
    const y = window.scrollY + 100;
    let current = sections[0];
    for(const sec of sections){ if(sec.offsetTop <= y) current = sec; }
    links.forEach(a=>a.removeAttribute('aria-current'));
    const active = links.find(a=>a.getAttribute('href') === '#' + current.id);
    if(active) active.setAttribute('aria-current','true');
  };
  document.addEventListener('scroll', onScroll, {passive:true});
  onScroll();
});