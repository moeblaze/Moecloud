# Playbooks Starter Bundle (Hub + Spokes)

Adds a brand-consistent **/playbooks** hub with 4 spokes and 3 industry ROI mini-calculators.

## Structure
- `/playbooks/index.html` — Hub with cards to each spoke
- `/playbooks/zero-trust.html` — Checklist + CSV export
- `/playbooks/finops.html` — FinOps estimate + CSV export
- `/playbooks/compliance.html` — Readiness self-check + CSV export
- `/playbooks/observability.html` — Starter stack + CSV export
- `/playbooks/industry-roi.html` — ROI vertical index
  - `/playbooks/roi_healthcare.html`, `roi_retail.html`, `roi_fintech.html`

## Branding
Pages use your existing CSS/JS: `../assets/css/styles.css`, `../assets/js/main.js`, plus `config.js` & `impl.js` if present.

## Install
1. Copy the **playbooks** folder into your repo root.
2. Commit on a branch → PR → merge to `main`.
3. Azure SWA deploy should turn green.

## Optional wiring
- Add a nav link to `/playbooks/index.html` in your site header.
- Add the new pages to `sitemap.xml` for SEO.
