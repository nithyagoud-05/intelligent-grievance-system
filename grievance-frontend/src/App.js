import { useEffect, useState } from "react";
import Login from "./Login";

const API = "https://intelligent-grievance-system.onrender.com/api/grievances";

export default function App() {
  console.log("VERSION 1401907");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [grievances, setGrievances] = useState([]);
  const [issue, setIssue] = useState("");
  const [priority, setPriority] = useState("medium");
  const [status, setStatus] = useState("pending");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const valid = token && token !== "undefined" && token !== "null" && token.trim() !== "";
    setIsLoggedIn(!!valid);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    setGrievances([]);
    setIsLoggedIn(false);
  };

  const fetchGrievances = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return handleLogout();
      const res = await fetch(API, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) return handleLogout();
      const data = await res.json();
      setGrievances(data.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (isLoggedIn) fetchGrievances();
  }, [isLoggedIn]);

  const handleSubmit = async () => {
    if (!issue.trim() || issue.trim().length < 5) return;
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      await fetch(API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ issue, priority, status }),
      });
      setIssue("");
      fetchGrievances();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await fetch(`${API}/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchGrievances();
    } catch (err) {
      console.error(err);
    }
  };

  if (!isLoggedIn) {
    return (
      <Login onLogin={() => {
        const token = localStorage.getItem("token");
        const valid = token && token !== "undefined" && token !== "null" && token.trim() !== "";
        if (valid) setIsLoggedIn(true);
      }} />
    );
  }

  return (
    <div style={{ fontFamily: "system-ui, sans-serif" }}>
      <div style={{ padding: "12px 28px", background: "white", borderBottom: "0.5px solid #e5e7eb", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ fontSize: "16px", fontWeight: "500" }}>Grievance<span style={{ color: "#534AB7" }}>IQ</span></div>
        <button onClick={handleLogout} style={{ padding: "6px 14px", borderRadius: "6px", border: "0.5px solid #e5e7eb", cursor: "pointer", fontSize: "13px" }}>Logout</button>
      </div>

      <div style={{ padding: "24px 28px", background: "#f9fafb", minHeight: "100vh" }}>
        <h2 style={{ marginBottom: "20px" }}>Dashboard</h2>

        <div style={{ background: "white", border: "0.5px solid #e5e7eb", borderRadius: "12px", padding: "18px 20px", marginBottom: "16px" }}>
          <textarea
            placeholder="Describe your issue (min 5 characters)..."
            value={issue}
            onChange={(e) => setIssue(e.target.value)}
            style={{ width: "100%", padding: "8px 12px", borderRadius: "8px", border: "0.5px solid #d1d5db", height: "80px", resize: "none", fontSize: "13px" }}
          />
          <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
            <select value={priority} onChange={(e) => setPriority(e.target.value)} style={{ padding: "8px", borderRadius: "8px", border: "0.5px solid #d1d5db", fontSize: "13px" }}>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
            <select value={status} onChange={(e) => setStatus(e.target.value)} style={{ padding: "8px", borderRadius: "8px", border: "0.5px solid #d1d5db", fontSize: "13px" }}>
              <option value="pending">Pending</option>
              <option value="resolved">Resolved</option>
            </select>
            <button onClick={handleSubmit} disabled={loading} style={{ background: "#534AB7", color: "white", padding: "8px 20px", borderRadius: "8px", border: "none", cursor: "pointer", fontSize: "13px" }}>
              {loading ? "Submitting..." : "Submit"}
            </button>
          </div>
        </div>

        <div style={{ background: "white", border: "0.5px solid #e5e7eb", borderRadius: "12px", padding: "18px 20px" }}>
          <h3 style={{ marginBottom: "14px", fontSize: "14px" }}>All Grievances</h3>
          {grievances.length === 0 && <p style={{ fontSize: "13px", color: "#888" }}>No grievances yet.</p>}
          {grievances.map((g, i) => (
            <div key={g._id} style={{ padding: "12px 0", borderBottom: i === grievances.length - 1 ? "none" : "0.5px solid #e5e7eb", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <div style={{ fontSize: "13px", fontWeight: "500" }}>{g.issue}</div>
                <div style={{ fontSize: "11px", color: "#888", marginTop: "3px" }}>{g.priority} · {g.status}</div>
              </div>
              <button onClick={() => handleDelete(g._id)} style={{ fontSize: "11px", color: "#D85A30", border: "0.5px solid #f0c0c0", padding: "3px 10px", borderRadius: "6px", background: "white", cursor: "pointer" }}>Delete</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}