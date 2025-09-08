MBCC NASCAR Update — quick deploy
1) Upload `sports.html` to your site root (replace existing).
2) Upload `data.json` to your site root (also mirrored at `/data/data.json`).
3) Hard refresh `/sports.html#nascar` (or add `?cb=1`).

Logos: the page shows monogram avatars by default. To swap to real driver/team logos later,
put SVGs at `/assets/logos/nascar/<slug>.svg` and set `USE_REAL_LOGOS = true` in the script.
