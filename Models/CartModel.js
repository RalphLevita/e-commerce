const mongoose = require("mongoose");
const { ObjectId } = require("mongodb");

const cartSchema = new mongoose.Schema({
  orderId: {
    type: [{ type: ObjectId }],
    required: [true, "Please input a product."],
  },  
  addressOfDelivery: {
    type: String,
    required: [true, "Please provide a product Description"],
  },
  paymentMethod: {
    type: String,
    required: [true, "Please provide a payment Method"],
  },
  voucherId: {
    type: ObjectId,
    default: null
  },
  userId: {
    type: ObjectId,
    required: true,
  },
  shippingId: {
    type: String,
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