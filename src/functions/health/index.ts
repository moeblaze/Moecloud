import { AzureFunction, Context, HttpRequest } from "@azure/functions";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
  context.res = { headers: {"content-type":"application/json"}, body: { status: "ok", uptimeSec: Math.floor(process.uptime()) } };
};

export default httpTrigger;
