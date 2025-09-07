
const { TableClient } = require("@azure/data-tables");
module.exports = async function (context, req) {
  const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING;
  const tableName = process.env.DRAFTS_TABLE || "Drafts";
  if (!connectionString){ context.res = {status:500, body:"Missing AZURE_STORAGE_CONNECTION_STRING"}; return; }
  const client = TableClient.fromConnectionString(connectionString, tableName);
  try{ await client.createTable(); }catch(e){}

  const body = req.body || {};
  const tool = (body.tool||'unknown').toString();
  const ts = body.ts || new Date().toISOString();
  const partitionKey = tool + ':' + ts.slice(0,7); // tool:YYYY-MM
  const rowKey = (Date.now() + '-' + Math.random().toString(36).slice(2,8));

  const entity = {
    partitionKey, rowKey,
    tool, ts,
    input: JSON.stringify(body.input||{}).slice(0, 32000),
    output: (body.output||'').toString().slice(0, 32000),
    meta: JSON.stringify(body.meta||{}).slice(0, 16000)
  };
  await client.upsertEntity(entity, "Merge");
  context.res = { status: 200, headers: {"Content-Type":"application/json","Access-Control-Allow-Origin":"*"}, body: { ok:true, id: rowKey } };
};
