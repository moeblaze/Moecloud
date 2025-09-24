# Header Nav Patch (Playbooks link) + Services Nav Update

This patch guarantees a **Playbooks** link in the header without changing your look/feel.

## What’s included
- `assets/js/impl.js` — updated to **inject a Playbooks link** at runtime if missing.
- `services/monetization.html` — header nav includes **Playbooks** and loads `config.js` + `impl.js`.

## How to apply
1. Copy the files in this zip into your repo (merge/replace).
2. Commit on a branch → PR → merge to `main`.
3. Verify:
   - Open any page (home, training, services) — header should show **Playbooks**.
   - `/services/monetization.html` renders with the link and same branding.

## Notes
- The nav injection only runs if a Playbooks link **is not already present** (idempotent).
- Your **auto-sitemap** workflow already includes `/services/*.html` automatically whenever those files exist, so you don’t need to edit `sitemap.xml` yourself.
- If your homepage doesn’t load `assets/js/impl.js` yet, add:
  ```html
  <script src="assets/js/config.js"></script>
  <script src="assets/js/impl.js"></script>
  ```
  just before `</head>` on `/index.html`.
