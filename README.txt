Hazel AI — Standalone App (MCC)
--------------------------------
Upload `hazel.html` to your repo root and place `assets/js/hazel.js` under /assets/js/ (keep your existing CSS).

Add these routes to staticwebapp.config.json:
  { "route": "/hazel", "rewrite": "/hazel.html" },
  { "route": "/hazel/", "rewrite": "/hazel.html" }

Add an 'ad link' to open Hazel on a new page (for example, in index.html):
  <a class="btn btn-primary" href="/hazel" target="_blank" rel="noopener">Try Hazel AI</a>

Or a banner anywhere:
  <a href="/hazel" target="_blank" rel="noopener">
    <div class="card" style="display:flex;align-items:center;gap:12px">
      <div class="logo">MCC</div>
      <div><strong>Hazel AI</strong><br><span class="micro">Ask about MCC training, integrations & ROI →</span></div>
    </div>
  </a>

To wire up a real backend later:
  - Replace the placeholder logic in assets/js/hazel.js with a fetch() to your API endpoint.
