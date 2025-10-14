# MoeCommunityCloud — Clean Baseline (Deploy-ready)

This bundle replaces the site with a **consistent baseline**:
- Haz‑AL featured hero, sports removed
- Cloud & AI Tech cards → named CTAs → teaser posts
- Blog index at `/blog/`
- Newsletter capture wired to `/api/subscribe`
- Email MVP API (subscribe/confirm/unsubscribe/send-campaign)
- Admin sender at `/admin/campaign.html`
- `staticwebapp.config.json`: `/sports/*` → `/`, allow `/api/*` and `/admin/*`
- `sitemap.xml` updated

## Azure SWA workflow tip
In your GitHub Action, ensure:
```yaml
with:
  action: upload
  app_location: '/'
  api_location: '/api'
  output_location: '/'
```
