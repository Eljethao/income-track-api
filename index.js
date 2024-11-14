const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const connectDB = require("./src/config/db");
const userRoutes = require("./src/routes/user");

dotenv.config();

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());

app.use("v1/api/users", userRoutes);

const PORT = process.env.PORT || 7070;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});