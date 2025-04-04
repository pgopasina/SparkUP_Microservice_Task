const mongoose = require("mongoose");
require("dotenv").config();

const connectToDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true, 
            useUnifiedTopology: true, 
        });
        console.log("MongoDB Connected for Order Service");
    } catch (err) {
        console.error("MongoDB connection error:", err);
    }
};

// Call the function to connect to the database
connectToDatabase();
