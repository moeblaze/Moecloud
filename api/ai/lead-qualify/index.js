const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
module.exports = async function (context, req) {
  const body = req.body || {};
  const prompt = `Score this lead 0-100 for fit to a cloud platform & playbooks offering.
Industry: ${body.industry||'n/a'}
Company size: ${body.size||'n/a'}
Monthly cloud spend: ${body.cloud_spend||'n/a'}
Timeline: ${body.timeline||'n/a'}
Notes: ${body.notes||'n/a'}
Return JSON with keys: score (0-100), reasons (array), summary (one-liner).`;

  const endpoint = process.env.AOAI_ENDPOINT;
  const key = process.env.AOAI_API_KEY;
  const dep = process.env.AOAI_DEPLOYMENT || "gpt-4o-mini";
  let result = { score: 65, reasons: ["placeholder"], summary: "Potential fit." };
  try{
    const r = await fetch(`${endpoint}/openai/deployments/${dep}/chat/completions?api-version=2024-02-15-preview`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'api-key': key },
      body: JSON.stringify({ messages:[{role:'user', content: prompt}], temperature:0.2, max_tokens:256 })
    });
    const j = await r.json();
    const text = j?.choices?.[0]?.message?.content || '';
    try{ result = JSON.parse(text); } catch(e){ result.summary = text; }
  }catch(e){ context.log('AOAI error', e.message); }

  const csvRow = [
    new Date().toISOString(),
    body.industry||'',
    body.size||'',
    body.cloud_spend||'',
    body.timeline||'',
    (result.score||''),
    (result.summary||'').replace(/[\r\n]+/g,' ')
  ].map(v => `"${String(v).replace(/"/g,'""')}"`).join(',');

  context.res = { headers: {'Content-Type':'application/json'}, body: { ok:true, ...result, csvRow } };
};