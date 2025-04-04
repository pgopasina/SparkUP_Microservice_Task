const express = require("express");
const router = express.Router();
const Order = require("../models/orderModel");
const axios = require("axios");

// Get all orders
let getAllOrder = async (req, res) => {
    try {
        const orders = await Order.find();
        res.status(200).json({ message: "Orders fetched successfully", data: orders });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Create a new order
let createOrder = async (req, res) => {
    try {
        const { product, amount } = req.body;
        // Validate input
        if (!product || !amount) {
            return res.status(400).json({ message: "Product and amount are required" });
        }

        const order = new Order({ product, amount });
        await order.save();

        // Call Payment Service
        try {
            await axios.post("http://payment-service:5001/payment/pay", {
                orderId: order._id,
                amount,
            });
        } catch (paymentError) {
            console.error("Payment Service Error:", paymentError.message);
            return res.status(500).json({ message: "Order created, but payment failed", order });
        }

        res.status(201).json({ message: "Order created", Data: order });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Update order status
let updateOrder = async (req, res) => {
    try {
        const {orderId} = req.params;
        const {status} = req.body;

        const order = await Order.findById(orderId);
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        order.status = status;
        await order.save();

        res.status(200).json({ message: "Order status updated", order });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


module.exports = { getAllOrder, createOrder, updateOrder };
