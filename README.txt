MBCC Weekend Hydrator + Home Sponsor Fix
------------------------------------------
This bundle does two things:
1) SPORTS: Adds an external hydrator + JSON data so the Sports page auto-updates without inline JS.
   - sports.html (static snapshot so it works even if JS is blocked)
   - assets/js/sports.js (CSP-safe hydrator)
   - data/sports-weekend-2025-09-08.json (data feed the hydrator reads)

2) HOME: Makes the Prime Sponsor image fill the glowing box (no red on the right), inside the animated gold frame.

Deploy steps
1) Upload/replace these files:
   /sports.html
   /assets/js/sports.js
   /data/sports-weekend-2025-09-08.json
   /index.html
2) Cache-bust once:
   https://www.moecommunitycloud.com/sports.html?cb=wknd-hydrator
   https://www.moecommunitycloud.com/index.html?cb=sponsor-fill

Adjustments (optional)
- If you still see a red sliver on the sponsor image, tweak the clip amount in index.html:
    .prime-logo.lg img { clip-path: inset(0 12% 0 0); }
  Increase 12% → 15% to crop more from the right.

All done!
