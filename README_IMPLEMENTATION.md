# Implementation-Ready Bundle

This bundle finishes the site for implementation sales and analytics—without changing your brand or layout.

## What's included
- `assets/js/config.js`: Set your GA4 ID and toggles (newsletter gating).
- `assets/js/impl.js`: Loads GA (optional), gates `/docs/*` downloads behind newsletter, and tracks ROI events.
- Updated `/training/*.html`: now load `../assets/js/config.js` and `../assets/js/impl.js` (no visual changes).
- ROI page with CTAs + CSV export + event hooks.

## Apply (same as your current flow)
1. Upload the **contents of this zip** into your repo root (merge/replace existing files).
2. Commit on a branch → PR → merge to `main`.
3. Confirm Azure Static Web Apps deploy is green.

## Configure
1. Open `assets/js/config.js` and set:
   ```js
   window.MCC_CONFIG = {
     gaId: "G-XXXXXXX",    // <-- replace with your GA4 Measurement ID
     enableGA: true,
     newsletterGate: true,
     docsPrefix: "/docs/"
   };
   ```
2. (Optional) If you don’t want gating yet, set `newsletterGate: false`.

## Validate
- ROI: `/training/roi.html` → Calculate + Export CSV. Check GA4 Realtime > Events (`roi_calculated`, `roi_export`).
- Downloads: Try a `/docs/*.pdf` while not subscribed. You should be redirected to `/newsletter.html`.
- Training pages and Partners should render exactly as before (no style changes).

— Generated 2025-09-24
