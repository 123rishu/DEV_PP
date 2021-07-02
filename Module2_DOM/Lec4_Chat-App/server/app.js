//express => nodejs framework
//nodemon => dev dependency => dependency which is only used during development not in production code.Automatically restarts the
// server after any code change in app.js file => nodejs framework
//socket => socket implementation
const express = require('express');
const { Server } = require("socket.io");
//server is created
const app = express();
const http = require('http');
const server = http.createServer(app);

const io = new Server(server);

//app.use(express.json());
app.use(express.static("public"));

let userList = [];

io.on("connection", function(socket){
    console.log(socket.id + "a user connected!!!");

    socket.on("userConnected", function(username){
        let userObject = {id:socket.id, username: username};
        userList.push(userObject);
        //console.log(userList);

        //for self
        socket.emit("online-list", userList);

        //broadcast a message to all other clients except sender
        socket.broadcast.emit("join", userObject);
    })

    socket.on("disconnect", function(){
        let leftUserObj;
        let remainingUsers = userList.filter(function(curUserObj){
            if(socket.id == curUserObj.id){
                leftUserObj = curUserObj;
                return false;
            }
            return true;
        })
        userList = remainingUsers;
        socket.broadcast.emit("userDisconnected", leftUserObj);
    })

    socket.on("chat", function(chatObj){
        socket.broadcast.emit("chatLeft", chatObj);
    })


});

server.listen(5500, function(){
    console.log("Server started at port 5500");
})