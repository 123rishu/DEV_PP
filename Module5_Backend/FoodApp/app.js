const express = require("express");
const userModel = require("./models/userModel");

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
    .get(getUsers)
    .post(createUser)
userRouter
    .route("/:id")
    .get(getUserById)
    .patch(updateUser)
    .delete(deleteUser)
authRouter
    .post("/signup", setCreatedAt, signupUser)
    .post("/login", loginUser);

//database
// let user = [];

//http://localhost:8080/api/auth/signup
//ispar hit lagte hi pehle setCreatedAt chalega then signupUser
//request response ka kaam express karta hai
//aur, db me object creation ka kam mongoose karta hai

//middleware method
function setCreatedAt(req, res, next) {
    let body = req.body;
    let length = Object.keys(body).length;

    if (length == 0) {
        //Agar body ke object length zero hogi, toh signup ko call nahi lagegi, aur yhi se response bhej denge
        return res.status(400).json({
            message: "Can't create user when body is empty"
        })
    }

    req.body.createdAt = new Date().toISOString();
    next();
}

async function signupUser(req, res) {
    //create user object(email, password, name) in database with the requested data
    try {
        let userObject = req.body;
        console.log("userObj", userObject);

        //userModel.create(object) call hote hi
        //object ke upar userSchema ka code parse karke check hoga 
        //ki thik tarah se u=object define hua hai ya nahi
        //then, userSchema vala hook chalega, then document store hoga db ke andar
        let user = await userModel.create(userObject);
        console.log("user", user);

        res.status(200).json({
            message: "User created",
            createdUser: user,
        })

        // user.push({
        //     email, password, name
        // })
    }
    catch (err) {
        res.status(500).json({
            message: err.message,
        })
    }
}

// let user = {};

async function loginUser(req, res) {
    try {
        //Ye posted user ka object ayega
        let loginUserObject = req.body;
        console.log(loginUserObject)
        if (loginUserObject.email) {
            //ye hum db se object nikal ke layenge, posted object ke email nam ke according
            let user = await userModel.findOne({ "email": loginUserObject.email });
            if (user) {
                if (user.password == loginUserObject.password) {
                    return res.status(200).json({
                        user,
                        "message": "user logged in "
                    })
                }
                else {
                    return res.status(401).json({
                        "message": "Email or password is wrong"
                    })
                }
            }
            else {
                return res.status(401).json({
                    "message": "Email or password is wrong"
                })
            }
        }
        else {
            return res.status(403).json({
                "message": "Email is not present",
            })
        }
    }
    catch (err) {
        res.status(500).json({
            message: err.message,
        })
    }
}

app.get("/", function (req, res) {
    console.log("hello from home page");
    res.send("<h1>Hello form Backend</h1>");
});

function createUser(req, res) {
    console.log("req.data", req.body);
    user = req.body;
    res.status(200).send("data received and user added");
}
async function getUsers(req, res) {
    try {
        let users = await userModel.find({});
        res.status(200).json({
            "message": "List of all the Users",
            users: users,
        })
    }
    catch (err) {
        res.status(500).json({
            error: err.message,
            "message": "Can't get users",
        })
    }
}
async function getUserById(req, res) {
    try{
        let id = req.params.id;
        let user = await userModel.findById(id);
        res.status(200).json({
            "message": "Got the user",
            user: user,
        })
    }
    catch(err){
        res.status(500).json({
            message: err.message,
        })
    }
}
//findByIdAndDelete
async function deleteUser(req, res) {
    try{
        let id = req.params.id;
        console.log(id);
        let user = await userModel.findByIdAndDelete(id);
        console.log(user);
        res.status(200).json({
            "message": "User info deleted",
            user: user
        })
    }
    catch(err){
        res.status(500).json({
            "message" : err.message,
        })
    }


    // user = {};
    // res.status(200).json(user);
}
//findByIdAndUpdate
async function updateUser(req, res) {
    try{
        let id = req.params.id;
        console.log(id);
        let user = await userModel.findByIdAndUpdate(id, {name : "Sham S"});
        res.status(200).json({
            "message": "Details updated",
            user: user
        })
    }
    catch(err){
        res.status(500).json({
            "message": err.message
        })
    }
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













app.listen(8080, function () {
    console.log("server started");
})