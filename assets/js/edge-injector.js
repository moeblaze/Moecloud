/*! MBCC Edge Blocks – site-wide injector */
(function(){

  var fallback = {"updatedDisplay": "Sept 8, 2025", "nfl": {"enabled": true, "title": "\ud83c\udfc8 Gameday Edge \u2014 NFL Tonight", "matchup": "Vikings @ Bears", "anytime": [{"player": "Justin Jefferson (MIN)", "odds": "+135", "note": "Safer play"}, {"player": "D\u2019Andre Swift (MIN)", "odds": "+155", "note": "Balanced value"}, {"player": "DJ Moore (CHI)", "odds": "+180", "note": ""}], "firstTD": [{"player": "Jordan Mason (MIN)", "odds": "+950"}, {"player": "DJ Moore (CHI)", "odds": "+1000"}, {"player": "Caleb Williams (CHI)", "odds": "Long Shot"}], "sources": [{"label": "SportsbookReview \u2013 Anytime/First TD", "href": "https://www.sportsbookreview.com/picks/nfl/vikings-vs-bears-anytime-touchdown-scorer-predictions-mnf-week-1-sept-8-2025/"}]}, "wnba": {"enabled": true, "title": "\ud83c\udfc0 WNBA Assist Props Spotlight", "matchup": "Sun @ Dream", "assists": [{"player": "Jordin Canada (ATL)", "line": "Over 6.5 AST", "odds": "\u2212123"}, {"player": "Marina Mabrey (CON)", "line": "Over 3 AST", "odds": "\u2212135"}, {"player": "Lindsay Allen (CON)", "line": "Over/Under 3 AST", "odds": "\u2212115 / \u2212111"}], "sources": [{"label": "TOI \u2013 Best Prop Bets", "href": "https://timesofindia.indiatimes.com/sports/nba/top-stories/atlanta-dream-vs-connecticut-sun-prediction-odds-spread-moneyline-best-wnba-prop-bets-september-8-2025/"}, {"label": "DocSports \u2013 Mabrey/Allen", "href": "https://www.docsports.com/free-picks/wnba/2025/marina-mabrey-wnba-player-prop-bets-today-vs-atlanta-dream-9-8-2025.html"}]}, "ncaa": {"enabled": true, "title": "\ud83c\udfc8 NCAA Edge \u2014 Quick Hits", "bullets": ["Top 25 watchlist: monitor line moves 90m pre-kickoff.", "QB injury checks can swing totals by 3\u20135 pts.", "Lean overs on high-tempo matchups (pace > 75 plays)."], "cta": {"label": "Check live CFB lines", "href": "https://www.espn.com/college-football/scoreboard"}}, "nhl": {"enabled": true, "title": "\ud83c\udfd2 NHL Edge \u2014 Form Watch", "bullets": ["Target PP1 usage for shots/points props.", "Back-to-backs: fade road teams (legs matter).", "Goalie confirmations change totals\u2014re-check near puck drop."], "cta": {"label": "See today\u2019s slate", "href": "https://www.dailyfaceoff.com/gameday/"}}, "nascar": {"enabled": true, "title": "\ud83c\udfc1 NASCAR Edge \u2014 Top 3 Targets", "list": [{"driver": "Driver A", "note": "Short-run speed pop (P10\u2192P3 in practice)"}, {"driver": "Driver B", "note": "Pit crew advantage; clean air upside"}, {"driver": "Driver C", "note": "Long-run tire management at this track"}], "disclaimer": "Update with this week\u2019s track/practice when available.", "cta": {"label": "Live leaderboard", "href": "https://www.nascar.com/racecenter/"}}};

  function el(tag, cls, html){var e=document.createElement(tag); if(cls) e.className=cls; if(html!==undefined) e.innerHTML=html; return e;}
  function a(href, text){var x=el('a'); x.href=href; x.target='_blank'; x.rel='noopener'; x.textContent=text; return x;}

  function cardWrap(id, title, tag, updated){ 
    var sec=el('section','edge-wrap'); sec.id=id;
    var head=el('header','edge-head');
    head.appendChild(el('h2',null,title + (tag? ' <span class="edge-tag">'+tag+'</span>':'')));
    head.appendChild(el('span','edge-date','Updated: '+updated));
    sec.appendChild(head);
    return sec;
  }

  function buildNFL(d, updated){
    var sec=cardWrap('edge-nfl', d.title, 'Newsletter', updated);
    var grid=el('div','edge-grid');
    // Anytime TD
    var c1=el('article','edge-card');
    c1.appendChild(el('h3',null,d.matchup+' — Anytime TD Picks'));
    var ul1=el('ul','edge-list');
    d.anytime.forEach(function(it){ ul1.appendChild(el('li',null,'<b>'+it.player+'</b> — '+it.odds+(it.note?' <i>('+(it.note)+')</i>':''))); });
    c1.appendChild(ul1);
    c1.appendChild(el('p','edge-note','Market leans Jefferson; Moore brings plus-money upside.'));
    c1.appendChild(el('p','edge-src','Sources: '+ d.sources.map(s=>'<a target="_blank" rel="noopener" href="'+s.href+'">'+s.label+'</a>').join(' · ')));
    grid.appendChild(c1);
    // First TD
    var c2=el('article','edge-card');
    c2.appendChild(el('h3',null,'First TD Longshots'));
    var ul2=el('ul','edge-list');
    d.firstTD.forEach(function(it){ ul2.appendChild(el('li',null,it.player+' — '+it.odds)); });
    c2.appendChild(ul2);
    c2.appendChild(el('p','edge-note','High variance market—position for payout, not safety.'));
    grid.appendChild(c2);
    // Strategy
    var c3=el('article','edge-card');
    c3.appendChild(el('h3',null,'Strategy Notes'));
    c3.appendChild(el('p','edge-note','<b>Safer:</b> Jefferson anytime TD. <b>Balanced:</b> DJ Moore anytime TD. <b>High-risk:</b> Mason/Williams first TD.'));
    grid.appendChild(c3);
    sec.appendChild(grid);
    return sec;
  }

  function buildWNBA(d, updated){
    var sec=cardWrap('edge-wnba', d.title, 'Spotlight', updated);
    var c=el('article','edge-card');
    c.appendChild(el('h3',null,d.matchup+' — Assist Props'));
    var ul=el('ul','edge-list');
    d.assists.forEach(function(it){ ul.appendChild(el('li',null,'<b>'+it.player+'</b> — '+it.line+(it.odds?' ('+it.odds+')':''))); });
    c.appendChild(ul);
    c.appendChild(el('p','edge-src','Sources: '+ d.sources.map(s=>'<a target="_blank" rel="noopener" href="'+s.href+'">'+s.label+'</a>').join(' · ')));
    sec.appendChild(c);
    return sec;
  }

  function buildNCAA(d, updated){
    var sec=cardWrap('edge-ncaa', d.title, 'Update', updated);
    var c=el('article','edge-card');
    var ul=el('ul','edge-bullets');
    d.bullets.forEach(function(b){ ul.appendChild(el('li',null,b)); });
    c.appendChild(ul);
    if(d.cta){ var p=el('p','edge-src'); p.appendChild(a(d.cta.href, d.cta.label)); c.appendChild(p); }
    sec.appendChild(c);
    return sec;
  }

  function buildNHL(d, updated){
    var sec=cardWrap('edge-nhl', d.title, 'Notes', updated);
    var c=el('article','edge-card');
    var ul=el('ul','edge-bullets');
    d.bullets.forEach(function(b){ ul.appendChild(el('li',null,b)); });
    c.appendChild(ul);
    if(d.cta){ var p=el('p','edge-src'); p.appendChild(a(d.cta.href, d.cta.label)); c.appendChild(p); }
    sec.appendChild(c);
    return sec;
  }

  function buildNASCAR(d, updated){
    var sec=cardWrap('edge-nascar', d.title, 'Watchlist', updated);
    var c=el('article','edge-card');
    var ul=el('ul','edge-list');
    d.list.forEach(function(it){ ul.appendChild(el('li',null,'<b>'+it.driver+'</b> — '+it.note)); });
    c.appendChild(ul);
    if(d.disclaimer) c.appendChild(el('p','edge-note',d.disclaimer));
    if(d.cta){ var p=el('p','edge-src'); p.appendChild(a(d.cta.href, d.cta.label)); c.appendChild(p); }
    sec.appendChild(c);
    return sec;
  }

  function inject(withData){
    var target = document.querySelector('#sports, main, body');
    if(!target) target=document.body;
    if(withData.nfl && withData.nfl.enabled) target.appendChild(buildNFL(withData.nfl, withData.updatedDisplay));
    if(withData.wnba && withData.wnba.enabled) target.appendChild(buildWNBA(withData.wnba, withData.updatedDisplay));
    if(withData.ncaa && withData.ncaa.enabled) target.appendChild(buildNCAA(withData.ncaa, withData.updatedDisplay));
    if(withData.nhl && withData.nhl.enabled) target.appendChild(buildNHL(withData.nhl, withData.updatedDisplay));
    if(withData.nascar && withData.nascar.enabled) target.appendChild(buildNASCAR(withData.nascar, withData.updatedDisplay));
  }

  // Try fetching JSON data (optional). Falls back to embedded data.
  function boot(){
    fetch('assets/js/edge-data.json', {cache:'no-store'})
      .then(r=> r.ok ? r.json() : Promise.reject())
      .then(d=> inject(d))
      .catch(()=> inject(fallback));
  }

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();

})();