const mongoose = require("mongoose");

const PredictionSchema = new mongoose.Schema({

productId:{
type: mongoose.Schema.Types.ObjectId,
ref: "Product"   // ✅ IMPORTANT (NOT Inventory)
},

predictedDemand:{
type:Number
},

riskLevel:{
type:String
},

confidenceScore:{
type:Number
},

createdAt:{
type:Date,
default:Date.now
}

});

module.exports = mongoose.model("Prediction", PredictionSchema);