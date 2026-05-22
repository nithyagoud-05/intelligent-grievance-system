const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const grievanceController = require("../controller/grievanceController");

// 🔐 Protected routes (IMPORTANT PART)
router.post("/create", authMiddleware, grievanceController.createGrievance);

router.get("/my", authMiddleware, grievanceController.getMyGrievances);

router.delete("/:id", authMiddleware, grievanceController.deleteGrievance);

module.exports = router;