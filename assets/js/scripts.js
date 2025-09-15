
// Minimal progressive enhancements
document.querySelectorAll('a[data-active]').forEach(a=>{
  if (location.pathname.endsWith(a.getAttribute('href'))) a.classList.add('active');
});
// Lazy load images (native loading attr already used)
