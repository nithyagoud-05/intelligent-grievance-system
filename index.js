require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// =====================
// 🟢 MIDDLEWARE
// =====================
app.use(cors({
    origin: "*", // change this to your Vercel URL in production
}));
app.use(express.json());

// =====================
// 🔗 DATABASE CONNECTION
// =====================
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB Connected ✅"))
    .catch((err) => {
        console.log("DB Error ❌", err);
        process.exit(1); // stop server if DB fails
    });

// =====================
// 📦 ROUTES
// =====================
const grievanceRoutes = require("./routes/grievanceRoutes");
app.use("/api/grievances", grievanceRoutes);

// =====================
// 🧪 TEST ROUTE
// =====================
app.get("/", (req, res) => {
    res.send("Backend running 🚀");
});

// =====================
// ❗ ERROR HANDLER
// =====================
const errorHandler = require("./middleware/errorHandler");
app.use(errorHandler);

// =====================
// 🚀 SERVER START
// =====================
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});