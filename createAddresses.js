var axios = require('axios');

var baseUrl = 'https://api.anchorage-development.com';

const apiKey = '';

async function createAddresses(assetType, numAddresses, vaultId){
  path = `/v2/vaults/${vaultId}/addresses`;
  assetType = assetType.toUpperCase();
  console.log(assetType);
  var addressList = [];
  for(i = 1; i <= numAddresses; i++){
    await axios.post(baseUrl+path,
      {
        "assetType": assetType
      },
      {
        headers:{
        'Api-Access-Key': apiKey
      }
    })
    .then((res) => {
      addressList.push(res.data.data.signedAddress.address);
    })
    .catch((err) => {
      console.log(err);
    })
  };
  console.log(addressList);
};

module.exports = {
  createAddresses: createAddresses
};
