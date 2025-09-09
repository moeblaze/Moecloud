MBCC — AdSense Readiness Pack  (generated 2025-09-09)

Included:
- robots.txt — allows all; points to sitemap.xml
- sitemap.xml — core site URLs with lastmod=2025-09-09
- assets/js/adsense-init.js — safely loads AdSense and pushes all <ins class="adsbygoogle"> tags
- partials/ad-slot.html — pasteable responsive ad unit

How to install (surgical):
1) Upload robots.txt and sitemap.xml to your site root.
2) Upload assets/js/adsense-init.js (link it in the <head> of each page):
   <script defer src="assets/js/adsense-init.js"></script>
3) On each page (index, apps, sports, news, newsletter, qsm, qsw, etc):
   - Add ONE ad slot near the top or after the first section:
     (paste the contents of partials/ad-slot.html)
   - Optionally add ONE more before the footer.
4) Verify:
   - Google Search Console: submit https://www.moecommunitycloud.com/sitemap.xml
   - AdSense: Sites → moecommunitycloud.com → check “ads.txt” (optional) and crawl status.
   - Clear any caching/CDN and hard refresh (?cb=ads).

Notes:
- Place ads in viewable areas, not inside buttons or forms. Avoid excessive ads (policy).
- EU/UK: ensure consent banner (you already have assets/consent.js).
