MBCC Home — Darwynn Sponsor Box Update
======================================

What changed
- New CSS to make Darwynn's image fill the sponsor box while keeping the blinking glow.
- Two approaches included:
  1) Method A (recommended): uses the box as a background image (#darwynn-box)
  2) Method B (quick): targets the <img> directly via CSS

Files in this package
- darwynn-sponsor.css          → Method A CSS
- header-include.html          → 1-line <link> tag for your <head>
- sponsor-box.html             → minimal wrapper markup for Method A
- darwynn-sponsor-quick.css    → Method B CSS (no HTML changes)

How to deploy (Method A — recommended)
1) Upload "darwynn-sponsor.css" to the same folder as your homepage (index.html).
2) In your homepage <head>, add the line from "header-include.html":
   <link rel="stylesheet" href="darwynn-sponsor.css">
3) Replace your current Prime Sponsor image block with the snippet in "sponsor-box.html".
4) Hard refresh (Ctrl/Cmd+Shift+R).

Alternative (Method B — quick)
1) Upload "darwynn-sponsor-quick.css".
2) In the <head>, include it (or paste its contents into your main CSS):
   <link rel="stylesheet" href="darwynn-sponsor-quick.css">
3) No HTML changes needed.

Notes
- The background zoom is set to 190%. If you want tighter/looser crop, adjust in darwynn-sponsor.css:
    background: #c49a16 url("/assets/sponsors/darwynn-plaid-glow-1600x340.png") left center / 180% auto no-repeat;
- Keep the "blink" class on the wrapper (Method A) or on the <img> (Method B) to maintain the glow animation.
- All styles are scoped and won’t affect other parts of your site.

Timestamp: 2025-09-08T10:59:57.741544Z