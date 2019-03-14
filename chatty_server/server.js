// server.js

const express = require('express');
const SocketServer = require('ws');
const uuid = require('uuid/v4');

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
  ws.username = '';
  updateClientList();

  ws.on('message', (data) => {
    const message = JSON.parse(data);
    message.id = uuid();
    message.type = 'textMessage';
    message.sync = true;

    parseMessage(message);
  });
  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => {
    console.log('Client disconnected');
    updateClientList();
  });
});

wss.broadcast = function broadcast(data) {
  wss.clients.forEach(function each(client) {
    if (client.readyState === SocketServer.OPEN) {
      client.send(data);
    }
  });
};

function updateClientList() {
  const message = {
    type: 'userCount',
    content: wss.clients.size,
  };

  console.log(`Connected clients: ${message.content}`);
  wss.broadcast(JSON.stringify(message));
}

function parseMessage(message) {
  if (message.content[0] === '/') {
    const command = message.content.split(' ')[0].slice(1);
    switch (command) {
      case 'gif':
        message.type = 'gifMessage';
        message.content = message.content.replace('/gif ', '');
        message.sync = false;
        wss.broadcast(JSON.stringify(message));
        break;
      case 'userChange':
        message.type = 'notificationMessage';
        message.username = 'ChattyBot';
        message.content = '*' + message.oldUser + '*' + ' has become ' + '*' + message.newUser + '*';
        break;
      default:
        message.type = 'errorMessage';
        message.content = 'Your / command was incorrect, please try again';
        message.sync = false;
        // ws.send(JSON.stringify(message));
        break;
    }
  }

  console.log('Sent data!');
  if (message.sync) {
    wss.broadcast(JSON.stringify(message));
  }
}
