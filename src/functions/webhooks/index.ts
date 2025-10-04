import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { db, nowISO } from "../../memstore.js";
import { requireAuth } from "../../auth.js";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
  try{
    requireAuth(req);
  }catch(e){
    context.res = { status: 401, body: { title: "Unauthorized" } };
    return;
  }

  if (req.method === "POST") {
    const { url, secret, events } = req.body || {};
    if (!url || !secret || !Array.isArray(events) || !events.length) { context.res = { status: 400, body: { title: "url, secret, events[] required" } }; return; }
    const id = (Math.random().toString(36).slice(2)+Date.now().toString(36));
    db.webhooks.set(id, { webhookId: id, url, events, createdAt: nowISO(), secret });
    context.res = { status: 201, headers: {"content-type":"application/json"}, body: { webhookId: id, url, events, createdAt: nowISO() } };
    return;
  }

  if (req.method === "GET") {
    const items = Array.from(db.webhooks.values()).map(w=>({ webhookId: w.webhookId, url: w.url, events: w.events, createdAt: w.createdAt }));
    context.res = { headers: {"content-type":"application/json"}, body: items };
    return;
  }

  context.res = { status: 405, body: { title: "Not allowed" } };
};

export default httpTrigger;
