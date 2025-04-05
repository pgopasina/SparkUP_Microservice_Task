const axios = require("axios");

let payment = async (req, res) => {
    try {
        const { orderId, amount } = req.body;
        console.log("Request body:", req.body);
        if (!orderId || !amount) {
            return res.status(400).json({ error: "orderId and amount are required" });
        }

        console.log(`Processing payment for Order ${orderId} - $${amount}`);

        // Update order status in Order Service
        await axios.patch(`http://localhost:5000/order/update/${orderId}`, {
            status: "Paid",
        });

        res.status(200).json({ message: "Payment processed", data: orderId });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = { payment };
