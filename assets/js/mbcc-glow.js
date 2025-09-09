
(function(){
  const selectors=['.card','.prime-card','article.card','.panel','.tile','section.card','figure.img-frame','.stat','.feature','.tool-card'];
  function run(){ document.querySelectorAll(selectors.join(',')).forEach(el=>{ if(!el.classList.contains('mbcc-glow')) el.classList.add('mbcc-glow'); }); }
  if(document.readyState==='loading'){ document.addEventListener('DOMContentLoaded', run); } else { run(); }
})();
