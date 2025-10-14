const { getTableClient } = require('../_lib');
module.exports = async function (context, req) {
  try {
    const token = (req.query && req.query.token) || ''; const e = (req.query && req.query.e || '').toLowerCase();
    if (!token || !e){ context.res = { status:400, body:'Missing token.' }; return; }
    const table = getTableClient(); const ent = await table.getEntity('subscribers', e).catch(()=>null);
    if (!ent || ent.confirmToken !== token){ context.res = { status:400, body:'Invalid token.' }; return; }
    ent.status='confirmed'; ent.confirmedAt=new Date().toISOString(); await table.updateEntity(ent,'Replace');
    context.res = { status:200, headers:{'Content-Type':'text/html'}, body:'<h1>Subscription confirmed</h1><p>Welcome!</p>' };
  } catch(err){ context.res = { status:500, body:'Server error' }; }
};