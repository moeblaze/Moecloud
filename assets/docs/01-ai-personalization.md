# AI Personalization for PDP & Checkout

**Goal:** Lift conversion and AOV with AI-ranked recommendations and offer targeting.

**Metrics:** +3–7% conversion, +2–5% AOV.

**Actions:**
- Collect browse/cart signals
- Rank candidates with LLM reranker
- Explainable reasons for merch review
- Guardrails: frequency caps, cold-start defaults

**Implementation:** lightweight event collector → feature store → LLM reranker → UI widgets.
