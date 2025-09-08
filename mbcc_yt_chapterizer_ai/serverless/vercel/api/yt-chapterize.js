import OpenAI from "openai";
export default async function handler(req, res){
  if(req.method!=="POST") return res.status(405).json({error:"Method not allowed"});
  const { title="", transcript="", duration=0 } = req.body || {};
  if(!transcript || transcript.length<20) return res.status(400).json({error:"Missing transcript"});
  const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  const system = `You are a YouTube packaging assistant. Return ONLY valid JSON matching this schema:
{"chapters":[{"t":number,"title":string}],"hooks":string[],"thumbs":string[],"hashtags":string[],"tags":string[],"pinned":string,"shorts":[{"start":number,"end":number,"label":string}]}`;
  const user = `TITLE: ${title}\nDURATION_MIN: ${duration}\nTRANSCRIPT:\n${transcript}`;
  const chat = await client.chat.completions.create({ model: "gpt-4o-mini", response_format:{type:"json_object"}, temperature:0.6, messages:[{role:"system",content:system},{role:"user",content:user}] });
  try{ const json = JSON.parse(chat.choices[0].message.content); return res.status(200).json(json); }
  catch{ return res.status(500).json({error:"AI returned non-JSON"}); }
}