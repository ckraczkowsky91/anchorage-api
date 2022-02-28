// var Client = require('coinbase').Client;
//
// var client = new Client({'apiKey': 'API KEY',
//                          'apiSecret': 'API SECRET'});
//
// async function getAccounts(){
//   client.getAccounts({}, function(err, accounts) {
//     console.log(accounts);
//   });
// };
//
// module.exports = {
//     getAccounts: getAccounts
// }


var crypto = require('crypto');

var cb_access_timestamp = Date.now() / 1000; // in ms
var cb_access_passphrase = '...';
var secret = 'PYPd1Hv4J6/7x...';
var requestPath = '/orders';
var body = JSON.stringify({
    price: '1.0',
    size: '1.0',
    side: 'buy',
    product_id: 'BTC-USD'
});
var method = 'POST';

// create the prehash string by concatenating required parts
var message = cb_access_timestamp + method + requestPath + body;

// decode the base64 secret
var key = Buffer(secret, 'base64');

// create a sha256 hmac with the secret
var hmac = crypto.createHmac('sha256', key);

// sign the require message with the hmac
// and finally base64 encode the result
var cb_access_sign = hmac.update(message).digest('base64');
