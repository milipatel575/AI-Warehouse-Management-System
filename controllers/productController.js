const Product = require("../models/Product");

// Add Product
exports.addProduct = async (req, res) => {
  try {

    const { name, category, quantity, price } = req.body;

    const product = new Product({
      name,
      category,
      quantity,
      price
    });

    await product.save();

    res.json({
      message: "Product added successfully",
      product
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get All Products
exports.getProducts = async (req, res) => {
  try {

    const products = await Product.find();

    res.json(products);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Product Quantity
exports.updateProduct = async (req, res) => {
  try {

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json({
      message: "Product updated",
      product
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Product
exports.deleteProduct = async (req, res) => {
  try {

    await Product.findByIdAndDelete(req.params.id);

    res.json({
      message: "Product deleted"
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// Get Low Stock Products
exports.getLowStockProducts = async (req, res) => {
  try {

    const products = await Product.find({ quantity: { $lt: 5 } });

    res.json({
      message: "Low stock products",
      products
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Smart Restock Recommendation
exports.restockRecommendation = async (req, res) => {
  try {

    const products = await Product.find({ quantity: { $lt: 5 } });

    const recommendations = products.map(product => {

      const recommendedStock = 20 - product.quantity;

      return {
        productName: product.name,
        currentStock: product.quantity,
        recommendedRestock: recommendedStock
      };

    });

    res.json({
      message: "Restock recommendations",
      recommendations
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};