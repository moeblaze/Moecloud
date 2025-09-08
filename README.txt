NFL Week 1 (2025) — ANYWHERE Embed
====================================

FASTEST FIX — One-line script:
1) Upload `nfl-week1-embed-anywhere.js` to the SAME folder as `sports.html`.
2) In `sports.html`, paste this right BEFORE </body>:
   <script src="nfl-week1-embed-anywhere.js" defer></script>
3) Hard refresh (Ctrl/Cmd+Shift+R).

If you don't want JS:
- Open `nfl-week1-inline.html` and paste its contents under your NFL section.
- (It includes a <style> block so it renders immediately.)

Why this works:
- It looks for #nfl or a header that literally says “NFL”. If neither is found, it appends at the end of <body>.
- CSS is injected into a <style> tag; if your host blocks that, we can switch to a separate CSS file.

If you still don’t see it:
- Confirm the file is really at https://www.moecommunitycloud.com/nfl-week1-embed-anywhere.js (open that URL directly).
- Make sure you pasted the script tag BEFORE </body>, not inside <head> or inside another tag.
- Purge caches / do a hard refresh.
