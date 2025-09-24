(function(){
  function ready(fn){ if(document.readyState!=='loading') fn(); else document.addEventListener('DOMContentLoaded', fn); }
  function h(tag, attrs, html){ const e=document.createElement(tag); if(attrs) for(const k in attrs) e.setAttribute(k, attrs[k]); if(html!=null) e.innerHTML=html; return e; }
  function mountModal(){
    if(document.getElementById('mcc_consult_modal')) return;
    const modal = h('div', { id:'mcc_consult_modal', style:'position:fixed;inset:0;background:rgba(0,0,0,.5);display:none;z-index:9999;align-items:center;justify-content:center;padding:10px' });
    const card = h('div', { style:'background:#fff;max-width:720px;width:100%;border-radius:16px;box-shadow:0 10px 30px rgba(0,0,0,.2);' });
    const inner = `
      <div style="padding:16px 20px;border-bottom:1px solid #eee;display:flex;justify-content:space-between;align-items:center">
        <h3 style="margin:0">Book a Consultation</h3>
        <button id="mcc_consult_close" class="btn ghost">×</button>
      </div>
      <div style="padding:20px">
        <form id="mcc_consult_form">
          <div class="grid two">
            <label>Company <input required id="mcc_c_company" style="width:100%"></label>
            <label>Website <input id="mcc_c_site" style="width:100%" placeholder="https://"></label>
            <label>Contact Email <input required type="email" id="mcc_c_email" style="width:100%"></label>
            <label>Industry
              <select id="mcc_c_industry" style="width:100%">
                <option>Software / SaaS</option><option>Finance / Fintech</option><option>Healthcare / Life Sciences</option>
                <option>Retail / eCommerce</option><option>Manufacturing</option><option>Energy / Utilities</option>
                <option>Public Sector</option><option>Other</option>
              </select>
            </label>
            <label>Company Size
              <select id="mcc_c_size" style="width:100%">
                <option value="1-10">1–10</option><option value="11-50">11–50</option><option value="51-200">51–200</option>
                <option value="201-1000">201–1,000</option><option value="1001-5000">1,001–5,000</option><option value="5000+">5,000+</option>
              </select>
            </label>
            <label>Monthly Cloud Spend (USD) <input type="number" id="mcc_c_spend" min="0" value="50000" style="width:100%"></label>
            <label>Timeline
              <select id="mcc_c_time" style="width:100%">
                <option>ASAP (0–30 days)</option><option>1–3 months</option><option>3–6 months</option><option>6+ months</option>
              </select>
            </label>
          </div>
          <label>Which package are you interested in?
            <select id="mcc_c_tier" style="width:100%">
              <option>No‑Code Playbook</option>
              <option>Integration (AI Assist)</option>
              <option>White‑Label Ecosystem</option>
              <option>Enterprise Transformation</option>
            </select>
          </label>
          <label>Notes <textarea id="mcc_c_notes" style="width:100%;min-height:100px" placeholder="Tell us a bit about goals, constraints, and urgency."></textarea></label>
          <div style="display:flex;gap:10px;flex-wrap:wrap;margin-top:10px">
            <button class="btn gold" type="submit">Check Fit & Continue</button>
            <button class="btn ghost" type="button" id="mcc_consult_cancel">Cancel</button>
          </div>
          <p id="mcc_consult_msg" class="micro" style="margin-top:8px"></p>
        </form>
        <div id="mcc_consult_result" style="display:none;margin-top:10px"></div>
      </div>`;
    card.innerHTML = inner;
    modal.appendChild(card);
    document.body.appendChild(modal);
    document.getElementById('mcc_consult_close').onclick = hide;
    document.getElementById('mcc_consult_cancel').onclick = hide;

    function hide(){ modal.style.display='none'; }
    function show(){ modal.style.display='flex'; }
    window.MCCConsultModal = { show, hide };
    const form = document.getElementById('mcc_consult_form');
    form.addEventListener('submit', async function(e){
      e.preventDefault();
      const payload = {
        company: document.getElementById('mcc_c_company').value.trim(),
        website: document.getElementById('mcc_c_site').value.trim(),
        email: document.getElementById('mcc_c_email').value.trim(),
        industry: document.getElementById('mcc_c_industry').value,
        size: document.getElementById('mcc_c_size').value,
        cloud_spend: +document.getElementById('mcc_c_spend').value||0,
        timeline: document.getElementById('mcc_c_time').value,
        tier: document.getElementById('mcc_c_tier').value,
        notes: document.getElementById('mcc_c_notes').value.trim(),
        referrer: document.referrer || ''
      };
      const msg = document.getElementById('mcc_consult_msg');
      msg.textContent = "Evaluating…";
      try{ gtag('event','consult_submit'); }catch(e){}
      let res = null;
      try{
        if(window.MCCAI && typeof MCCAI.leadQualify==='function'){
          res = await MCCAI.leadQualify(payload);
        }
      }catch(e){ /* ignore */ }
      if(!res || !res.score){
        // Simple fallback scoring (rules of thumb)
        const weights = { spend: 0, size: 0, tier: 0, timeline: 0 };
        weights.spend = Math.min(50, (payload.cloud_spend||0)/10000); // $10k/mo => 1pt
        const sizeMap = { '1-10':5, '11-50':10, '51-200':20, '201-1000':30, '1001-5000':35, '5000+':40 };
        weights.size = sizeMap[payload.size] || 10;
        const tierMap = { 'No‑Code Playbook':10, 'Integration (AI Assist)':20, 'White‑Label Ecosystem':30, 'Enterprise Transformation':40 };
        weights.tier = tierMap[payload.tier] || 10;
        const timeMap = { 'ASAP (0–30 days)':20, '1–3 months':15, '3–6 months':10, '6+ months':5 };
        weights.timeline = timeMap[payload.timeline] || 10;
        const score = Math.min(100, Math.round(weights.spend + weights.size + weights.tier + weights.timeline));
        res = { ok:true, score, reasons:['Fallback scoring'], summary: 'Preliminary score based on inputs.' };
      }
      const result = document.getElementById('mcc_consult_result');
      result.style.display='block';
      let tierThreshold = 0, nextStep = '';
      switch(payload.tier){
        case 'Enterprise Transformation': tierThreshold = 75; break;
        case 'White‑Label Ecosystem': tierThreshold = 65; break;
        case 'Integration (AI Assist)': tierThreshold = 55; break;
        default: tierThreshold = 40;
      }
      if(res.score >= tierThreshold){
        nextStep = 'Looks like a strong fit. Click below to request scheduling.';
      } else {
        nextStep = 'Thanks! Based on your inputs, we recommend starting with a lower tier or a discovery call.';
      }
      result.innerHTML = '<div class="card"><p><b>Fit score:</b> '
        + (res.score||'—')
        + '/100</p><p>'
        + (res.summary||'')
        + '</p><p>' + nextStep + '</p>'
        + '<div style="display:flex;gap:10px;flex-wrap:wrap;margin-top:8px">'
        + '<a class="btn gold" href="/contact.html">Request scheduling</a>'
        + '<button class="btn ghost" id="mcc_consult_export">Export inquiry (CSV)</button>'
        + '</div></div>';
      msg.textContent = "";

      // CSV export
      document.getElementById('mcc_consult_export').onclick = function(){
        const rows = [[
          'timestamp','company','website','email','industry','size','cloud_spend','timeline','tier','score','summary','referrer','notes'
        ], [
          new Date().toISOString(), payload.company, payload.website, payload.email, payload.industry, payload.size,
          payload.cloud_spend, payload.timeline, payload.tier, (res.score||''), (res.summary||'').replace(/[\r\n]+/g,' '),
          payload.referrer, payload.notes
        ]];
        const csv = rows.map(r=>r.map(x=>`"${String(x).replace(/"/g,'""')}"`).join(',')).join('\n');
        const blob = new Blob([csv], {type:'text/csv;charset=utf-8;'});
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a'); a.href = url; a.download = 'MCC_Consultation_Inquiry.csv';
        document.body.appendChild(a); a.click(); document.body.removeChild(a); URL.revokeObjectURL(url);
        try{ gtag('event','consult_export'); }catch(e){}
      };
      try{ gtag('event','lead_score', {score: res.score}); }catch(e){}
    });
  }
  function wireButtons(){
    document.querySelectorAll('[data-mcc-consult]').forEach(btn=>{
      btn.addEventListener('click', function(e){
        e.preventDefault();
        const tier = btn.getAttribute('data-tier') || '';
        const inp = document.getElementById('mcc_c_tier');
        if(inp) inp.value = tier;
        window.MCCConsultModal && MCCConsultModal.show();
      });
    });
  }
  ready(function(){
    mountModal();
    wireButtons();
  });
})();