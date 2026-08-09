const mongoose = require("mongoose");

const InventorySchema = new mongoose.Schema({

  productName: {
    type: String,
    required: true
  },

  category: {
    type: String,
    default: "General"
  },

  quantity: {
    type: Number,
    required: true,
    default: 0
  },

  price: {
    type: Number,
    default: 0
  },

  supplier: {
    type: String,
    default: "Unknown"
  },

  createdDate: {
    type: Date,
    default: Date.now
  }

});

module.exports = mongoose.model("Inventory", InventorySchema);