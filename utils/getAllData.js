const axios = require('axios');
var apiKey = '';
// const baseUrl = 'https://api.anchorage-staging.com';
const baseUrl = 'https://api.anchorage.com';


async function getAllData(path){
  var query = `${baseUrl}${path}`;
  const response = await axios.get(query, {
    headers: {
      'Api-Access-Key': apiKey
    }
  })
  .catch((err)=>{console.log(err)})
  data = response.data.data;
  if(response.data.page){
    if(response.data.page.next){
      newPath = response.data.page.next;
      return data.concat(await getAllData(newPath));
    } else {
      return data;
    }
  } else {
    return data;
  }
};

async function getOneItem(path, filter){
  var query = `${baseUrl}${path}/${filter}`;
  const response = await axios.get(query, {
    headers: {
      'Api-Access-Key': apiKey
    }
  });
  return response;
};

async function makeMultipleReqs(path, number){
  var i = 0;
  const timeout = 20;
  var data;

  for (i; i < number; i++){
  // rate limit is 50 requests per second
  // to make 100 requests I'd need to space them by 20 mseconds
    setTimeout(()=>{getAllData(path)}, timeout);
  }
};

module.exports = {
  getAllData : getAllData,
  getOneItem: getOneItem,
  makeMultipleReqs: makeMultipleReqs
};
