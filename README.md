# MCC Weekend in Sports – Add-On Module

**Purpose:** Add this sports section to your existing newsletter **without replacing** the rest.

## Files
- `sports-module-snippet.html` — copy/paste this block into your current newsletter HTML where you want the Sports section.
- `newsletter-sports-addon.html` — a standalone demo page showing how the module looks in context.
- `assets/plaid.css` — lightweight plaid + brand styles (no images).

## How to Integrate
1. Upload `assets/plaid.css` to your site (e.g., `/newsletter/assets/plaid.css`).
2. Paste the contents of `sports-module-snippet.html` into your existing newsletter file **below** your News/Tech sections.
3. Update the CTA link (`Read Full Sports Recap →`) to your preferred target.
4. Optional: If your pipeline inlines CSS, you can copy the rules from `assets/plaid.css` into your main stylesheet and remove the `<link>` line in the snippet.

## Notes
- Colors match MCC brand (red/black plaid with gold accent).
- Dark-mode friendly via `prefers-color-scheme` query.
- Mobile responsive: layout stacks on small screens.

Generated: 2025-09-09