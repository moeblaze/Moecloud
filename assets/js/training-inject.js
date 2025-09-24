(function(){
  function ready(fn){ if(document.readyState!=='loading') fn(); else document.addEventListener('DOMContentLoaded', fn); }
  function isTrainingIndex(){
    var p = location.pathname;
    return p.endsWith('/training/index.html') || /\/training\/?$/.test(p);
  }
  ready(function(){
    if(!isTrainingIndex() || document.getElementById('mcc_impl_course_card')) return;
    var wrap = document.querySelector('.section .wrap') || document.querySelector('.wrap');
    if(!wrap) return;
    var section = document.createElement('section');
    section.className = "section";
    section.innerHTML = '<div class="wrap"><div class="grid cards three" id="mcc_impl_course_card">'
      + '<div class="card rise">'
      + '<h3>Playbook Implementation</h3>'
      + '<p class="micro">4–6 weeks · blended · Intermediate‑Advanced</p>'
      + '<ul><li>Zero‑Trust Landing Zone & VPCs</li><li>EKS + GitOps + OPA</li><li>API GW + Lambda · RDS/DynamoDB</li><li>S3 + CloudFront + WAF</li><li>Otel · Grafana · Prometheus</li></ul>'
      + '<div style="display:flex;gap:10px;flex-wrap:wrap;margin-top:8px">'
      + '<a class="btn" href="implementation.html">View course</a>'
      + '<a class="btn gold" href="#" data-mcc-consult data-tier="Integration (AI Assist)">Book consultation</a>'
      + '</div>'
      + '</div></div></div>';
    // Prefer inserting above the footer
    var before = document.querySelector('footer.site-footer');
    if(before && before.parentNode){ before.parentNode.insertBefore(section, before); }
    else { document.body.appendChild(section); }
    // Try to ensure consultation.js is loaded so the button works
    var s = document.createElement('script'); s.src = "../assets/js/consultation.js"; document.body.appendChild(s);
  });
})();