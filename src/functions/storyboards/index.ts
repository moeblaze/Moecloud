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
  const projectId = (context.bindingData as any)?.projectId;
  const storyboardId = (context.bindingData as any)?.storyboardId;

  if (req.method === "POST" && projectId) {
    if (!db.projects.get(projectId)) { context.res = { status: 404, body: { title: "Project not found" } }; return; }
    const id = db.newId();
    db.storyboards.set(id, { storyboardId: id, projectId, status: "queued", createdAt: nowISO(), updatedAt: nowISO() });
    // TODO: enqueue storyboard generation job
    context.res = { status: 202, headers: {"content-type":"application/json"}, body: { storyboardId: id, status: "queued", estimatedSec: 30 } };
    return;
  }

  if (req.method === "GET" && storyboardId) {
    const sb = db.storyboards.get(storyboardId);
    if (!sb) { context.res = { status: 404, body: { title: "Not found" } }; return; }
    context.res = { headers: {"content-type":"application/json"}, body: sb };
    return;
  }

  context.res = { status: 405, body: { title: "Not allowed" } };
};

export default httpTrigger;
