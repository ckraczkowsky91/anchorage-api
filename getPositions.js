/*
  This script should get current positions (quantity of each digital asset held) for an Organization
*/
const getAllData = require('./utils/getAllData');

async function getPositions(){
  var path = '/v2/vaults';
  var positions = {};
  var total = 0;

  const data = await getAllData.getAllData(path);
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
  console.log('\n' + 'Asset' + '\t\t' + 'Quantity');
  console.log("=========================");
  for(value in positions){
    total += positions[value];
    console.log(value + "\t\t" + positions[value]);
  };
};

module.exports = getPositions;
