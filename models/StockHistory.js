const mongoose = require("mongoose");

const StockHistorySchema = new mongoose.Schema({
  productName: String,
  change: Number,
  type: String, // IN / OUT
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("StockHistory", StockHistorySchema);