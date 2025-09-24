# Sitemap & Robots Patch

Adds/updates:
- `sitemap.xml` with all key routes (Training, Partners, ROI, Playbooks hub & spokes)
- `robots.txt` that references the sitemap

## Install
1. Copy **sitemap.xml** and **robots.txt** from this zip into your repo root.
2. Commit on a branch → PR → merge to `main`.
3. Verify:
   - Open https://www.moecommunitycloud.com/sitemap.xml
   - Open https://www.moecommunitycloud.com/robots.txt

## Notes
- `lastmod` set to 2025-09-24. Update later if you want to reflect future edits.
- You can add more URLs by appending to `sitemap.xml` (same format).
- Azure Static Web Apps will serve these from the site root.
