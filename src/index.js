const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const connectDB = require("./config/db");
const userRoutes = require("./routes/user");
const outcomeRoutes = require("./routes/outcome");

dotenv.config();

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());

app.use("/v1/api/users", userRoutes);
app.use("/v1/api/outcomes", outcomeRoutes);

app.use('/health', (req,res) => {
    res.status(200).json({
        message: "Server is running"
    })
})

const PORT = process.env.PORT || 7070;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});