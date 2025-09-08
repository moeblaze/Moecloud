NFL Week 1 (2025) — Loader Bundle
===================================

Files:
- mc-sports.css             → stylesheet (add once in <head>)
- nfl-week1-2025.html       → full Week 1 section (logos + cards + Top Performers + Headlines)
- nfl-week1-loader.js       → auto-injects the section into sports.html
- head-snippet.html         → paste into <head> of sports.html (once)
- body-snippet.html         → paste below your NFL header in sports.html
- assets/teams/nfl/*.svg    → neutral round badges (NOT official logos)

Install (no layout changes):
1) Upload EVERYTHING to the same folder as sports.html (preserving the assets/ path).
2) In sports.html <head>, add the content of head-snippet.html (one line):
   <link rel="stylesheet" href="mc-sports.css">
3) Find your NFL area and paste the content of body-snippet.html there:
   <h2 id="nfl">NFL</h2>
   <div id="nfl-week1-mount"></div>
   <script src="nfl-week1-loader.js" defer></script>
4) Hard refresh (Ctrl/Cmd+Shift+R).

Notes:
- Monday game (Vikings at Bears, Sep 8) is excluded per your “weekend” request.
- The SVGs are neutral badges to avoid trademark issues. You can replace them later with licensed assets using the same filenames.
