// Hub & Spoke interactions
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.node').forEach(n => {
    n.addEventListener('click', () => {
      const link = n.getAttribute('data-link');
      if(link) location.href = link;
    });
  });
});
