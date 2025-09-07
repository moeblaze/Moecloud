// Generic helpers
function copyText(elId) {
  const el = document.getElementById(elId);
  if (!el) return;
  const text = el.innerText || el.textContent || el.value || "";
  navigator.clipboard.writeText(text).then(()=>{
    alert("Copied to clipboard.");
  });
}
function printSection(elId){
  const el = document.getElementById(elId);
  if (!el) return window.print();
  const w = window.open("", "_blank");
  const css = document.querySelector('link[rel="stylesheet"]')?.outerHTML || "";
  w.document.write(`<!doctype html><html><head><meta charset="utf-8">${css}<title>Print</title><style>@media print{.header,.footer,.nav,.btn{display:none !important} body{background:#fff}}</style></head><body>${el.outerHTML}</body></html>`);
  w.document.close();
  setTimeout(()=>{ w.focus(); w.print(); w.close(); }, 300);
}
function sanitize(str){ return (str||"").toString().replace(/[<>]/g, s => ({'<':'&lt;','>':'&gt;'}[s])); }
function lines(str){ return (str||"").split(/\r?\n/).map(s=>s.trim()).filter(Boolean); }
function sumPrices(linesArr){
  let total = 0;
  linesArr.forEach(l=>{
    const parts = l.split("|");
    const price = parseFloat((parts[1]||"").replace(/[^0-9.\-]/g,""));
    if (!isNaN(price)) total += price;
  });
  return total;
}
