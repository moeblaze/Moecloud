const { getTableClient, getEmailClient, sender, siteOrigin, env } = require('../_lib');
module.exports = async function (context, req) {
  try {
    const secret = (req.headers['x-admin-secret'] || (req.query && req.query.secret));
    if (!secret || secret !== env('ADMIN_SECRET')){ context.res = { status:401, jsonBody:{ ok:false, error:'Unauthorized' } }; return; }
    const subject = (req.body && req.body.subject) || 'MCC Update'; const html = (req.body && req.body.html) || '<p>Hello from MCC</p>';
    const client = getEmailClient(); const from = sender();
    if (!client || !from){ context.res = { status:200, jsonBody:{ ok:true, message:'No email client configured; dry run complete.' } }; return; }
    const table = getTableClient(); const iter = table.listEntities({ queryOptions: { filter:"status eq 'confirmed'" } });
    let count=0; for await (const ent of iter){ const to = ent.rowKey; const unsub = `${siteOrigin()}/api/unsubscribe?e=${encodeURIComponent(to)}`;
      await client.send({ senderAddress: from, content:{ subject, html: html + `<p style='font-size:12px;opacity:.7'>—<br><a href="${unsub}">Unsubscribe</a></p>`, plainText:'Visit site for content.' }, recipients:{ to:[{ address:to }] } });
      count++; }
    context.res = { status:200, jsonBody:{ ok:true, sent:count } };
  } catch(err){ context.res = { status:500, jsonBody:{ ok:false, error:'Server error' } }; }
};