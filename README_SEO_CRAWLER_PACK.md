# SEO Crawler Pack

This adds **image sitemaps**, a **sitemap index**, a lightweight **RSS feed**, and optional Azure SWA config:
- `image-sitemap.xml` — auto-generated from images in your repo
- `sitemap_index.xml` — references both `sitemap.xml` and `image-sitemap.xml`
- `robots.txt` — updated to point at `sitemap_index.xml`
- `feed.xml` — simple RSS to help discovery tools
- `.github/workflows/auto-image-sitemap.yml` — runs on new images
- `scripts/generate-image-sitemap.mjs`, `scripts/generate-sitemap-index.mjs`
- `staticwebapp.config.json` — optional (headers, caching, 404 rewrite)

## Install
1. Add `.github/workflows/auto-image-sitemap.yml` and `scripts/*` to your repo.
2. Commit → PR → merge to `main`.
3. Optional: add `staticwebapp.config.json` to repo root for headers/caching and to route 404s to `/404.html`.
4. Optional: in GitHub → **Settings → Variables**, set `SITE_BASE_URL = https://www.moecommunitycloud.com`.

## Verify
- After the next push, check:
  - https://www.moecommunitycloud.com/image-sitemap.xml
  - https://www.moecommunitycloud.com/sitemap_index.xml
  - https://www.moecommunitycloud.com/robots.txt (should reference sitemap_index.xml)
  - https://www.moecommunitycloud.com/feed.xml

This complements your existing **auto-sitemap** (HTML pages) workflow, so when you add pages *or* images, Google has a clean map for crawling.
