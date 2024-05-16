// require routes
const KCSUBSCRIBE = require('./subscribe.js');
const KCUNSUBSCRIBE = require('./unsubscribe.js');
const KCBULKPRICEHISTORY = require('./bulk-price-history.js');

exports.route = function(data, fn) {

    let message = JSON.parse(data);
    console.log(message);

    switch(message.action){
      case "establishKucoinWebsocket":
        KCSUBSCRIBE.subscribeToMultipleDatafeeds(message.tickers, response => {
          fn(JSON.stringify(response))
        });
        break;
      case 'endAllSessions':
        KCUNSUBSCRIBE.unsubscribeFromMultipleDatafeeds(message.tickers, response => {
          fn(JSON.stringify(response));
        });
        break;
      case 'bulkPriceHistory':
        KCBULKPRICEHISTORY.bulkPriceHistory(message.ticker, message.start, message.end, message.type, response => {
          fn(console.log(JSON.stringify(response)));
        })
      break;
      default:
        console.log('error: reached default case in ws router');
    };
}
