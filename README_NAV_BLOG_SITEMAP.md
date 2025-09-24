# Nav + Blog + Sitemap Patch

This patch:
- Adds a **Packages (Deep Dive)** link to the top nav (points to `/playbooks/packages_longform.html`).
- Inserts a **From the Blog** strip on the homepage (links to 3 flagship posts).
- Updates **/blog/index.html** with dates and short excerpts.
- Adds a **sitemap ping** script to notify Google/Bing after deploy (optional).

## Files
- `assets/js/nav-add-packages-deep.js`
- `assets/js/home-from-blog.js`
- `blog/index.html`
- `assets/js/ping-sitemaps.js` (optional)

## Install
1. Copy these files into your repo.
2. Add the scripts:
   - On **/index.html** (before `</body>`):
     ```html
     <script src="assets/js/home-from-blog.js"></script>
     <script src="assets/js/nav-add-packages-deep.js"></script>
     <script src="assets/js/ping-sitemaps.js"></script>
     ```
   - On **/playbooks/index.html** (before `</body>`):
     ```html
     <script src="../assets/js/nav-add-packages-deep.js"></script>
     ```
3. Replace **/blog/index.html** with the one provided here.
4. Commit → PR → merge to `main`. Azure SWA should go green.

— Updated 2025-09-24
