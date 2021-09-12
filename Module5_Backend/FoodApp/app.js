const express = require("express");

//server init
const app = express();

app.use(express.json());

let user = {};

//create user in server
app.post("/user", function(req, res){
    console.log("req.data", req.body);
    user = req.body;
    res.status(200).send("data received and user added");
})


app.get("/", function(req, res){
    console.log("hello from home page");
    res.send("<h1>Hello form Backend</h1>");
})

//get user from server
app.get("/user", function(req, res){
    console.log("users");
    //for sending key value pair
    res.json(user);
})

//update user in server
app.patch("/user", function(req, res){
    let obj = req.body;
    for(let key in obj){
        user[key] = obj[key];
    }
    res.status(200).json(user);
})

//template routes in server
app.get("/user/:id", function(req, res){
    console.log(req.params.id);
    res.status(200).send("Hello");
})

//delete user in server
app.delete("/user", function(req, res){
    user = {};
    res.status(200).json(user);
})

app.listen(8080, function(){
    console.log("server started");
})