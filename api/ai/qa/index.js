const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
module.exports = async function (context, req) {
  const b = req.body||{};
  const question = b.question || "Help me understand this playbook.";
  const contextPath = b.context || "/playbooks/index.html";
  const system = "Answer concisely and helpfully. Avoid hallucinations. If unsure, ask for clarification.";
  const user = `User asked: ${question}\nContext path: ${contextPath}\nIf you don't know, say you need more info.`;
  const endpoint = process.env.AOAI_ENDPOINT;
  const key = process.env.AOAI_API_KEY;
  const dep = process.env.AOAI_DEPLOYMENT || "gpt-4o-mini";
  let answer = "Thanks for your question!";
  try{
    const r = await fetch(`${endpoint}/openai/deployments/${dep}/chat/completions?api-version=2024-02-15-preview`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'api-key': key },
      body: JSON.stringify({ messages:[{role:'system', content: system},{role:'user', content: user}], temperature:0.3, max_tokens:300 })
    });
    const j = await r.json();
    answer = j?.choices?.[0]?.message?.content || answer;
  }catch(e){ context.log('AOAI error', e.message); }
  context.res = { headers: {'Content-Type':'application/json'}, body: { answer } };
};