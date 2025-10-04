# Hazel API — Azure Functions (TypeScript) Starter

This project implements the endpoints from the **Hazel API (extended)** spec as Azure Functions v4 (Node 18, TypeScript).

## Endpoints (HTTP Triggers)
- GET  /v1/health
- POST /v1/assets/upload-urls
- POST /v1/projects
- GET  /v1/projects
- GET  /v1/projects/{projectId}
- PATCH /v1/projects/{projectId}
- POST /v1/projects/{projectId}/storyboard
- GET  /v1/storyboards/{storyboardId}
- POST /v1/renders
- GET  /v1/renders
- GET  /v1/renders/{renderId}
- POST /v1/renders/{renderId}/cancel
- POST /v1/webhooks
- GET  /v1/webhooks

## Auth
- `requireAuth()` currently **decodes** JWT only for local dev.
- In production, replace with full verification (JWKS, iss, aud).

## Storage & Jobs
- Uses **in-memory** maps for demo. Swap with Cosmos DB or Table Storage.
- `assets/upload-urls` returns placeholders; replace with Azure Blob SAS generation.
- Storyboard/Render endpoints queue work (TODOs). Use Service Bus / Storage Queue and a worker (Functions or Container Apps).

## Run locally
1) Install Azure Functions Core Tools v4
2) `npm i`
3) `npm run dev`
4) Test: `GET http://localhost:7071/v1/health`

## Deploy
- Use Azure Functions on Consumption/Premium, or Container Apps with Dapr if you need GPU encoders.
- Front with API Management for auth, rate limiting, and JWT enforcement.
