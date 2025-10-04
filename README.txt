MCC Retail Playbook Pages
---------------------------------
Upload all files in this folder to: /training/retail/ in your repo.

Add these routes to staticwebapp.config.json (inside "routes") for clean URLs:
{ "route": "/training/retail/ai-personalization", "rewrite": "/training/retail/ai-personalization.html" },
{ "route": "/training/retail/loyalty-on-algorand", "rewrite": "/training/retail/loyalty-on-algorand.html" },
{ "route": "/training/retail/returns-automation", "rewrite": "/training/retail/returns-automation.html" },
{ "route": "/training/retail/fraud-detection", "rewrite": "/training/retail/fraud-detection.html" },
{ "route": "/training/retail/omnichannel-promotions", "rewrite": "/training/retail/omnichannel-promotions.html" },
{ "route": "/training/retail/inventory-forecasting", "rewrite": "/training/retail/inventory-forecasting.html" },
{ "route": "/training/retail/poc-algorand", "rewrite": "/training/retail/poc-algorand.html" }

Also update links in /training/index.html and /playbooks.html to point to the new routes.
