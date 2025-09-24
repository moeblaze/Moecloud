(function(){
  function onReady(fn){ if(document.readyState!=='loading') fn(); else document.addEventListener('DOMContentLoaded', fn); }
  function addCSS(){
    if(document.getElementById('mcc_tip_css')) return;
    const s=document.createElement('style'); s.id='mcc_tip_css'; s.textContent = `
      .mcc-tip{position:relative;display:inline-block;margin-left:6px;cursor:pointer}
      .mcc-tip .mcc-badge{display:inline-block;padding:2px 6px;border-radius:999px;font-size:11px;border:1px solid #999}
      .mcc-tip .mcc-panel{position:absolute;left:0;top:120%;min-width:260px;max-width:340px;background:#111;color:#fff;padding:10px 12px;border-radius:10px;box-shadow:0 10px 24px rgba(0,0,0,.2);z-index:9999;display:none}
      .mcc-tip .mcc-panel:before{content:"";position:absolute;left:12px;top:-8px;border-width:8px;border-style:solid;border-color:transparent transparent #111 transparent}
      .mcc-tip:hover .mcc-panel{display:block}
      .mcc-pill{display:inline-block;margin-left:8px;padding:2px 8px;border-radius:999px;background:#222;color:#ffd86b;font-size:11px}
      .mcc-disabled{opacity:.75;pointer-events:auto}
    `; document.head.appendChild(s);
  }
  function thresholds(){
    return (window.MCC_QUALIFY_CFG && window.MCC_QUALIFY_CFG.thresholds) || {};
  }
  function blurbs(){
    return (window.MCC_QUALIFY_CFG && window.MCC_QUALIFY_CFG.blurbs) || {};
  }
  function guardEnterprise(){
    return !!(window.MCC_QUALIFY_CFG && window.MCC_QUALIFY_CFG.guardEnterprise);
  }
  function decorateButtons(){
    addCSS();
    const th=thresholds(), bl=blurbs();
    document.querySelectorAll('[data-mcc-consult][data-tier]').forEach(function(btn){
      const tier = btn.getAttribute('data-tier') || '';
      const tipText = bl[tier];
      const thr = th[tier];
      if(!tipText && !thr) return;
      const wrapper = document.createElement('span');
      wrapper.className = 'mcc-tip';
      const badge = document.createElement('span');
      badge.className = 'mcc-badge';
      badge.textContent = (tier==='Enterprise Transformation'?'Qualify':'Info');
      const panel = document.createElement('div');
      panel.className = 'mcc-panel';
      panel.innerHTML = '<b>'+ tier +'</b>'
        + (thr ? '<div class="mcc-pill">Min score: '+thr+'</div>' : '')
        + '<p style="margin:8px 0 0 0">'+ (tipText || 'Answer 5 quick questions to check fit.') +'</p>';
      wrapper.appendChild(badge); wrapper.appendChild(panel);
      // Insert wrapper after button
      btn.insertAdjacentElement('afterend', wrapper);
      // Enterprise guard: change label to “Check qualification”
      if(tier==='Enterprise Transformation' && guardEnterprise()){
        btn.textContent = 'Check qualification — Enterprise ($1M+)';
      }
    });
  }
  onReady(decorateButtons);
})();