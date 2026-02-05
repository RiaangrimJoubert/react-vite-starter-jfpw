import { useMemo, useState } from "react";

const NAV = [
  { key: "dashboard", label: "Dashboard" },
  { key: "orders", label: "Debit Orders" },
  { key: "settings", label: "Settings" },
];

function StatusBadge({ status }) {
  const map = {
    Paid: { bg: "rgba(34,197,94,0.12)", bd: "rgba(34,197,94,0.35)", tx: "#86efac" },
    Failed: { bg: "rgba(244,63,94,0.12)", bd: "rgba(244,63,94,0.35)", tx: "#fda4af" },
    "Retry Scheduled": { bg: "rgba(251,146,60,0.12)", bd: "rgba(251,146,60,0.35)", tx: "#fdba74" },
    Processing: { bg: "rgba(59,130,246,0.12)", bd: "rgba(59,130,246,0.35)", tx: "#93c5fd" },
  };
  const c = map[status] || { bg: "rgba(255,255,255,0.06)", bd: "rgba(255,255,255,0.10)", tx: "var(--text)" };

  return (
    <span
      style={{
        fontSize: 12,
        padding: "6px 10px",
        borderRadius: 999,
        border: `1px solid ${c.bd}`,
        background: c.bg,
        color: c.tx,
        whiteSpace: "nowrap",
        fontWeight: 700,
      }}
    >
      {status}
    </span>
  );
}

function MetricCard({ title, value, hint }) {
  return (
    <div className="card" style={{ padding: 16 }}>
      <div style={{ fontSize: 12, color: "var(--muted)", fontWeight: 700 }}>{title}</div>
      <div style={{ marginTop: 8, fontSize: 28, fontWeight: 900 }}>{value}</div>
      <div style={{ marginTop: 6, fontSize: 12, color: "var(--muted)" }}>{hint}</div>
    </div>
  );
}

function Divider() {
  return <div style={{ height: 1, background: "rgba(255,255,255,0.08)", margin: "14px 0" }} />;
}

function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  return (
    <div style={{ minHeight: "100vh", display: "grid", placeItems: "center", padding: 24 }}>
      <div style={{ width: "min(820px, 96vw)" }}>
        <div style={{ textAlign: "center", marginBottom: 26 }}>
          <img src="/tabbytech-logo.png" alt="TabbyTech" style={{ width: 240, height: "auto" }} />
          <div style={{ marginTop: 20, fontSize: 36, fontWeight: 900, letterSpacing: 1.2 }}>
            WELCOME TO TABBYTECH
          </div>
        </div>

        <div className="glowFrame card" style={{ padding: 28 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <div>
              <div style={{ fontSize: 13, color: "var(--muted)", marginBottom: 8 }}>Username</div>
              <input className="input" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Username" />
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
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 18, flexWrap: "wrap", gap: 12 }}>
            <a href="#" style={{ color: "var(--primary)", fontWeight: 800, fontSize: 13 }}>
              Forgot Password?
            </a>

            <div style={{ display: "flex", gap: 10 }}>
              <button className="btn secondary">Sign Up</button>
              <button className="btn" onClick={onLogin}>
                LOG IN
              </button>
            </div>
          </div>
        </div>

        <div style={{ textAlign: "center", marginTop: 16, color: "var(--muted)", fontSize: 12 }}>
          TabbyTech Debit Orders • Dark Mode
        </div>
      </div>
    </div>
  );
}

