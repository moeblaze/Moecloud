// consultation-config.js
// Drop-in thresholds & labels for lead qualification (overrides defaults in consultation.js)
window.MCC_QUALIFY_CFG = {
  thresholds: {
    "No‑Code Playbook": 40,
    "Integration (AI Assist)": 60,     // slightly stricter
    "White‑Label Ecosystem": 70,       // stricter
    "Enterprise Transformation": 80    // stricter for Enterprise
  },
  blurbs: {
    "Enterprise Transformation": "For enterprises with $250k+/mo cloud spend, 50+ engineers, regulated or at-scale workloads, and executive sponsorship."
  },
  // When true, Enterprise button shows a badge/tooltip to deter unqualified clicks.
  guardEnterprise: true
};