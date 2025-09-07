
const PUB_ID = "ca-pub-8387411349417007";
const SLOT_ID = "6461821120";

function h(tag, attrs, ...children) {
  const el = document.createElement(tag);
  for (const k in (attrs||{})) { el.setAttribute(k, attrs[k]); }
  children.flat().forEach(c => el.appendChild(typeof c === 'string' ? document.createTextNode(c) : c));
  return el;
}

async function loadNews() {
  const res = await fetch('assets/news-data.json', { cache: 'no-store' });
  const data = await res.json();
  const container = document.getElementById('news-container');
  const filterSel = document.getElementById('news-filter');
  const qInput = document.getElementById('news-q');

  const all = [];
  data.sections.forEach(sec => sec.items.forEach(item => all.push({...item, section: sec.title, tag: sec.tag})));

  function render(list) {
    container.innerHTML = '';
    if (!list.length) { container.textContent = 'No results.'; return; }
    list.sort((a,b)=> (a.date<b.date?1:-1));
    list.forEach(it => {
      const card = h('div', { class: 'card reveal' },
        h('div', { class: 'badge' }, it.section),
        h('h3', null, it.title),
        h('p', null, it.summary||''),
        h('div', { class:'tiny' }, new Date(it.date).toLocaleDateString()),
        h('a', { class:'btn', href: it.link||'#', target: (it.link||'#').startsWith('http')?'_blank':'_self' }, 'Open')
      );
      container.appendChild(card);
    });
    const obs = new IntersectionObserver((entries)=>{ entries.forEach(e=>{ if(e.isIntersecting) e.target.classList.add('in-view'); }); }, {threshold:.12});
    document.querySelectorAll('.reveal').forEach(el=>obs.observe(el));
  }

  function apply() {
    const tag = filterSel.value;
    const q = (qInput.value||'').toLowerCase();
    let list = all;
    if (tag) list = list.filter(it => it.tag===tag);
    if (q) list = list.filter(it => it.title.toLowerCase().includes(q) || (it.summary||'').toLowerCase().includes(q));
    render(list);
  }

  const tags = data.sections.map(s=> [s.tag, s.title]);
  filterSel.innerHTML = '<option value="">All</option>' + tags.map(([v,l])=> `<option value="${v}">${l}</option>`).join('');
  qInput.oninput = apply;
  filterSel.onchange = apply;

  apply();
}

document.addEventListener('DOMContentLoaded', loadNews);
