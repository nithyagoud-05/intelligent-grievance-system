import { useEffect, useState } from "react";
import Login from "./Login";

const API =
  "https://intelligent-grievance-system.onrender.com/api/grievances";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [grievances, setGrievances] = useState([]);
  const [issue, setIssue] = useState("");
  const [priority, setPriority] = useState("medium");
  const [status, setStatus] = useState("pending");
  const [loading, setLoading] = useState(false);

  // =====================
  // FORCE LOGIN CHECK (SAFE)
  // =====================
  useEffect(() => {
    const token = localStorage.getItem("token");

    // strict validation
    const validToken =
      token &&
      token !== "undefined" &&
      token !== "null" &&
      token.trim() !== "";

    if (validToken) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  // =====================
  // LOGOUT
  // =====================
  const handleLogout = () => {
    localStorage.clear();
    setGrievances([]);
    setIsLoggedIn(false);
  };

  // =====================
  // FETCH GRIEVANCES
  // =====================
  const fetchGrievances = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) return handleLogout();

      const res = await fetch(API, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) return handleLogout();

      const data = await res.json();
      setGrievances(data.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      fetchGrievances();
    }
  }, [isLoggedIn]);

  // =====================
  // CREATE GRIEVANCE
  // =====================
  const handleSubmit = async () => {
    if (!issue.trim() || issue.trim().length < 5) return;

    setLoading(true);

    try {
      const token = localStorage.getItem("token");

      const res = await fetch(API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          issue,
          priority,
          status,
        }),
      });

      if (!res.ok) return;

      setIssue("");
      setPriority("medium");
      setStatus("pending");
      fetchGrievances();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // =====================
  // DELETE GRIEVANCE
  // =====================
  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(`${API}/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) return;

      fetchGrievances();
    } catch (err) {
      console.error(err);
    }
  };

  // =====================
  // 🔐 LOGIN SCREEN (FORCED)
  // =====================
  if (!isLoggedIn) {
    return (
      <Login
        onLogin={() => {
          const token = localStorage.getItem("token");

          const valid =
            token &&
            token !== "undefined" &&
            token !== "null" &&
            token.trim() !== "";

          if (valid) {
            setIsLoggedIn(true);
          }
        }}
      />
    );
  }

  // =====================
  // DASHBOARD
  // =====================
  return (
    <div>
      <div style={{ padding: "10px", background: "#fff" }}>
        <h3>GrievanceIQ</h3>
        <button onClick={handleLogout}>Logout</button>
      </div>

      <div style={{ padding: "20px" }}>
        <h2>Dashboard</h2>

        <textarea
          placeholder="Enter issue..."
          value={issue}
          onChange={(e) => setIssue(e.target.value)}
        />

        <button onClick={handleSubmit} disabled={loading}>
          {loading ? "Submitting..." : "Submit"}
        </button>

        <div>
          {grievances.map((g) => (
            <div key={g._id}>
              <b>{g.issue}</b> | {g.status}
              <button onClick={() => handleDelete(g._id)}>Delete</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}