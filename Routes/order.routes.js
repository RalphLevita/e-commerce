const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth");

const {
 createOrder,
 getAllOrders,
 archiveOrders,
 viewOrders,
 updateOrder
} = require("../Controllers/orderController");

router.route("/createorders").post(protect, createOrder);
router.route("/getorders").get(protect, getAllOrders);
router.route("/updateorders/:id").put(protect, archiveOrders);
router.route("/vieworders/:id").get(protect, viewOrders);
router.route("/deleteorders/:id").put(protect, updateOrder);

module.exports = router;
