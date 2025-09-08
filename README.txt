MBCC Homepage Hero Banner
=========================

What you get
- `hero.html`  → drop-in hero section (headline + microcopy + CTAs)
- `hero.css`   → scoped styles to match your dark + gold brand
- `assets/banner/mbcc-hero-bg.svg` → lightweight background image (vector)

How to install
1) Upload the **assets** folder and both `hero.html` + `hero.css` next to your homepage.
2) In your homepage `<head>`, add:
   <link rel="stylesheet" href="hero.css">
3) Paste the contents of `hero.html` where you want the banner to appear (usually right after your main nav).
4) Hard refresh (Ctrl/Cmd+Shift+R).

Tweaks
- Change the kicker line in `hero.html` to tune the humor level:
  e.g. “serious tools, playfully fast” or “we automate the boring parts (you’re welcome).”
- Want a full-bleed hero (no rounded corners)? Remove `border-radius` from `#mbcc-hero` in `hero.css`.

Timestamp: 2025-09-08T11:03:58.831025Z