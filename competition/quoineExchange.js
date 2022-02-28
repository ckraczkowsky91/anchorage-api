const jwt = require('jsonwebtoken');

function generateSignature(path){
  var tokenId = '';
  var tokenSecret = '';

  var authPayload = {
    path: path,
    nonce: Date.now(),
    token_id: tokenId
  };

  var signature = jwt.sign(authPayload, tokenSecret, {algorithm: 'HS256'});

  return signature;
};

module.exports = generateSignature;
