const allowed = {free:0, pro:1, elite:2};
function currentLevel(){ return allowed[localStorage.getItem('mbcc_tier')||'free'] ?? 0; }
function requiredLevel(el){ return allowed[el.getAttribute('data-gate')] ?? 0; }
function gateContent(){
  const level = currentLevel();
  document.querySelectorAll('[data-gate]').forEach(el=>{
    if(level >= requiredLevel(el)) return;
    el.style.position='relative';
    const lock = document.createElement('div');
    lock.innerHTML = `
      <div class="lock-card">
        <div style="font-weight:800;margin-bottom:6px">Locked Content</div>
        <div style="opacity:.9;margin-bottom:8px">Upgrade to access this section.</div>
        <div style="display:flex;gap:8px;flex-wrap:wrap;justify-content:center">
          <a class="btn" href="index.html#tiers">See Tiers</a>
          <a class="btn btn-primary" href="index.html#tiers">Upgrade</a>
        </div>
      </div>`;
    Object.assign(lock.style, {position:'absolute', inset:'0', display:'grid', placeItems:'center',
      background:'linear-gradient(180deg, rgba(14,14,16,.6), rgba(14,14,16,.85))', border:'1px solid rgba(255,255,255,0.08)', borderRadius:'14px'});
    el.appendChild(lock);
  });
}
document.addEventListener('DOMContentLoaded', gateContent);