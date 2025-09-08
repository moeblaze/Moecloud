const fetch=(...a)=>import('node-fetch').then(({default:f})=>f(...a));
exports.handler = async (event)=>{
  if(event.httpMethod!=='POST') return {statusCode:405, body:JSON.stringify({error:'Method not allowed'})};
  const { title='', transcript='', duration=0 } = JSON.parse(event.body||'{}');
  if(!transcript || transcript.length<20) return {statusCode:400, body:JSON.stringify({error:'Missing transcript'})};
  const system=`You are a YouTube packaging assistant. Return ONLY valid JSON matching this schema:
{"chapters":[{"t":number,"title":string}],"hooks":string[],"thumbs":string[],"hashtags":string[],"tags":string[],"pinned":string,"shorts":[{"start":number,"end":number,"label":string}]}`;
  const user=`TITLE: ${title}\nDURATION_MIN: ${duration}\nTRANSCRIPT:\n${transcript}`;
  const r=await fetch('https://api.openai.com/v1/chat/completions',{method:'POST',headers:{'Authorization':`Bearer ${process.env.OPENAI_API_KEY}`,'Content-Type':'application/json'},body:JSON.stringify({model:'gpt-4o-mini',response_format:{type:'json_object'},temperature:0.6,messages:[{role:'system',content:system},{role:'user',content:user}]})});
  if(!r.ok){ const t=await r.text(); return {statusCode:500, body:JSON.stringify({error:'OpenAI error',details:t})}; }
  const data=await r.json(); try{ const json=JSON.parse(data.choices[0].message.content); return {statusCode:200, body:JSON.stringify(json)}; } catch{ return {statusCode:500, body:JSON.stringify({error:'AI returned non-JSON'})}; }
};