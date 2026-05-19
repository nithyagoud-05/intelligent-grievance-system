
const errorHandler = (err, req, res, next) => {
    console.error("REAL ERROR:", err);

    res.status(500).json({
        error: err.message
    });
};

module.exports = errorHandler;