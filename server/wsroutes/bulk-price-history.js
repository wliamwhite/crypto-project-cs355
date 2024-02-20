const KCWS = require('../kucoinwebsocket/init.js')

exports.bulkPriceHistory = async function(coin, start, end, fn) {
    // let fullTopic = '/market/candles?type=1min&symbol=' + coin + '-USDT&startAt='+start+'&endAt=' + end;
    const { data } = await KCWS.candles(coin + '-USDT', '1min', {start, end});
    let count = 0;
    let total = 0;
    data.forEach(element => {
        count++;
        total += ((element[1] + element[2])/2);
    });
    const average = total/count;
    console.log('average price of ' + coin + ' between ' + start + ' and ' + end + ' is ' + average + ' USD');
    console.log(total, count);// WHERE IS THE NaN coming from??????!!!!

}