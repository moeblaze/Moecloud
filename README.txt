# MBCC — Weekend Sports Hardcoded Nav Patch

This patch **replaces your homepage (`/index.html`)** with a safe header that already contains a
**Weekend Sports** nav item linking to `/sports-weekend/index.html`, and also includes the full
`/sports-weekend/` folder.

## Deploy
1) Commit the files in this ZIP to your site root (same level as your current `index.html`).
2) If you want to keep your original content, copy the `<nav>` block from this index into your template
   or merge manually — but this file is ready to drop in as-is.
3) Push to GitHub and refresh the site.

If you prefer not to replace the whole homepage, paste this line in your existing nav `<ul>`:
`<li><a href="/sports-weekend/index.html">Weekend Sports</a></li>`

