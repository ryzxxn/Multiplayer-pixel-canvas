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

io.on('connection', (socket) => {
  socket.on('pixel-data', (pixelData) => {
    if (pixelData) {
      console.log(pixelData);
      // Use broadcast to emit to everyone except the sender
      socket.broadcast.emit('pixel-client', pixelData);
    }
  });
});

server.listen(3001, () => {
  console.log("SERVER IS RUNNING");
});