
MBCC NFL Nav + Scores — One-line Install
========================================
Goal: Add 'NFL' to the top nav on every page AND ensure the NFL Weekend Scores render on /sports.html,
with the smallest possible change and no dependency on external CSS/JS.

FILES
- mbcc-nav-nfl.js            → Injects an 'NFL' link next to 'Sports' in your existing nav
- mbcc-sports-nfl-inject.js  → If you're on /sports.html and no #nfl is present, injects the NFL section
- add-these-scripts.html     → Copy/paste these 2 lines right before </body> (site layout or individual pages)
- sports-fallback.html       → Minimal standalone sports page if you need to test in isolation

INSTALL
1) Upload **mbcc-nav-nfl.js** and **mbcc-sports-nfl-inject.js** to your site root (same folder as index.html).
2) Open your layout (or each page) and paste the two lines from **add-these-scripts.html** right before </body>.
3) Hard refresh both:
   - https://thankful-moss-05b56cb10.1.azurestaticapps.net/sports.html#nfl
   - https://www.moecommunitycloud.com/sports.html#nfl

If you still can't see the changes:
- Upload **sports-fallback.html** as **sports.html** temporarily. If THAT appears, your pipeline is updating and the inject script was just not needed.
- If even the fallback doesn't appear, your SWA production deploy is not picking up new files. Reconnect SWA to moecloud/main and ensure GitHub secret AZURE_STATIC_WEB_APPS_API_TOKEN belongs to this instance.

Stamp: 2025-09-08T14:24:12.256204Z
