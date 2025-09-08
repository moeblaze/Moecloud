
Quick test: add NFL nav + drop in Weekend Scores
================================================

Files in this bundle:
- nav-add-nfl.html           → one <a> tag to paste into your top nav
- sports-nfl-weekend.html    → full NFL section with inline CSS (no JS)
- sports-min.html            → optional minimal /sports.html to test in isolation

Fastest path (recommended):
1) Open your site's top nav (where Home / Apps / Sports are). Paste the single line from nav-add-nfl.html:
     <a href="/sports.html#nfl">NFL</a>

2) Open your existing sports.html and paste the entire contents of sports-nfl-weekend.html
   right after your NFL header (or anywhere in the main content).
   Make sure the outer <section> keeps id="nfl".

3) Hard refresh:
   - https://thankful-moss-05b56cb10.1.azurestaticapps.net/sports.html#nfl
   - https://www.moecommunitycloud.com/sports.html#nfl

If deploy path still blocks updates:
- Temporarily upload sports-min.html as sports.html (back up the old one first). This page includes the NFL section and a small inline base style.
- After confirming it shows up on both the SWA default domain and your custom domain, restore your full page and keep only the pasted NFL section.

Cache tip:
- If your CDN caches aggressively, append a query when testing: /sports.html?cb=2025-09-08T11:30:54.221518Z

— MBCC Ops Helper
