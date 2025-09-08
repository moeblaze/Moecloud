/*! Gameday Edge injector – ONLY NFL + WNBA */
(function(){
  var data = {
    updatedDisplay: "Sept 8, 2025",
    nfl: {
      title: "🏈 Gameday Edge — NFL Tonight",
      matchup: "Vikings @ Bears",
      anytime: [
        { player: "Justin Jefferson (MIN)", odds: "+135", note: "Safer play" },
        { player: "D’Andre Swift (MIN)", odds: "+155", note: "Balanced value" },
        { player: "DJ Moore (CHI)", odds: "+180", note: "" }
      ],
      firstTD: [
        { player: "Jordan Mason (MIN)", odds: "+950" },
        { player: "DJ Moore (CHI)", odds: "+1000" },
        { player: "Caleb Williams (CHI)", odds: "Long Shot" }
      ],
      sources: [
        { label: "SportsbookReview – Anytime/First TD", href: "https://www.sportsbookreview.com/picks/nfl/vikings-vs-bears-anytime-touchdown-scorer-predictions-mnf-week-1-sept-8-2025/" }
      ]
    },
    wnba: {
      title: "🏀 WNBA Assist Props Spotlight",
      matchup: "Sun @ Dream",
      assists: [
        { player: "Jordin Canada (ATL)", line: "Over 6.5 AST", odds: "−123" },
        { player: "Marina Mabrey (CON)", line: "Over 3 AST", odds: "−135" },
        { player: "Lindsay Allen (CON)", line: "Over/Under 3 AST", odds: "−115 / −111" }
      ],
      sources: [
        { label: "TOI – Best Prop Bets", href: "https://timesofindia.indiatimes.com/sports/nba/top-stories/atlanta-dream-vs-connecticut-sun-prediction-odds-spread-moneyline-best-wnba-prop-bets-september-8-2025/" },
        { label: "DocSports – Mabrey", href: "https://www.docsports.com/free-picks/wnba/2025/marina-mabrey-wnba-player-prop-bets-today-vs-atlanta-dream-9-8-2025.html" }
      ]
    }
  };
  function el(t,c,h){var e=document.createElement(t); if(c)e.className=c; if(h!==undefined)e.innerHTML=h; return e;}
  function buildNFL(){var s=el('section','edge-wrap'); s.id='gameday-edge-nfl';
    var h=el('header','edge-head'); h.appendChild(el('h2',null,data.nfl.title+'<span class="edge-tag">Newsletter</span>')); h.appendChild(el('span','edge-date','Updated: '+data.updatedDisplay)); s.appendChild(h);
    var g=el('div','edge-grid');
    var c1=el('article','edge-card'); c1.appendChild(el('h3',null,data.nfl.matchup+' — Anytime TD Picks'));
    var u1=el('ul','edge-list'); data.nfl.anytime.forEach(function(it){u1.appendChild(el('li',null,'<b>'+it.player+'</b> — '+it.odds+(it.note?' <i>('+it.note+')</i>':'')));}); c1.appendChild(u1);
    c1.appendChild(el('p','edge-note','Market has Jefferson as most likely anytime scorer; Moore offers plus-money value.'));
    c1.appendChild(el('p','edge-src','Sources: '+data.nfl.sources.map(s=>'<a target="_blank" rel="noopener" href="'+s.href+'">'+s.label+'</a>').join(' · ')));
    g.appendChild(c1);
    var c2=el('article','edge-card'); c2.appendChild(el('h3',null,'First TD Longshots'));
    var u2=el('ul','edge-list'); data.nfl.firstTD.forEach(function(it){u2.appendChild(el('li',null,it.player+' — '+it.odds));}); c2.appendChild(u2);
    c2.appendChild(el('p','edge-note','High variance market—position for payout, not safety.')); g.appendChild(c2);
    var c3=el('article','edge-card'); c3.appendChild(el('h3',null,'Strategy Notes'));
    c3.appendChild(el('p','edge-note','<b>Safer play:</b> Jefferson anytime TD. <b>Balanced value:</b> DJ Moore anytime TD. <b>High-risk shot:</b> Jordan Mason or Caleb Williams first TD.')); g.appendChild(c3);
    s.appendChild(g); return s;}
  function buildWNBA(){var s=el('section','edge-wrap'); s.id='gameday-edge-wnba';
    var h=el('header','edge-head'); h.appendChild(el('h2',null,data.wnba.title+'<span class="edge-tag">Spotlight</span>')); h.appendChild(el('span','edge-date','Updated: '+data.updatedDisplay)); s.appendChild(h);
    var c=el('article','edge-card'); c.appendChild(el('h3',null,data.wnba.matchup+' — Assist Props'));
    var u=el('ul','edge-list'); data.wnba.assists.forEach(function(it){u.appendChild(el('li',null,'<b>'+it.player+'</b> — '+it.line+(it.odds?' ('+it.odds+')':'')));}); c.appendChild(u);
    c.appendChild(el('p','edge-src','Sources: '+data.wnba.sources.map(s=>'<a target="_blank" rel="noopener" href="'+s.href+'">'+s.label+'</a>').join(' · '))); s.appendChild(c); return s;}
  function inject(){var t=document.querySelector('#nfl, #sports, main, body')||document.body; t.appendChild(buildNFL()); t.appendChild(buildWNBA());}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',inject); else inject();
})();