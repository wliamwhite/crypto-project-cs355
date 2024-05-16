const KCWS = require('../KucoinWebsocket/init.js')
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

let subscribed = []; // originally for easy websocket termination

exports.subscribeToMultipleDatafeeds = async function(datafeeds, fn) {
    datafeeds.forEach((element) => {
      // console.log(element + " attempting to subscribe");
      let fullTopic = '/market/ticker:' + element + '-USDT';
      if(!subscribed.includes(fullTopic)){
        KCWS.datafeed.subscribe(fullTopic, (message) => {
          let topic = txtFormat.getTickerFromTopic(message.topic)
          let response = {
              ticker: topic,
              price: message.data.price
          };
          // console.log(message.topic + ': ' + message.data.price);
          subscribed.push(fullTopic);
          fn(response);
        });
      }
    });
  }
