export default { async fetch(request, env){
  if(request.method!=='POST') return new Response(JSON.stringify({error:'Method not allowed'}),{status:405});
  const {title='', transcript='', duration=0} = await request.json();
  if(!transcript || transcript.length<20) return new Response(JSON.stringify({error:'Missing transcript'}),{status:400});
  const system=`You are a YouTube packaging assistant. Return ONLY valid JSON matching this schema:
{"chapters":[{"t":number,"title":string}],"hooks":string[],"thumbs":string[],"hashtags":string[],"tags":string[],"pinned":string,"shorts":[{"start":number,"end":number,"label":string}]}`;
  const user=`TITLE: ${title}\nDURATION_MIN: ${duration}\nTRANSCRIPT:\n${transcript}`;
  const resp = await fetch('https://api.openai.com/v1/chat/completions',{method:'POST',headers:{'Authorization':`Bearer ${env.OPENAI_API_KEY}`,'Content-Type':'application/json'},body:JSON.stringify({model:'gpt-4o-mini',response_format:{type:'json_object'},temperature:0.6,messages:[{role:'system',content:system},{role:'user',content:user}]})});
  if(!resp.ok){ const txt=await resp.text(); return new Response(JSON.stringify({error:'OpenAI error',details:txt}),{status:500}); }
  const data=await resp.json(); try{ const json=JSON.parse(data.choices[0].message.content); return new Response(JSON.stringify(json),{status:200,headers:{'Content-Type':'application/json','Access-Control-Allow-Origin':'*'}}); } catch{ return new Response(JSON.stringify({error:'AI returned non-JSON'}),{status:500}); }
}};