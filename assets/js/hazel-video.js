/* Front-end only demo logic for Hazel AI Video Creation */
window.HazelVideo = (function(){
  const el = (id)=>document.getElementById(id);
  function storyboard(){
    const title = el('title').value || 'Untitled Project';
    const script = (el('script').value || '').split(/\n+/).filter(Boolean);
    const ratio = el('ratio').value;
    const style = el('style').value;
    const voice = el('voice').value;
    const lines = script.length ? script : [
      'Hook: Problem → Product grid',
      'Value: Smart promotion based on intent',
      'CTA: Shop Now',
    ];
    const sb = lines.map((line,i)=>`Scene ${i+1} (${ratio}, ${style}, VO: ${voice}) — ${line}`).join('<br>');
    el('storyboard').innerHTML = `<strong>${title}</strong><br>` + sb;
  }
  function render(){
    el('preview').textContent = 'Rendering preview… (front-end mock). Connect API to enable real renders.';
    setTimeout(()=>{ el('preview').textContent = 'Preview ready — replace this with your player when backend is connected.'; }, 1200);
  }
  return {storyboard, render};
})();