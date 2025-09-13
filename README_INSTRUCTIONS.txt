# MBCC Weekend Sports — Standalone HTML Integration Patch (2025-09-12)

This patch:
- Adds **/sports-weekend/** animated standalone pages (NFL, NCAAF, WNBA, MLB, Track & Field).
- Provides **/assets/js/mbcc-weekend-sports-boot.js** which:
  - Ensures recommended `<head>` tags (Google Fonts Inter + preconnects).
  - Appends a **Weekend Sports** link into your top nav (`#topnav ul`, `header nav ul`, or `nav ul`) without duplicates.

## Install (GitHub/Azure)
1) Copy the **sports-weekend** folder to your site root (same level as `index.html`).
2) Copy **assets/js/mbcc-weekend-sports-boot.js** to `/assets/js/` (create folders if needed).
3) Add this single line to your existing **homepage** (and/or shared header template), just before `</body>`:
```html
<script src="/assets/js/mbcc-weekend-sports-boot.js"></script>
```
This will automatically handle both **head tags** and the **nav link**. You do not need to edit your `<head>` manually.

## Optional
- `/site_samples/index_sample_with_weekend.html` — a minimal page demonstrating the script in action.

