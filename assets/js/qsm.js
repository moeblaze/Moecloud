(function(){
  window.qsmCalc=function(e){e.preventDefault();const v=[];for(let i=1;i<=12;i++){v.push(Number(e.target['q'+i].value||0));}
    const pillars={Attention:avg(v.slice(0,3)),Language:avg(v.slice(3,6)),Inputs:avg(v.slice(6,9)),Discipline:avg(v.slice(9,12))};
    const overall=avg(v),band=bandText(overall);
    document.getElementById('qsm-summary').innerHTML=`Spiral Index: <strong>${overall.toFixed(1)}/10</strong> <span class="score-badge ${band.cls}">${band.txt}</span>`;
    document.getElementById('qsm-pillars').innerHTML=Object.entries(pillars).map(([k,s])=>`<article class="card"><h4>${k}</h4><p>Score: <strong>${s.toFixed(1)}/10</strong></p>${coach(k,s)}</article>`).join('');
    document.getElementById('qsm-plan').innerHTML=renderPlan(pillars);
    document.getElementById('qsm-result').hidden=false;setMsg('Calculated.');return false;};
  window.qsmReset=function(){document.querySelectorAll('#qsm-assess input[type=range]').forEach(r=>r.value=5);document.getElementById('qsm-result').hidden=true;setMsg('Reset.');};
  window.qsmSave=function(){const values=[];for(let i=1;i<=12;i++){const el=document.querySelector(`[name=q${i}]`);values.push(el?Number(el.value||0):0);} try{localStorage.setItem('qsmAssessment',JSON.stringify({values}));}catch(_){}};
  window.qsmLoad=function(){try{const raw=localStorage.getItem('qsmAssessment');if(!raw)return;const data=JSON.parse(raw);(data.values||[]).forEach((n,i)=>{const el=document.querySelector(`[name=q${i+1}]`);if(el)el.value=n;});setMsg('Loaded.');}catch(_){} };
  window.qsmCopy=function(id){const el=document.getElementById(id); el.select(); el.setSelectionRange(0,99999); document.execCommand('copy'); };
  window.qsmSaveOwn=function(){ try{localStorage.setItem('qsmOwnership',document.getElementById('qsm-own').value||'');}catch(_){} };
  function avg(a){return a.reduce((s,x)=>s+Number(x||0),0)/a.length;}
  function bandText(x){if(x<4)return{txt:'Downward',cls:'bad'};if(x<6)return{txt:'Drifting',cls:'warn'};if(x<8)return{txt:'Rising',cls:'good'};return{txt:'Compounding',cls:'ok'};}
  function coach(k,v){const tips={Attention:['4‑4‑6 breath + “I choose …” for 2 minutes.','25‑min focus block; phone in another room.'],Language:['Swap “I can’t” → “I choose/I will.”','State outcomes in present‑tense specifics.'],Inputs:['Desk reset + block 1 toxic feed.','Add 2 constructive inputs.'],Discipline:['3‑item shutdown checklist tonight.','Do the next right action.']};const list=(v<6)?tips[k]:(v<8)?tips[k].slice(0,1):['Keep compounding.'];return `<ul style="padding-left:18px;line-height:1.5">${list.map(s=>`<li>${s}</li>`).join('')}</ul>`;}
  function renderPlan(p){const days=[{d:'Day 1',a:'Awareness log.'},{d:'Day 2',a:'Observer Collapse Drill x3.'},{d:'Day 3',a:'Reframe 3 stories.'},{d:'Day 4',a:'Room reset + feed cleanup.'},{d:'Day 5',a:'Full startup + shutdown.'},{d:'Day 6',a:'One act of service.'},{d:'Day 7',a:'Weekly review + next targets.'}];const lines=Object.entries(p).map(([k,v])=>`${k}: ${v.toFixed(1)}/10`).join(' • ');return `<p class="tiny">Pillars — ${lines}</p><div class="grid">`+days.map(x=>`<article class="card"><h4>${x.d}</h4><p>${x.a}</p></article>`).join('')+`</div>`;}
  function setMsg(t){const m=document.getElementById('qsm-msg'); if(m) m.textContent=t;}
})();