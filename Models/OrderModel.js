const mongoose = require("mongoose");
const { ObjectId } = require("mongodb");

const orderSchema = new mongoose.Schema({
  productId: {
    type: ObjectId,
    required: [true, "Please input a product."],
  },
  quantity: {
    type: Number,
    required: [true, "Please provide a quantity"],
  },    
  userId: {
    type: ObjectId,
    required: true,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
},
{ timestamps: true });

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;