# INTERNAL — Sales & Implementation Notes (Keep Private)

## Pricing & Packaging (suggested)
- **No-Code Playbook**: Flat fee for setup + training portal + ROI calculator; includes partner page & PDFs wiring.
- **Implementation**: Platform build (Landing Zone, EKS+GitOps, CI/CD, Observability/DR/FinOps), SRE retainer.
- **Add-ons**: Ad Monetization Services, Affiliate integrations, GA4 dashboards, Newsletter gating & lead magnet.

## Delivery Runbook
1) Prepare PDFs in `/docs/`: One-Pager, SOW, Partner One-Pager.
2) Swap GA4 ID (`G-XXXXXXX`) in site `<head>` if used.
3) Merge to `main` → Confirm Azure SWA deploy is green.
4) Smoke test: Training index, each course, ROI (CSV), Partners (PDFs).
5) (Optional) Enable newsletter gating for `/docs/*` links.

## Talking Points
- Show ROI CSV export in discovery → attach to proposal.
- Use Partner payouts to motivate co-sellers.
- Keep ads out of core; upsell Monetization as a separate service.
