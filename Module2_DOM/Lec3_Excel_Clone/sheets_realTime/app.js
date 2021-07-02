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
        console.log(userList);
    })

    socket.on("cellClicked", function(cellCoordinates){
        //console.log(cellCoordinates);
        let username;
        for(let i=0;i<userList.length;i++){
            if(userList[i].id == socket.id){
                username = userList[i].username;
            }
        }
        socket.broadcast.emit("setRealTimeCell", {username, ...cellCoordinates});
    })

    socket.on("cellValue", function(cellValue){
        socket.broadcast.emit("setCellValue", cellValue);
    })
});

server.listen(5500, function(){
    console.log("Server started at port 5500");
})