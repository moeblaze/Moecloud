# MBCC — Keep Weekend Sports Link (no homepage changes) — 2025-09-12

Your homepage is already back to the original (Darwynn sponsor intact). To keep **Weekend Sports** in
the navbar **without altering your content**, upload this file and add ONE script tag.

## Files in this patch
- **/assets/js/keep-weekend-sports-nav.js** — adds “Weekend Sports” to the nav if missing, right after “Sports”.

## How to enable
Add this one line near the end of your **index.html** (and any layout template that renders the header), just before `</body>`:

```html
<script src="/assets/js/keep-weekend-sports-nav.js"></script>
```

That’s all — your content remains unchanged and the new link persists.

> If you prefer a permanent HTML change instead of a script, paste this directly into your nav `<ul>` after the Sports link:
> ```html
> <li><a href="/sports-weekend/index.html">Weekend Sports</a></li>
> ```

