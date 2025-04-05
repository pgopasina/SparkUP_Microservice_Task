const mongoose = require("mongoose");

const OrderPaySchema = new mongoose.Schema({
    product: String,
    amount: Number,
    status: { type: String, enum: ["Pending", "Paid"], default: "Pending", },
});

module.exports = mongoose.model("Order", OrderPaySchema);
