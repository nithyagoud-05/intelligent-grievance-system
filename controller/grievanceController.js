const Grievance = require("../models/Grievance");

// 🟢 CREATE
exports.createGrievance = async (req, res, next) => {
    try {
        const { issue, status } = req.body;

        if (!issue || typeof issue !== "string" || issue.trim().length < 5) {
            return res.status(400).json({
                error: "Please enter a valid issue (min 5 characters) ❌"
            });
        }

        if (status && !["pending", "resolved"].includes(status)) {
            return res.status(400).json({
                error: "Invalid status value ❌"
            });
        }

        const newGrievance = new Grievance({
            issue: issue.trim(),
            status
        });

        await newGrievance.save();

        res.status(201).json({
            message: "Grievance created successfully ✅",
            data: newGrievance
        });

    } catch (error) {
        next(error);
    }
};

// 🔵 GET ALL
exports.getAllGrievances = async (req, res, next) => {
    try {
        let filter = {};

        // 🟢 FILTER BY STATUS
        if (req.query.status) {
            filter.status = req.query.status;
        }

        // 🔍 SEARCH BY ISSUE
        if (req.query.search) {
            filter.issue = {
                $regex: req.query.search,
                $options: "i"
            };
        }

        // 📦 PAGINATION
        let page = parseInt(req.query.page) || 1; // Ensure limit is between 1 and 50 (prevents invalid queries)
        let limit = parseInt(req.query.limit) || 5;
        let skip = (page - 1) * limit;

       const grievances = await Grievance.find(filter)
    .sort({ createdAt: -1 }) // 🔥 NEW LINE
    .skip(skip)
    .limit(limit);

        const total = await Grievance.countDocuments(filter);

        res.status(200).json({
            success: true,
            totalRecords: total,
            currentPage: page,
            totalPages: Math.ceil(total / limit),
            count: grievances.length,
            data: grievances
        });

    } catch (error) {
        next(error);
    }
};

// 🟡 GET ONE
exports.getGrievanceById = async (req, res, next) => {
    try {
        const data = await Grievance.findById(req.params.id);

        if (!data) {
            return res.status(404).json({ error: "Grievance not found ❌" });
        }

        res.json(data);
    } catch (error) {
        next(error);
    }
};

// 🟠 UPDATE
exports.updateGrievance = async (req, res, next) => {
    try {
        const { issue, status } = req.body;

        if (issue && (typeof issue !== "string" || issue.trim().length < 5)) {
            return res.status(400).json({
                error: "Invalid issue (min 5 chars) ❌"
            });
        }

        if (status && !["pending", "resolved"].includes(status)) {
            return res.status(400).json({
                error: "Invalid status ❌"
            });
        }

        const updated = await Grievance.findByIdAndUpdate(
            req.params.id,
            {
                ...(issue && { issue: issue.trim() }),
                ...(status && { status })
            },
            { new: true, runValidators: true }
        );

        if (!updated) {
            return res.status(404).json({ error: "Grievance not found ❌" });
        }

        res.json({
            message: "Updated successfully ✅",
            data: updated
        });

    } catch (error) {
        next(error);
    }
};

// 🔴 DELETE
exports.deleteGrievance = async (req, res, next) => {
    try {
        const deleted = await Grievance.findByIdAndDelete(req.params.id);

        if (!deleted) {
            return res.status(404).json({ error: "Grievance not found ❌" });
        }

        res.json({ message: "Deleted successfully ✅" });

    } catch (error) {
        next(error);
    }
};