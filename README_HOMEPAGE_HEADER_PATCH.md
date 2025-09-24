# Homepage Header Patch

Adds the **Playbooks** link to your homepage header and ensures the page loads
`assets/js/config.js` and `assets/js/impl.js` (for GA/events, newsletter gating,
Home/Back links, and nav consistency).

## Files
- `/index.html` — brand-safe homepage with:
  - Header nav: Home · Training · Monetization · Playbooks
  - Breadcrumbs (for Back link injection)
  - Hero + Packages teaser (content matches your current brand style)
  - Scripts: `assets/js/config.js` and `assets/js/impl.js`

## Install
1. Copy `/index.html` from this zip to **repo root**, replacing the existing file (keep a backup if needed).
2. Commit on a branch → PR → merge to `main`.
3. Verify:
   - `https://www.moecommunitycloud.com/` shows the Playbooks link in the header.
   - Back/Home links work across pages.

— Generated 2025-09-24
