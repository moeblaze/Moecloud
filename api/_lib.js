// api/_lib.js
const { TableClient, AzureSASCredential, odata } = require('@azure/data-tables');
const { EmailClient } = require('@azure/communication-email');
const crypto = require('crypto');

function env(name, fallback=null) {
  const v = process.env[name];
  if (!v || v === '') {
    if (fallback !== null) return fallback;
  }
  return v;
}

function getTableClient() {
  const conn = env('SUBSCRIBERS_TABLE_CONN');
  const tableName = env('STORAGE_TABLE_NAME', 'Subscribers');
  return TableClient.fromConnectionString(conn, tableName);
}

function token() {
  return crypto.randomBytes(20).toString('hex');
}

function getEmailClient() {
  const conn = env('ACS_CONNECTION_STRING');
  if (!conn) return null;
  return new EmailClient(conn);
}

function sender() {
  return env('ACS_SENDER');
}

function siteOrigin() {
  return env('SITE_ORIGIN', 'https://www.moecommunitycloud.com');
}

module.exports = { getTableClient, token, getEmailClient, sender, siteOrigin, env };
