import { useState } from "react";

export default function App() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  return (
    <div style={{ minHeight: "100vh", display: "grid", placeItems: "center", padding: 24 }}>
      <div style={{ width: "min(520px, 92vw)" }}>
        <div style={{ textAlign: "center", marginBottom: 18 }}>
          <img
            src="/tabbytech-logo.png"
            alt="TabbyTech"
            style={{ width: 220, height: "auto" }}
          />
          <div style={{ marginTop: 18, fontSize: 34, fontWeight: 900 }}>
            WELCOME TO TABBYTECH
          </div>
        </div>

        <div className="glowFrame card" style={{ padding: 22 }}>
          <div style={{ display: "grid", gap: 12 }}>
            <input
              className="input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Username"
            />

            <input
              className="input"
              type="password"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              placeholder="Password"
            />

            <a style={{ textAlign: "center", color: "var(--primary)", fontSize: 13 }}>
              Forgot Password?
            </a>

            <button className="btn">LOG IN</button>
            <button className="btn secondary">Sign Up</button>
          </div>
        </div>

        <div style={{ textAlign: "center", marginTop: 14, color: "var(--muted)", fontSize: 12 }}>
          TabbyTech Debit Orders
        </div>
      </div>
    </div>
  );
}
