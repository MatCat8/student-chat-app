// server.js
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const PORT = process.env.PORT || 3000;

// Serve static files from /public
app.use(express.static('public'));

io.on('connection', (socket) => {
  socket.on('joinForum', (forum) => {
    socket.join(forum);
  });

  socket.on('chatMessage', ({ forum, user, text }) => {
    io.to(forum).emit('chatMessage', { forum, user, text });
  });
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});