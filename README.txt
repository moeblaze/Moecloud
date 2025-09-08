
MBCC NHL Update — quick deploy
--------------------------------
1) Upload `sports.html` to your site root (replace the existing one).
2) Upload `data.json` to your site root (also mirrored under `/data/data.json` if you prefer).
3) Hard refresh: /sports.html#nhl (or append ?cb=1 to bust cache).

Logos:
- The page shows clean monogram avatars by default.
- To switch to official logos later, place SVGs at /assets/logos/nhl/<team-slug>.svg
  and set `USE_REAL_LOGOS = true` inside the script.
