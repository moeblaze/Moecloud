# MoeCommunityCloud — Full Platform v2
Includes:
- Branded homepage (plaid/red/gold)
- Completed Training hub + 4 course pages (with topbar and analytics hooks)
- LMS (Academy) with quizzes/certificates
- Playbooks (No‑Code Infra)
- Payments (Stripe/PayPal Node server)
- Cheat Sheets (interactive tools)

## Paths
- `/index.html`
- `/training/index.html` (links to: foundations, eks_gitops, cicd_serverless, observability_dr_finops)
- `/academy/courses.html`
- `/playbooks/infra/`
- `/payments/public/checkout.html`
- `/cheatsheets/`

## Deploy
Static: upload all files to your site root (or repo + CI/CD).  
Payments: deploy `/payments` to a Node host and set `.env` from `.env.example`.
