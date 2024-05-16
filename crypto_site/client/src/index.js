const server = new WebSocket('ws://localhost:8080');
// const server = new WebSocket('wss://dhmcvxkisb.execute-api.us-east-2.amazonaws.com/dev')
import React from 'react';
import ReactDOM from 'react-dom'
import App from './components/App.jsx';

// easily identify input and button
const input = document.getElementById('message');
const startDatafeedButton = document.getElementById('send');
const endDatafeedButton = document.getElementById('end');
const startTimeReq = document.getElementById('startTimeReq');
const interval = document.getElementById('interval');

var unixTime = Math.floor(Date.now() / 1000);

// to store subscribed datafeeds client-side
let topicList = [];

// only enable button AFTER websocket connection hasbeen established
startDatafeedButton.disabled = true;
endDatafeedButton.disabled = true;

// do stuff on click
startDatafeedButton.addEventListener('click', () => {
    topicList.push(input.value);
    sendMessage(topicList);
}, false);
endDatafeedButton.addEventListener('click', endSession, false);

startTimeReq.addEventListener('click', () => {
    const coin = input.value;
    const type = interval.value;
    requestBulkPriceHistory(coin, type);
});

// send message when 'enter' is clicked
document.addEventListener('keyup', e => {
    if(e.key === 'Enter'){
        topicList.push(input.value);
        sendMessage(topicList);
    }
});

// enable the button upon websocket connection
server.onopen = () => {
    startDatafeedButton.disabled = false;
    endDatafeedButton.disabled = false;
};

/*
when websocket client receives message (i.e. ticker & price info),
transform the string into an object with the imported function and
pass as props into the <App /> component
*/

server.onmessage = event => {
    let message = JSON.parse(event.data);
    ReactDOM.render(
    <div>
    <App
        coin={message.ticker}
        price={message.price}
    />
    </div>,
    document.getElementById('root'))
};




// TODO: abstract & export, make topicList a tuple (no duplicates)
// function to be called when sending a message
function sendMessage(topicList){
    const toServer = {
        action: 'establishKucoinWebsocket',
        tickers: topicList
    };
    server.send(JSON.stringify(toServer));
};
 
function requestBulkPriceHistory(coin, interval) {
    const toServer = {
        action: 'bulkPriceHistory',
        ticker: coin,
        start: unixTime,
        end: unixTime,
        type: interval
    };
    server.send(JSON.stringify(toServer));
}

function endSession() {
    const toServer = {
        action: 'endAllSessions',
        tickers: topicList
    };
    server.send(JSON.stringify(toServer));
};
