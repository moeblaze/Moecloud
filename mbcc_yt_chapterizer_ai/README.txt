YouTube Chapterizer + Shorts Planner — AI Enhanced
==================================================
Same look. Automatic AI if `/api/yt-chapterize` exists; local heuristics otherwise.

Deploy one of these and set OPENAI_API_KEY:
- Vercel: serverless/vercel/api/yt-chapterize.js  → /api/yt-chapterize
- Netlify: serverless/netlify/yt-chapterize.js   → /.netlify/functions/yt-chapterize (add redirect to /api/yt-chapterize)
- Cloudflare: serverless/cloudflare/worker.js    → route to /api/yt-chapterize

Client files:
- yt-chapterizer.html
- assets/yt.css, assets/yt.js, assets/plaid.svg

No UI changes required. The page tries AI first (15s), then falls back locally.
