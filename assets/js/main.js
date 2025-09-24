
function calcROI(){
  const eng=+document.getElementById('roi_eng').value||0;
  const cost=+document.getElementById('roi_cost').value||0;
  const deploy=+document.getElementById('roi_deploy').value||1;
  const mttr=+document.getElementById('roi_mttr').value||1;
  const cloud=+document.getElementById('roi_cloud').value||0;
  const prod_low=0.10, prod_high=0.20;
  const dev_low=eng*cost*prod_low, dev_high=eng*cost*prod_high;
  const outages=Math.max(1, Math.round(deploy/2));
  const blended=(eng*cost)/(52*40);
  const rel=outages*mttr*0.60*blended*12;
  const fin_low=cloud*0.15*12, fin_high=cloud*0.30*12;
  const tot_low=dev_low+rel+fin_low, tot_high=dev_high+rel+fin_high;
  const $=x=>'$'+(Math.round(x)).toLocaleString();
  document.getElementById('roi_result').innerHTML=`
    <ul>
      <li>Developer productivity: <b>${$(dev_low)} – ${$(dev_high)}</b></li>
      <li>Reliability/MTTR savings: <b>${$(rel)}</b></li>
      <li>FinOps savings: <b>${$(fin_low)} – ${$(fin_high)}</b></li>
      <li>Total annual impact: <b>${$(tot_low)} – ${$(tot_high)}</b></li>
    </ul>
    <div style="margin-top:10px">
      <a class="btn gold" href="docs/MCC_Executive_OnePager.pdf">Attach One-Pager</a>
      <a class="btn ghost" href="partners.html">See Partner Pricing</a>
    </div>`;
}
function exportROICSV(){
  const eng=+document.getElementById('roi_eng').value||0;
  const cost=+document.getElementById('roi_cost').value||0;
  const deploy=+document.getElementById('roi_deploy').value||1;
  const mttr=+document.getElementById('roi_mttr').value||1;
  const cloud=+document.getElementById('roi_cloud').value||0;
  const prod_low=0.10, prod_high=0.20;
  const dev_low=eng*cost*prod_low, dev_high=eng*cost*prod_high;
  const outages=Math.max(1, Math.round(deploy/2));
  const blended=(eng*cost)/(52*40);
  const rel=outages*mttr*0.60*blended*12;
  const fin_low=cloud*0.15*12, fin_high=cloud*0.30*12;
  const tot_low=dev_low+rel+fin_low, tot_high=dev_high+rel+fin_high;
  const rows=[['Metric','Value (Low)','Value (High)'],['Engineers',eng,''],['Loaded cost per engineer (annual)',cost,''],['Deploys per month (current)',deploy,''],['MTTR (hours)',mttr,''],['Monthly cloud spend',cloud,''],['Developer productivity gain',Math.round(dev_low),Math.round(dev_high)],['Reliability/MTTR savings (annual)',Math.round(rel), ''],['FinOps savings (annual)',Math.round(fin_low),Math.round(fin_high)],['Total annual impact',Math.round(tot_low),Math.round(tot_high)]];
  const csv=rows.map(r=>r.map(x=>`"${String(x).replace(/"/g,'""')}"`).join(',')).join('\n');
  const blob=new Blob([csv],{type:'text/csv;charset=utf-8;'}); const url=URL.createObjectURL(blob);
  const a=document.createElement('a'); a.href=url; a.download='MCC_ROI_Estimate.csv'; document.body.appendChild(a); a.click(); document.body.removeChild(a); URL.revokeObjectURL(url);
}
function mccIsSubscribed(){ try { return JSON.parse(localStorage.getItem('mccNewsOK')||'false')===true; }catch(e){ return false; } }
document.addEventListener('DOMContentLoaded',function(){
  document.querySelectorAll('a[href*="docs/"]').forEach(a=>{
    a.addEventListener('click',function(e){ if(!mccIsSubscribed()){ e.preventDefault(); alert('Please subscribe to the newsletter to access downloads.'); location.href='newsletter.html'; } });
  });
});
