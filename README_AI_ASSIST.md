# AI Assist Pack (Azure OpenAI)

This pack gives you:
- Frontend helpers: `/assets/js/ai.js` for chat and ROI assistant widgets
- Azure Functions HTTP APIs:
  - `POST /api/ai/lead-qualify`
  - `POST /api/ai/roi-advice`
  - `POST /api/ai/qa`
- Env template + APIM policy snippets

## Files
- `assets/js/ai.js`
- `api/ai/lead-qualify/` (function.json, index.js)
- `api/ai/roi-advice/` (function.json, index.js)
- `api/ai/qa/` (function.json, index.js)
- `host.json`, `package.json`
- `APIM/policies/*.xml`
- `README_AI_ASSIST.md` (this file)

## Configure Azure OpenAI
Set app settings on the Functions App (or use Managed Identity + Key Vault):
- `AOAI_ENDPOINT=https://moeopenal.openai.azure.com/`
- `AOAI_API_KEY=***` (if not using MI)
- `AOAI_DEPLOYMENT=gpt-4o-mini` (or your actual deployment name)

## Local dev (optional)
```
cd api
npm install
# Use Azure Functions Core Tools to run locally (func start)
```

## Frontend wiring
1. Include the script on pages where you want AI:
```html
<script src="/assets/js/ai.js"></script>
```
2. Add a chat container:
```html
<div id="playbook_chat"></div>
<script>window.MCCAI.attachChat('playbook_chat','Ask about this playbook…');</script>
```
3. Add ROI assistant (e.g., on `/training/roi.html`):
```html
<button id="roi_coach_btn" class="btn">Ask ROI Assistant</button>
<script>
MCCAI.attachRoiCoach('roi_coach_btn', function(){
  return {
    engineers: +document.getElementById('roi_eng').value||0,
    monthly_spend: +document.getElementById('roi_cloud').value||0,
    mttr: +document.getElementById('roi_mttr').value||0,
    deploys: +document.getElementById('roi_deploy').value||0
  };
});
</script>
```

## APIM (optional but recommended)
Import Functions App; apply the following policies (examples in `APIM/policies/`):
- **Rate limit** per IP (e.g., 60 req/min)
- **CORS** restrict to `https://www.moecommunitycloud.com`
- **Rewrite** `/api/*` to Functions backend
- **JWT** (optional) for partner features

## Packaging model (sales)
- **No‑Code Playbook**: leave `/assets/js/ai.js` out; sell static calculators, checklists, PDFs.
- **Integration Package**: include `/assets/js/ai.js`, deploy the Functions App, enable APIM policies.
- **White‑Label**: deploy a per‑tenant Functions app + APIM key; swap branding.

— Generated 2025-09-24
