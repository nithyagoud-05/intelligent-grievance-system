import { useEffect, useState } from "react";
import Login from "./Login";

const API =
  "https://intelligent-grievance-system.onrender.com/api/grievances";

const styles = {
  nav: {
    background: "white",
    borderBottom: "0.5px solid #e5e7eb",
    padding: "0 28px",
    height: "52px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    position: "sticky",
    top: 0,
    zIndex: 10,
  },
  logo: { fontSize: "16px", fontWeight: "500", color: "#1a1a1a" },
  logoSpan: { color: "#534AB7" },
  page: {
    background: "#f9fafb",
    padding: "24px 28px",
    minHeight: "100vh",
  },
  card: {
    background: "white",
    border: "0.5px solid #e5e7eb",
    borderRadius: "12px",
    padding: "18px 20px",
    marginBottom: "16px",
  },
  textarea: {
    width: "100%",
    padding: "8px 12px",
    border: "0.5px solid #d1d5db",
    borderRadius: "8px",
    height: "72px",
    resize: "none",
    outline: "none",
  },
  submitBtn: {
    width: "100%",
    background: "#534AB7",
    color: "#fff",
    padding: "10px",
    borderRadius: "8px",
    border: "none",
    marginTop: "10px",
    cursor: "pointer",
  },
  gItem: {
    padding: "12px 0",
    borderBottom: "0.5px solid #e5e7eb",
    display: "flex",
    justifyContent: "space-between",
  },
};

export default function App() {
  // 🔐 AUTH STATE
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("token")
  );

  const [grievances, setGrievances] = useState([]);
  const [issue, setIssue] = useState("");
  const [priority, setPriority] = useState("medium");
  const [status, setStatus] = useState("pending");
  const [loading, setLoading] = useState(false);

  // =====================
  // SAFETY: CHECK TOKEN ON LOAD
  // =====================
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) setIsLoggedIn(false);
  }, []);

  // =====================
  // LOGOUT
  // =====================
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setGrievances([]);
    setIsLoggedIn(false);
  };

  // =====================
  // FETCH GRIEVANCES (JWT SAFE)
  // =====================
  const fetchGrievances = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        handleLogout();
        return;
      }

      const res = await fetch(API, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status === 401) {
        handleLogout();
        return;
      }

      const data = await res.json();
      setGrievances(data.data || []);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  // load data after login
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

      if (!res.ok) {
        console.error("Create failed");
        return;
      }

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

      if (!res.ok) {
        console.error("Delete failed");
        return;
      }

      fetchGrievances();
    } catch (err) {
      console.error(err);
    }
  };

  // =====================
  // LOGIN SCREEN
  // =====================
  if (!isLoggedIn) {
    return <Login onLogin={() => setIsLoggedIn(true)} />;
  }

  // =====================
  // MAIN APP
  // =====================
  return (
    <div>
      {/* NAV */}
      <div style={styles.nav}>
        <div style={styles.logo}>
          Grievance<span style={styles.logoSpan}>IQ</span>
        </div>

        <button onClick={handleLogout}>Logout</button>
      </div>

      {/* PAGE */}
      <div style={styles.page}>
        <h2>Dashboard</h2>

        {/* CREATE */}
        <div style={styles.card}>
          <textarea
            placeholder="Enter issue..."
            value={issue}
            onChange={(e) => setIssue(e.target.value)}
          />

          <button
            style={styles.submitBtn}
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </div>

        {/* LIST */}
        <div style={styles.card}>
          {grievances.map((g) => (
            <div key={g._id} style={styles.gItem}>
              <div>
                <b>{g.issue}</b>
                <div style={{ fontSize: "12px" }}>
                  {g.priority} | {g.status}
                </div>
              </div>

              <button onClick={() => handleDelete(g._id)}>Delete</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}