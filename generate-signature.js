const nacl = require('tweetnacl');
nacl.util = require('tweetnacl-util');

const generateKey = () => {
    const seed = nacl.randomBytes(32);
    const keyPair = nacl.sign.keyPair.fromSeed(seed);
    const publicKey = keyPair.publicKey;
    const secretKey = keyPair.secretKey;
    var signingKey = new Uint8Array(32);
    for (var i = 0; i < 32; i++)
        signingKey[i] = secretKey[i];
    console.log('public key --> '+Buffer.from(publicKey, 'base64').toString('hex'));
    console.log('signing key --> '+Buffer.from(signingKey, 'base64').toString('hex'));
    console.log('secret key --> '+secretKey);
    console.log('secret key hex--> '+Buffer.from(secretKey, 'base64').toString('hex'));
}
const hexStringToByteArray = (hexString) => {
    if (hexString.length % 2 !== 0) {
        throw "Must have an even number of hex digits to convert to bytes";
    }/* w w w.  jav  a2 s .  c o  m*/
    var numBytes = hexString.length / 2;
    var byteArray = new Uint8Array(numBytes);
    for (var i=0; i<numBytes; i++) {
        byteArray[i] = parseInt(hexString.substr(i*2, 2), 16);
    }
    return byteArray;
}
const sign = () =>{
    const secretKeyHex = '';
    const secretKey = hexStringToByteArray(secretKeyHex);

    const timestamp = '1643657295';
    const method = 'POST';
    const httpPath = '/v2/transfers';
    const requestBody = '{"source": {"id": "15d3c458e994b814e3b3644e91f6448b", "type": "VAULT"}, "assetType": "ETH", "destination": {"id": "7ea6752ccedc91d023b744ec01b6ac61", "type": "VAULT"}, "amount": ".00001"}';
    const msgStr = timestamp + method + httpPath + requestBody;
    const msgDecoded = nacl.util.decodeUTF8(msgStr);

    const signature = nacl.sign.detached(msgDecoded, secretKey);
    const signatureHex = Buffer.from(signature, 'base64').toString('hex');
    console.log('signature->'+signatureHex);
}
// sign();
generateKey();
