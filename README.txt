MBCC site update (Sept 8, 2025)

Files included:
- index.html  (SEO tags, sponsor glow, email subscribe + toast)
- sports.html (NFL/NBA/MLB/WNBA all driven by data.json; sponsor mini; subnav links)
- data.json   (sports data — place at site root)
- data/data.json and data/sports-data.json (optional mirrors; sports.html auto-falls back)
- assets/sponsors/darwynn-plaid-glow-1600x340.png (image path; if missing, use your site copy)

Deploy steps:
1) Replace your site's index.html and sports.html with the ones in this zip.
2) Put data.json at the site root (or use the /data/ versions; the page will find either).
3) Ensure the image path exists: /assets/sponsors/darwynn-plaid-glow-1600x340.png
4) (Optional) Configure Google Forms in index.html:
   Replace FORM_ID and entry.1234567890 with your actual values.
5) Hard refresh: /, /sports.html#nfl, #nba, #mlb, #wnba
