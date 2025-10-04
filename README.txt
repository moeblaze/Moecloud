Hazel — AI Video Creation (Generate Video Enabled)
---------------------------------------------------
Files:
- hazel.html (UI with Save Project, Generate Storyboard, Render Preview, **Generate Video**)
- assets/js/hazel-video.js (front-end wiring for API + polling)

Setup:
1) Put hazel.html at repo root.
2) Put assets/js/hazel-video.js under /assets/js/.
3) Ensure staticwebapp.config.json has: { "route": "/hazel", "rewrite": "/hazel.html" }

How it works:
- Set your API base URL and (optional) Bearer token in the right sidebar.
- Click **Save Project** → then **Generate Storyboard** → **Generate Video**.
- The page will POST /v1/renders and poll GET /v1/renders/{id} until complete.
- On completion, it displays a <video> player + Download button if downloadUrl is returned.

Notes:
- Until your backend returns real SAS URLs and render progress, the preview is mocked and Generate Video will require your running Functions backend (or any compatible API).
