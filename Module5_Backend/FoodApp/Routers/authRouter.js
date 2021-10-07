const userModel = require("../models/userModel");
const mongoose = require("mongoose");
const express = require("express");
const authRouter = express.Router();
authRouter
    .post("/signup", setCreatedAt, signupUser)
    .post("/login", loginUser);

//http://localhost:8080/api/auth/signup
//ispar hit lagte hi pehle setCreatedAt chalega then signupUser
//request response ka kaam express karta hai
//aur, db me object creation ka kam mongoose karta hai

//-----------------------------------------//
//Auth functions
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
    }
    catch (err) {
        res.status(500).json({
            message: err.message,
        })
    }
}
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
//----------------------------------------//

module.exports = authRouter;