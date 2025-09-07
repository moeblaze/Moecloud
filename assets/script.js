
// Configure your Azure Function endpoint here:
const MBCC_ENDPOINT = "https://<YOUR-FUNCTION-APP>.azurewebsites.net/api/subscribe"; // <-- replace with your real URL

const MBCC = {
  async handleSignup(e){
    e.preventDefault();
    const form = e.target;
    const data = Object.fromEntries(new FormData(form).entries());

    // Basic validation
    if (!data.name || !data.email){
      alert("Please enter your name and email.");
      return false;
    }

    // POST to Azure Function
    try{
      const res = await fetch(MBCC_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          name: data.name, 
          email: data.email, 
          interest: data.interest || "General",
          source: location.pathname,
          ts: new Date().toISOString()
        })
      });
      if (!res.ok){
        const text = await res.text();
        throw new Error(`Function error ${res.status}: ${text}`);
      }
      const msg = document.getElementById('signupMsg');
      if (msg){ msg.textContent = "You're in! Check your inbox for a welcome email."; }
      form.reset();
    }catch(err){
      console.error(err);
      alert("We couldn't reach the server. Please try again later.");
    }
    return false;
  }
};

// Newsletter page may still render local demo table if needed (optional).
// Commented out for production since we are now storing signups in Azure.
// (Uncomment if you want a local debug view)
/*
(function(){
  const table = document.getElementById('signupTable');
  if (!table) return;
  const tbody = table.querySelector('tbody');
  const all = JSON.parse(localStorage.getItem('mbcc_signups')||'[]').reverse();
  all.forEach(row => {
    const tr = document.createElement('tr');
    tr.innerHTML = \`
      <td style="padding:10px;border-bottom:1px solid rgba(255,255,255,.08)">${row.name||''}</td>
      <td style="padding:10px;border-bottom:1px solid rgba(255,255,255,.08)">${row.email||''}</td>
      <td style="padding:10px;border-bottom:1px solid rgba(255,255,255,.08)">${row.interest||''}</td>
    \`;
    tbody.appendChild(tr);
  });
})();
*/
