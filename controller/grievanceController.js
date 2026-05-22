const Grievance = require("../models/Grievance");

// CREATE
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

// GET ALL
exports.getAllGrievances = async (req, res, next) => {
  try {
    const grievances = await Grievance.find()
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      data: grievances,
    });
  } catch (err) {
    next(err);
  }
};

// GET MY
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

// UPDATE
exports.updateGrievance = async (req, res, next) => {
  try {
    const updated = await Grievance.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json({
      success: true,
      data: updated,
    });
  } catch (err) {
    next(err);
  }
};

// DELETE (SAFE)
exports.deleteGrievance = async (req, res, next) => {
  try {
    const deleted = await Grievance.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Not found or not yours",
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