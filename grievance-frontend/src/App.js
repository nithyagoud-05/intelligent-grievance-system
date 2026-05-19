import { useEffect, useState } from "react";

const API = "https://intelligent-grievance-system.onrender.com/api/grievances";

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
  navRight: { display: "flex", alignItems: "center", gap: "16px" },
  navLink: { fontSize: "13px", color: "#666", textDecoration: "none", cursor: "pointer" },
  userPill: {
    display: "flex", alignItems: "center", gap: "8px",
    background: "#f3f4f6", border: "0.5px solid #e5e7eb",
    borderRadius: "20px", padding: "5px 12px 5px 6px",
  },
  avatar: {
    width: "24px", height: "24px", borderRadius: "50%",
    background: "#CECBF6", display: "flex", alignItems: "center",
    justifyContent: "center", fontSize: "10px", fontWeight: "500", color: "#3C3489",
  },
  page: { background: "#f9fafb", padding: "24px 28px", minHeight: "calc(100vh - 52px)" },
  pageTitle: { fontSize: "18px", fontWeight: "500", color: "#1a1a1a", marginBottom: "4px" },
  pageSub: { fontSize: "13px", color: "#666", marginBottom: "20px" },
  stats: { display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "10px", marginBottom: "20px" },
  statCard: {
    background: "white", border: "0.5px solid #e5e7eb",
    borderRadius: "12px", padding: "14px 16px",
  },
  statLabel: { fontSize: "11px", color: "#888", marginBottom: "6px", textTransform: "uppercase", letterSpacing: "0.5px" },
  statTrend: { fontSize: "11px", marginTop: "4px" },
  grid: { display: "grid", gridTemplateColumns: "1fr 320px", gap: "16px" },
  card: { background: "white", border: "0.5px solid #e5e7eb", borderRadius: "12px", padding: "18px 20px", marginBottom: "16px" },
  cardTitle: { fontSize: "14px", fontWeight: "500", color: "#1a1a1a", marginBottom: "14px" },
  formGroup: { marginBottom: "12px" },
  formLabel: { fontSize: "12px", color: "#666", marginBottom: "5px", display: "block" },
  input: {
    width: "100%", padding: "8px 12px", border: "0.5px solid #d1d5db",
    borderRadius: "8px", fontSize: "13px", color: "#1a1a1a", background: "white", outline: "none",
  },
  textarea: {
    width: "100%", padding: "8px 12px", border: "0.5px solid #d1d5db",
    borderRadius: "8px", fontSize: "13px", color: "#1a1a1a", background: "white",
    height: "72px", resize: "none", outline: "none", fontFamily: "inherit",
  },
  select: {
    width: "100%", padding: "8px 12px", border: "0.5px solid #d1d5db",
    borderRadius: "8px", fontSize: "13px", color: "#1a1a1a", background: "white", outline: "none",
  },
  form2col: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" },
  submitBtn: {
    width: "100%", background: "#534AB7", color: "#EEEDFE",
    padding: "10px", borderRadius: "8px", border: "none",
    fontSize: "13px", fontWeight: "500", cursor: "pointer", marginTop: "2px",
  },
  divider: { height: "0.5px", background: "#e5e7eb", margin: "16px 0" },
  searchRow: { display: "flex", gap: "8px", marginBottom: "12px" },
  searchInput: {
    flex: 1, padding: "7px 12px", border: "0.5px solid #d1d5db",
    borderRadius: "8px", fontSize: "13px", color: "#1a1a1a", background: "white", outline: "none",
  },
  searchSelect: {
    padding: "7px 10px", border: "0.5px solid #d1d5db",
    borderRadius: "8px", fontSize: "12px", color: "#1a1a1a", background: "white", outline: "none",
  },
  gItem: {
    padding: "12px 0", borderBottom: "0.5px solid #e5e7eb",
    display: "flex", alignItems: "flex-start", gap: "10px",
  },
  gIssue: { fontSize: "13px", fontWeight: "500", color: "#1a1a1a", marginBottom: "4px" },
  gMeta: { fontSize: "11px", color: "#888", display: "flex", gap: "6px", alignItems: "center", flexWrap: "wrap" },
  delBtn: {
    fontSize: "11px", color: "#888", border: "0.5px solid #e5e7eb",
    padding: "3px 10px", borderRadius: "6px", background: "#f9fafb",
    cursor: "pointer", flexShrink: 0,
  },
  sideLabel: { fontSize: "11px", color: "#888", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "10px", fontWeight: "500" },
  alertItem: { display: "flex", gap: "8px", padding: "8px 0", borderBottom: "0.5px solid #e5e7eb" },
  alertText: { fontSize: "12px", color: "#1a1a1a", lineHeight: "1.5" },
  alertTime: { fontSize: "11px", color: "#888", marginTop: "1px" },
  progressHeader: { display: "flex", justifyContent: "space-between", marginBottom: "5px" },
  progressBar: { background: "#f3f4f6", borderRadius: "4px", height: "5px", marginBottom: "12px" },
};

