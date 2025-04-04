const express = require("express");
const router = express.Router();
const orderService = require("../service/orderService");
// const orderSchemaValid = require("../models/modelValidate");

// Get all orders
router.get("/getOrders", orderService.getAllOrder);

// Create a new order
router.post("/createOrder", orderService.createOrder);

// Update order status
router.patch("/update/:orderId", orderService.updateOrder);

module.exports = router;