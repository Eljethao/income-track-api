const express = require("express");
const router = express.Router();
const { registerUser } = require("../controllers/user");

// Route for user registration
router.post("/register", registerUser);

module.exports = router;
