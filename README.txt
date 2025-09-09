MBCC — Restore Index + QSM (separate)
--------------------------------------
This bundle restores your original homepage (unchanged layout/nav) and
ships QSM as a separate page. The only homepage tweak: the sponsor image
fills the glowing box using your portrait file.

Files
- /index.html (restored; only the sponsor <img> uses assets/sponsors/darwynn-sponsor.jpg with object-fit: cover)
- /qsm.html
- /assets/js/qsm.js
- /assets/sponsors/darwynn-sponsor.jpg

Deploy
1) Replace /index.html with this restored file.
2) Upload /qsm.html, /assets/js/qsm.js, and /assets/sponsors/darwynn-sponsor.jpg.
3) Cache-bust:
   https://www.moecommunitycloud.com/index.html?cb=restore1
   https://www.moecommunitycloud.com/qsm.html?cb=restore1
