window.Hazel = (function(){
  const elMsgs = ()=>document.getElementById('messages');
  const elPrompt = ()=>document.getElementById('prompt');
  function add(role, text){
    const div = document.createElement('div');
    div.className = 'msg ' + (role==='user'?'user':'bot');
    div.innerText = text;
    elMsgs().appendChild(div);
    elMsgs().scrollTop = elMsgs().scrollHeight;
  }
  async function send(){
    const q = elPrompt().value.trim();
    if(!q) return;
    add('user', q);
    elPrompt().value='';
    // Placeholder response logic; replace with your API call:
    // fetch('/api/hazel', {method:'POST', body: JSON.stringify({prompt:q})}).then(...)
    let reply = "Thanks! Here’s how to proceed:\n";
    if(/roi|calculator|return on/i.test(q)){
      reply += "Open the ROI tool (/roi), plug in sessions, conversion, AOV, margin, and cost. Try +3–7% conversion and +2–5% AOV to simulate uplift.";
    } else if(/algorand|loyalty/i.test(q)){
      reply += "Start with a 5–10% traffic pilot. Keep PII off‑chain; use ASA for points; redemption via stateless TEAL. See Retail → Loyalty on Algorand.";
    } else if(/integration|checklist/i.test(q)){
      reply += "Use the MCC Integration Checklist (/checklist). Map ERP/CRM/OMS APIs, set SLOs (P95 latency), and owners for each step.";
    } else {
      reply += "Try: 'Show me the steps to pilot returns automation' or 'What’s in the Executive Foundations module?'";
    }
    add('bot', reply);
  }
  return {send};
})();