
document.querySelectorAll('.accordion-head').forEach(h=>{
  h.addEventListener('click', ()=>{
    const body = h.parentElement.querySelector('.accordion-body');
    const open = body.style.display === 'block';
    document.querySelectorAll('.accordion-body').forEach(b=>b.style.display='none');
    body.style.display = open ? 'none' : 'block';
  });
});
