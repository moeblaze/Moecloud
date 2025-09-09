MBCC Shop Embed + Homepage Teaser
----------------------------------
This bundle adds:
1) /shop.html — full Spreadshop embed (loads their JS from https://moe-bucks.myspreadshop.com)
2) /assets/js/spreadshop.config.js — required config
3) /index.html — homepage including a lightweight Merch teaser section, linking to the shop

Deploy
1) Upload/replace the files in this ZIP at the same paths:
   /shop.html
   /assets/js/spreadshop.config.js
   /index.html
2) Cache-bust:
   https://www.moecommunitycloud.com/index.html?cb=shop
   https://www.moecommunitycloud.com/shop.html?cb=1

Optional (Azure Static Web Apps CSP)
If your CSP blocks third-party JS/images, add to staticwebapp.config.json:
{
  "globalHeaders": {
    "content-security-policy": "default-src 'self'; script-src 'self' https://moe-bucks.myspreadshop.com; img-src 'self' data: https://image.spreadshirtmedia.com; style-src 'self' 'unsafe-inline'; frame-src https://moe-bucks.myspreadshop.com"
  }
}

Alternatively, use an iframe-only embed on /shop.html if you don’t want to allow third-party JS:
<iframe src="https://moe-bucks.myspreadshop.com" style="width:100%;height:100vh;border:0"></iframe>
