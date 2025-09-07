
// Basic client-side PII redaction
export function redactPII(text){
  if(!text) return "";
  let t = text;
  // emails
  t = t.replace(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi, "[redacted-email]");
  // phone numbers (simple)
  t = t.replace(/(\+?\d{1,2}[\s\-\.])?(?:\(?\d{3}\)?[\s\-\.]?\d{3}[\s\-\.]?\d{4})/g, "[redacted-phone]");
  // addresses (very rough street patterns)
  t = t.replace(/\b\d{1,5}\s+[A-Za-z0-9.\- ]+(Street|St|Road|Rd|Avenue|Ave|Boulevard|Blvd|Lane|Ln|Drive|Dr)\b/gi, "[redacted-address]");
  // SSN-ish
  t = t.replace(/\b\d{3}-\d{2}-\d{4}\b/g, "[redacted-ssn]");
  return t;
}

// Helper to call AOAI proxy with instruction
async function transformText(currentText, instruction, opts={}){
  const body = {
    tool: opts.tool || "transform",
    system: opts.system || "You are a helpful business writing assistant.",
    prompt: `${instruction}\n\n---\nTEXT:\n${currentText}`,
    temperature: typeof opts.temperature === "number" ? opts.temperature : 0.3
  };
  if (opts.json) body.json = true;
  const res = await mbccGenerate(body);
  return res?.text || "";
}

// Action item extractor -> returns JSON array
export async function extractActions(currentText){
  const instruction = `Extract action items from TEXT as a pure JSON array named items, schema:
[{"owner":"string","task":"string","due_date":"string | null"}]
Only return JSON.`;
  const out = await transformText(currentText, instruction, { json:true, tool:"extract-actions" });
  try{
    const parsed = JSON.parse(out);
    // accept either {items:[...]} or raw array
    const arr = Array.isArray(parsed) ? parsed : (parsed.items || []);
    return arr;
  }catch{
    return [];
  }
}

export async function makeConcise(currentText){ 
  return transformText(currentText, "Rewrite TEXT to be 30% shorter, same meaning, clear and professional."); 
}
export async function friendlier(currentText){ 
  return transformText(currentText, "Rewrite TEXT to be friendlier and warmer, keep it professional."); 
}
export async function execSummary(currentText){ 
  return transformText(currentText, "Summarize TEXT for an executive in ~100 words with 3–5 bullets."); 
}
export async function expandOutline(currentText){ 
  return transformText(currentText, "Expand the outline in TEXT into a complete draft with clear paragraphs."); 
}
export async function translateTo(currentText, lang){ 
  return transformText(currentText, `Translate TEXT to ${lang}. Keep business tone.`); 
}

// UI wiring helpers per page
export function attachTransformToolbar(containerId, getText, setText, opts={}){
  const c = document.getElementById(containerId);
  if(!c) return;
  const wrap = document.createElement('div');
  wrap.className = "card";
  wrap.style.marginTop = "10px";
  wrap.innerHTML = `
    <div class="badge">Transform</div>
    <div style="display:flex; gap:8px; flex-wrap:wrap">
      <button class="btn" id="t_concise">Concise</button>
      <button class="btn" id="t_friend">Friendlier</button>
      <button class="btn" id="t_exec">Exec Summary</button>
      <button class="btn" id="t_expand">Expand</button>
      <button class="btn alt" id="t_redact">Redact PII</button>
      <select class="input" id="t_lang" style="width:200px">
        <option value="">Translate…</option>
        <option>Spanish</option>
        <option>French</option>
        <option>German</option>
        <option>Portuguese</option>
      </select>
      <button class="btn" id="t_extract">Extract Action Items</button>
    </div>
    <div id="t_json" style="white-space:pre-wrap;padding-top:8px"></div>
  `;
  c.parentNode.insertBefore(wrap, c.nextSibling);

  document.getElementById('t_concise').onclick = async ()=> setText(await makeConcise(getText()));
  document.getElementById('t_friend').onclick  = async ()=> setText(await friendlier(getText()));
  document.getElementById('t_exec').onclick    = async ()=> setText(await execSummary(getText()));
  document.getElementById('t_expand').onclick  = async ()=> setText(await expandOutline(getText()));
  document.getElementById('t_redact').onclick  = ()=> setText(redactPII(getText()));
  document.getElementById('t_lang').onchange   = async (e)=>{
    if(!e.target.value) return;
    setText(await translateTo(getText(), e.target.value));
    e.target.value = "";
  };
  document.getElementById('t_extract').onclick = async ()=>{
    const arr = await extractActions(getText());
    document.getElementById('t_json').textContent = JSON.stringify(arr, null, 2);
  };
}
