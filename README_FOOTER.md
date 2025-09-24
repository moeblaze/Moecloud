# Footer Pack

Drop-in global footer with:
- Policy links (About, Contact, Privacy, Terms, Cookies, Disclaimer)
- Mini newsletter signup (unlocks download gate + optional CSV download)
- Brand-safe layout (uses your existing CSS)

## Files
- `/partials/footer.html` — HTML snippet to include at the end of pages
- `/README_FOOTER.md` — this file

## Install
1. Paste the contents of `partials/footer.html` into your pages just above `</body>` — or, if you have a template, include it there.
2. Ensure the page already loads:
   ```html
   <script src="/assets/js/config.js"></script>
   <script src="/assets/js/impl.js"></script>
   ```
3. Commit → PR → merge to `main` → Azure SWA should deploy green.

## Notes
- Newsletter signup here sets `localStorage.mccNewsOK = true` so `/docs/*` downloads are unlocked on that browser.
- GA event `newsletter_signup_footer` fires if GA is enabled in `assets/js/config.js`.
- Policy pages are provided in the AdSense Readiness Pack.
