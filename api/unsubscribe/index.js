// api/unsubscribe/index.js
const { getTableClient } = require('../_lib');

module.exports = async function (context, req) {
  try {
    const e = (req.query && req.query.e || '').toLowerCase();
    if (!e) { context.res = { status: 400, body: 'Missing email' }; return; }
    const table = getTableClient();
    const ent = await table.getEntity('subscribers', e).catch(()=>null);
    if (!ent) { context.res = { status: 200, body: 'Already removed.' }; return; }
    ent.status = 'unsubscribed';
    ent.unsubscribedAt = new Date().toISOString();
    await table.updateEntity(ent, 'Replace');
    context.res = { status: 200, headers: {'Content-Type':'text/html'}, body: '<h1>Unsubscribed</h1><p>You will no longer receive emails.</p>' };
  } catch (err) {
    context.log('unsubscribe error', err);
    context.res = { status: 500, body: 'Server error' };
  }
}
