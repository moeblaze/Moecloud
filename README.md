# MoeCommunityCloud — Static Blog

This bundle is a drop-in replacement for your Azure Static Web App deployed from GitHub (`Moecloud` repo).

## Structure
- `index.html` — homepage
- `assets/css/style.css` — styles
- `assets/img/logo.svg` — logo placeholder
- `posts/sample-post.html` — post template example
- `category/category-sports.html` — category page example
- `404.html`, `sitemap.xml`, `robots.txt`
- `.github/workflows/azure-static-web-apps-thankful-moss-05b56cb10.yml` — GitHub Actions

## Deploy
1. Replace your repo contents with this bundle.
2. Commit and push to the branch that your Static Web App uses (usually `main`).

Azure SWA will auto-build and deploy using the provided workflow.

## Customize
- Update links in `index.html` to your real MCC tool URLs and Spreadshop.
- Add posts under `/posts/` and categories under `/category/`.
- Update `sitemap.xml` as you add pages.

_Last updated: 2025-10-14_


Note: This build removes all references to the MCC Sports AI Suite until it's ready.


## Live Links
- Haz‑AL Video Creator: https://ambitious-sea-01e570d10.2.azurestaticapps.net/
- Spreadshop: https://moe-bucks.myspreadshop.com/
