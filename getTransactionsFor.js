const getAllData = require('./utils/getAllData');

async function getTransactionsFor(desiredAssetType){
  const path = "/v2/transactions";
  var transactionsList = {};

  const data = await getAllData.getAllData(path);
// return object of transactions
  data.forEach((entry) => {
    if(entry.assetType == desiredAssetType){
      console.log(entry.amount.quantity + "  " + entry.transactionType);
    };
  });

};

module.exports = getTransactionsFor;
