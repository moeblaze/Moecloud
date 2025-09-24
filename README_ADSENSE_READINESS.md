# Google & AdSense Readiness Pack

This bundle adds policy pages, cookie consent, `ads.txt`, and forms to meet common **Google Search** and **AdSense** expectations.

## What’s included
- `/about.html`, `/contact.html`, `/privacy.html`, `/terms.html`, `/cookies.html`, `/disclaimer.html`
- `/assets/js/cookie-consent.js` — lightweight cookie banner
- `/ads.txt` — with placeholder AdSense line (replace with your publisher ID)
- All pages use your existing CSS/JS and load `impl.js` (Home/Back links, GA/events, gating).

## Install
1. Copy all files to your repo root (preserve folders).
2. Commit → PR → merge to `main` → verify Azure SWA is green.
3. Open each page to confirm style matches your brand.

## AdSense Review Checklist
**Site basics**
- [ ] Clear navigation (Home, Training, Playbooks, Services)
- [ ] Original, substantial content (we already added Playbooks, ROI, Training)
- [ ] Policy pages linked in footer or header (About, Contact, Privacy, Terms, Cookies, Disclaimer)
- [ ] Mobile friendly (your theme is responsive)

**Technical**
- [ ] `sitemap.xml` and `sitemap_index.xml` present (we auto-generate both)
- [ ] `robots.txt` references sitemap index (done)
- [ ] `ads.txt` at the domain root (replace the publisher ID)
- [ ] Fast load (static hosting + optimized images)

**Privacy & consent**
- [ ] Cookie consent banner present (`assets/js/cookie-consent.js`)
- [ ] Privacy policy explains analytics and cookies

**Monetization (post-approval)**
- You can insert AdSense code snippets into templates **after approval**.
- Keep layout stable to avoid CLS; avoid excessive ads per page.

## Replace publisher ID
Edit `/ads.txt`:
```
google.com, pub-0000000000000000, DIRECT, f08c47fec0942fa0
```
→ set your real ID from AdSense (format: `pub-1234567890123456`). Commit to `main`.

## Optional
- Add footer links to these policy pages across the site.
- Add more long-form articles (2–4 pages is usually plenty to start).

— Generated 2025-09-24
