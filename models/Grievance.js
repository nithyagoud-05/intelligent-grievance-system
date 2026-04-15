const mongoose = require("mongoose");

const grievanceSchema = new mongoose.Schema({
    issue: {
        type: String,
        required: true,
        trim: true
    },
    status: {
        type: String,
        enum: ["pending", "resolved"],
        default: "pending"
    }
}, { timestamps: true });

module.exports = mongoose.model("Grievance", grievanceSchema);