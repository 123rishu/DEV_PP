const plansModel = require("../models/plansModel");
const mongoose = require("mongoose");
const express = require("express");
const plansRouter = express.Router();

plansRouter
    .route("/")
    .get(getPlans)
    .post(createPlan)
plansRouter
    .route("/:id")
    .get(getPlanById)
    .patch(updatePlan)
    .delete(deletePlan)
plansRouter
    .route("/top3plans")
    .get(getTop3Plans)

//----------------------------------------------------------------------------------------------//
//Plans Methods
async function getPlans(req, res){
    try{
        let plans = await plansModel.find({});
        res.status(200).json({
            "message": "List of all plans",
            plans: plans
        })
    }
    catch(err){
        res.status(500).json({
            message: err.message
        })
    }
}
async function createPlan(req, res){
    try{
        let planObject = req.body;
        let length = Object.keys(planObject).length;

        if(length == 0){
            return res.status(400).json({
                "message": "Entered plan details are empty",
            })
        }

        let plan = await plansModel.create(planObject);
        console.log("plan", plan);

        res.status(200).json({
            message: "Plan created",
            plan: plan
        })
    }
    catch(err){
        res.status(500).json({
            "message": err.message,
        })
    }
}
async function getPlanById(req, res){
    try{
        let id = req.params.id;
        let plan = await plansModel.findById(id);
        res.status(200).json({
            "message": "Got the plan",
            plan: plan
        })
    }
    catch(err){
        res.status(500).json({
            message: err.message,
        })
    }
}
async function updatePlan(req, res){
    try{
        let id = req.params.id;
        let plan = await plansModel.findByIdAndUpdate(id, {name: "Mix Veg"});
        res.status(200).json({
            "message": "Details Updated",
            plan: plan
        })
    }
    catch(err){
        res.status(500).json({
            "message": err.message
        })
    }
}
async function deletePlan(req, res){
    try{
        let id = req.params.id;
        let plan = await plansModel.findByIdAndDelete(id);
        res.status(200).json({
            "message": "Plan info deleted",
            plan: plan
        })
    }
    catch(err){
        message: err.message
    }
}
function getTop3Plans(){

}
//----------------------------------------------------------------------------------------------//


module.exports = plansRouter;