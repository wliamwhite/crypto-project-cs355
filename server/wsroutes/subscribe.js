const KCWS = require('../kucoinwebsocket/init.js')
const txtFormat = require('../helpers/formatting.js')

/**
 * @param {array} datafeeds
 *  a list of tickes, as seen above
 * @param {function} fn
 *  any callback function o the websocket response can be handled more easily
 * @var {array} fullDatafeedTopicList
 *  a function that houses the topic of each subscription to make subscription
 *  management easier
 * @var {string} fullTopic
 *  each individual topic; what will be pushed to the fullDatafeedTopicList
 * @var {string} response
 *  selected websocket response
 * @function setTimeout
 *  to loop through fullDatafeedTopicList and usubscribe after x seconds
 */

exports.subscribeToMultipleDatafeeds = async function(datafeeds, fn) {
    let fullDatafeedTopicList = []; // originally for easy websocket termination
    datafeeds.forEach((element) => {
      console.log(element + " attempting to subscribe");
      let fullTopic = '/market/ticker:' + element + '-USDT';
      fullDatafeedTopicList.push(fullTopic);
      KCWS.datafeed.subscribe(fullTopic, (message) => {
        let topic = txtFormat.getTickerFromTopic(message.topic)
        let response = {
            ticker: topic,
            price: message.data.price
        };
        console.log(message.topic + ': ' + message.data.price);
        fn(response);
      });
    });
  }
