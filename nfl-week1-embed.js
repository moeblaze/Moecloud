// nfl-week1-embed.js — one‑line include to render Week 1 (2025) under your NFL section.
// Usage: <script src="nfl-week1-embed.js" defer></script>
(function(){ "use strict";
  function ready(fn){ if(document.readyState!=='loading') fn(); else document.addEventListener('DOMContentLoaded', fn); }
  function logoSVG(abbr){
    var h = (Array.from(abbr).reduce((a,c)=>a+c.charCodeAt(0),0)*23)%360;
    var h2 = (h+40)%360;
    return '<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 64 64" role="img" aria-label="'+abbr+'">'
      + '<defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1">'
      + '<stop offset="0%" stop-color="hsl('+h+',72%,54%)"/>'
      + '<stop offset="100%" stop-color="hsl('+h2+',72%,44%)"/>'
      + '</linearGradient></defs>'
      + '<circle cx="32" cy="32" r="30" fill="url(#g)"/>'
      + '<circle cx="32" cy="32" r="30" fill="none" stroke="rgba(255,255,255,.25)" stroke-width="2"/>'
      + '<text x="50%" y="54%" text-anchor="middle" font-family="system-ui, -apple-system, Segoe UI, Roboto, Arial" font-size="22" font-weight="900" fill="#0b0b0c">'+abbr+'</text>'
      + '</svg>';
  }
  var css = `/* Scoped styles: mc-* namespace */
.mc-scores{margin:1.25rem 0}
.mc-sec-title{margin:.2rem 0 .8rem 0;font:800 1.15rem/1.2 system-ui, -apple-system, Segoe UI, Roboto, Arial}
.mc-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:14px}
.mc-game{background:#0e111a;border:1px solid #222634;border-radius:14px;padding:14px;color:#ecf0ff;box-shadow:0 8px 26px rgba(0,0,0,.25)}
.mc-row{display:flex;align-items:center;gap:.6rem}
.mc-justify{justify-content:space-between}
.mc-title{margin:0;font:700 1rem/1.2 system-ui}
.mc-badge{font:800 .7rem/1.1 system-ui;text-transform:uppercase;letter-spacing:.6px;padding:.25rem .5rem;border-radius:999px;background:linear-gradient(90deg,#d40a22,#ff1f39);color:#fff}
.mc-note{font:700 .7rem/1.2 system-ui;color:#ffd66b;margin-left:auto}
.mc-teams{justify-content:space-between;margin:.25rem 0 .35rem 0}
.mc-team{display:flex;align-items:center;gap:.5rem}
.mc-logo{width:30px;height:30px;border-radius:50%;display:inline-flex;align-items:center;justify-content:center;overflow:hidden;box-shadow:0 2px 6px rgba(0,0,0,.25)}
.mc-name{font:600 .95rem/1.2 system-ui;color:#f1f4ff}
.mc-blurb{margin:.35rem 0 0 0;font:400 .9rem/1.35 system-ui;color:#cbd3ff}
@media (prefers-color-scheme: light){ .mc-game{background:#111317;color:#eef1ff} }

/* Strips */
.mc-strip{background:#0f1220;border:1px solid #2a2f4a;border-radius:14px;padding:12px 14px;margin:0 0 12px 0}
.mc-strip-title{margin:0 0 6px 0;font:800 .95rem/1.2 system-ui;color:#fff}
.mc-strip-body{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:10px}
.mc-perf{background:#12162a;border:1px solid #2e3554;border-radius:10px;padding:8px}
.mc-perf-name{font:700 .92rem/1.2 system-ui;color:#e8ecff}
.mc-perf-team{color:#9fb4ff;font-weight:800}
.mc-perf-line{font:500 .9rem/1.35 system-ui;color:#cfd6ff}
.mc-perf-game{color:#9aa7ff}
.mc-headlines-list{list-style:none;padding:0;margin:0;display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:8px}
.mc-headlines-list li{background:#12162a;border:1px solid #2e3554;border-radius:10px;padding:8px;color:#e8ecff;font:500 .9rem/1.35 system-ui}
.mc-footnote{margin:.6rem 0 0 0;color:#aab3ff;font:.85rem/1.4 system-ui}`;
  function injectCSS(){
    if(document.getElementById('mc-sports-css')) return;
    var s=document.createElement('style'); s.id='mc-sports-css'; s.textContent=css; document.head.appendChild(s);
  }
  function sectionHTML(){
    var header = 'NFL — Week 1 (Sep 4–7, 2025)';
    var perf = [["Josh Allen", "Bills", "394 pass yds, 2 TD", "BUF 41\u201340 BAL"], ["Aaron Rodgers", "Steelers", "244 pass yds, 4 TD", "PIT 34\u201332 NYJ"], ["Justin Herbert", "Chargers", "318 pass yds, 3 TD", "LAC 27\u201321 KC"], ["Travis Etienne Jr.", "Jaguars", "143 rush yds", "JAX 26\u201310 CAR"], ["Puka Nacua", "Rams", "10 rec, 130 yds", "LAR 14\u20139 HOU"]];
    var heads = ["Eagles edge Cowboys 24\u201320 in weather\u2011delayed opener", "Chargers win Brazil game vs. Chiefs, 27\u201321", "Rodgers tosses 4 TD as Steelers outlast Jets", "Bills rally late to top Ravens 41\u201340", "Colts dominate Dolphins 33\u20138 in Daniel Jones debut"];
    var games = [["Thu", "DAL", "PHI", "Cowboys", "Eagles", 20, 24, "Hurts rushes for 2 TD in a weather\u2011delayed opener."], ["Fri", "KC", "LAC", "Chiefs", "Chargers", 21, 27, "Justin Herbert throws for 318 yards & 3 TD in Brazil."], ["Sun", "TB", "ATL", "Buccaneers", "Falcons", 23, 20, "Tampa Bay edges Atlanta; Michael Penix Jr. posts 298 passing yards."], ["Sun", "CIN", "CLE", "Bengals", "Browns", 17, 16, "Cincinnati hangs on; Joe Flacco throws for 290 in the loss."], ["Sun", "MIA", "IND", "Dolphins", "Colts", 8, 33, "Daniel Jones throws for 272 in Indy debut; Pittman scores."], ["Sun", "LV", "NE", "Raiders", "Patriots", 20, 13, "Geno Smith piles up 362 passing yards as Vegas wins in Foxborough."], ["Sun", "ARI", "NO", "Cardinals", "Saints", 20, 13, "Rookie Trey Benson\u2019s 69 rush yards help lift Arizona on the road."], ["Sun", "PIT", "NYJ", "Steelers", "Jets", 34, 32, "Aaron Rodgers tosses 4 TD vs. his former team."], ["Sun", "NYG", "WSH", "Giants", "Commanders", 6, 21, "Jayden Daniels steady (233y); Deebo Samuel adds 77 receiving yards."], ["Sun", "CAR", "JAX", "Panthers", "Jaguars", 10, 26, "Travis Etienne rushes for 143 as Jacksonville cruises."], ["Sun", "TEN", "DEN", "Titans", "Broncos", 12, 20, "Bo Nix debuts with 176 & a TD; Denver\u2019s D closes it out."], ["Sun", "SF", "SEA", "49ers", "Seahawks", 17, 13, "Brock Purdy throws for 277 and 2 TD; late Niners push holds."], ["Sun", "DET", "GB", "Lions", "Packers", 13, 27, "Green Bay controls the day; Josh Jacobs logs 66 & a score."], ["Sun", "HOU", "LAR", "Texans", "Rams", 9, 14, "Matthew Stafford (245y, TD) and Puka Nacua (10\u2011130) pace LA."], ["Sun", "BAL", "BUF", "Ravens", "Bills", 40, 41, "Bills score 16 late to stun Baltimore; Josh Allen throws for 394 and 2 TD."]];
    function gameCard(g){
      var day=g[0], away=g[1], home=g[2], awayName=g[3], homeName=g[4], sa=g[5], sh=g[6], blurb=g[7];
      return `
  <article class="mc-game" data-home="${home}" data-away="${away}">
    <header class="mc-row mc-justify">
      <div class="mc-badge">${day}</div>
      <h4 class="mc-title">${awayName} at ${homeName}</h4>
    </header>
    <div class="mc-row mc-teams">
      <div class="mc-team">
        <span class="mc-logo">${logoSVG(away)}</span>
        <div class="mc-name">${awayName} ${sa}</div>
      </div>
      <div class="mc-team">
        <span class="mc-logo">${logoSVG(home)}</span>
        <div class="mc-name">${homeName} ${sh}</div>
      </div>
    </div>
    <p class="mc-blurb">${blurb}</p>
  </article>`;
    }
    var top = perf.map(p => `
      <div class="mc-perf">
        <div class="mc-perf-name">${p[0]} <span class="mc-perf-team">(${p[1]})</span></div>
        <div class="mc-perf-line">${p[2]} <span class="mc-perf-game">— ${p[3]}</span></div>
      </div>`).join('');
    var headsHTML = heads.map(h => `<li>• ${h}</li>`).join('');
    var cards = games.map(gameCard).join('');
    return `<!-- NFL — Week 1 (Sep 4–7, 2025) -->
<section id="nfl-week1-2025" class="mc-scores">
  <h3 class="mc-sec-title">${header}</h3>

  <div class="mc-strip mc-performers">
    <h4 class="mc-strip-title">Top Performers</h4>
    <div class="mc-strip-body">${top}</div>
  </div>

  <div class="mc-strip mc-headlines">
    <h4 class="mc-strip-title">Power 5 Headlines</h4>
    <ul class="mc-headlines-list">${headsHTML}</ul>
  </div>

  <div class="mc-grid">
${cards}
  </div>

  <p class="mc-footnote">Weekend only (Thu–Sun). Monday: Vikings at Bears — not included.</p>
</section>`;
  }
  function findNFLAnchor(){
    var el = document.getElementById('nfl');
    if(el) return el;
    var h2s = Array.from(document.querySelectorAll('h2, h3'));
    for (var i=0;i<h2s.length;i++){ var t=(h2s[i].textContent||'').trim().toLowerCase(); if(t==='nfl') return h2s[i]; }
    return null;
  }
  ready(function(){
    if (document.getElementById('nfl-week1-2025')) return; // already injected
    var anchor = findNFLAnchor();
    if(!anchor) return console.warn('[NFL Week1 Embed] No NFL header/anchor found');
    injectCSS();
    var wrapper = document.createElement('div');
    wrapper.innerHTML = sectionHTML();
    anchor.insertAdjacentElement('afterend', wrapper.firstElementChild);
  });
})();