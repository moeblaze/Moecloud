# Qualification Tooltips + Threshold Override

This patch adds **qualification tooltips** next to every “Book consultation” button and raises the **AI score thresholds** for high-end tiers to reduce unqualified inquiries.

## Files
- `assets/js/consultation-config.js` — sets thresholds and tier blurbs (no edit to `consultation.js` required).
- `assets/js/qualification-tooltips.js` — shows small tooltips/badges next to CTAs across pages.

## Defaults in this patch
- Thresholds:
  - No‑Code: 40
  - Integration (AI Assist): 60
  - White‑Label: 70
  - Enterprise: 80
- Enterprise blurb: “$250k+/mo cloud, 50+ engineers, regulated/scale workloads, exec sponsorship.”
- Enterprise button label becomes **“Check qualification — Enterprise ($1M+)”**

## How to install
1. Copy both JS files into your repo.
2. Ensure they load on pages that render the consultation CTAs:
   - `/playbooks/packages.html` (add before the closing `</body>`):
     ```html
     <script src="../assets/js/consultation-config.js"></script>
     <script src="../assets/js/qualification-tooltips.js"></script>
     ```
   - `/index.html` and `/playbooks/index.html`:
     ```html
     <!-- adjust relative paths if needed -->
     <script src="assets/js/consultation-config.js"></script>
     <script src="assets/js/qualification-tooltips.js"></script>
     ```
3. Commit → PR → merge to `main`.

## Notes
- The thresholds here **override** defaults in `consultation.js` at runtime.
- You can customize blurbs per tier in `consultation-config.js`.
- Works alongside `consultation-extend.js` (homepage/index CTAs) and the original consultation modal.
- No external dependencies; uses your existing CSS classes for buttons/cards.

— Generated 2025-09-24
