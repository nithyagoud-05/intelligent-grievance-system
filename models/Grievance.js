const mongoose = require("mongoose");

const grievanceSchema = new mongoose.Schema(
  {
    issue: { type: String, required: true, trim: true },

    priority: {
      type: String,
      enum: ["high", "medium", "low"],
      default: "medium",
    },

    status: {
      type: String,
      enum: ["pending", "resolved"],
      default: "pending",
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Grievance", grievanceSchema);