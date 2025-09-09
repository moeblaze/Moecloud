(function(){
  var CLIENT="ca-pub-8387411349417007";
  function load(cb){
    if (window.adsbygoogle && window.adsbygoogle.loaded) { cb&&cb(); return; }
    var s=document.createElement('script'); s.async=true;
    s.src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client="+CLIENT;
    s.crossOrigin="anonymous"; s.onload=cb||null; document.head.appendChild(s);
  }
  function pushAll(){ try{ document.querySelectorAll('ins.adsbygoogle').forEach(function(){ (window.adsbygoogle=window.adsbygoogle||[]).push({}); }); }catch(e){} }
  if(document.readyState==="loading"){ document.addEventListener("DOMContentLoaded", function(){ load(pushAll); }); } else { load(pushAll); }
})();