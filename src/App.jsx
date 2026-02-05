import { useState } from "react";

export default function App() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        padding: 24,
      }}
    >
      <div style={{ width: "min(820px, 96vw)" }}>
        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: 26 }}>
          <img
            src="/tabbytech-logo.png"
            alt="TabbyTech"
            style={{ width: 240, height: "auto" }}
          />
          <div
            style={{
              marginTop: 20,
              fontSize: 36,
              fontWeight: 900,
              letterSpacing: 1.2,
            }}
          >
            WELCOME TO TABBYTECH
          </div>
        </div>

        {/* Wide Login Panel */}
        <div
          className="glowFrame card"
          style={{
            padding: 28,
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 16,
            }}
          >
            <div>
              <div style={{ fontSize: 13, color: "var(--muted)", marginBottom: 8 }}>
                Username
              </div>
              <input
                className="input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Username"
              />
            </div>

            <div>
              <div style={{ fontSize: 13, color: "var(--muted)", marginBottom: 8 }}>
                Password
              </div>
              <input
                className="input"
                type="password"
                value={pass}
                onChange={(e) => setPass(e.target.value)}
                placeholder="Password"
              />
            </div>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: 18,
              flexWrap: "wrap",
              gap: 12,
            }}
          >
            <a
              href="#"
              style={{
                color: "var(--primary)",
                fontWeight: 700,
                fontSize: 13,
              }}
            >
              Forgot Password?
            </a>

            <div style={{ display: "flex", gap: 10 }}>
              <button className="btn secondary">Sign Up</button>
              <button className="btn">LOG IN</button>
            </div>
          </div>
        </div>

        <div
          style={{
            textAlign: "center",
            marginTop: 16,
            color: "var(--muted)",
            fontSize: 12,
          }}
        >
          TabbyTech Debit Orders • Dark Mode
        </div>
      </div>
    </div>
  );
}
