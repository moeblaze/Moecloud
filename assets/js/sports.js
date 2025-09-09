(() => {
  async function hydrate() {
    try {
      const res = await fetch('/data/sports-weekend-2025-09-08.json', { cache: 'no-store' });
      if (!res.ok) throw new Error('Data fetch failed');
      const data = await res.json();
      const S = data.sports || {};

      // Helpers
      const ul = items => `<ul class="scorelist">` + items.map(li => `<li>${li}</li>`).join('') + `</ul>`;
      const sec = id => document.getElementById(id);

      // NFL
      if (S.nfl && sec('nfl')) {
        const nfl = S.nfl;
        sec('nfl').innerHTML = `
          <div class="badge">NFL</div>
          <h3>${nfl.week}</h3>
          <div class="grid">
            <article class="card">
              <h4>Sunday finals (selected)</h4>
              ${ul(nfl.scores.slice(2))}
              <div class="note tiny">${
                (nfl.links||[]).map(L => `<a href="${L.href}" target="_blank" rel="noopener">${L.label}</a>`).join(' • ')
              }</div>
            </article>
            <article class="card">
              <h4>Headlines</h4>
              ${ul(nfl.headlines)}
              <div class="tiny note">Auto-updated from data.</div>
            </article>
          </div>
          <p class="tiny">Snapshot updated ${data.generated}.</p>
        `;
      }

      // NBA
      if (S.nba && sec('nba')) {
        sec('nba').innerHTML = `
          <div class="badge">NBA</div>
          <h3>${S.nba.title}</h3>
          <div class="grid">
            <article class="card">
              <h4>Hall of Fame</h4>
              <p>${S.nba.headlines[0]}</p>
            </article>
            <article class="card">
              <h4>Key dates</h4>
              ${ul(S.nba.key_dates)}
            </article>
          </div>
          <p class="tiny">Snapshot updated ${data.generated}.</p>
        `;
      }

      // MLB
      if (S.mlb && sec('mlb')) {
        sec('mlb').innerHTML = `
          <div class="badge">MLB</div>
          <h3>${S.mlb.title}</h3>
          <div class="grid">
            <article class="card">
              <h4>Division snapshots</h4>
              ${ul(S.mlb.division)}
            </article>
            <article class="card">
              <h4>Postseason watch</h4>
              <p>${S.mlb.note}</p>
            </article>
          </div>
          <p class="tiny">Snapshot updated ${data.generated}.</p>
        `;
      }

      // WNBA
      if (S.wnba && sec('wnba')) {
        sec('wnba').innerHTML = `
          <div class="badge">WNBA</div>
          <h3>${S.wnba.title}</h3>
          <div class="grid">
            <article class="card">
              <h4>Clinched berths</h4>
              ${ul(S.wnba.clinched)}
            </article>
            <article class="card"><h4>Dates</h4>${ul(S.wnba.dates)}</article>
          </div>
          <p class="tiny">Snapshot updated ${data.generated}.</p>
        `;
      }

      // NCAAF
      if (S.ncaaf && sec('ncaaf')) {
        sec('ncaaf').innerHTML = `
          <div class="badge">NCAAF</div>
          <h3>${S.ncaaf.title}</h3>
          <div class="grid">
            <article class="card">
              <h4>Notable upsets</h4>
              ${ul(S.ncaaf.upsets)}
            </article>
          </div>
          <p class="tiny">Snapshot updated ${data.generated}.</p>
        `;
      }

      // NHL
      if (S.nhl && sec('nhl')) {
        sec('nhl').innerHTML = `
          <div class="badge">NHL</div>
          <h3>${S.nhl.title}</h3>
          <div class="grid">
            <article class="card"><h4>Key dates</h4>${ul(S.nhl.dates)}</article>
          </div>
          <p class="tiny">Snapshot updated ${data.generated}.</p>
        `;
      }

      // NASCAR
      if (S.nascar && sec('nascar')) {
        sec('nascar').innerHTML = `
          <div class="badge">NASCAR</div>
          <h3>${S.nascar.title}</h3>
          <div class="grid">
            <article class="card"><h4>${S.nascar.results[0].split(':')[0]}</h4><p>${S.nascar.results[0].split(': ')[1]}</p></article>
            <article class="card"><h4>${S.nascar.results[1].split(':')[0]}</h4><p>${S.nascar.results[1].split(': ')[1]}</p></article>
          </div>
          <p class="tiny">Snapshot updated ${data.generated}.</p>
        `;
      }

    } catch (err) {
      console.warn('Hydration skipped:', err);
    }
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', hydrate);
  else hydrate();
})();