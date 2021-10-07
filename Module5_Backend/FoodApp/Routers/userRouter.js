const userModel = require("../models/userModel");
const mongoose = require("mongoose");
const express = require("express");
const userRouter = express.Router();
userRouter
    .route("/")
    .get(getUsers)
userRouter
    .route("/:id")
    .get(getUserById)
    .patch(updateUser)
    .delete(deleteUser)

//---------------------------------------------------------------------------------------------//
//USER'S METHODS
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
//----------------------------------------------------------------------------------------------//

module.exports = userRouter;