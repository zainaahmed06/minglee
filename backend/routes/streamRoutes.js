// Route definitions for Stream Chat endpoints

const express = require("express");
const router = express.Router();
const streamController = require("../controllers/streamController");
const authMiddleware = require("../middleware/authMiddleware");

// Protect all routes with authentication middleware
router.use(authMiddleware);

// Generate a Stream Chat token
router.post("/token", streamController.generateStreamToken);

// Create or update a Stream Chat user
router.post("/user", streamController.createStreamUser);

// Delete a Stream Chat user
router.delete("/user", streamController.deleteStreamUser);

module.exports = router;
