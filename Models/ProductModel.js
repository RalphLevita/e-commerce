const mongoose = require("mongoose");
const { ObjectId } = require("mongodb");

const productSchema = new mongoose.Schema({
    productCode: {
    type: String,
    required: [true, "Please provide a Product Code."],
  },
  productName: {
    type: String,
    required: [true, "Please provide a product Name"],
  },    
  productDesc: {
    type: String,
    required: [true, "Please provide a product Description"],
  },
  productImage: {
    type: Array,
    required: [true, "Please input an Image"],
  },
  quantity: {
    type: Number,
    required: [true, "Please input quantity of product"],
  },
  adminId: {
    type: ObjectId,
    required: [true, "Please input a school Year."],
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
},
{ timestamps: true });

const Product = mongoose.model("Product", productSchema);

module.exports = Product;