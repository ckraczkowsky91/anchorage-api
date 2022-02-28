/*
  This script should return the balances of each asset held by an Organization
*/
const getAllData = require('./utils/getAllData');

async function getBalances(){
  const path = '/v2/vaults';
  var balances = {};
  var total = 0;

  const data = await getAllData.getAllData(path);
  data.forEach(function(vault) {
    vault.assets.forEach(function(asset) {
      if(asset.assetType in balances){
        value = parseFloat(asset.totalBalance.currentUSDValue);
        balances[asset.assetType] += value;
      } else {
        value = parseFloat(asset.totalBalance.currentUSDValue);
        balances[asset.assetType] = value;
      };
    });
  });
  console.log('\n' + 'Asset' + '\t\t' + 'Balance');
  console.log("=========================");
  for(value in balances){
    total += balances[value];
    console.log(value + "\t\t" + "$" + balances[value].toFixed(2));
  };
  console.log("=========================");
  console.log("TOTAL" + "\t\t" + "$" + total.toFixed(2));
};

module.exports = getBalances;
