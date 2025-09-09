MBCC — QSM ONLY Pack (no homepage edits) — September 09, 2025

This pack **adds QSM** without changing index.html or any other page.

Files:
- /qsm.html
- /assets/js/qsm.js

Deploy:
1) Upload both files at those paths.
2) (Optional) Link to QSM from anywhere you choose (Apps page, a button, etc.).
3) Cache-bust once: https://www.moecommunitycloud.com/qsm.html?cb=qsmonly

If you previously added a nav injection for QSM, remove any reference to:
  <script defer src="assets/js/nav-qsm-patch.js"></script>
from your pages to avoid layout quirks.
