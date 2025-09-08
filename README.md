# Gameday Edge – Drop‑in Newsletter Blocks

This pack adds a non-destructive newsletter-style section to your existing **sports.html** without touching any other content.

## What’s inside
- `assets/css/gameday-edge.css` – Lightweight styles
- `assets/js/gameday-edge.js` – Appends **NFL Tonight** and **WNBA Assist Spotlight** blocks to your page
- `gameday-edge.html` – Static HTML fragment if you prefer to paste markup directly
- `index.html` – Standalone demo (open locally to preview)

## Quick install (recommended – JS injector)
1. Upload the **assets** folder to your site (keep the same paths).
2. Add these tags to the bottom of your existing `sports.html` (before `</body>`):
```html
<link rel="stylesheet" href="assets/css/gameday-edge.css">
<script src="assets/js/gameday-edge.js" defer></script>
```
That’s it — it will append two cards under `#nfl`, `#sports`, or `<main>` automatically.

## Manual install (HTML paste)
- Open `gameday-edge.html`, copy all markup, and paste it into `sports.html` where you want it to appear.
- Also include the CSS link in your `<head>`:
```html
<link rel="stylesheet" href="assets/css/gameday-edge.css">
```

## Notes
- **Date:** Sept 8, 2025
- You can update odds/players inside `assets/js/gameday-edge.js` (search for the `data` object near the top).
- Colors adapt to dark/light mode and won’t interfere with your existing theme.