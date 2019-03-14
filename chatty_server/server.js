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
  console.log(`Connected clients: ${wss.clients.size}`);

  ws.on('message', (data) => {
    const message = JSON.parse(data);
    message.id = uuid();

    console.log('Sent data!');
    console.log(`User ${message.username} said ${message.content} with ID ${message.id}`);
    wss.broadcast(JSON.stringify(message));
  });
  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => {
    console.log('Client disconnected');
    console.log(`Connected clients: ${wss.clients.size}`);
  });
});

wss.broadcast = function broadcast(data) {
  wss.clients.forEach(function each(client) {
    if (client.readyState === SocketServer.OPEN) {
      client.send(data);
    }
  });
};
