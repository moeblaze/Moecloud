const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
module.exports = async function (context, req) {
  const b=req.body||{};
  const prompt = `Given engineers=${b.engineers||20}, monthly_spend=${b.monthly_spend||100000}, mttr=${b.mttr||4}, deploys=${b.deploys||2},
write a concise summary (150-200 words) explaining the ROI drivers (dev productivity, FinOps savings, reliability) and next actions.
Return JSON: { "summary": "..." }`;
  const endpoint = process.env.AOAI_ENDPOINT;
  const key = process.env.AOAI_API_KEY;
  const dep = process.env.AOAI_DEPLOYMENT || "gpt-4o-mini";
  let result = { summary: "ROI drivers: productivity, FinOps, reliability." };
  try{
    const r = await fetch(`${endpoint}/openai/deployments/${dep}/chat/completions?api-version=2024-02-15-preview`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'api-key': key },
      body: JSON.stringify({ messages:[{role:'user', content: prompt}], temperature:0.2, max_tokens:300 })
    });
    const j = await r.json();
    const text = j?.choices?.[0]?.message?.content || '';
    try{ result = JSON.parse(text); } catch(e){ result.summary = text; }
  }catch(e){ context.log('AOAI error', e.message); }
  context.res = { headers: {'Content-Type':'application/json'}, body: result };
};