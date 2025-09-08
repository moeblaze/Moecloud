YouTube Chapterizer + Shorts Planner (Front-end Only)
=======================================================
Ships chapters, hooks, thumbnail text, hashtags, tags, and short candidates from a transcript.

How to add
----------
1) Upload `yt-chapterizer.html` and the entire `assets/` folder to your site root (same level as apps.html).
2) Paste `apps-card-snippet.html` into your existing apps grid on apps.html.
3) Hard refresh your site.

How it works (no backend)
-------------------------
- Paste a transcript (or upload .srt/.vtt). Heuristics segment chapters ~60–150s, with signpost detection ("tip", "next", etc.).
- Outputs: chapters (YouTube-ready), 3 hooks, 3 thumbnail texts, hashtags, tags, pinned comment template, and 3–6 short candidates.
- Export: copy description, download CSV.

Optional AI (later)
-------------------
- Add a serverless endpoint that accepts {title, transcript} and returns {chapters[], hooks[], ...}.
- Wire it to `assets/yt.js` where noted, falling back to heuristics if not configured.
