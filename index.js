const express = require('express');
var bodyParser = require('body-parser');
const app = express();
const http = require('http');
const cors = require('cors');
// require('dotenv').config();
const server = http.createServer(app);
const { Server } = require("socket.io");
// const io = new Server(server);
const io = new Server(server, {
  cors: {
    origin: '*'
  }
});
const port = process.env.PORT || 4000;
const host = process.env.API_HOST || '0.0.0.0';;

const routes = require('./src/user/routes')
require('./src/config/database')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json())
// app.use(cors({
//   origin: '*'
// }));
app.use(cors()); // Enable CORS for all routes
app.use('/routes', routes)

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('send_message_v3', (data) => {
    console.log("received message in server side",data)
    io.emit('received_message_v3', data)
  })
  socket.on('send_delete_message', (data) => {
    console.log("received message in server side",data)
    io.emit('receive_delete_message', data)
  })


  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

});
server.listen(port, host, () => {
  console.log(`Server running at http://${host}:${port}/`);
});