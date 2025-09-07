
(function(){
  if (window._mbccConsentLoaded) return; window._mbccConsentLoaded = true;
  const PUB_ID = "ca-pub-8387411349417007";
  function loadAdSense(){
    if (window._adsLoaded) return; window._adsLoaded = true;
    const s = document.createElement('script'); s.async = true;
    s.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=" + encodeURIComponent(PUB_ID);
    s.crossOrigin = "anonymous";
    s.onload = function(){ document.querySelectorAll('ins.adsbygoogle').forEach(()=> (window.adsbygoogle = window.adsbygoogle || []).push({})); };
    document.head.appendChild(s);
  }
  function setConsent(v){ try{ localStorage.setItem('mbccConsent', JSON.stringify(v)); }catch(e){} }
  function getConsent(){ try{ return JSON.parse(localStorage.getItem('mbccConsent')||'null'); }catch(e){ return null; } }
  function banner(){
    if (document.getElementById('mbcc-consent')) return;
    const d = document.createElement('div'); d.id='mbcc-consent';
    d.style.cssText="position:fixed;left:0;right:0;bottom:0;background:#111;color:#fff;padding:14px;z-index:9999;box-shadow:0 -4px 20px rgba(0,0,0,.25);";
    d.innerHTML=`<div style="max-width:1100px;margin:0 auto;display:flex;gap:10px;align-items:center;flex-wrap:wrap;justify-content:space-between">
      <div style="flex:1;min-width:260px">We use cookies to personalize content and run ads via Google AdSense. See our <a href="privacy.html" style="color:#ffd700">Privacy Policy</a>.</div>
      <div style="display:flex;gap:8px">
        <button id="mbcc-accept" style="background:#ffd700;color:#111;border:0;padding:10px 14px;border-radius:8px;cursor:pointer">Accept</button>
        <button id="mbcc-decline" style="background:#333;color:#fff;border:1px solid #555;padding:10px 14px;border-radius:8px;cursor:pointer">Decline</button>
      </div></div>`;
    document.body.appendChild(d);
    document.getElementById('mbcc-accept').onclick=()=>{ setConsent({ads:true,ts:new Date().toISOString()}); d.remove(); loadAdSense(); };
    document.getElementById('mbcc-decline').onclick=()=>{ setConsent({ads:false,ts:new Date().toISOString()}); d.remove(); };
  }
  document.addEventListener('DOMContentLoaded', ()=>{ const c=getConsent(); if(!c) banner(); else if(c.ads) loadAdSense(); });
})();