function Dashboard({ orders }) {
  const counts = useMemo(() => {
    const c = { Paid: 0, Failed: 0, "Retry Scheduled": 0, Processing: 0 };
    for (const o of orders) c[o.status] = (c[o.status] || 0) + 1;
    return c;
  }, [orders]);

  const recent = orders.slice(0, 6);

  return (
    <div style={{ display: "grid", gap: 14 }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, minmax(0, 1fr))", gap: 14 }}>
        <MetricCard title="Paid" value={counts.Paid || 0} hint="Successful payments" />
        <MetricCard title="Failed" value={counts.Failed || 0} hint="Needs attention" />
        <MetricCard title="Retry Scheduled" value={counts["Retry Scheduled"] || 0} hint="Queued for 1st retry" />
        <MetricCard title="Processing" value={counts.Processing || 0} hint="Awaiting final status" />
      </div>

      <div className="card" style={{ padding: 16 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12 }}>
          <div>
            <div style={{ fontWeight: 900, fontSize: 16 }}>System snapshot</div>
            <div style={{ marginTop: 6, fontSize: 12, color: "var(--muted)" }}>
              Design-first. Later we will replace these with live Paystack, CRM and Books health.
            </div>
          </div>
          <span style={{ fontSize: 12, padding: "6px 10px", borderRadius: 999, border: "1px solid rgba(139,92,246,0.35)", background: "rgba(139,92,246,0.10)", color: "#ddd6fe", fontWeight: 800 }}>
            Mock Mode
          </span>
        </div>

        <Divider />

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: 12 }}>
          <div className="card" style={{ padding: 12, borderRadius: 14 }}>
            <div style={{ fontSize: 12, color: "var(--muted)", fontWeight: 800 }}>Paystack</div>
            <div style={{ marginTop: 8, fontWeight: 900 }}>Connected</div>
            <div style={{ marginTop: 4, fontSize: 12, color: "var(--muted)" }}>Webhooks ready</div>
          </div>
          <div className="card" style={{ padding: 12, borderRadius: 14 }}>
            <div style={{ fontSize: 12, color: "var(--muted)", fontWeight: 800 }}>Zoho CRM</div>
            <div style={{ marginTop: 8, fontWeight: 900 }}>Ready</div>
            <div style={{ marginTop: 4, fontSize: 12, color: "var(--muted)" }}>Debit Orders module</div>
          </div>
          <div className="card" style={{ padding: 12, borderRadius: 14 }}>
            <div style={{ fontSize: 12, color: "var(--muted)", fontWeight: 800 }}>Zoho Books</div>
            <div style={{ marginTop: 8, fontWeight: 900 }}>Next</div>
            <div style={{ marginTop: 4, fontSize: 12, color: "var(--muted)" }}>Invoices and payments</div>
          </div>
        </div>
      </div>

      <div className="card" style={{ padding: 16 }}>
        <div style={{ fontWeight: 900, fontSize: 16 }}>Recent activity</div>
        <div style={{ marginTop: 8, fontSize: 12, color: "var(--muted)" }}>
          These rows will later be driven by webhook events.
        </div>

        <div style={{ marginTop: 12, overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "separate", borderSpacing: 0 }}>
            <thead>
              <tr style={{ color: "var(--muted)" }}>
                {["Reference", "Client", "Amount", "Status", "Next Charge"].map((h) => (
                  <th key={h} style={{ textAlign: "left", fontSize: 12, padding: "10px 10px", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {recent.map((o) => (
                <tr key={o.reference}>
                  <td style={{ padding: "12px 10px", borderBottom: "1px solid rgba(255,255,255,0.06)", fontWeight: 900 }}>{o.reference}</td>
                  <td style={{ padding: "12px 10px", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>{o.client}</td>
                  <td style={{ padding: "12px 10px", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>R {o.amount}</td>
                  <td style={{ padding: "12px 10px", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                    <StatusBadge status={o.status} />
                  </td>
                  <td style={{ padding: "12px 10px", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>{o.nextCharge || "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function Orders({ orders }) {
  return (
    <div className="card" style={{ padding: 16 }}>
      <div style={{ fontWeight: 900, fontSize: 16 }}>Debit Orders</div>
      <div style={{ marginTop: 6, fontSize: 12, color: "var(--muted)" }}>
        Table UI comes next. We’ll match your branding and spacing.
      </div>
      <Divider />
      <div style={{ color: "var(--muted)", fontSize: 13 }}>
        Coming next: filters, search, table, and a detail drawer.
      </div>
    </div>
  );
}

function Settings() {
  return (
    <div className="card" style={{ padding: 16 }}>
      <div style={{ fontWeight: 900, fontSize: 16 }}>Settings</div>
      <div style={{ marginTop: 6, fontSize: 12, color: "var(--muted)" }}>
        We’ll add connection indicators and email template previews here.
      </div>
    </div>
  );
}

function AppShell({ onLogout }) {
  const [active, setActive] = useState("dashboard");

  const orders = useMemo(
    () => [
      { reference: "PSK-TEST-001", client: "Mokoena Interiors", amount: 1250, status: "Paid", nextCharge: "" },
      { reference: "PSK-TEST-002", client: "Naledi Mthembu", amount: 899, status: "Failed", nextCharge: "2026-03-01" },
      { reference: "PSK-TEST-003", client: "Ayanda Mokoena", amount: 1499, status: "Retry Scheduled", nextCharge: "2026-03-01" },
      { reference: "PSK-TEST-004", client: "Thandiwe Mokoena", amount: 2100, status: "Processing", nextCharge: "" },
      { reference: "PSK-TEST-005", client: "Lerato Mthembu", amount: 990, status: "Paid", nextCharge: "" },
      { reference: "PSK-TEST-006", client: "Naledi Mthembu", amount: 990, status: "Paid", nextCharge: "" },
    ],
    []
  );

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      {/* Sidebar */}
      <aside
        style={{
          width: 280,
          padding: 18,
          borderRight: "1px solid rgba(255,255,255,0.08)",
          background: "rgba(255,255,255,0.02)",
          backdropFilter: "blur(10px)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18 }}>
          <img src="/tabbytech-logo.png" alt="TabbyTech" style={{ width: 130, height: "auto" }} />
        </div>

        <div style={{ display: "grid", gap: 8 }}>
          {NAV.map((item) => {
            const isActive = active === item.key;
            return (
              <button
                key={item.key}
                onClick={() => setActive(item.key)}
                style={{
                  textAlign: "left",
                  padding: "12px 12px",
                  borderRadius: 14,
                  border: isActive ? "1px solid rgba(139,92,246,0.55)" : "1px solid rgba(255,255,255,0.08)",
                  background: isActive ? "rgba(139,92,246,0.14)" : "rgba(255,255,255,0.03)",
                  color: isActive ? "#efeaff" : "var(--text)",
                  fontWeight: 900,
                  cursor: "pointer",
                }}
              >
                {item.label}
              </button>
            );
          })}
        </div>

        <div style={{ marginTop: 18, paddingTop: 14, borderTop: "1px solid rgba(255,255,255,0.08)" }}>
          <div style={{ fontSize: 12, color: "var(--muted)", fontWeight: 800 }}>Environment</div>
          <div style={{ marginTop: 10, display: "flex", gap: 8, flexWrap: "wrap" }}>
            <span style={{ fontSize: 12, padding: "6px 10px", borderRadius: 999, border: "1px solid rgba(255,255,255,0.10)", background: "rgba(255,255,255,0.04)" }}>
              Development
            </span>
            <span style={{ fontSize: 12, padding: "6px 10px", borderRadius: 999, border: "1px solid rgba(139,92,246,0.35)", background: "rgba(139,92,246,0.10)", color: "#ddd6fe", fontWeight: 800 }}>
              Mock
            </span>
          </div>

          <button className="btn secondary" onClick={onLogout} style={{ marginTop: 14, width: "100%" }}>
            Log out
          </button>
        </div>
      </aside>

      {/* Main */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <header
          style={{
            padding: "16px 20px",
            borderBottom: "1px solid rgba(255,255,255,0.08)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 12,
            background: "rgba(0,0,0,0.25)",
            backdropFilter: "blur(10px)",
          }}
        >
          <div>
            <div style={{ fontSize: 12, color: "var(--muted)", fontWeight: 800 }}>TabbyTech</div>
            <div style={{ fontSize: 18, fontWeight: 900 }}>
              {active === "dashboard" ? "Dashboard" : active === "orders" ? "Debit Orders" : "Settings"}
            </div>
          </div>

          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <span style={{ fontSize: 12, color: "var(--muted)" }}>Computer-only V1</span>
          </div>
        </header>

        <main style={{ padding: 20 }}>
          {active === "dashboard" ? <Dashboard orders={orders} /> : null}
          {active === "orders" ? <Orders orders={orders} /> : null}
          {active === "settings" ? <Settings /> : null}
        </main>
      </div>
    </div>
  );
}

export default function App() {
  const [authed, setAuthed] = useState(false);
  return authed ? <AppShell onLogout={() => setAuthed(false)} /> : <Login onLogin={() => setAuthed(true)} />;
}
