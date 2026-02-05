import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  return (
    <div style={{ minHeight: "100vh", display: "grid", placeItems: "center", padding: 24 }}>
      <div style={{ width: "min(520px, 92vw)" }}>
        <div style={{ textAlign: "center", marginBottom: 18 }}>
          <img src="/tabbytech-logo.png" alt="TabbyTech" style={{ width: 220 }} />
          <div style={{ marginTop: 18, fontSize: 34, fontWeight: 900 }}>
            WELCOME TO TABBYTECH
          </div>
        </div>

        <div className="glowFrame card" style={{ padding: 22 }}>
          <div style={{ display: "grid", gap: 12 }}>
            <input className="input" placeholder="Username" />
            <input className="input" type="password" placeholder="Password" />
            <button className="btn">LOG IN</button>
          </div>
        </div>
      </div>
    </div>
  );
}
