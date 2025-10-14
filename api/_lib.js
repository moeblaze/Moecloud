const { TableClient } = require('@azure/data-tables');
const { EmailClient } = require('@azure/communication-email');
const crypto = require('crypto');
function env(name, fallback=null){ const v=process.env[name]; return v? v : fallback; }
function getTableClient(){ return TableClient.fromConnectionString(env('SUBSCRIBERS_TABLE_CONN'), env('STORAGE_TABLE_NAME','Subscribers')); }
function token(){ return crypto.randomBytes(20).toString('hex'); }
function getEmailClient(){ const conn=env('ACS_CONNECTION_STRING'); return conn? new EmailClient(conn): null; }
function sender(){ return env('ACS_SENDER'); }
function siteOrigin(){ return env('SITE_ORIGIN','https://www.moecommunitycloud.com'); }
module.exports = { getTableClient, token, getEmailClient, sender, siteOrigin, env };
