# MBCC Rollback Kit — Restore Pre-Sitewide Version (Sept 8, 2025)

This kit returns your site to the last working setup where ONLY the **Gameday Edge (NFL + WNBA)** blocks were added.

---

## A) Quick Rollback (Manual Upload)
1. **Delete** these sitewide files from your server (if present):
   - `assets/css/edge-blocks.css`
   - `assets/js/edge-injector.js`
   - `assets/js/edge-data.json`

2. Open `sports.html` and **remove** the two sitewide include lines (near the bottom, before `</body>`):
```html
<link rel="stylesheet" href="assets/css/edge-blocks.css">
<script src="assets/js/edge-injector.js" defer></script>
```

3. **Upload** the files in `/gameday-edge/` from this kit:
   - `assets/css/gameday-edge.css`
   - `assets/js/gameday-edge.js`  (injects ONLY NFL + WNBA)
   - (Optional) `gameday-edge.html` if you prefer copy/paste instead of JS

4. Add these two lines to the bottom of `sports.html` (before `</body>`):
```html
<link rel="stylesheet" href="assets/css/gameday-edge.css">
<script src="assets/js/gameday-edge.js" defer></script>
```

---

## B) Rollback via GitHub (if your site deploys from a repo)
1. Go to **GitHub → your repo → Code → Commits**.
2. Find the commit that added **edge-blocks.css / edge-injector.js**.
3. Click **Revert** to auto-create a rollback commit.
4. Push/merge; Azure Static Web Apps will redeploy the previous working version.

---

## C) Rollback via Azure Static Web Apps (SWA) History
1. In Azure Portal → **Static Web Apps → your app → Environments → Production**.
2. Open **History**. Locate the deployment **just before** the sitewide change.
3. Click **Redeploy** on that prior deployment to instantly restore that build.

---

## D) Verify Locally (no risk)
Open `verify.html` in a browser. It loads ONLY the Gameday Edge (NFL + WNBA) assets in isolation.

---

## Notes
- This kit does **not** overwrite any of your other pages.
- If you want me to produce a FULL project zip containing all of your pages, I’ll need your latest source (or read access to your repo). Once provided, I’ll bundle and return it as a single archive.

— Generated: 2025-09-08