# MoeCommunityCloud.com — Full Site Bundle (Academy + Playbook + Payments)

This repo contains:
- `/academy` — **LMS (Plaid & Red Edition)** with progress, quizzes, certificates
- `/playbooks/infra` — **No‑Code Infra Playbook** shell with imported content
- `/payments` — **Stripe & PayPal** checkout server + static checkout page

## Deploy Overview
1) Add `academy/` and `playbooks/infra/` to your site root and deploy as usual.
2) Deploy `/payments` on a Node host (Render/Heroku/Vercel Functions/your VPS).
3) Set env vars (see `.env.example`).

### Stripe (recommended)
- Create two Prices (subscription): **Pro** and **Elite**.
- Set `STRIPE_SECRET_KEY`, `STRIPE_PRICE_PRO`, `STRIPE_PRICE_ELITE`, `SUCCESS_URL`, `CANCEL_URL` in the `/payments/.env` file.
- Start the server: `npm i && npm run start` (or deploy to your Node host).
- The static **checkout** page lives at `/payments/public/checkout.html`:
  - Stripe buttons call `/api/create-checkout-session` and then redirect to Stripe Checkout.
  - On success, you return to `/academy/courses.html?tier=pro|elite` and the LMS sets access.

### PayPal (optional)
- Replace `YOUR_PAYPAL_CLIENT_ID` in `checkout.html`.
- Replace `P-PRO_PLAN_ID` and `P-ELITE_PLAN_ID` with real Subscription Plan IDs in PayPal.

## Linking from LMS
- You can link **Upgrade** buttons to: `/payments/checkout.html`
- On success, users land on `/academy/courses.html?tier=pro|elite` and get unlocked access.

## Local Dev
```
cd payments
cp .env.example .env
npm i
npm run dev
# open http://localhost:3000/public/checkout.html
```
The static LMS/Playbook pages can be served by your existing dev server or any static server.

## Security
- Client-side unlock uses `localStorage` for speed while you’re testing.
- For production, also protect Pro/Elite content server-side (send lessons after verifying subscription).

## Brand
- The LMS and Playbook are styled with **MBCC plaid + red + gold** and require no changes to your current site.
