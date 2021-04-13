/*
  Should return a list of transactions for an Organization
*/
const getAllData = require('./utils/getAllData');

async function generateTransactionsReport(customDay){
  const path = '/v2/transactions';
  var transacationsReport = {};

  var dateObject = new Date();
  var year = dateObject.getFullYear();
  var month = "0" + (dateObject.getMonth() + 1);
  var day = customDay ? "0" + customDay : "0" + dateObject.getDate();
  var dateFilter = '?startDate=' + year + '-' + month + '-' + day;

  const data = await getAllData(path + dateFilter);

  console.log('Transactions from ' + year + '-' + month + '-' + day + ' until today:');
  console.log('\n' + 'Created At' +'\t' + 'Transaction Type' + '\t' + 'Status' + '\t' + 'Asset Type' + '\t' + 'Quantity' + '\t' + 'Unit Price (USD)' + '\t' + 'Total Value (USD)' +'\t' + 'Fee Currency' +'\t' + 'Fee Amount');
  console.log('========================================================================================================================================================================');
  data.forEach((tx) => {
    let feeAssetType = '';
    let feeQuantity = '';
    if(tx.fee){
      feeAssetType = tx.fee.assetType;
      feeQuantity = tx.fee.quantity;
    };
    console.log(tx.dateTime
      + '\t' + tx.transactionType
      + '\t' + tx.status
      + '\t' + tx.assetType
      + '\t' + tx.amount.quantity
      + '\t' + tx.amount.currentPrice
      + '\t' + tx.amount.currentUSDValue
      + '\t' + tx.amount.currentUSDValue
      + '\t' + feeAssetType
      + '\t' + feeQuantity
    );
  });
};

module.exports = generateTransactionsReport;
