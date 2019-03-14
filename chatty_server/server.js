// server.js

const express = require('express');
const SocketServer = require('ws');
const uuid = require('uuid/v4');
const request = require('request');
const key = require('./secret');

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
  // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer.Server({
  server
});

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (ws) => {
  console.log('Client connected');
  updateClientList();

  ws.on('message', (data) => {
    const message = JSON.parse(data);
    // set initial state of message
    message.id = uuid();
    message.type = 'textMessage';
    message.sync = true;

    parseMessage(message, ws);
  });
  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => {
    console.log('Client disconnected');
    updateClientList();
  });
});

// broadcast helper to send to all connected clients 
wss.broadcast = function broadcast(data) {
  wss.clients.forEach(function each(client) {
    if (client.readyState === SocketServer.OPEN) {
      client.send(data);
    }
  });
};

// update connected clients with current number of clients
function updateClientList() {
  const message = {
    type: 'userCount',
    content: wss.clients.size,
  };

  console.log(`Connected clients: ${message.content}`);
  wss.broadcast(JSON.stringify(message));
}

// parse client messages for / commands
function parseMessage(message, ws) {
  if (message.content[0] === '/') {
    const command = message.content.split(' ');
    switch (command[0].slice(1)) {
      // gif magic happens here
      case 'giphy':
      case 'gif':
        message.type = 'gifMessage';
        message.sync = false;
        request({
          json: true,
          uri: 'https://api.giphy.com/v1/gifs/search?api_key=' + key() + '&q=' + command.slice(1).join('+')
        }, (error, response, body) => {
          if (error) {
            ws.send({
              username: 'ChattyBot',
              content: 'Giphy could not find anything',
              type: 'errorMessage'
            });
          } else {
            message.content = body.data[0].images.original.url;
            wss.broadcast(JSON.stringify(message));
          }
        });
        break;
        // handle user changes and notify clients
      case 'userChange':
        message.type = 'notificationMessage';
        message.username = 'ChattyBot';
        message.content = '*' + message.oldUser + '*' + ' has become ' + '*' + message.newUser + '*';
        break;
      default:
        message.type = 'errorMessage';
        message.username = 'ChattyBot';
        message.content = 'Your / command was incorrect, please try again';
        message.sync = false;
        ws.send(JSON.stringify(message));
        break;
    }
  }

  console.log('Sent data!');
  if (message.sync) {
    wss.broadcast(JSON.stringify(message));
  }
}