const getBadgeStyle = (type, val) => {
  const map = {
    status: {
      pending: { background: "#FAEEDA", color: "#854F0B" },
      resolved: { background: "#E1F5EE", color: "#0F6E56" },
    },
    priority: {
      high: { background: "#FAECE7", color: "#993C1D" },
      medium: { background: "#FAEEDA", color: "#854F0B" },
      low: { background: "#EAF3DE", color: "#3B6D11" },
    },
  };
  return {
    fontSize: "10px", padding: "2px 8px", borderRadius: "10px",
    fontWeight: "500", ...(map[type]?.[val?.toLowerCase()] || {}),
  };
};

const getDotColor = (priority) => ({
  high: "#D85A30", medium: "#BA7517", low: "#0F6E56"
}[priority?.toLowerCase()] || "#888");

export default function App() {
  const [grievances, setGrievances] = useState([]);
  const [issue, setIssue] = useState("");
  const [priority, setPriority] = useState("medium");
  const [status, setStatus] = useState("pending");
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [filterPriority, setFilterPriority] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchGrievances = async () => {
    try {
      const params = new URLSearchParams();
      if (filterStatus) params.append("status", filterStatus);
      if (search) params.append("search", search);
      const res = await fetch(`${API}?${params}`);
      const data = await res.json();
      setGrievances(data.data || []);
    } catch (err) {
      console.error("Error fetching:", err);
    }
  };

  useEffect(() => { fetchGrievances(); }, [filterStatus, search, filterPriority]);

  const handleSubmit = async () => {
    if (!issue || issue.trim().length < 5) {
      setError("Please enter at least 5 characters!");
      return;
    }
    setError("");
    setLoading(true);
    try {
      await fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ issue: issue.trim(), status, priority }),
      });
      setIssue("");
      setPriority("medium");
      setStatus("pending");
      fetchGrievances();
    } catch (err) {
      setError("Failed to submit. Try again.");
    }
    setLoading(false);
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`${API}/${id}`, { method: "DELETE" });
      fetchGrievances();
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  const total = grievances.length;
  const pending = grievances.filter(g => g.status === "pending").length;
  const resolved = grievances.filter(g => g.status === "resolved").length;
  const resolutionRate = total ? Math.round((resolved / total) * 100) : 0;

  const filtered = grievances.filter(g =>
    (!filterPriority || g.priority === filterPriority)
  );

  return (
    <div style={{ fontFamily: "system-ui, sans-serif" }}>
      {/* Navbar */}
      <div style={styles.nav}>
        <div style={styles.logo}>Grievance<span style={styles.logoSpan}>IQ</span></div>
        <div style={styles.navRight}>
          <span style={styles.navLink}>Dashboard</span>
          <span style={styles.navLink}>My Complaints</span>
          <span style={styles.navLink}>Reports</span>
          <div style={styles.userPill}>
            <div style={styles.avatar}>NG</div>
            <span style={{ fontSize: "12px", fontWeight: "500" }}>Nithya</span>
          </div>
        </div>
      </div>

      {/* Page */}
      <div style={styles.page}>
        <div style={styles.pageTitle}>Dashboard</div>
        <div style={styles.pageSub}>Track, manage and resolve grievances efficiently</div>

        {/* Stats */}
        <div style={styles.stats}>
          {[
            { label: "Total", val: total, color: "#534AB7", trend: "All complaints", trendColor: "#888" },
            { label: "Pending", val: pending, color: "#BA7517", trend: "Awaiting action", trendColor: "#888" },
            { label: "Resolved", val: resolved, color: "#0F6E56", trend: `${resolutionRate}% rate`, trendColor: "#0F6E56" },
            { label: "Escalated", val: 0, color: "#D85A30", trend: "Auto-escalated", trendColor: "#D85A30" },
          ].map((s) => (
            <div key={s.label} style={styles.statCard}>
              <div style={styles.statLabel}>{s.label}</div>
              <div style={{ fontSize: "26px", fontWeight: "500", color: s.color }}>{s.val}</div>
              <div style={{ ...styles.statTrend, color: s.trendColor }}>{s.trend}</div>
            </div>
          ))}
        </div>

        {/* Main Grid */}
        <div style={styles.grid}>
          <div>
            {/* Submit Form */}
            <div style={styles.card}>
              <div style={styles.cardTitle}>Submit a grievance</div>
              <div style={styles.formGroup}>
                <label style={styles.formLabel}>Issue description</label>
                <textarea
                  style={styles.textarea}
                  placeholder="Describe your issue clearly (min 5 characters)..."
                  value={issue}
                  onChange={(e) => setIssue(e.target.value)}
                />
                {error && <div style={{ fontSize: "12px", color: "#D85A30", marginTop: "4px" }}>{error}</div>}
              </div>
              <div style={styles.form2col}>
                <div style={styles.formGroup}>
                  <label style={styles.formLabel}>Priority</label>
                  <select style={styles.select} value={priority} onChange={(e) => setPriority(e.target.value)}>
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                  </select>
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.formLabel}>Status</label>
                  <select style={styles.select} value={status} onChange={(e) => setStatus(e.target.value)}>
                    <option value="pending">Pending</option>
                    <option value="resolved">Resolved</option>
                  </select>
                </div>
              </div>
              <button
                style={{ ...styles.submitBtn, opacity: loading ? 0.7 : 1 }}
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading ? "Submitting..." : "Submit grievance"}
              </button>
            </div>

            {/* Grievance List */}
            <div style={styles.card}>
              <div style={styles.cardTitle}>All grievances</div>
              <div style={styles.searchRow}>
                <input
                  style={styles.searchInput}
                  placeholder="Search by issue..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <select style={styles.searchSelect} value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
                  <option value="">All status</option>
                  <option value="pending">Pending</option>
                  <option value="resolved">Resolved</option>
                </select>
                <select style={styles.searchSelect} value={filterPriority} onChange={(e) => setFilterPriority(e.target.value)}>
                  <option value="">All priority</option>
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
              </div>

              {filtered.length === 0 && (
                <div style={{ fontSize: "13px", color: "#888", textAlign: "center", padding: "24px 0" }}>
                  No grievances found.
                </div>
              )}

              {filtered.map((g, i) => (
                <div key={g._id} style={{ ...styles.gItem, ...(i === filtered.length - 1 ? { borderBottom: "none" } : {}) }}>
                  <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: getDotColor(g.priority), marginTop: "5px", flexShrink: 0 }} />
                  <div style={{ flex: 1 }}>
                    <div style={styles.gIssue}>{g.issue}</div>
                    <div style={styles.gMeta}>
                      {new Date(g.createdAt).toLocaleDateString()}
                      <span style={getBadgeStyle("priority", g.priority)}>{g.priority || "medium"}</span>
                      <span style={getBadgeStyle("status", g.status)}>{g.status}</span>
                    </div>
                  </div>
                  <button style={styles.delBtn} onClick={() => handleDelete(g._id)}>Delete</button>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div>
            <div style={styles.card}>
              <div style={styles.sideLabel}>Recent escalations</div>
              {[
                { text: "Water complaint auto-escalated — unresolved 48hrs", time: "2 hours ago", color: "#D85A30" },
                { text: "3 duplicate complaints merged — Sector 5", time: "5 hours ago", color: "#BA7517" },
                { text: "High priority complaint flagged — pothole", time: "Yesterday", color: "#D85A30" },
              ].map((a, i) => (
                <div key={i} style={{ ...styles.alertItem, ...(i === 2 ? { borderBottom: "none" } : {}) }}>
                  <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: a.color, marginTop: "5px", flexShrink: 0 }} />
                  <div>
                    <div style={styles.alertText}>{a.text}</div>
                    <div style={styles.alertTime}>{a.time}</div>
                  </div>
                </div>
              ))}

              <div style={styles.divider} />

              <div style={styles.sideLabel}>Resolution rate</div>
              {[
                { label: "This week", val: resolutionRate, color: "#0F6E56" },
                { label: "All time", val: total ? Math.round((resolved / total) * 100) : 0, color: "#BA7517" },
              ].map((p) => (
                <div key={p.label}>
                  <div style={styles.progressHeader}>
                    <span style={{ fontSize: "12px", color: "#666" }}>{p.label}</span>
                    <span style={{ fontSize: "12px", fontWeight: "500" }}>{p.val}%</span>
                  </div>
                  <div style={styles.progressBar}>
                    <div style={{ background: p.color, width: `${p.val}%`, height: "5px", borderRadius: "4px" }} />
                  </div>
                </div>
              ))}

              <div style={styles.divider} />

              <div style={styles.sideLabel}>Priority breakdown</div>
              {[
                { label: "High", color: "#D85A30", count: grievances.filter(g => g.priority === "high").length },
                { label: "Medium", color: "#BA7517", count: grievances.filter(g => g.priority === "medium").length },
                { label: "Low", color: "#0F6E56", count: grievances.filter(g => g.priority === "low").length },
              ].map((p) => (
                <div key={p.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: p.color }} />
                    <span style={{ fontSize: "12px", color: "#666" }}>{p.label}</span>
                  </div>
                  <span style={{ fontSize: "12px", fontWeight: "500", color: "#1a1a1a" }}>{p.count} complaints</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}