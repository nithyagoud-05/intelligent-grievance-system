const express = require("express");
const router = express.Router();

const {
    createGrievance,
    getAllGrievances,
    getGrievanceById,
    updateGrievance,
    deleteGrievance
} = require("../controller/grievanceController");

router.post("/", createGrievance);
router.get("/", getAllGrievances);
router.get("/:id", getGrievanceById);
router.put("/:id", updateGrievance);
router.delete("/:id", deleteGrievance);

module.exports = router;