MBCC Sports — Weekend Snapshot (Sept 8, 2025)
-------------------------------------------------
This update replaces ONLY /sports.html with a static, CSP-safe snapshot of the weekend across NFL/NBA/MLB/WNBA/NCAAF/NHL/NASCAR.

Why static? Your previous sports page relied on inline JS hydration and/or a missing JSON file, which was blocked by CSP or 404ing. This file bakes the content in HTML so it shows immediately.

How to deploy
1) Replace /sports.html on moecommunitycloud.com with the one in this ZIP.
2) Hard refresh: https://www.moecommunitycloud.com/sports.html?cb=wknd0908

Notes
- All links inside each card point to league pages with full details.
- Timestamps: page footer shows current year; header/nav matches your site.
- You can reintroduce auto-updating later with an external /assets/js/sports.js and /data/*.json to keep CSP happy.
Generated: September 09, 2025
