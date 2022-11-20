const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth");

const {
 createProducts,
 getAllProducts,
 archiveProduct,
 viewProduct,
 updateProduct
} = require("../Controllers/productController");

router.route("/createproduct").post(protect, createProducts);
router.route("/getproducts").get(protect, getAllProducts);
router.route("/updateproducts/:id").put(protect, updateProduct);
router.route("/viewproduct/:id").get(protect, viewProduct);
router.route("/deleteproduct/:id").put(protect, archiveProduct);

module.exports = router;
