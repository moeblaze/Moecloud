MCC Patch: Add "Weekend T&F Preview" to Top Nav
===============================================

Files included:
- /weekend-track-preview.html
- /assets/js/nav-inject-weekend-tf.js

How to apply (no structure changes):
1) Upload BOTH files to your site, preserving paths:
   - Put weekend-track-preview.html at your web root (same level as index.html)
   - Put nav-inject-weekend-tf.js at /assets/js/

2) Include the script once in your global header or layout (e.g., in header include or before </body>):
   <script src="/assets/js/nav-inject-weekend-tf.js" defer></script>

   This script finds your existing top nav and appends:
   <li><a href="/weekend-track-preview.html">Weekend T&F Preview</a></li>

   It tries to place it right after your Newsletter link if you have one.
   It also avoids duplicates via data-mcc-nav="weekend-tf".

3) (Optional) If you maintain a shared header include and prefer a permanent code change,
   add this HTML directly to your nav <ul>:
     <li><a href="/weekend-track-preview.html">Weekend T&F Preview</a></li>

Rollback:
- Remove the script tag and the link disappears (page remains accessible directly).

