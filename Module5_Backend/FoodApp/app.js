const express = require("express");
const userModel = require("./models/userModel");
const planModel = require("./models/plansModel");
const cookieParser = require("cookie-parser");
const rateLimit = require("express-rate-limit");
const hpp = require("hpp");
const helmet = require("helmet");
const xss = require("xss-clean");
const mongoSanitize = require("express-mongo-sanitize");

//server init
const app = express();

app.use(rateLimit({
    max: 100,
    windowMs: 15*60*1000,
    message:
        "Too many accounts created from this IP, Please try again after an hour"
}))
//to make sure extra paramaters will not be there inside query
app.use(hpp({
    whiteList: [
        'select',
        'page',
        'sort',
        'myquery'
    ]
}))
//to set http headers
app.use(helmet());

app.use(express.json());
//to prevent xss attack - cross site scripting
app.use(xss());
//to prevent from mongodb injections--mongodb query sanitize
app.use(mongoSanitize());

app.use(express.static('public'));

app.use(cookieParser());
//Mounting in express
const userRouter = require("./Routers/userRouter");
const authRouter = require("./Routers/authRouter");
const planRouter = require("./Routers/planRouter");
const reviewRouter = require("./Routers/reviewRouter");
const bookingRouter = require('./Routers/bookingRouter');
//  /api/user/:id
app.use('/api/user', userRouter);
app.use("/api/auth", authRouter);
app.use("/api/plan", planRouter);
app.use("/api/review", reviewRouter);
app.use("/api/booking", bookingRouter);

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