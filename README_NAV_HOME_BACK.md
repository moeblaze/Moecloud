# Home + Back Navigation Patch

Ensures every page has:
- A **Home** link in the header nav (inserted if missing).
- A **‹ Back** link (prepended to breadcrumbs or added just below the header).

## What’s included
- `assets/js/impl.js` — enhanced to:
  - add **Home** to header nav if missing,
  - keep **Playbooks** link enforcement,
  - and inject a **‹ Back** link with history fallback to Home.

## Install
1. Copy `assets/js/impl.js` from this zip into your repo (replace the existing file).
2. Make sure your pages include (usually before `</head>`):
   ```html
   <script src="assets/js/config.js"></script>
   <script src="assets/js/impl.js"></script>
   ```
   For deeper pages (e.g., `/training/*`), use `../assets/js/...` paths as you already do.
3. Commit → PR → merge to `main`. Azure SWA should deploy green.

## How it behaves
- **Home**: inserted at the *start* of `<header .nav>` if not found.
- **Playbooks**: appended to nav if not present (idempotent).
- **Back**: Click **‹ Back** to go to the referring page; if there is no referrer, it sends users to Home.

— Generated 2025-09-24
