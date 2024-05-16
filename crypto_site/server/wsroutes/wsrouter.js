// require routes
const KCSUBSCRIBE = require('./subscribe.js');
const KCBULKPRICEHISTORY = require('./bulk-price-history.js');

var unixTime = Math.floor(Date.now() / 1000);

exports.route = async function(data, fn) {
    let message = JSON.parse(data);
    console.log(message);

    let res = [];
    

    
    for (let coin of message.tickers) {
      // Use await to wait for each asynchronous operation to complete
      let response = await new Promise(resolve => {
        KCBULKPRICEHISTORY.bulkPriceHistory(coin.ticker, unixTime, unixTime, coin.interval, response => {
          let data = [];
          for (let datum of response.data) {
            data.push(datum[2]);
          }
          res.push({
            ticker: coin,
            history: data,
            price: 0
          });

          resolve(); // Resolve the promise when the operation is done
        });
      });
    }
  
    let tickers = [];
    for(let coin of res){
      tickers.push(coin.ticker.ticker);
    }
    console.log(tickers);

    KCSUBSCRIBE.subscribeToMultipleDatafeeds(tickers, response => {
      for(let coin of res){
        if((coin.ticker.ticker + "-USDT") == response.ticker){
          coin.ticker.price = response.price;
        }
      }
      fn(JSON.stringify(res));
    });
    
}
