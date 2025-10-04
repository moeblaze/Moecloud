# Moe Community Cloud — Static Site (SWA)

This repository is ready to deploy to Azure Static Web Apps with **no build step**.

## Structure
- `/index.html` — homepage
- `/404.html` — not found page
- `/assets/css/styles.css` — brand styles (MBCC colors + plaid overlay)
- `/assets/js/main.js` — basic behaviors (smooth scroll)
- `/.github/workflows/azure-static-web-apps-thankful-moss-05b56cb10.yml` — CI/CD to SWA

## Deploy (GitHub → Azure SWA)
1. In Azure portal, open your SWA named **thankful-moss-05b56cb10** and copy its **Deployment Token**.
2. In GitHub → repo **moecloud** → Settings → Secrets and variables → Actions:
   - Add secret: `AZURE_STATIC_WEB_APPS_API_TOKEN_THANKFUL_MOSS_05B56CB10 = <paste token>`
3. Commit/push the repo; the workflow will upload from the repo root.

### Workflow paths
Static at repo root:
```yaml
app_location: "/"
api_location: ""
output_location: ""
```

If you later add a build (e.g., Vite → `dist`), change `output_location` accordingly.
