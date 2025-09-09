
(function(){
  const KEY_INTAKE='crp_intake', KEY_ITEMS='crp_items';
  function g(id){return document.getElementById(id);}
  function setMsg(t){const m=g('cr-msg'); if(m) m.textContent=t;}

  window.crSaveIntake=function(e){e.preventDefault();const d=Object.fromEntries(new FormData(e.target).entries());
    try{localStorage.setItem(KEY_INTAKE,JSON.stringify(d)); setMsg('Saved intake.');}catch(_){ setMsg('Save failed.'); }
    return false;};

  window.crLoadIntake=function(){try{const raw=localStorage.getItem(KEY_INTAKE); if(!raw) return setMsg('No saved intake.');
    const d=JSON.parse(raw); Object.keys(d).forEach(k=>{const el=document.querySelector(`[name="${k}"]`); if(el) el.value=d[k];}); setMsg('Loaded.'); }catch(_){ setMsg('Load failed.'); }};

  window.crResetIntake=function(){const f=document.getElementById('cr-intake'); f && f.reset(); setMsg('Reset.');};

  function letterFor(type,d){
    const head = `${d.fullName||''}\n${d.address1||''}\n${(d.city||'')+' '+(d.state||'')+' '+(d.zip||'')}\n\n${new Date().toLocaleDateString()}\n\n`;
    const base = {
      FCRA611: (dd)=>`Re: Dispute under FCRA §611\n\nTo Whom It May Concern,\n\nI dispute the accuracy/completeness of the information listed below. Please conduct a reasonable reinvestigation and delete or correct within 30 days.\n\nAccount: ${dd.accountName||''} (${dd.accountNumber||''})\nIssue: ${dd.facts||'Not specific'}\n\nEnclosures: ${dd.idIncluded?'Government ID, and proof of address':''}\n\nSincerely,\n${dd.fullName||''}`,
      FCRA623: (dd)=>`Re: Direct Dispute under FCRA §623\n\nTo Whom It May Concern,\n\nI am disputing directly with the furnisher the accuracy of the account below. Please investigate and correct or delete any inaccurate or incomplete information.\n\nAccount: ${dd.accountName||''} (${dd.accountNumber||''})\nIssue: ${dd.facts||'Not specific'}\n\nSincerely,\n${dd.fullName||''}`,
      FDCPA:  (dd)=>`Re: Debt Validation Request (FDCPA)\n\nProvide validation including the original creditor, amount owed, and chain of assignment. Cease collection until validation is provided.\n\nAccount: ${dd.accountName||''} (${dd.accountNumber||''})\n\nSincerely,\n${dd.fullName||''}`,
      GOODWILL:(dd)=>`Re: Goodwill Adjustment Request\n\nGiven my improved payment history, please remove derogatory marks as a goodwill gesture.\n\nAccount: ${dd.accountName||''} (${dd.accountNumber||''})\n\nSincerely,\n${dd.fullName||''}`,
      PFD:    (dd)=>`Re: Pay‑for‑Delete Offer\n\nI propose resolving the account in exchange for deletion of negative reporting from all CRAs upon receipt of payment confirmation.\n\nAccount: ${dd.accountName||''} (${dd.accountNumber||''})\n\nSincerely,\n${dd.fullName||''}`
    }[type](d);
    return head + base + '\n';
  }

  window.crGen=function(){
    const d = Object.fromEntries(new FormData(document.getElementById('cr-intake')).entries());
    const required = ['fullName','accountName','letterType'];
    for(const k of required){ if(!(d[k]||'').trim()){ alert('Please fill required fields (Name, Account, Letter Type).'); return; } }
    const t = d.letterType || 'FCRA611';
    const txt = letterFor(t,d);
    document.getElementById('cr-letter').textContent = txt;
  };

  window.crCopy=function(){
    const txt = (document.getElementById('cr-letter').textContent||'').trim();
    if(!txt) return;
    navigator.clipboard.writeText(txt).then(()=>alert('Copied.')).catch(()=>{});
  };

  window.crDownload=function(){
    const txt = document.getElementById('cr-letter').textContent||'';
    const blob = new Blob([txt],{type:'text/plain'});
    const a=document.createElement('a'); a.href=URL.createObjectURL(blob); a.download='credit-letter.txt'; a.click(); URL.revokeObjectURL(a.href);
  };

  function loadItems(){ try{return JSON.parse(localStorage.getItem(KEY_ITEMS)||'[]');}catch(_){return [];} }
  function saveItems(a){ try{localStorage.setItem(KEY_ITEMS, JSON.stringify(a));}catch(_){} }
  function renderItems(){ const tbody = document.getElementById('tr-body'); tbody.innerHTML=''; loadItems().forEach(it=>{
    const tr=document.createElement('tr'); tr.innerHTML=`<td>${it.bureau}</td><td>${it.acct}</td><td>${it.sent}</td><td>${it.status}</td><td>${it.notes||''}</td>`; tbody.appendChild(tr);
  }); }

  window.crAddItem=function(){
    const it={ bureau:(g('tr-bureau')||{}).value||'Experian', acct:(g('tr-acct')||{}).value||'', sent:(g('tr-sent')||{}).value||'', status:(g('tr-status')||{}).value||'Sent', notes:(g('tr-notes')||{}).value||'' };
    const arr=loadItems(); arr.push(it); saveItems(arr); renderItems();
  };

  window.crClearItems=function(){ saveItems([]); renderItems(); };

  if(document.readyState==='loading'){ document.addEventListener('DOMContentLoaded', renderItems); } else { renderItems(); }
})();
