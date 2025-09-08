MBCC — SWA CI + Domain Patch (Repo: moecloud)
=============================================

SWA default host:
    https://thankful-moss-05b56cb10.1.azurestaticapps.net

Do this first:
1) Copy `.github/workflows/azure-static-web-apps.yml` into the **moecloud** repo.
2) In GitHub → Settings → Secrets and variables → Actions:
   - Add **AZURE_STATIC_WEB_APPS_API_TOKEN** = the token from Azure Portal → Static Web Apps → thankful-moss-05b56cb10 → Settings → Deployment token.
3) Commit to **main**. Watch **Actions** for "Azure Static Web Apps CI/CD (MBCC)".

Verify origin:
- Commit **origin-check.txt** to repo root.
- After deploy, open both:
  https://thankful-moss-05b56cb10.1.azurestaticapps.net/origin-check.txt
  https://www.moecommunitycloud.com/origin-check.txt

If you keep Vercel for the domain:
- Add **vercel.json** to the repo Vercel builds from; it proxies every route to this SWA host.

Common pitfalls:
- Wrong repo/branch. Reconnect SWA to **moecloud/main** if needed.
- Wrong `app_location`/`output_location`. For site at repo root, "/" and "" are correct.
- Missing AZURE_STATIC_WEB_APPS_API_TOKEN secret.

Ship it.