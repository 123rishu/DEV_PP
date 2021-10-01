const express = require("express");

//server init
const app = express();

app.use(express.static('public'));
app.use(express.json());
//Mounting in express
const userRouter = express.Router();
const authRouter = express.Router();
//  /api/user/:id
app.use('/api/user', userRouter);
app.use("/api/auth", authRouter);

userRouter
    .route("/")
    .get(getUser)
    .post(createUser)
    .patch(updateUser)
    .delete(deleteUser)
userRouter
    .route(":/id")
    .get(getUserById)
authRouter
    .post("/signup", setCreatedAt, signupUser)
    // .post("/login", loginUser);

//database
let user = [];

//middleware method
function setCreatedAt(req, res, next){
    req.body.createdAt = new Date().toISOString();
    next();
}

function signupUser(req, res){
    //create user object(email, password, name) in database with the requested data
    let {email, password, name} = req.body;
    console.log("user", req.body);

    user.push({
        email, password, name
    })

    res.status(200).json({
        message: "User created",
        createdUser: req.body
    })
}

// let user = {};

app.get("/", function(req, res){
    console.log("hello from home page");
    res.send("<h1>Hello form Backend</h1>");
});

function createUser(req, res){
    console.log("req.data", req.body);
    user = req.body;
    res.status(200).send("data received and user added");
}
function getUser(req, res){
    console.log("users");
    //for sending key value pair
    res.json(user);
}
function getUserById(req, res){
    console.log(req.params.id);
    res.status(200).send("Hello");
}
function deleteUser(req, res){
    user = {};
    res.status(200).json(user);
}
function updateUser(req, res){
    let obj = req.body;
    for(let key in obj){
        user[key] = obj[key];
    }
    res.status(200).json(user);
}

//create user in server
// app.post("/user", createUser);
// //get user from server
// app.get("/user", getUser);
// //update user in server
// app.patch("/user", updateUser);
// //template routes in server
// app.get("/user/:id", getUserById);
// //delete user in server
// app.delete("/user", deleteUser);













app.listen(8080, function(){
    console.log("server started");
})