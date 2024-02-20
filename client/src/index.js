const server = new WebSocket('ws://localhost:8080');
// const server = new WebSocket('wss://dhmcvxkisb.execute-api.us-east-2.amazonaws.com/dev')
import React from 'react';
import ReactDOM from 'react-dom'
import App from './components/App.jsx';

// easily identify input and button
const input = document.getElementById('message')
const startDatafeedButton = document.getElementById('send')
const endDatafeedButton = document.getElementById('end')

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

// send message when 'enter' is clicked
document.addEventListener('keyup', e => {
    if(e.key === 'Enter'){
        topicList.push(input.value);
        sendMessage(topicList);
    }
})

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




// TODO: abstract & export
// function to be called when sending a message
function sendMessage(topicList){
    const toServer = {
        action: 'establishKucoinWebsocket',
        tickers: topicList
    };
    server.send(JSON.stringify(toServer));
};

function endSession(topicList) {
    const toServer = {
        action: 'endAllSessions',
        tickers: topicList
    };
    server.send(JSON.stringify(toServer));
};