
(async function(){
  const page = document.body.getAttribute('data-page') || 'hub';
  const cat = document.body.getAttribute('data-category') || 'all';
  const data = await fetch('assets/news/news-data.json').then(r=>r.json()).catch(()=>({}));

  function renderStrip(items){
    const track = document.querySelector('.headlines .track');
    if (!track || !items?.length) return;
    const list = items.map(a=>`<span class="item">• <a href="${a.url}" target="_blank" rel="noopener">${a.title}</a></span>`);
    track.innerHTML = list.concat(list).join(' ');
  }
  function renderArticles(items){
    const wrap = document.querySelector('.article-list');
    if (!wrap || !items) return;
    wrap.innerHTML = items.map(a => `
      <div class="article">
        <a href="${a.url}" target="_blank" rel="noopener">${a.title}</a>
        ${a.source ? `<div class="src">${a.source}${a.date ? ' • ' + a.date : ''}</div>` : ''}
      </div>
    `).join('');
  }
  const cats = ['ai','tech','funny','health'];
  if (page === 'hub'){
    const strip = [];
    const cards = [];
    cats.forEach(k => {
      (data[k]?.headlines||[]).slice(0,2).forEach(x=>strip.push(x));
      (data[k]?.headlines||[]).slice(0,4).forEach(x=>cards.push(x));
    });
    renderStrip(strip);
    renderArticles(cards);
  } else {
    const section = data[cat] || {};
    renderStrip(section.headlines||[]);
    renderArticles(section.headlines||[]);
  }

  const obs = new IntersectionObserver((entries)=>{ entries.forEach(e=>{ if(e.isIntersecting) e.target.classList.add('in-view'); }); }, {threshold:.15});
  document.querySelectorAll('.reveal').forEach(el=>obs.observe(el));
})();
