Hazel — AI Video Creation (MCC)
--------------------------------
Place `hazel.html` at repo root and `assets/js/hazel-video.js` under /assets/js/.

Add this route to staticwebapp.config.json (deduped):
  { "route": "/hazel", "rewrite": "/hazel.html" }

This does not move or rename any other files or pages.
Links back to your info are included on the Hazel page:
- /training
- /playbooks
- /sow
