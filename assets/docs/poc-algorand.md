# Concept (POC): Algorand–Enhanced Market Test

**Purpose:** Validate that AI retail use cases move KPIs while proving secure, low-cost on-chain attestations via Algorand.

**Primary KPI:** +3–7% conversion uplift.

**Scope:** AI personalization; Algorand for event attestation and/or tokenized coupons; 1–2 channels; strict A/B.

**Reference Architecture:** Web/App → Collector/API → AI Service → (Feature Store, Algorand Node, Analytics)

**Event Attestation Example:**
```
event_hash = sha256(JSON(event))
write Algorand tx note: {{type:"offer_redeemed", order_id, event_hash, ts}}
```

**Guardrails:** No PII on-chain; RBAC; cost targets.
