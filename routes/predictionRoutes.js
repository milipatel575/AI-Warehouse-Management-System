const express = require("express");
const router = express.Router();

const Prediction = require("../models/Prediction");
const Product = require("../models/Product");


// =======================
// GENERATE PREDICTIONS
// =======================
router.post("/predict", async (req,res)=>{

try{

// clear old predictions
await Prediction.deleteMany({});

const products = await Product.find();

if(products.length === 0){
return res.json({message:"No products found"});
}

for(let p of products){

let predictedDemand = p.quantity < 5 ? 20 : 5;

let riskLevel = p.quantity < predictedDemand ? "High" : "Low";

await Prediction.create({
productId: p._id,
predictedDemand,
riskLevel,
confidenceScore: 80
});

}

res.json({message:"Prediction Generated Successfully"});

}catch(error){

res.status(500).json({error:error.message});

}

});


// =======================
// GET PREDICTIONS
// =======================
router.get("/predictions", async (req,res)=>{

try{

const data = await Prediction
.find()
.populate("productId","name quantity");

res.json(data);

}catch(error){

res.status(500).json({error:error.message});

}

});


module.exports = router;