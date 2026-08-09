const express = require("express");
const router = express.Router();

const Expense = require("../models/Expense");


// ADD EXPENSE
router.post("/expense/add", async (req,res)=>{

try{

const {productName,amount,type,description} = req.body;

const expense = new Expense({
productName,
amount,
type,
description
});

await expense.save();

res.json({message:"Expense added successfully"});

}catch(error){

res.status(500).json({error:error.message});

}

});


// GET ALL EXPENSES
router.get("/expense/list", async (req,res)=>{

try{

const expenses = await Expense.find();

res.json(expenses);

}catch(error){

res.status(500).json({error:error.message});

}

});


// TOTAL EXPENSE
router.get("/expense/total", async (req,res)=>{

try{

const expenses = await Expense.find();

let total = 0;

expenses.forEach(e=>{
total += Number(e.amount);
});

res.json({total});

}catch(error){

res.status(500).json({error:error.message});

}

});

module.exports = router;