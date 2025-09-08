# MBCC Edge Blocks – Site-wide Fixpack

Adds newsletter-style **Edge** blocks across your sports page **without altering existing content**.
Included blocks: **NFL Tonight**, **WNBA Assist Spotlight**, **NCAA Edge**, **NHL Edge**, **NASCAR Edge**.

## Files
- `assets/css/edge-blocks.css` – Shared styles
- `assets/js/edge-injector.js` – Appends all blocks under `#sports` (or `<main>`/`<body>` as fallback)
- `assets/js/edge-data.json` – **Editable data** for odds/notes (update this file only)
- `index.html` – Demo preview page

## Install (Recommended)
1) Upload the `assets/` folder to your site.
2) In your existing `sports.html`, add right before `</body>`:
```html
<link rel="stylesheet" href="assets/css/edge-blocks.css">
<script src="assets/js/edge-injector.js" defer></script>
```
That’s it—blocks will appear below `#sports` automatically.

## Editing Picks/Notes
- Update values in `assets/js/edge-data.json` to refresh odds, players, or notes.
- `enabled: true/false` toggles a section on/off.

**Date:** Sept 8, 2025
