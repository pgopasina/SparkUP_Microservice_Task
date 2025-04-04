const express = require("express");
const router = express.Router();
const paymentService = require("../service/paymentService");

router.post("/pay", paymentService.payment);

module.exports = router;
