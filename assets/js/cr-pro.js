
(function(){
  const KEY_INTAKE='crp_intake', KEY_ITEMS='crp_items';
  function g(id){return document.getElementById(id);}
  window.crSaveIntake=function(e){e.preventDefault();const d=Object.fromEntries(new FormData(e.target).entries());
    try{localStorage.setItem(KEY_INTAKE,JSON.stringify(d));}catch(_){}
    setMsg('Saved intake.'); return false;};
  window.crLoadIntake=function(){try{const raw=localStorage.getItem(KEY_INTAKE); if(!raw) return setMsg('No saved intake.');
    const d=JSON.parse(raw); Object.keys(d).forEach(k=>{const el=document.querySelector(`[name="${k}"]`); if(el) el.value=d[k];});
    setMsg('Loaded intake.');}catch(_){setMsg('Load failed.');}};
  window.crResetIntake=function(){const f=g('cr-intake'); f && f.reset(); setMsg('Reset.');};
  window.crGen=function(){const data=Object.fromEntries(new FormData(g('cr-intake')).entries());
    const t=(document.querySelector('[name=letterType]')||{}).value||'FCRA611';
    const addr=[data.fullName,data.address1,`${data.city||''} ${data.state||''} ${data.zip||''}`].filter(Boolean).join('\n');
    const today=new Date().toLocaleDateString();
    const tpl={
      FCRA611:(d)=>`Under FCRA §611, I dispute the accuracy/completeness of the information below. Please conduct a reasonable reinvestigation and delete or correct within 30 days.\n\nAccount: ${d.accountName||''} (${d.accountNumber||''})\nIssue: ${d.facts||'Not specific'}\nEnclosures: ${d.idIncluded?'ID, proof of address':''}`,
      FCRA623:(d)=>`Direct Dispute to Furnisher under FCRA §623.\nAccount: ${d.accountName||''} (${d.accountNumber||''})\nIssue: ${d.facts||'Not specific'}\nRequested Action: Delete or correct reporting.`,
      FDCPA:(d)=>`Request for Debt Validation under FDCPA. Provide validation including original creditor, amount owed, and chain of assignment.\n\nAccount: ${d.accountName||''} (${d.accountNumber||''})`,
      GOODWILL:(d)=>`Goodwill Adjustment Request. Please remove derogatory marks as a goodwill gesture given improved history.\n\nAccount: ${d.accountName||''} (${d.accountNumber||''})`,
      PFD:(d)=>`Pay-for-Delete Offer. I propose resolving the account in exchange for deletion of negative reporting from all CRAs.\n\nAccount: ${d.accountName||''} (${d.accountNumber||''})`
    }[t](data);
    g('cr-letter').textContent=`${addr}\n\n${today}\n\nTo Whom It May Concern,\n\n${tpl}\n\nSincerely,\n${data.fullName||''}\n`;
  };
  window.crDownload=function(){const txt=g('cr-letter').textContent||''; const blob=new Blob([txt],{type:'text/plain'});
    const a=document.createElement('a'); a.href=URL.createObjectURL(blob); a.download='credit-letter.txt'; a.click(); URL.revokeObjectURL(a.href);};
  function loadItems(){try{return JSON.parse(localStorage.getItem(KEY_ITEMS)||'[]');}catch(_){return [];}}
  function saveItems(a){try{localStorage.setItem(KEY_ITEMS,JSON.stringify(a));}catch(_){}};
  function renderItems(){const tbody=g('tr-body'); tbody.innerHTML=''; loadItems().forEach(it=>{
    const tr=document.createElement('tr'); tr.innerHTML=`<td>${it.bureau}</td><td>${it.acct}</td><td>${it.sent}</td><td>${it.status}</td><td>${it.notes||''}</td>`; tbody.appendChild(tr);
  });}
  window.crAddItem=function(){const it={
    bureau:(g('tr-bureau')||{}).value||'Experian', acct:(g('tr-acct')||{}).value||'',
    sent:(g('tr-sent')||{}).value||'', status:(g('tr-status')||{}).value||'Sent',
    notes:(g('tr-notes')||{}).value||''};
    const arr=loadItems(); arr.push(it); saveItems(arr); renderItems();};
  window.crClearItems=function(){saveItems([]); renderItems();};
  function setMsg(t){const m=g('cr-msg'); if(m) m.textContent=t;}
  if(document.readyState==='loading'){document.addEventListener('DOMContentLoaded', renderItems);} else {renderItems();}
})();