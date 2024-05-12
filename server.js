const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const socketio = require('socket.io');
const http = require('http');
const authRoutes = require('./routes/authRoutes');
const messageRoutes = require('./routes/messageRoutes');

const app = express();
const PORT = process.env.PORT || 5000;
const server = http.createServer(app);


mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

app.use(bodyParser.json());

app.use('/api/auth', authRoutes);
app.use('/api/messages', messageRoutes);

const io = socketio(server);
io.on('connection', (socket) => {
  console.log('New client connected');

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });

  socket.on('sendMessage', (message) => {
    io.emit('receiveMessage', message);
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
