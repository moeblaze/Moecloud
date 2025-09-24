# 404 + Newsletter Bundle

This adds two brand-safe pages:
- `404.html` — custom not-found page with Home/Back buttons and quick links.
- `newsletter.html` — value-packed newsletter page with CSV-wired signup (client-side) and gate unlock.

## Install
1. Copy `404.html` and `newsletter.html` into your repo root.
2. Commit → PR → merge to `main`. Azure SWA will deploy automatically.
3. Verify:
   - Visit `/404.html` directly to preview the page.
   - Visit `/newsletter.html`, submit the form (name+email), and confirm:
     - A `MCC_Newsletter_Signup.csv` file downloads.
     - You see the “subscribed” message.
     - Subsequent `/docs/*` downloads are unlocked on this browser (via `impl.js` gate).

## Notes
- CSV export is **client-side** — no backend needed. For production mailing, you can later wire to Mailchimp, Firebase, etc.
- GA4 events (`newsletter_signup`) will fire if GA is enabled in `assets/js/config.js`.
- The Auto-Sitemap workflow will include `newsletter.html` automatically after this commit.

— Generated 2025-09-24
