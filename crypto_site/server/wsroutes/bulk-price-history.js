const KCWS = require('../KucoinWebsocket/init.js')

//https://www.kucoin.com/docs/rest/spot-trading/market-data/get-klines

/**
 * We should be using the GET klines REST request that is documented here instead of going thru the kucoin node sdk 
 * as we did with the websocket. 
 */

exports.bulkPriceHistory = async function(coin, start, end, type, fn) {
    let pair = coin + "-USDT";
    const data = await KCWS.candles(pair, type, {start, end});
    fn(data);
    // call callback function fn
}