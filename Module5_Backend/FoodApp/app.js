const express = require("express");
const userModel = require("./models/userModel");
const plansModel = require("./models/plansModel");
const cookieParser = require("cookie-parser");

//server init
const app = express();

app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());
//Mounting in express
const userRouter = require("./Routers/userRouter");
const authRouter = require("./Routers/authRouter");
const plansRouter = require("./Routers/planRouter");
//  /api/user/:id
app.use('/api/user', userRouter);
app.use("/api/auth", authRouter);
app.use("/api/plans", plansRouter);

app.listen(8080, function () {
    console.log("server started");
})









//--------------EXTRA----------------------------------//

// app.get("/", function (req, res) {
//     console.log("hello from home page");
//     res.send("<h1>Hello form Backend</h1>");
// });


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
//-----------------------------------------------------//