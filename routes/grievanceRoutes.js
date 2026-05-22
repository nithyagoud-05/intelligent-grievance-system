const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");
const controller = require("../controller/grievanceController");

// PUBLIC
router.get("/", controller.getAllGrievances);
router.get("/:id", controller.getGrievanceById);

// PROTECTED
router.post("/create", protect, controller.createGrievance);
router.get("/my", protect, controller.getMyGrievances);
router.put("/:id", protect, controller.updateGrievance);
router.delete("/:id", protect, controller.deleteGrievance);

module.exports = router;