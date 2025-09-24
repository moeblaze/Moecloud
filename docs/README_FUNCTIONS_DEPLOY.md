# Azure Functions + APIM Deploy Guide (AI Assist Pack)

This guide deploys the Azure Functions APIs that power the **AI Assist Pack** and puts them behind **API Management (APIM)**.

## Prereqs
- Azure subscription with access
- Azure OpenAI resource in **East US** (endpoint provided)
- Node 18+ and Azure Functions Core Tools (optional for local dev)
- (Optional) Azure CLI

## One-time setup (Portal)
1. **Create a Function App**:
   - Runtime: Node ~18 / Linux
   - Hosting: Consumption or Premium (Consumption is fine to start)
   - App Insights: Enabled

2. **App Settings** (Configuration → Application settings):
   - `AOAI_ENDPOINT = https://moeopenal.openai.azure.com/`
   - `AOAI_API_KEY = <your-key>` (or use Managed Identity + Key Vault later)
   - `AOAI_DEPLOYMENT = gpt-4o-mini` (or your model deployment name)

3. **Deploy code** (from `mcc_ai_assist_pack` folder):
   - Zip Deploy (Portal) or `func azure functionapp publish <FUNCTION_APP_NAME>`
   - Ensure the structure includes `api/ai/lead-qualify`, `api/ai/roi-advice`, `api/ai/qa`, `host.json`, `package.json`

4. **Create API Management** (APIM):
   - Add an API that forwards `/api/*` to the Function App backend
   - Apply policies from `APIM/policies/rate-cors.xml`:
     - Rate limit: 60 req/min
     - CORS: `https://www.moecommunitycloud.com`
   - (Optional) Add JWT validation for partner-only routes

5. **CORS**:
   - If you call Functions directly, set Function App CORS to allow only your domain.

6. **DNS** (optional):
   - Point `api.moecommunitycloud.com` at APIM; import a TLS cert.

## CLI quick-start (optional)
```bash
# Login & select subscription
az login
az account set --subscription "<SUBSCRIPTION_ID>"

# Create resource group
az group create -n mcc-ai-rg -l eastus

# Create Storage + Function App (Linux, Node)
az storage account create -g mcc-ai-rg -n mccaistorage$RANDOM -l eastus --sku Standard_LRS
az functionapp create -g mcc-ai-rg -n mcc-ai-func-$RANDOM -s $(az storage account list -g mcc-ai-rg --query [0].name -o tsv) \
  -c eastus --consumption-plan-location eastus --runtime node --functions-version 4

# App settings
az functionapp config appsettings set -g mcc-ai-rg -n <APP_NAME> --settings AOAI_ENDPOINT="https://moeopenal.openai.azure.com/"
az functionapp config appsettings set -g mcc-ai-rg -n <APP_NAME> --settings AOAI_API_KEY="<YOUR_KEY>"
az functionapp config appsettings set -g mcc-ai-rg -n <APP_NAME> --settings AOAI_DEPLOYMENT="gpt-4o-mini"

# Deploy (Zip deploy)
az functionapp deployment source config-zip -g mcc-ai-rg -n <APP_NAME> --src mcc_ai_assist_pack.zip
```

## Verify
- Call `POST https://<APP_NAME>.azurewebsites.net/api/ai/qa` with `{ "question": "hello" }`
- Hook frontend: include `/assets/js/ai.js` and attach the chat/ROI coach

## Secure + Scale Later
- Managed Identity + Key Vault (no secrets in app settings)
- Private endpoints, VNet integration
- Per-tenant APIM products/quotas for white-label
