Vercel → Azure SWA Proxy (Option A)
===================================
Use this if your DNS (or domain assignment) currently lives on Vercel and you want to keep it that way.

Steps
1) In your Git repo (the one connected to the Vercel project that owns moecommunitycloud.com), add the included `vercel.json` at the repo root.
2) In `vercel.json`, replace `YOUR_SWA_DEFAULT_DOMAIN` with your actual Azure Static Web Apps default domain, e.g. `polite-beach-03a9ffb03.1` (no https://, no trailing slash).
   The final destination will look like: `https://polite-beach-03a9ffb03.1.azurestaticapps.net/$1`
3) Commit and push to the branch Vercel builds from (usually `main`).
4) Wait for the Vercel deployment to complete and hard-refresh the site. All routes will now proxy from Azure SWA.

Notes
- This keeps TLS and DNS on Vercel, but the content is served from Azure SWA, so your Azure GitHub Action remains the single deploy.
- The `Cache-Control: s-maxage=0` header reduces edge caching to avoid stale HTML during testing.