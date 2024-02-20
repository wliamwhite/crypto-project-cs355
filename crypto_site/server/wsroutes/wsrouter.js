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
        KCBULKPRICEHISTORY.bulkPriceHistory(message.tickers[0], message.start, message.end, response => {
          // fn(JSON.stringify(response));
        })
      break;
      default:
        // ws.send(JSON.stringify({
        //   ticker: "ERROR",
        //   price: "ROUTE UNDEFINED"
        // }));
        console.log('error: reached default case in ws router');
    };
}
