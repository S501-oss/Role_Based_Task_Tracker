import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function Login() {
  const { login } = useAuth();
  const nav = useNavigate();
  const [email, setEmail] = useState("admin@demo.com");
  const [password, setPassword] = useState("admin123");
  const [error, setError] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    setError("");
    try {
      login(email, password);
      nav("/dashboard");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="grid" style={{ placeItems: "center", minHeight: "60vh" }}>
      <form
        className="card"
        onSubmit={onSubmit}
        style={{ width: 420, display: "grid", gap: 12 }}
      >
        <h2>Welcome back</h2>

        {error && (
          <div
            className="card"
            style={{
              padding: 12,
              borderColor: "#ef4444",
              background: "rgba(239,68,68,0.1)",
            }}
          >
            {error}
          </div>
        )}
        <label className="field">
          <span>Email</span>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            required
          />
        </label>
        <label className="field">
          <span>Password</span>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
          />
        </label>
        <button className="btn primary" type="submit">
          Login
        </button>
        <p className="muted">
          New here? <Link to="/register">Create an account</Link>
        </p>
      </form>
    </div>
  );
}
