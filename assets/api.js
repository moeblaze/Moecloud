
// MBCC client API helpers
const MBCC_SAVE_ENDPOINT = "https://<YOUR-FUNCTION-APP>.azurewebsites.net/api/save-draft?code=<FUNCTION_KEY>";
const MBCC_GENERATE_ENDPOINT = "https://<YOUR-FUNCTION-APP>.azurewebsites.net/api/generate?code=<FUNCTION_KEY>";

async function mbccSaveDraft(payload){
  try{
    const res = await fetch(MBCC_SAVE_ENDPOINT, {
      method: "POST",
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify(payload)
    });
    if (!res.ok) throw new Error(await res.text());
    const json = await res.json();
    alert("Saved ✅");
    return json;
  }catch(e){
    console.error(e);
    alert("Save failed ❌");
  }
}

async function mbccGenerate(body){
  try{
    const res = await fetch(MBCC_GENERATE_ENDPOINT, {
      method: "POST",
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify(body)
    });
    if (!res.ok) throw new Error(await res.text());
    return await res.json();
  }catch(e){
    console.error(e);
    alert("Generate failed ❌");
  }
}
