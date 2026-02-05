export default function AppShell({ children }) {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      {/* Sidebar */}
      <aside
        style={{
          width: 280,
          padding: 18,
          background: "rgba(255,255,255,0.03)",
          borderRight: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <img src="/tabbytech-logo.png" style={{ width: 150 }} />

        <div style={{ marginTop: 24, display: "grid", gap: 10 }}>
          <button className="btn secondary">Dashboard</button>
          <button className="btn secondary">Debit Orders</button>
          <button className="btn secondary">Customers</button>
          <button className="btn secondary">Reports</button>
          <button className="btn secondary">Settings</button>
        </div>
      </aside>

      {/* Main content */}
      <main style={{ flex: 1, padding: 28 }}>{children}</main>
    </div>
  );
}

