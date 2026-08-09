const mongoose = require("mongoose");

const ExpenseSchema = new mongoose.Schema({

productName:{
type:String,
required:true
},

amount:{
type:Number,
required:true
},

type:{
type:String
},

description:{
type:String
},

date:{
type:Date,
default:Date.now
}

});

module.exports = mongoose.model("Expense",ExpenseSchema);