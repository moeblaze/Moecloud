
# MoeCommunityCloud Website

Multi-page static site with brand styling (black & red plaid + gold), a working top nav,
front-page signup form, sponsor ad spot, and dedicated pages for Apps, News, Sports, and Newsletter.

## Pages
- `index.html` — Home with newsletter signup + Sponsor box
- `apps.html` — Apps grid
- `news.html` — News posts
- `sports.html` — Sports hub (slots for live scores, optimizer, Pick 6)
- `newsletter.html` — Subscribe + local demo table of signups

## Customize
- Replace `assets/sponsor-placeholder.png` with a real sponsor image.
- Edit `assets/style.css` to tweak colors, spacing, or layout.
- Wire the signup to your ESP or Azure Function (currently saves to localStorage for demo).

## Deploy
Upload the folder to your Azure Static Web Apps or any static hosting.


## Wire the signup to Azure Function + Table Storage

1. **Create a Function App** (Node 18) and a Storage account.
2. In the Function App **Configuration → Application settings**, add:
   - `AZURE_STORAGE_CONNECTION_STRING` = *your storage connection string*
   - `TABLE_NAME` = `Signups` (or your preferred name)
3. Deploy the sample function in `azure-function-sample/` (rename the folder to `Subscribe` inside your Functions project).
4. Enable CORS for your static site domain (or set `Access-Control-Allow-Origin` in the function response).
5. Copy your function HTTPS URL (e.g., `https://<app>.azurewebsites.net/api/subscribe?code=...`) and set it in:
   - `assets/script.js` as `MBCC_ENDPOINT`.
6. Test a signup on `index.html` or `newsletter.html`. You should see rows in the **Signups** table with `partitionKey=YYYY-MM` and `rowKey=email`.
7. (Optional) Add email confirmation via SendGrid/Azure Communication Services in the function after saving.

## Temporarily removing Sports Optimizer
- Sports page shows only a **Live Scores** placeholder
- Apps page mentions sports updates and notes optimizer will arrive later
