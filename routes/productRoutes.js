const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const StockHistory = require("../models/StockHistory");
const predictDemand = require("../ai/demandPrediction");


// ADD PRODUCT
router.post("/add", async (req, res) => {
  try {
    const { name, quantity } = req.body;

    const product = new Product({ name, quantity });
    await product.save();

    // SAVE HISTORY (IN)
    await StockHistory.create({
      productName: name,
      change: quantity,
      type: "IN"
    });

    res.json({ message: "Product added", product });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// GET PRODUCTS
router.get("/all", async (req, res) => {
  const products = await Product.find();
  res.json(products);
});


// UPDATE PRODUCT
router.put("/update/:id", async (req, res) => {

  try {

    const oldProduct = await Product.findById(req.params.id);

    const newQty = req.body.quantity;
    const diff = newQty - oldProduct.quantity;

    const updated = await Product.findByIdAndUpdate(
      req.params.id,
      { quantity: newQty },
      { new: true }
    );

    // SAVE HISTORY
    await StockHistory.create({
      productName: oldProduct.name,
      change: Math.abs(diff),
      type: diff > 0 ? "IN" : "OUT"
    });

    res.json(updated);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// DELETE
router.delete("/delete/:id", async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});


// LOW STOCK
router.get("/low-stock", async (req, res) => {
  const products = await Product.find({ quantity: { $lt: 5 } });
  res.json(products);
});


// STOCK HISTORY API
router.get("/history", async (req, res) => {
  const history = await StockHistory.find().sort({ date: -1 });
  res.json(history);
});

module.exports = router;