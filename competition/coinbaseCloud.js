var crypto = require('crypto');
var axios = require('axios');

// Anchorage Test Key in Coinbase Sadnbox

// Anchorage Test Key #2 in Coinbase Sadnbox

var apiUrl = 'https://api-public.sandbox.exchange.coinbase.com'
var requestTimestamp = Date.now() / 1000; // in ms

// // Get all accounts for a profile
// var method = 'GET';
// var requestPath = '/accounts/ef582998-4c45-4faf-89ad-243696cffe5d';
// var body = '';
// console.log('body',body);



// Post external withdrawal
// var method = 'POST';
// var requestPath = '/withdrawals/crypto';
// var body = JSON.stringify({
//   profile_id: 'ff0b7165-c9c8-4467-a4c9-6926f1883fa9',
//   amount: '1.0',
//   currency: 'ETH',
//   crypto_address: '0x29D7d1dd5B6f9C864d9db560D72a247c178aE86B'
// });

// Generate a report
var method = 'POST';
var requestPath = '/reports';
var data = {
     start_date: "<30 days ago>",
     end_date: "<today>",
     type: "fills",
     format: "pdf"
}
var body = JSON.stringify(data);
console.log('body',body);

// create the prehash string by concatenating required parts
var message = requestTimestamp + method + requestPath + body;
console.log('message',message);

// decode the base64 secret
var key = Buffer(apiSecret, 'base64');

// create a sha256 hmac with the secret
var hmac = crypto.createHmac('sha256', key);

// sign the require message with the hmac
// and finally base64 encode the result
var requestSignature = hmac.update(message).digest('base64');

// let config = {
//   headers: {
//     'cb-access-key': apiKey,
//     'cb-access-passphrase': passphrase,
//     'cb-access-sign': requestSignature,
//     'cb-access-timestamp': requestTimestamp
//   }
// };

const headers = {
  'Accept': 'application/json',
  'Content-Type':'application/json',
  'cb-access-key': apiKey,
  'cb-access-passphrase': passphrase,
  'cb-access-sign': requestSignature,
  'cb-access-timestamp': requestTimestamp
};

if(method=='GET'){
    axios.get(apiUrl+requestPath, {headers})
  .then((res)=> {
    console.log(res);
  })
  .catch((err) => {
    console.log('ERR', err);
  });
} else if (method=='POST'){
  axios.post(apiUrl+requestPath, data, headers)
  .then((res)=> {
    console.log(res);
  })
  .catch((err) => {
    console.log('ERR', err);
  });
}
