Vercel API: /api/yt-chapterize
==============================

Files:
- api/yt-chapterize.js

Steps:
1) Drop this `api/` folder into the root of your Vercel project (same level as apps.html).
2) In Vercel Project → Settings → Environment Variables, add:
   - OPENAI_API_KEY = <your key>
   (Set for Production, and Preview/Development if you test previews.)
3) Redeploy the project.

Test:
curl -X POST https://YOURDOMAIN/api/yt-chapterize   -H "Content-Type: application/json"   -d '{"title":"Test","transcript":"00:00 Intro... 00:30 Tip 1... 01:10 Tip 2...","duration":5}'

If you see JSON with chapters/hooks/etc., the endpoint is live.
