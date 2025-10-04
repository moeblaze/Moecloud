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

  const route = context.bindingData?.route || context.req?.params;
  const projectId = (context.bindingData as any)?.projectId;

  if (req.method === "POST" && context.bindingData?.projectId == null) {
    const { title, ratio, style, voice, script, assetIds } = req.body || {};
    if (!title) { context.res = { status: 400, body: { title: "title required" } }; return; }
    const id = db.newId();
    const now = nowISO();
    db.projects.set(id, { projectId: id, title, ratio, style, voice, script, assetIds, createdAt: now, updatedAt: now });
    context.res = { status: 201, headers: {"content-type":"application/json"}, body: db.projects.get(id) };
    return;
  }

  if (req.method === "GET" && projectId == null) {
    const items = Array.from(db.projects.values());
    context.res = { headers: {"content-type":"application/json"}, body: { items, nextCursor: null } };
    return;
  }

  if (req.method === "GET" && projectId) {
    const p = db.projects.get(projectId);
    if (!p) { context.res = { status: 404, body: { title: "Not found" } }; return; }
    context.res = { headers: {"content-type":"application/json"}, body: p };
    return;
  }

  if (req.method === "PATCH" && projectId) {
    const p = db.projects.get(projectId);
    if (!p) { context.res = { status: 404, body: { title: "Not found" } }; return; }
    const upd = { ...p, ...(req.body||{}), updatedAt: nowISO() };
    db.projects.set(projectId, upd);
    context.res = { headers: {"content-type":"application/json"}, body: upd };
    return;
  }

  context.res = { status: 405, body: { title: "Not allowed" } };
};

export default httpTrigger;
