const express = require('express');
const app = express();
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
  }
});

const MAX_CONNECTIONS = 100;
let connectedClients = 0;

app.get('/pixel-wake', (req, res) => {
  res.send('true'); // Respond with 'true'
});

io.on('connection', (socket) => {
  if (connectedClients >= MAX_CONNECTIONS) {
    socket.disconnect(true);
    console.log('Connection limit reached. Disconnecting client.');
    return;
  }

  connectedClients++;

  socket.on('pixel-data', (pixelData) => {
    if (pixelData) {
      console.log(pixelData);
      // Use broadcast to emit to everyone except the sender
      socket.broadcast.emit('pixel-client', pixelData);
    }
  });

  socket.on('disconnect', () => {
    connectedClients--;
  });
});

server.listen(3001, () => {
  console.log("SERVER IS RUNNING");
});
