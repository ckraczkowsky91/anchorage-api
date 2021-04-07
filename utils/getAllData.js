const axios = require('axios');
var apiKey = '';
const baseUrl = 'https://api.anchorage-staging.com';


async function getAllData(path){
  var query = `${baseUrl}${path}`;
  const response = await axios.get(query, {
    headers: {
      'Api-Access-Key': apiKey
    }
  })
  .catch((err)=>{console.log(err)})
  data = response.data.data;
  if(response.data.page.next){
    newPath = response.data.page.next;
    return data.concat(await getAllData(newPath));
  } else {
    return data;
  }
};

module.exports = getAllData;
