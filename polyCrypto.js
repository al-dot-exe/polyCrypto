#!/usr/bin/env node
const fetch = require('cross-fetch'); //fetch api for node js
const fs = require("fs"); // file system module to be able to read your api key


// Reads file containing your API key for coinranking.com
const apiKey = fs.readFile(`${__dirname}/apikey.txt`, function (err, data) {
  if (err) {
    return console.error(err);
  }
    return data.toString();
});


function updatePrice(apiKey) {
  fetch('https://api.coinranking.com/v2/coins', {
    method: 'GET',
    headers: {
      'x-access-token': apiKey 
    }
  })
    .then(res => {
      if (res.status === 200) {
        return res.json();
      }
      else{
        throw new Error("Something went wrong with API request");
      }
    })
    .then(coinRankObj => {
      let btcPrice = coinRankObj.data.coins[0].price; // Queries the bitcoin price. Explore the coinranker api for other options
      btcPrice = Number(btcPrice).toFixed(2);                 
      changeInPrice = `${coinRankObj.data.coins[0].change}%`;
      console.log(`${btcPrice} : ${changeInPrice}`);
    })

    .catch(err => console.log(`Received error ${err}`))
}

updatePrice(apiKey);
