const KCWS = require('../KucoinWebsocket/init.js');

exports.unsubscribeFromMultipleDatafeeds = async function(topics, fn){
    console.log(topics);
    topics.forEach((element) => {
        let fullTopic = '/market/ticker:' + element
        KCWS.datafeed.unsubscribe(fullTopic);
        fn({
            ticker: "Unsubscribed",
            price: "From all"
        });
    });
}