# MCC Email Marketing MVP (Azure Static Web Apps)

This adds **first‑party** email capture + campaign sending without SendGrid/Mailchimp.

## What you get
- **/api/subscribe** (POST): store subscriber, send double opt‑in
- **/api/confirm** (GET): confirm subscription
- **/api/unsubscribe** (GET): one‑click unsubscribe
- **/api/send-campaign** (POST): admin‑only simple campaign sender

Data store: **Azure Table Storage** (table: `Subscribers`)  
Email: **Azure Communication Services (Email)** (configure resource + verified domain)

## Repo changes
- `staticwebapp.config.json` ensures `/api/*` routes are public
- `api/` contains Functions (Node 18)
- Update your **GitHub Action** to set `api_location: '/api'`

Example in `.github/workflows/azure-static-web-apps-*.yml`:
```yaml
with:
  action: 'upload'
  app_location: '/'
  api_location: '/api'
  output_location: '/'
```

## Environment configuration (Azure)
Set these **App Settings** in your Static Web App (or in the linked Function App if using flexible hosting):
- `SUBSCRIBERS_TABLE_CONN` = Storage Account connection string
- `STORAGE_TABLE_NAME` = `Subscribers`
- `ACS_CONNECTION_STRING` = ACS Email connection string (optional for local dev)
- `ACS_SENDER` = `no-reply@your-verified-domain.com`
- `SITE_ORIGIN` = `https://www.moecommunitycloud.com`
- `ADMIN_SECRET` = long random string for sending

## Wiring the form on your homepage
Add this script near the bottom of your `index.html` (adjust selector if needed):
```html
<script>
const form = document.querySelector('form');
form?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = form.querySelector('input[type=email]')?.value;
  if(!email) return alert('Enter an email');
  const res = await fetch('/api/subscribe', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email })
  });
  const data = await res.json();
  alert(data.message || 'Thanks!');
});
</script>
```

## Sending a campaign
HTTP POST to `/api/send-campaign` with header `x-admin-secret: $ADMIN_SECRET`:
```bash
curl -X POST https://www.moecommunitycloud.com/api/send-campaign   -H "Content-Type: application/json"   -H "x-admin-secret: YOUR_SECRET"   -d '{"subject":"MCC Update","html":"<h2>New post</h2><p>We shipped X.</p>"}'
```

Every email includes an **Unsubscribe** link. Confirmed subscribers only.
