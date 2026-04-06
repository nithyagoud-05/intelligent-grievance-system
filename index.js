const express = require("express");
<<<<<<< Updated upstream

const app = express();

=======
const app = express();

app.use(express.json());

>>>>>>> Stashed changes
app.get("/", (req, res) => {
    res.send("Hello 🚀 Backend is running!");
});

<<<<<<< Updated upstream
app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});
=======
app.post("/grievance", (req, res) => {
    const grievanceData = req.body;

    console.log("Received:", grievanceData);

    res.json({
        message: "Grievance submitted successfully",
        data: grievanceData
    });
});

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
>>>>>>> Stashed changes
