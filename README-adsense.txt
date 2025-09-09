MBCC — AdSense Readiness Pack
------------------------------
Included
- /privacy.html — required policy (Google Ads Settings + opt-outs)
- /index.html — centered sponsor image + footer links (Privacy, Contact)
- /sports.html — prerendered snapshot + hydrator hook
- /assets/js/sports.js — reads /data/sports-latest.json
- /data/sports-latest.json — seed so Sports renders immediately
- /csp-adsense-snippet.txt — optional CSP additions

Deploy
1) Replace/upload files at same paths.
2) Cache-bust:
   https://www.moecommunitycloud.com/index.html?cb=adsense
   https://www.moecommunitycloud.com/sports.html?cb=adsense
   https://www.moecommunitycloud.com/privacy.html?cb=1
