
const fetch = require("node-fetch");

module.exports = async function (context, req) {
  const endpoint = process.env.AOAI_ENDPOINT;      // e.g., https://moeopenal.openai.azure.com/
  const apiKey   = process.env.AOAI_API_KEY;
  const deploy   = process.env.AOAI_DEPLOYMENT;    // your deployment name
  const apiVer   = process.env.AOAI_API_VERSION || "2024-08-01-preview";

  if (!endpoint || !apiKey || !deploy){
    context.res = { status: 500, body: "Missing AOAI_ENDPOINT/AOAI_API_KEY/AOAI_DEPLOYMENT" };
    return;
  }

  const { prompt = "Hello from MBCC.", system = "You are a concise business writing assistant.", temperature = 0.3, json: wantsJson = false, tool = "generic" } = req.body || {};

  const url = `${endpoint}openai/deployments/${deploy}/chat/completions?api-version=${apiVer}`;
  const payload = {
    messages: [
      { role: "system", content: system },
      { role: "user", content: prompt }
    ],
    temperature,
    top_p: 0.9
  };
  if (wantsJson) payload.response_format = { type: "json_object" };

  try {
    const r = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json", "api-key": apiKey },
      body: JSON.stringify(payload)
    });
    if (!r.ok){
      const errText = await r.text();
      context.res = { status: r.status, body: errText };
      return;
    }
    const data = await r.json();
    const text = data?.choices?.[0]?.message?.content || "";
    context.res = { status: 200, headers: {"Content-Type":"application/json","Access-Control-Allow-Origin":"*"}, body: { ok:true, tool, text } };
  } catch (e){
    context.res = { status: 500, body: "Proxy error" };
  }
};
