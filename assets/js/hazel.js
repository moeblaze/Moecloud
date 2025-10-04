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
    // Front-end only; update to your API when ready:
    let reply = "Thanks! ";
    if(/roi|calculator|return on/i.test(q)){
      reply += "Open the ROI tool (/roi) and enter sessions, conversion, AOV, margin, and cost.";
    } else if(/algorand|loyalty/i.test(q)){
      reply += "Pilot 5–10% traffic, keep PII off‑chain, use ASA for points, stateless TEAL for redemption.";
    } else if(/integration|checklist/i.test(q)){
      reply += "Use the MCC Integration Checklist (/checklist) to map systems, SLOs, and owners.";
    } else {
      reply += "Try: 'Steps to pilot returns automation' or 'What’s in Executive Foundations?'";
    }
    add('bot', reply);
  }
  return {send};
})();