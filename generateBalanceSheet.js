/*
  This script should return a balance sheet for an Organization noting the time that it was generated
*/
const {getAllData} = require('./utils/getAllData');

async function generateBalanceSheet(){
  const path = '/v2/vaults';
  var balanceSheet = {};
  var timestamp = Date.now();

  const data = await getAllData(path);
  data.forEach(function(vault) {
    vault.assets.forEach(function(asset) {
      if(asset.assetType in balanceSheet){
        balance = parseFloat(asset.totalBalance.currentUSDValue);
        quantity = parseFloat(asset.totalBalance.quantity);
        balanceSheet[asset.assetType]['balance'] += balance;
        balanceSheet[asset.assetType]['quantity'] += quantity;
      } else {
        balance = parseFloat(asset.totalBalance.currentUSDValue);
        quantity = parseFloat(asset.totalBalance.quantity);
        balanceSheet[asset.assetType] = {};
        balanceSheet[asset.assetType]['balance'] = balance;
        balanceSheet[asset.assetType]['quantity'] = quantity;
        balanceSheet[asset.assetType]['price'] = parseFloat(asset.totalBalance.currentPrice);
      };
    });
  });

  const fiatPath = '/v2/fiat'
  const fiatData = await getAllData(fiatPath);
  console.log('\n' + 'Date' + '\t' + 'Asset Type' + '\t' + 'Quantity' + '\t' + 'Unit Price (USD)' + '\t' + 'Total Value (USD)');
  console.log("===========================================================================");
  console.log(timestamp + '\t' + fiatData[0].assetType + '\t' + fiatData[0].quantity + '\t' + '1' + '\t' + fiatData[0].quantity)
  for(asset in balanceSheet){
    var obj = balanceSheet[asset];
    console.log(timestamp + '\t' + asset + '\t' + obj['quantity'] + '\t' + obj['price'] + '\t' + obj['balance']);
  };
};

module.exports = generateBalanceSheet;
