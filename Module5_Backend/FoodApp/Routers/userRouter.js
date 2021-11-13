const userModel = require("../models/userModel");
const mongoose = require("mongoose");
const express = require("express");
const userRouter = express.Router();
const protectRoute = require("./authHelper");

userRouter
    .route("/")
    .get(protectRoute, getUsers)
userRouter
    .route("/:id")
    .get(protectRoute, authorizeUser(["admin", "manager"]), getUserById)
    .patch(updateUser)
    .delete(protectRoute, authorizeUser(["admin"]), deleteUser)

//---------------------------------------------------------------------------------------------//
//USER'S METHODS
async function getUsers(req, res) {
    try {
        let users = await userModel.find({});
        console.log("I was here gteusers");
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
    try {
        let id = req.params.id;
        let user = await userModel.findById(id);
        res.status(200).json({
            "message": "Got the user",
            user: user,
        })
    }
    catch (err) {
        res.status(500).json({
            message: err.message,
        })
    }
}
//findByIdAndDelete
async function deleteUser(req, res) {
    try {
        let id = req.params.id;
        console.log(id);
        let user = await userModel.findByIdAndDelete(id);
        console.log(user);
        res.status(200).json({
            "message": "User info deleted",
            user: user
        })
    }
    catch (err) {
        res.status(500).json({
            "message": err.message,
        })
    }


    // user = {};
    // res.status(200).json(user);
}
//findByIdAndUpdate
async function updateUser(req, res) {
    try {
        let id = req.params.id;
        console.log(id);
        let user = await userModel.findByIdAndUpdate(id, { name: "Sham S" });
        res.status(200).json({
            "message": "Details updated",
            user: user
        })
    }
    catch (err) {
        res.status(500).json({
            "message": err.message
        })
    }
}

function authorizeUser(rolesArr) {
    return async function (req, res, next) {
        let uid = req.uid;
        let { role } = await userModel.findById(uid);
        let isAuthorized = rolesArr.includes(role);
        if (isAuthorized) {
            next();
        } else {
            res.status(403).json({
                message: "user not authorized contact admin"
            })
        }

    }
}
//----------------------------------------------------------------------------------------------//

module.exports = userRouter;