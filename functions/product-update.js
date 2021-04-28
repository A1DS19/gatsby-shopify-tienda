// const faunadb = require('faunadb');
// const verifyWebHook = require('shopify-verify-webhook');
// const axios = require('axios');

// const q = faunadb.query;

// const client = new faunadb.Client({
//   secret: process.env.GATSBY_FAUNA_DB_KEY,
// });

// exports.handler = function (event, context, callback) {
//   const isValid = verifyWebHook(
//     process.env.GATSBY_SHOPIFY_WEBHOOK,
//     event.headers['x-shopify-hmac-sha256'],
//     event.body
//   );

//   if (isValid) {
//     const body = JSON.parse(event.body);
//     const { id } = body;

//     delete body.updated_at;
//     body.variants.forEach(v => {
//       delete v.updated_at;
//       delete v.inventory_quantity;
//       delete v.old_inventory_quantity;
//     });

//     const bodyString = JSON.stringify(body);
//     client
//       .query(q.Get(q.Match(q.Index('product_by_id'), id)))
//       .then(result => {
//         if (result.data.product !== bodyString) {
//           client
//             .query(
//               q.Update(result.ref, {
//                 data: { product: bodyString },
//               })
//             )
//             .then(() => {
//               axios.post(process.env.GATSBY_NETLIFY_BUILD_URL);
//             })
//             .catch(e => {
//               console.error(`ERROR FAUNA DB`, e);
//             });
//         }
//       })
//       .catch(err => {
//         client
//           .query(
//             q.Create(q.Collection('products'), {
//               data: { id, product: bodyString },
//             })
//           )
//           .then(() => {
//             axios.post(process.env.GATSBY_NETLIFY_BUILD_URL);
//           })
//           .catch(e => {
//             console.error(`ERROR FAUNA DB`, e);
//           });
//       });
//   } else {
//     callback(null, {
//       statusCode: 403,
//       body: 'Error',
//     });
//   }
// };
