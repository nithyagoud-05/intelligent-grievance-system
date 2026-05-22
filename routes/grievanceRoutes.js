const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");
const grievanceController = require("../controller/grievanceController");

// 🔐 Protected routes
router.post("/create", protect, grievanceController.createGrievance);

router.get("/my", protect, grievanceController.getMyGrievances);

router.delete("/:id", protect, grievanceController.deleteGrievance);

module.exports = router;