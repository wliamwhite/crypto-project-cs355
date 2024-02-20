/** Require SDK */
const API = require('kucoin-node-sdk');

/** Init Configure */
API.init(require('./config'));

/** Init Datafeed */
const datafeed = new API.websocket.Datafeed();
const candles = async (coin, type, startEnd) => {
    return await API.rest.Market.Histories.getMarketCandles(coin, type, startEnd);
}
// connect
datafeed.connectSocket();

exports.datafeed = datafeed;
exports.candles = candles;

// close callback
exports.closeDatafeed = datafeed.onClose(() => {
    console.log('ws closed, status ', datafeed.trustConnected);
});