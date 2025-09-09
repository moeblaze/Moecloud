MBCC — QSM Wired Pack (2025-09-09)

This patch:
- Adds "QSM" to the top nav on index/apps/QSM pages
- Adds a QSM card to the Apps page
- Includes qsm.html + qsm.js (assessment & drills)

To deploy:
1) Upload/replace:
   - /qsm.html
   - /assets/js/qsm.js
   - /apps.html  (adds the QSM card + nav link)
   - /index.html (ensures nav includes QSM — merge into your current homepage if needed)
2) Cache-bust:
   https://www.moecommunitycloud.com/apps.html?cb=qsmwire
   https://www.moecommunitycloud.com/qsm.html?cb=qsmwire
   https://www.moecommunitycloud.com/index.html?cb=qsmwire
Note: If you already have a custom index.html, just add <a href="qsm.html">QSM</a> to the nav and keep your content.
