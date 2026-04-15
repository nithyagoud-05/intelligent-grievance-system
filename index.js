require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const app = express();

// 🟢 MIDDLEWARE
app.use(express.json());

// 🔗 DATABASE CONNECTION
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected ✅"))
.catch((err) => console.log("DB Error ❌", err));
const cors = require("cors");
app.use(cors());
// 📦 ROUTES
const grievanceRoutes = require("./routes/grievanceRoutes");
app.use("/api/grievances", grievanceRoutes);

// 🧪 TEST ROUTE
app.get("/", (req, res) => {
    res.send("Backend running 🚀");
});

// ❗ ERROR HANDLER (ALWAYS LAST)
const errorHandler = require("./middleware/errorHandler");
app.use(errorHandler);

// 🚀 SERVER START
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});