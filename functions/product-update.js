const faunadb = require('faunadb');
const verifyWebHook = require('shopify-verify-webhook');

const q = faunadb.query;

const client = new faunadb.Client({
  secret: process.env.GATSBY_FAUNA_DB_KEY,
});

exports.handler = function (event, context, callback) {
  const isValid = verifyWebHook(
    process.env.GATSBY_SHOPIFY_WEBHOOK,
    event.headers['x-shopify-hmac-sha256'],
    event.body
  );

  if (isValid) {
    callback(null, {
      statusCode: 200,
      body: 'Hello world',
    });
  } else {
    callback(null, {
      statusCode: 403,
      body: 'Error',
    });
  }
};
