const express = require("express");
const paymentRoutes = require("./Routes/paymentRoutes");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use("/payment", paymentRoutes);
app.use(cors());

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Payment Service running on port ${PORT}`));

