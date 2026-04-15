


import { useEffect, useState } from "react";

function App() {
  const [grievances, setGrievances] = useState([]);
  const [issue, setIssue] = useState("");

  // 🔄 Fetch grievances
  const fetchGrievances = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/grievances");
      const data = await res.json();

      console.log("API RESPONSE:", data);

      setGrievances(data.data);
    } catch (err) {
      console.error("Error fetching grievances:", err);
    }
  };

  useEffect(() => {
    fetchGrievances();
  }, []);

  // ➕ Add grievance
  const handleSubmit = async (e) => {
    e.preventDefault();

    await fetch("http://localhost:3000/api/grievances", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ issue }),
    });

    setIssue("");
    fetchGrievances(); // refresh list
  };

  // ❌ DELETE grievance
  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:3000/api/grievances/${id}`, {
        method: "DELETE",
      });

      // refresh list after delete
      fetchGrievances();
    } catch (err) {
      console.error("Error deleting grievance:", err);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Grievance System 🚀</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter issue"
          value={issue}
          onChange={(e) => setIssue(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>

      <h2>All Grievances</h2>

      <ul>
        {grievances.map((g) => (
          <li key={g._id}>
            {g.issue} - {g.status}

            <button onClick={() => handleDelete(g._id)}>
              Delete ❌
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;