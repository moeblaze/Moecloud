
document.querySelectorAll('a[data-active]').forEach(a=>{
  if(location.pathname.endsWith(a.getAttribute('href'))) a.classList.add('active');
});
