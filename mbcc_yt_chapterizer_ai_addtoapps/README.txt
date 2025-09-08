Add to Apps — YT Chapterizer + Shorts Planner (AI)
====================================================
What’s inside
- yt-chapterizer.html
- assets/yt.css, assets/yt.js, assets/plaid.svg
- apps-card-snippet.html  (drop this into your apps grid)

Install (no visual change)
1) Upload `yt-chapterizer.html` and the `assets/` folder to your site root (same level as apps.html).
2) Open `apps.html` and paste the contents of `apps-card-snippet.html` inside your Toolbox grid.
3) Hard refresh.

AI endpoint (optional, silent)
If `/api/yt-chapterize` exists on your domain (Vercel/Netlify/Cloudflare), the page will use it automatically.
Otherwise it falls back to the built‑in local engine.
