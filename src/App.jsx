import { useState } from "react";

export default function App() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  return (
    <div style={{ minHeight: "100vh", display: "grid", placeItems: "center", padding: 24 }}>
      <div style={{ width: "min(520px, 92vw)" }}>
        {/* Logo area */}
        <div style={{ textAlign: "center", marginBottom: 18 }}>
          {/* Replace the src once you upload your logo into /public */}
          <img
            src="/tabbytech-logo.png"
            alt="TabbyTech"
            style={{ width: 220, height: "auto", display: "inline-block" }}
          />
          <div style={{ marginTop: 18, fontSize: 34, fontWeight: 900, letterSpacing: 1 }}>
            WELCOME TO TABBYTECH
          </div>
        </div>

        {/* Login panel */}
        <div className="glowFrame card" style={{ padding: 22 }}>
          <div style={{ display: "grid", gap: 12 }}>
            <div>
              <div style={{ fontSize: 13, color: "var(--muted)", marginBottom: 8 }}>Username</div>
              <input
                className="input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Username"
              />
            </div>

            <div>
              <div style={{ fontSize: 13, color: "var(--muted)", marginBottom: 8 }}>Password</div>
              <input
                className="input"
                type="password"
                value={pass}
                onChange={(e) => setPass(e.target.value)}
                placeholder="Password"
              />
            </div>

            <div style={{ textAlign: "center", marginTop: 6 }}>
              <a href="#" style={{ color: "var(--primary)", fontWeight: 700, fontSize: 13 }}>
                Forgot Password?
              </a>
            </div>

            <div style={{ display: "grid", gap: 10, marginTop: 8 }}>
              <button className="btn">LOG IN</button>
              <button className="btn secondary">Sign Up</button>
            </div>
          </div>
        </div>

        <div style={{ textAlign: "center", marginTop: 14, color: "var(--muted)", fontSize: 12 }}>
          TabbyTech Debit Orders • Dark Mode
        </div>
      </div>
    </div>
  );
}
