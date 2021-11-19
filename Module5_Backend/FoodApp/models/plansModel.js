const mongoose = require("mongoose");
const {DB_LINK} = require("../secrets2");
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
    name: {
        type: String,
        required: [true, "kindly pass the name"],
        unique: true,
        // errors
        maxlength: [40, "Your plan length is more than 40 characters"],
    },
    duration: {
        type: Number,
        required: [true, "You Need to provide duration"]
    },
    price: {
        type: Number,
        required: true,
        
    },
    ratingsAverage: {
        type: Number,
    },
    discount: {
        type: Number,
        validate: {
            validator: function () {
                return this.discount < this.price;
            },
            message: "Discount must be less than actual price",
        },
    },
})

//Step-3
//Create a Model using mongoose
const planModel = mongoose.model("planModel", plansSchema);
module.exports = planModel;

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