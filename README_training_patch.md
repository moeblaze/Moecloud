# Training Patch (Brand‑Safe)

Adds:
- **Packages** to `/training/index.html`
- **Inline lessons** for each course page (no 404s)
- **`/training/partners.html`** with payouts & collateral
- **JSON‑LD** (breadcrumbs + catalog) on `/training/index.html`

## Install
1. Copy the `training` folder from this zip into your repo root (replace existing `/training` files).
2. Commit on a branch → PR → merge to `main`.
3. Azure Static Web Apps will redeploy automatically.

## Notes
- Uses your existing CSS/JS at `../assets/` for consistent branding.
- PDFs expected at `/docs/`:
  - `MCC_Executive_OnePager.pdf`
  - `MCC_SOW_Template.pdf`
  - `MCC_Partner_OnePager.pdf`
- ROI CSV export remains in your current `/training/roi.html` (not changed here).
