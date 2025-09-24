# Playbooks — Packages Spoke

Adds `/playbooks/packages.html`, a brand-consistent packages page with:
- Feature matrix (Foundation / Pro / Enterprise)
- ROI + Quote Summary widget (CSV export)
- CTAs to Full ROI, Training, and Partner Models

## Install
1. Copy `playbooks/packages.html` into your repo.
2. (Optional) Add a card link on `/playbooks/index.html` pointing to `packages.html`.
3. Commit → PR → merge to `main` → confirm Azure SWA deploy is green.

## Notes
- Uses your site CSS/JS (`../assets/...`) to keep branding.
- Replace placeholder package costs in the inline script if you want exact pricing.
- Events: `package_estimated`, `package_export` (GA4) fire if GA is enabled in `assets/js/config.js`.
