import { useState } from "react";

export default function App() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  return (
    <div style={{ minHeight: "100vh", display: "grid", placeItems: "center", padding: 24 }}>
      <div style={{ width: "min(640px, 96vw)" }}>
        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: 24 }}>
          <img
            src="/tabbytech-logo.png"
            alt="TabbyTech"
            style={{ width: 260 }}
          />
          <div style={{ marginTop: 18, fontSize: 36, fontWeight: 900 }}>
            WELCOME TO TABBYTECH
          </div>
        </div>

        {/* Login Card */}
        <div className="glowFrame card" style={{ padding: 28 }}>
          <div style={{ display: "grid", gap: 16 }}>
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

            <button className="btn" style={{ marginTop: 10 }}>
              LOG IN
           <div style={{ display: "flex", justifyContent: "center", marginTop: 10 }}>
  <button
    className="btn"
    style={{
      width: 220,
      height: 46,
      fontSize: 14,
      letterSpacing: 1,
      textTransform: "uppercase",
    }}
  >
    Log In
  </button>
</div>


            {/* Forgot password at bottom */}
            <div style={{ textAlign: "center", marginTop: 14 }}>
              <a
                href="#"
                style={{
                  color: "var(--primary)",
                  fontSize: 13,
                  fontWeight: 600
                }}
              >
                Forgot Password?
              </a>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div style={{ textAlign: "center", marginTop: 16, color: "var(--muted)", fontSize: 12 }}>
          TabbyTech Debit Orders
        </div>
      </div>
    </div>
  );
}
