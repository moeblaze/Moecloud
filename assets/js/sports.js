(()=>{
  async function hydrate(){
    try{
      const res = await fetch('/data/sports-latest.json', { cache: 'no-store' });
      if(!res.ok) throw new Error('Data fetch failed');
      const data = await res.json();
      const S = data.sports || {};

      const ul = items => `<ul class="scorelist">` + (items||[]).map(li=>`<li>${li}</li>`).join('') + `</ul>`;
      const sec = id => document.getElementById(id);

      // NFL
      if (S.nfl && sec('nfl')) {
        const nfl = S.nfl;
        sec('nfl').innerHTML = `
          <div class="badge">NFL</div>
          <h3>${nfl.week || 'NFL — Latest'}</h3>
          <div class="grid">
            <article class="card">
              <h4>Scores</h4>
              ${ul(nfl.scores || [])}
            </article>
            <article class="card">
              <h4>Headlines</h4>
              ${ul((nfl.headlines||[]).map(h => (h.title ? h.title : h)))}
              <div class="tiny note">Auto-updated from data.</div>
            </article>
          </div>
          <p class="tiny">Snapshot updated ${data.generated || ''}</p>
        `;
      }

      // NBA
      if (S.nba && sec('nba')) {
        sec('nba').innerHTML = `
          <div class="badge">NBA</div>
          <h3>${S.nba.title || 'NBA — Latest'}</h3>
          <div class="grid">
            <article class="card">
              <h4>Headlines</h4>
              ${ul((S.nba.headlines||[]).map(h => (h.title ? h.title : h)))}
            </article>
            <article class="card">
              <h4>Key dates</h4>
              ${ul(S.nba.key_dates || [])}
            </article>
          </div>
          <p class="tiny">Snapshot updated ${data.generated || ''}</p>
        `;
      }

      // MLB
      if (S.mlb && sec('mlb')) {
        sec('mlb').innerHTML = `
          <div class="badge">MLB</div>
          <h3>${S.mlb.title || 'MLB — Latest'}</h3>
          <div class="grid">
            <article class="card">
              <h4>Division snapshots</h4>
              ${ul(S.mlb.division || [])}
            </article>
            <article class="card">
              <h4>Postseason watch</h4>
              <p>${S.mlb.note || ''}</p>
            </article>
          </div>
          <p class="tiny">Snapshot updated ${data.generated || ''}</p>
        `;
      }

      // WNBA
      if (S.wnba && sec('wnba')) {
        sec('wnba').innerHTML = `
          <div class="badge">WNBA</div>
          <h3>${S.wnba.title || 'WNBA — Latest'}</h3>
          <div class="grid">
            <article class="card">
              <h4>Clinched berths</h4>
              ${ul(S.wnba.clinched || [])}
            </article>
            <article class="card">
              <h4>Dates</h4>
              ${ul(S.wnba.dates || [])}
            </article>
          </div>
          <p class="tiny">Snapshot updated ${data.generated || ''}</p>
        `;
      }

      // NCAAF
      if (S.ncaaf && sec('ncaaf')) {
        sec('ncaaf').innerHTML = `
          <div class="badge">NCAAF</div>
          <h3>${S.ncaaf.title || 'NCAAF — Latest'}</h3>
          <div class="grid">
            <article class="card">
              <h4>Notable upsets</h4>
              ${ul(S.ncaaf.upsets || [])}
            </article>
          </div>
          <p class="tiny">Snapshot updated ${data.generated || ''}</p>
        `;
      }

      // NHL
      if (S.nhl && sec('nhl')) {
        sec('nhl').innerHTML = `
          <div class="badge">NHL</div>
          <h3>${S.nhl.title || 'NHL — Latest'}</h3>
          <div class="grid">
            <article class="card"><h4>Key dates</h4>${ul(S.nhl.dates || [])}</article>
          </div>
          <p class="tiny">Snapshot updated ${data.generated || ''}</p>
        `;
      }

      // NASCAR
      if (S.nascar && sec('nascar')) {
        const R = S.nascar.results || [];
        sec('nascar').innerHTML = `
          <div class="badge">NASCAR</div>
          <h3>${S.nascar.title || 'NASCAR — Latest'}</h3>
          <div class="grid">
            ${(R.slice(0,2)).map(txt => {
              const parts = String(txt).split(': ');
              const h = parts[0] || 'Result';
              const p = parts[1] || txt;
              return `<article class="card"><h4>${h}</h4><p>${p}</p></article>`;
            }).join('')}
          </div>
          <p class="tiny">Snapshot updated ${data.generated || ''}</p>
        `;
      }

    }catch(err){
      console.warn('Hydration skipped:', err);
    }
  }
  if(document.readyState==='loading'){document.addEventListener('DOMContentLoaded', hydrate);}else{hydrate();}
})();