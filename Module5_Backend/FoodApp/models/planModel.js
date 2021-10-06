const mongoose = require("mongoose");
const {DB_LINK} = require("../secrets");
const emailValidator = require("email-validator");

//Create a model and add entries inside it using mongodb
//Step-1
//Forming a connection with database using Mongoose
mongoose.connect(DB_LINK).then(function(db){
    console.log(db);
}).catch(function (err){
    console.log("err", err);
})

//Step-2
//Creating a schema for each entry of plans collection
const plansSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    ratings: {
        type: Number,
        required: true,
    },
    price: {
        type: Number,
        required: true
    },
    delivery: {
        type: Boolean,
        required: true,
    },
    meals: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true,
    }
})

//Step-3
//Create a Model using mongoose
const plansModel = mongoose.model("plansModel", userSchema);

//Step-4
//Inserting entries inside the model using mongoose
// (async function createUser(){
//     let planObj = {
//         name : "Rishabh Sharma",
//         password: "123456789",
//         age: 21,
//         email: "abc@gmail.com",
//         confirmPassword: "123456789"
//     }
//     let plan = await userModel.create(planObj);
//     console.log("Plan", plan);
// })();