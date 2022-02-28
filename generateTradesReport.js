const getData = require('./utils/getAllData');

async function generateTradesReport(){
  const path = '/v2/trading/trades';

  const data = await getData(path);
  console.log('\n' + 'Date' + '\t\t\t' + 'Buy Amount' + '\t' + 'Buy Asset' + '\t' + 'Price' + '\t' + 'Sell Amount' + '\t' + 'Sell Asset' + '\t' + 'Fee' + '\t' + 'Fee Currency' + '\t' + 'Status');
  console.log('========================================================================================================================================================================');
  data.forEach((trade) => {
    console.log(trade.timestamp
      + '\t' + trade.quantityBought
      + '\t' + trade.currencyBought
      + '\t' + trade.price
      + '\t' + trade.quantitySold
      + '\t' + trade.currencySold
      + '\t' + trade.fee
      + '\t' + trade.feeCurrency
      + '\t' + trade.tradeStatus
    );
  });
};

module.exports = generateTradesReport;
