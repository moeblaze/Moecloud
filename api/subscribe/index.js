// api/subscribe/index.js
const { getTableClient, token, getEmailClient, sender, siteOrigin } = require('../_lib');

module.exports = async function (context, req) {
  try {
    const email = (req.body && (req.body.email || req.body.e)) || (req.query && req.query.email) || '';
    if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      context.res = { status: 400, jsonBody: { ok:false, error: 'Invalid email' } };
      return;
    }

    const table = getTableClient();
    await table.createTable({ onResponse: ()=>{} }).catch(()=>{});

    const rowKey = email.trim().toLowerCase();
    const confirmToken = token();
    const entity = {
      partitionKey: 'subscribers',
      rowKey,
      status: 'pending',
      createdAt: new Date().toISOString(),
      confirmToken,
      unsubToken: token()
    };

    // Upsert
    await table.upsertEntity(entity, 'Merge');

    // Send double opt-in email if ACS configured
    const client = getEmailClient();
    const from = sender();
    const origin = siteOrigin();
    const confirmUrl = `${origin}/api/confirm?token=${confirmToken}&e=${encodeURIComponent(rowKey)}`;

    if (client && from) {
      await client.send({
        senderAddress: from,
        content: {
          subject: 'Confirm your subscription',
          plainText: `Thanks for subscribing to MoeCommunityCloud! Confirm: ${confirmUrl}`,
          html: `<p>Thanks for subscribing to <strong>MoeCommunityCloud</strong>!</p><p>Please confirm your email by clicking the button below:</p><p><a href="${confirmUrl}" style="background:#d4af37;color:#111;padding:10px 16px;border-radius:8px;text-decoration:none;font-weight:bold">Confirm Subscription</a></p>`
        },
        recipients: { to: [{ address: rowKey }] }
      });
    }

    context.res = { status: 200, jsonBody: { ok: true, message: 'Check your email to confirm.' } };
  } catch (err) {
    context.log('subscribe error', err);
    context.res = { status: 500, jsonBody: { ok:false, error: 'Server error' } };
  }
}
