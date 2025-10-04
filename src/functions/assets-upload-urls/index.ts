import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { v4 as uuid } from "uuid";
import { requireAuth } from "../../auth.js";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
  try{
    requireAuth(req);
  }catch(e){
    context.res = { status: 401, body: { title: "Unauthorized" } };
    return;
  }
  const files = req.body?.files || [];
  if (!Array.isArray(files) || !files.length) { context.res = { status: 400, body: { title: "files[] required" } }; return; }
  // TODO: Generate Azure Blob SAS for each file. For now, return placeholders.
  const uploads = files.map((f:any)=>({ assetId: uuid(), putUrl: "https://storage/put/url", headers: {"x-ms-blob-type":"BlockBlob"}, expiresAt: new Date(Date.now()+15*60*1000).toISOString() }));
  context.res = { headers: {"content-type":"application/json"}, body: { uploads } };
};

export default httpTrigger;
