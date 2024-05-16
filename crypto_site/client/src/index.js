const server = new WebSocket('ws://localhost:8080');
// const server = new WebSocket('wss://dhmcvxkisb.execute-api.us-east-2.amazonaws.com/dev')
import React from 'react';
import ReactDOM from 'react-dom'
import App from './components/App.jsx';

// easily identify input and button
const input = document.getElementById('message');
const send = document.getElementById('send');
const interval = document.getElementById('interval');

// to store subscribed datafeeds client-side
let topicList = [];

// only enable button AFTER websocket connection hasbeen established
send.disabled = true;

// do stuff on click
send.addEventListener('click', () => {
    let newCoin = true;
    for(let element of topicList){
        if(element.ticker == input.value){
            newCoin = false;
        }
    }
    if(newCoin){
        const coin = input.value;
        const type = interval.value;
        topicList.push({
            ticker: coin,
            interval: type
        });
        sendMessage(topicList);
    }
});

// send message when 'enter' is clicked
document.addEventListener('keyup', e => {
    if(e.key === 'Enter'){
        const coin = input.value;
        const type = interval.value;
        topicList.push({
            ticker: coin,
            interval: type
        });
        sendMessage(topicList);
    }
});

// enable the button upon websocket connection
server.onopen = () => {
    send.disabled = false;
};

/*
when websocket client receives message (i.e. ticker & price info),
transform the string into an object with the imported function and
pass as props into the <App /> component
*/

server.onmessage = event => {
    console.log("reached onmessage");
    let message = JSON.parse(event.data);
    console.log(message);
    for(let t of message){
        ReactDOM.render(
            <div>
            <App
                coin={t.ticker.ticker}
                price={t.ticker.price}
                history={t.history}
            />
            </div>,
        document.getElementById('root'))
    }
    
};




// TODO: abstract & export, make topicList a tuple (no duplicates)
// function to be called when sending a message
function sendMessage(topicList){
    const toServer = {
        tickers: topicList
    };
    server.send(JSON.stringify(toServer));
};

