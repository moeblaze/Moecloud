
// Azure Functions v4 (Node 18+) — HTTP-trigger to store newsletter signups in Azure Table Storage.
//
// 1) Create a Storage Table named "Signups" (or Cosmos DB Table API with same SDK surface).
// 2) Add two app settings to your Function App:
//    - AZURE_STORAGE_CONNECTION_STRING   (Connection string for Storage account or Table API endpoint)
//    - TABLE_NAME = Signups
//
// 3) Deploy this function and set your static site's MBCC_ENDPOINT to this function URL.

const { TableClient, AzureSASCredential } = require("@azure/data-tables");

module.exports = async function (context, req) {
  context.log("MBCC subscribe function invoked");

  // For production, prefer a connection string via DefaultAzureCredential or connection string setting.
  const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING;
  const tableName = process.env.TABLE_NAME || "Signups";

  if (!connectionString){
    context.res = { status: 500, body: "Missing AZURE_STORAGE_CONNECTION_STRING" };
    return;
  }

  try {
    const client = TableClient.fromConnectionString(connectionString, tableName);
    // Ensure table exists (no-op if already exists)
    try { await client.createTable(); } catch (e) {}

    const body = req.body || {};
    if (!body.email || !body.name){
      context.res = { status: 400, body: "name and email are required" };
      return;
    }

    // Use email as RowKey and partition by YYYY-MM for easy querying
    const ts = body.ts || new Date().toISOString();
    const partitionKey = ts.slice(0, 7); // e.g., "2025-09"
    const rowKey = body.email.toLowerCase();

    const entity = {
      partitionKey,
      rowKey,
      name: body.name,
      email: body.email.toLowerCase(),
      interest: body.interest || "General",
      source: body.source || "web",
      ts
    };

    await client.upsertEntity(entity, "Merge");

    context.res = {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        // CORS (adjust for your domains)
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST,OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type"
      },
      body: { ok: true, saved: { partitionKey, rowKey } }
    };
  } catch (err) {
    context.log.error(err);
    context.res = { status: 500, body: "Server error" };
  }
};
