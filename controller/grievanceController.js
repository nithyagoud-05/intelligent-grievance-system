const Grievance = require("../models/Grievance");

// =====================
// CREATE
// =====================
exports.createGrievance = async (req, res, next) => {
  try {
    const { issue, priority, status } = req.body;

    if (!issue || issue.trim().length < 5) {
      return res.status(400).json({
        success: false,
        message: "Issue must be at least 5 characters",
      });
    }

    const grievance = await Grievance.create({
      issue: issue.trim(),
      priority: priority || "medium",
      status: status || "pending",
      user: req.user.id,
    });

    res.status(201).json({
      success: true,
      data: grievance,
    });
  } catch (err) {
    next(err);
  }
};

// =====================
// GET ALL (PUBLIC)
// =====================
exports.getAllGrievances = async (req, res, next) => {
  try {
    const data = await Grievance.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      data,
    });
  } catch (err) {
    next(err);
  }
};

// =====================
// GET ONE
// =====================
exports.getGrievanceById = async (req, res, next) => {
  try {
    const data = await Grievance.findById(req.params.id);

    if (!data) {
      return res.status(404).json({
        success: false,
        message: "Grievance not found",
      });
    }

    res.json({
      success: true,
      data,
    });
  } catch (err) {
    next(err);
  }
};

// =====================
// GET MY
// =====================
exports.getMyGrievances = async (req, res, next) => {
  try {
    const data = await Grievance.find({
      user: req.user.id,
    }).sort({ createdAt: -1 });

    res.json({
      success: true,
      data,
    });
  } catch (err) {
    next(err);
  }
};

// =====================
// UPDATE
// =====================
exports.updateGrievance = async (req, res, next) => {
  try {
    const data = await Grievance.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!data) {
      return res.status(404).json({
        success: false,
        message: "Not found",
      });
    }

    res.json({
      success: true,
      data,
    });
  } catch (err) {
    next(err);
  }
};

// =====================
// DELETE
// =====================
exports.deleteGrievance = async (req, res, next) => {
  try {
    const data = await Grievance.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!data) {
      return res.status(404).json({
        success: false,
        message: "Not found or unauthorized",
      });
    }

    res.json({
      success: true,
      message: "Deleted successfully",
    });
  } catch (err) {
    next(err);
  }
};