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
  const renderId = (context.bindingData as any)?.renderId;

  if (req.method === "POST" && !renderId) {
    const { projectId, storyboardId } = req.body || {};
    if (!projectId || !storyboardId) { context.res = { status: 400, body: { title: "projectId and storyboardId required" } }; return; }
    if (!db.projects.get(projectId)) { context.res = { status: 404, body: { title: "Project not found" } }; return; }
    if (!db.storyboards.get(storyboardId)) { context.res = { status: 404, body: { title: "Storyboard not found" } }; return; }
    const id = db.newId();
    db.renders.set(id, { renderId: id, projectId, storyboardId, status: "queued", percent: 0, createdAt: nowISO(), updatedAt: nowISO() });
    // TODO: enqueue render job (Service Bus / Queue + encoder)
    context.res = { status: 202, headers: {"content-type":"application/json"}, body: { renderId: id, status: "queued", estimatedSec: 120 } };
    return;
  }

  if (req.method === "GET" && !renderId) {
    const items = Array.from(db.renders.values());
    context.res = { headers: {"content-type":"application/json"}, body: { items, nextCursor: null } };
    return;
  }

  if (req.method === "GET" && renderId) {
    const r = db.renders.get(renderId);
    if (!r) { context.res = { status: 404, body: { title: "Not found" } }; return; }
    context.res = { headers: {"content-type":"application/json"}, body: r };
    return;
  }

  if (req.method === "POST" && renderId) {
    const r = db.renders.get(renderId);
    if (!r) { context.res = { status: 404, body: { title: "Not found" } }; return; }
    r.status = "cancelled"; r.updatedAt = nowISO();
    db.renders.set(renderId, r);
    context.res = { status: 202, headers: {"content-type":"application/json"}, body: { renderId, status: "cancelled" } };
    return;
  }

  context.res = { status: 405, body: { title: "Not allowed" } };
};

export default httpTrigger;
