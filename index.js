const express = require('express');
var bodyParser = require('body-parser');
const fs = require("fs"); // Use require instead of import
const app = express();
const https = require('https');
const cors = require('cors');
const options = {
  key: fs.readFileSync('key.pem'),     // Path to your SSL private key file
  cert: fs.readFileSync('cert.pem')    // Path to your SSL certificate file
};
const server = https.createServer(options, app);
const { Server } = require("socket.io");
// const io = new Server(server);
const io = new Server(server, {
  cors: {
    origin: '*'
  }
});
const port = process.env.PORT || 3000;

const routes = require('./src/user/routes')
require('./src/config/database')

app.use(bodyParser.urlencoded({extended: true}))
app.use(express.json())
// app.use(cors({
//   origin: '*'
// }));
app.use(cors()); // Enable CORS for all routes
app.use('/routes', routes)

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('send_message',(data)=>{
   // console.log("received message in server side",data)
    io.emit('received_message',data)
  })
  socket.on('send_message_v2',(data)=>{
    // console.log("received message in server side",data)
     io.emit('received_message_v2',data)
   })
  socket.on('send_delete_message',(data)=>{
    // console.log("received message in server side",data)
     io.emit('receive_delete_message',data)
   })
 

  socket.on('disconnect', () => {
   // console.log('user disconnected');
  });
  
});

server.listen(port, () => {
  //console.log( `Server running at http://localhost:${port}/`);
});