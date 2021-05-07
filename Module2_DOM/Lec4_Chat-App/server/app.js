//express => nodejs framework
//nodemon => dev dependency => dependency which is only used during development not in production code.Automatically restarts the
                            // server after any code change in app.js file => nodejs framework
//socket => socket implementation
const express = require("express");

const app = express();
//server is created

//app.use(express.json());
app.use(express.static("public"));


app.get("/home", function(request, response){
    console.log(request);
    response.send("Welcome to Home Page !!!");
})






app.listen(5500, function(){
    console.log("Server started at port 5500");
})