const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth");
const messageRoutes = require("./routes/messages");
const app = express();
const socket = require("socket.io");
require("dotenv").config();

app.use(cors());
app.use(express.json());


const app1 = require('express')();
const server = require('http').createServer(app1);
const io = require('socket.io')(server);

const port = process.env.PORT || 3000;

mongoose.connect('mongodb+srv://heartads715:iRSqo1zU4qtLZzDo@cluster0.nbkyqow.mongodb.net/?retryWrites=true&w=majority',
{useNewUrlParser: true, 
useUnifiedTopology: true,
}).then(()=>console.log('Successfully connected to database.')).catch((e)=>console.error('Error in connection',e));

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
server.listen(3000);
app.listen(port,()=>console.log(`Server listen on the port ${port}`)) ;
// const io = socket(server, {
//   cors: {
//     origin: "https://backendchat-er7b.onrender.com",
//     credentials: true,
//   },
// });


global.onlineUsers = new Map();
io.on("connection", (socket) => {
  global.chatSocket = socket;
  socket.on("add-user", (userId) => {
    onlineUsers.set(userId, socket.id);
  });

  socket.on("send-msg", (data) => {
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("msg-recieve", data.msg);
    }
  });
});
