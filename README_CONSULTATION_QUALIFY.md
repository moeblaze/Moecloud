# Consultation + Lead Qualification Patch

This update makes packages instantly **sellable**:
- Shows prices on each tier card.
- Adds a **Book consultation** CTA for every package.
- Opens a modal that asks a few questions and **qualifies leads** with AI
  (calls `/api/ai/lead-qualify` if available via the AI Assist Pack; otherwise uses a fallback score).
- Gating: the modal recommends moving forward with scheduling only if the score is above a tier threshold.
- Exports a CSV row for every inquiry.

## Files
- `playbooks/packages.html` — updated with prices & CTA buttons and includes the modal script
- `assets/js/consultation.js` — modal + form + CSV export + AI call/fallback

## Install
1. Replace your `playbooks/packages.html` with the one in this patch.
2. Add `assets/js/consultation.js` to your repo and ensure it is loaded on the packages page.
3. If you deployed the **AI Assist Pack**:
   - Ensure `assets/js/ai.js` is available (this page includes it at the bottom).
   - Your Functions app should expose `POST /api/ai/lead-qualify`.
4. Commit → PR → merge to `main`. Azure SWA should deploy green.

## Notes
- Thresholds (default): Enterprise ≥ 75, White‑Label ≥ 65, Integration ≥ 55, No‑Code ≥ 40.
- You can tune thresholds inside `assets/js/consultation.js`.
- GA events: `consult_submit`, `lead_score`, `consult_export` fire if GA is enabled.

— Updated 2025-09-24
