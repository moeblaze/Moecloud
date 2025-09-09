(()=>{
  async function hydrate(){
    try{
      const res = await fetch('/data/sports-latest.json', { cache: 'no-store' });
      if(!res.ok) throw new Error('Data fetch failed');
      const data = await res.json();
      const S = data.sports || {};
      const ul = items => `<ul class="scorelist">` + (items||[]).map(li=>`<li>${typeof li==='string'?li:(li.title||'')}</li>`).join('') + `</ul>`;
      const sec = id => document.getElementById(id);
      const stamp = () => `<p class="tiny">Snapshot updated ${data.generated || ''}</p>`;
      if (S.nfl && sec('nfl')) sec('nfl').innerHTML = `<div class="badge">NFL</div><h3>${S.nfl.week||'NFL — Latest'}</h3><div class="grid"><article class="card"><h4>Scores</h4>${ul(S.nfl.scores)}</article><article class="card"><h4>Headlines</h4>${ul(S.nfl.headlines)}</article></div>${stamp()}`;
      if (S.nba && sec('nba')) sec('nba').innerHTML = `<div class="badge">NBA</div><h3>${S.nba.title||'NBA — Latest'}</h3><div class="grid"><article class="card"><h4>Headlines</h4>${ul(S.nba.headlines)}</article><article class="card"><h4>Key dates</h4>${ul(S.nba.key_dates)}</article></div>${stamp()}`;
      if (S.mlb && sec('mlb')) sec('mlb').innerHTML = `<div class="badge">MLB</div><h3>${S.mlb.title||'MLB — Latest'}</h3><div class="grid"><article class="card"><h4>Division snapshots</h4>${ul(S.mlb.division)}</article><article class="card"><h4>Postseason watch</h4><p>${S.mlb.note||''}</p></article></div>${stamp()}`;
      if (S.wnba && sec('wnba')) sec('wnba').innerHTML = `<div class="badge">WNBA</div><h3>${S.wnba.title||'WNBA — Latest'}</h3><div class="grid"><article class="card"><h4>Clinched berths</h4>${ul(S.wnba.clinched)}</article><article class="card"><h4>Dates</h4>${ul(S.wnba.dates)}</article></div>${stamp()}`;
      if (S.ncaaf && sec('ncaaf')) sec('ncaaf').innerHTML = `<div class="badge">NCAAF</div><h3>${S.ncaaf.title||'NCAAF — Latest'}</h3><div class="grid"><article class="card"><h4>Notable upsets</h4>${ul(S.ncaaf.upsets)}</article></div>${stamp()}`;
      if (S.nhl && sec('nhl')) sec('nhl').innerHTML = `<div class="badge">NHL</div><h3>${S.nhl.title||'NHL — Latest'}</h3><div class="grid"><article class="card"><h4>Key dates</h4>${ul(S.nhl.dates)}</article></div>${stamp()}`;
      if (S.nascar && sec('nascar')){const R=S.nascar.results||[];sec('nascar').innerHTML=`<div class="badge">NASCAR</div><h3>${S.nascar.title||'NASCAR — Latest'}</h3><div class="grid">${R.slice(0,2).map(t=>{const p=String(t).split(': ');return `<article class="card"><h4>${p[0]||'Result'}</h4><p>${p[1]||t}</p></article>`}).join('')}</div>${stamp()}`;}
    }catch(err){console.warn('Hydration skipped:',err);}
  }
  if(document.readyState==='loading'){document.addEventListener('DOMContentLoaded',hydrate);}else{hydrate();}
})();