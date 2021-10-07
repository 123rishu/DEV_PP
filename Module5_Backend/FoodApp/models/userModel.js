const mongoose = require("mongoose");
const {DB_LINK} = require("../secrets2");
const emailValidator = require("email-validator");

//Create a model and add entries inside it using mongodb
//Step-1
//Forming a connection with database using Mongoose
mongoose.connect(DB_LINK).then(function(db){
    console.log("Connected to Database");
    console.log(db);
}).catch(function (err){
    console.log("err", err);
})

//Step-2
//Create a schema for each entry of users collection
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: function(){
            return emailValidator.validate(this.email);
        }
    },
    age: {
        type: Number
    },
    password: {
        type: String,
        minlength: 7,
        required: true
    },
    confirmPassword: {
        type: String,
        minlength: 7,
        validate: function(){
            return this.password == this.confirmPassword
        },
        required: true
    },
    createdAt: {
        type: Date
    }
})

//pre() is a middleware/hook(mongoose) jo ek nayi entry db me
//save se bilkul pehle chalta hai
userSchema.pre("save", function(){
    // database me confirm password save nahi hoga
    this.confirmPassword = undefined;
})

//Step-3
//Create a Model using mongoose
const userModel = mongoose.model("userModel", userSchema);

//Step-4
//Inserting entries inside the model using mongoose
// (async function createUser(){
   // let user = await userModel.create(userObj);
// })();

module.exports = userModel;