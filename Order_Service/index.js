const express = require("express");
const orderRoutes = require("./Routes/orderRoutes");
const cors = require("cors");
require("./Connection/DBConnection");

const app = express();
app.use(express.json());
app.use("/order", orderRoutes);
app.use(cors());

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Order Service running on port ${PORT}`));
