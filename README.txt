MBCC Home — Sponsor Image Fill
---------------------------------
This update makes the sponsor image fill the glowing box (no background shown).

CSS applied:
.prime-logo.lg { background: transparent; }
.prime-logo.lg img {
  object-fit: cover;
  object-position: center;
  clip-path: none;
}

Deploy
1) Replace /index.html with this file.
2) Cache-bust: https://www.moecommunitycloud.com/index.html?cb=sponsor-fill-cover
