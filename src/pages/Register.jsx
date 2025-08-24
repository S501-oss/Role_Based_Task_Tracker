import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function Register() {
  const { register } = useAuth();
  const nav = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "member",
  });
  const [error, setError] = useState("");

  const onChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const onSubmit = (e) => {
    e.preventDefault();
    setError("");
    try {
      register(form);
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
        style={{ width: 520, display: "grid", gap: 12 }}
      >
        <h2>Create your account</h2>

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
        <div
          className="grid"
          style={{ gridTemplateColumns: "1fr 1fr", gap: 12 }}
        >
          <label className="field">
            <span>Name</span>
            <input
              name="name"
              value={form.name}
              onChange={onChange}
              placeholder="Your name"
              required
            />
          </label>
          <label className="field">
            <span>Role</span>
            <select name="role" value={form.role} onChange={onChange}>
              <option value="member">Member</option>
              <option value="admin">Admin</option>
            </select>
          </label>
        </div>
        <label className="field">
          <span>Email</span>
          <input
            name="email"
            value={form.email}
            onChange={onChange}
            placeholder="you@example.com"
            required
          />
        </label>
        <label className="field">
          <span>Password</span>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={onChange}
            placeholder="Create a password"
            required
          />
        </label>
        <button className="btn primary" type="submit">
          Register
        </button>
        <p className="muted">
          Already have an account? <Link to="/login">Log in</Link>
        </p>
      </form>
    </div>
  );
}
