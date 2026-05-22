import { useState } from "react";

const API = "https://intelligent-grievance-system.onrender.com/api/auth/login";

export default function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      setError("");

      const res = await fetch(API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      // 🔍 DEBUG: show backend response
      console.log("LOGIN RESPONSE:", data);

      // ❌ if request failed
      if (!res.ok) {
        setError(data?.message || "Login failed (check backend)");
        return;
      }

      // ❌ if token missing (THIS FIXES YOUR NULL ISSUE)
      if (!data.token) {
        setError("Login failed: token not received from server");
        return;
      }

      // 🔐 SAVE TOKEN
      localStorage.setItem("token", data.token);

      // optional user info
      localStorage.setItem("user", JSON.stringify(data.user));

      // ✅ move to dashboard
      onLogin();

    } catch (err) {
      console.error("LOGIN ERROR:", err);
      setError("Server error. Try again.");
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: "100px" }}>
      <div
        style={{
          padding: "20px",
          border: "1px solid #ddd",
          borderRadius: "10px",
          width: "300px",
        }}
      >
        <h3>Login</h3>

        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
        />

        {error && (
          <p style={{ color: "red", fontSize: "12px" }}>
            {error}
          </p>
        )}

        <button
          onClick={handleLogin}
          style={{
            width: "100%",
            padding: "8px",
            background: "#534AB7",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          Login
        </button>
      </div>
    </div>
  );
}