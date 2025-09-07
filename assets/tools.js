
function copyText(elId) {
  const el = document.getElementById(elId);
  const text = el?.innerText || el?.textContent || "";
  navigator.clipboard.writeText(text);
}
function printSection(elId){
  const el = document.getElementById(elId);
  const w = window.open("", "_blank");
  const css = document.querySelector('link[rel="stylesheet"]')?.outerHTML || "";
  w.document.write(`<!doctype html><html><head><meta charset="utf-8">${css}<title>Print</title></head><body>${el?.outerHTML||''}</body></html>`);
  w.document.close(); setTimeout(()=>{ w.print(); w.close(); }, 200);
}
