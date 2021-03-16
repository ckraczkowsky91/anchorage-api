/*
  This script should get current positions (quantity of each digital asset held) for a Vault
*/
var axios = require('axios');
// var apiKey = ''; //development
var apiKey = ''; //staging

async function getPositions(){
  var url = 's';

  var positions = {};

  await axios.get(url, {
    headers: {
      'Api-Access-Key': apiKey
    }
  })
  .then((res) => {
    var baseUrl='';
    var depaginatedData;
    if(res.data.page.next){
      axios.get(baseUrl+res.data.page.next, {
        headers: {
          'Api-Access-Key': apiKey
        }
      })
      .then((res) => {
        console.log(res);
      })
    } else {
      return res;
    };
  })
  .then((res) => {
    var data = res.data.data;
    data.forEach(function(vault) {
      vault.assets.forEach(function(asset) {
        if(asset.assetType in positions){
          value = parseFloat(asset.totalBalance.quantity);
          positions[asset.assetType] += value;
        } else {
          value = parseFloat(asset.totalBalance.quantity);
          positions[asset.assetType] = value;
        };
      });
    });
  }).then(() => {
    var total = 0;
    console.log('\n' + 'Asset' + '\t\t' + 'Quantity');
    console.log("=========================");
    for(value in positions){
      total += positions[value];
      console.log(value + "\t\t" + positions[value]);
    };
  })
  .catch((err) => {
    console.log('ERROR: ', err.response.data.message);
  });
}

async function getBalances(){
  // var url = '';
  var url = s';

  var balances = {};

  await axios.get(url, {
    headers: {
      'Api-Access-Key': apiKey
    }
  }).then((res) => {
    var data = res.data.data;
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
  }).then(() => {
    var total = 0;
    console.log('\n' + 'Asset' + '\t\t' + 'Balance');
    console.log("=========================");
    for(value in balances){
      total += balances[value];
      console.log(value + "\t\t" + "$" + balances[value].toFixed(2));
    };
    console.log("=========================");
    console.log("TOTAL" + "\t\t" + "$" + total.toFixed(2));
  })
  .catch((err) => {
    console.log('ERROR: ', err.response.data.message);
  });
};

async function getSettlementAmount(){
  var url = '';

  var settlements = [];

  await axios.get(url, {
    headers: {
      'Api-Access-Key': apiKey
    }
  })
  .then((res) => {
    var data = res.data.data;
    data.forEach(function(trade) {
      if(trade.tradeStatus === 'SETTLED'){
        var settlementObject = {};
        var total = 0;
        settlementObject.timestamp = trade.timestamp;
        settlementObject.tradingPair = trade.tradingPair;
        settlementObject.side = trade.side;
        if(trade.side === 'SELL'){
          total = trade.quantitySold * trade.price;
          settlementObject.settlementAmount = total.toFixed(2);
        } else {
          total = trade.quantityBought * trade.price;
          settlementObject.settlementAmount = total.toFixed(2);
        }
        settlements.push(settlementObject);
      };
    });
  })
  .then(() => {
    console.log('\n' + 'Timestamp' + '\t' + 'Trading Pair' + '\t' + 'Side' + '\t' + 'Settlement Amount');
    console.log("==================================================");
    settlements.forEach(function(settlement) {
      console.log(settlement.timestamp + '\t' + settlement.tradingPair + '\t' + settlement.side + '\t$' + settlement.settlementAmount);
    });
  })
  .catch((err) => {
      console.log('ERROR: ', err.response.data.message);
  });
};

module.exports = {
  getBalances: getBalances,
  getPositions: getPositions,
  getSettlementAmount: getSettlementAmount
};
