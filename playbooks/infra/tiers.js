document.addEventListener('click', (e)=>{
  const a = e.target.closest('a[data-tier]');
  if(!a) return;
  e.preventDefault();
  const tier = a.dataset.tier;
  localStorage.setItem('mbcc_tier', tier);
  alert(`Selected tier: ${tier.toUpperCase()}\n(Connect Stripe/PayPal and set this after success.)`);
});