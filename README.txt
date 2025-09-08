Secured Vercel API: /api/yt-chapterize
======================================

Files:
- api/yt-chapterize.js  (adds optional Bearer auth + CORS)

Set env vars in Vercel → Project → Settings → Environment Variables:

Required
- OPENAI_API_KEY = <your key>

Optional
- OPENAI_MODEL = gpt-4o-mini
- AUTH_BEARER = <any strong token>     # if set, API requires 'Authorization: Bearer <token>'
- CORS_ALLOW_ORIGIN = https://moecloud-hbeworyun-morris-stephens-projects.vercel.app

Deploy steps
1) Drop this `api/` folder into your Vercel project root.
2) Set env vars (above). Redeploy.

Client (only if you set AUTH_BEARER)
Add the Authorization header in your fetch:
  fetch('/api/yt-chapterize', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer REPLACE_ME'
    },
    body: JSON.stringify({...})
  })

⚠️ Note: Any token you put in client JS is visible to users. Prefer using only CORS_ALLOW_ORIGIN when calling from the same domain.
