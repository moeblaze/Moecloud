# Consultation CTAs + Training Course Patch

This patch:
1. **Extends "Book consultation" (AI-screened) onto the homepage & playbooks index** via `assets/js/consultation-extend.js`.
2. Adds a full **Playbook Implementation** training course page at `/training/implementation.html` with curriculum, labs, outcomes, and CSV-based enrollment.
3. Injects a **course card** onto `/training/index.html` via `assets/js/training-inject.js` (no template rewrite).

## Files
- `assets/js/consultation-extend.js` — adds Book consultation CTAs to homepage & playbooks index; best-effort loads `consultation.js`.
- `training/implementation.html` — new course page (on-brand).
- `assets/js/training-inject.js` — adds a course card to `/training/index.html` and wires a consultation button.

## Install
1. Copy all files from this patch into your repo.
2. In `/index.html`, include:
```html
<script src="assets/js/consultation-extend.js"></script>
```
3. In `/playbooks/index.html`, include:
```html
<script src="../assets/js/consultation-extend.js"></script>
```
4. In `/training/index.html`, include:
```html
<script src="../assets/js/training-inject.js"></script>
```
5. Commit → PR → merge to `main` (Azure SWA should deploy green).

## Notes
- The consultation modal needs `assets/js/consultation.js` (from the previous patch). `consultation-extend.js` tries to load it automatically.
- Your auto-sitemap workflow will discover `/training/implementation.html` automatically. If you maintain a manual sitemap too, append the new URL.
- GA events: `consult_submit`, `lead_score`, `enroll_submit` fire if GA is active.

— Generated 2025-09-24
