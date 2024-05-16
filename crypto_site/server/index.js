const ws = require('ws');

// require router
const WSROUTER = require('./wsroutes/wsrouter.js');

const wss = new ws.WebSocketServer({
    port: 8080
})


wss.on('connection', ws => {
  ws.on('message', data => {
    WSROUTER.route(data, response => {
      ws.send(response);
    });
  });
  ws.on('close', () => {
      // datafeed.unsubscribe();
  })
});
