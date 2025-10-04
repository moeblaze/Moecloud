# Hazel API — Extended Spec (v1.1.0)

**What’s included**
- Full OpenAPI 3.1 spec with assets, projects, storyboard (async), renders (async), webhooks, health.
- Postman collection to test all endpoints.
- examples.http for VS Code REST Client.

**Key conventions**
- Auth: Bearer JWT (APIM or Easy Auth). Roles: `hazel:user`, `hazel:admin`.
- Idempotency: `Idempotency-Key` on POST.
- Errors: RFC7807 `application/problem+json`.
- Uploads: Client PUT to SAS URLs. Virus scan & type allowlist.
- Jobs: Use Service Bus/Queues + worker (Functions or Container Apps).
- Webhooks: sign body with HMAC SHA-256 -> header `X-Hazel-Signature`.

**Next steps**
- Generate server stubs from OpenAPI (e.g., `openapi-generator` for Node/TS).
- Or I can ship an Azure Functions TypeScript starter wired to these routes.
