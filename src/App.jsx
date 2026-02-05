function MiniSpark({ points = [18, 22, 20, 28, 24, 31, 27, 29, 26, 30] }) {
  // Simple inline SVG sparkline placeholder
  const w = 520;
  const h = 160;
  const pad = 18;

  const min = Math.min(...points);
  const max = Math.max(...points);
  const norm = (v) => (max === min ? 0.5 : (v - min) / (max - min));

  const step = (w - pad * 2) / (points.length - 1);
  const d = points
    .map((v, i) => {
      const x = pad + i * step;
      const y = pad + (1 - norm(v)) * (h - pad * 2);
      return `${i === 0 ? "M" : "L"} ${x} ${y}`;
    })
    .join(" ");

  return (
    <svg width="100%" viewBox={`0 0 ${w} ${h}`} style={{ display: "block" }}>
      <defs>
        <linearGradient id="tabbyLine" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="rgba(139,92,246,0.15)" />
          <stop offset="0.5" stopColor="rgba(139,92,246,0.95)" />
          <stop offset="1" stopColor="rgba(109,40,217,0.75)" />
        </linearGradient>
        <linearGradient id="tabbyFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="rgba(139,92,246,0.22)" />
          <stop offset="1" stopColor="rgba(139,92,246,0.00)" />
        </linearGradient>
      </defs>

      {/* grid */}
      {[0.2, 0.4, 0.6, 0.8].map((t) => (
        <line
          key={t}
          x1={pad}
          x2={w - pad}
          y1={pad + t * (h - pad * 2)}
          y2={pad + t * (h - pad * 2)}
          stroke="rgba(255,255,255,0.06)"
          strokeWidth="1"
        />
      ))}

      {/* area */}
      <path
        d={`${d} L ${w - pad} ${h - pad} L ${pad} ${h - pad} Z`}
        fill="url(#tabbyFill)"
      />

      {/* line */}
      <path d={d} fill="none" stroke="url(#tabbyLine)" strokeWidth="3" strokeLinecap="round" />

      {/* glow line */}
      <path
        d={d}
        fill="none"
        stroke="rgba(139,92,246,0.35)"
        strokeWidth="8"
        strokeLinecap="round"
        opacity="0.35"
      />
    </svg>
  );
}

function Donut() {
  return (
    <div style={{ display: "grid", placeItems: "center", paddingTop: 10 }}>
      <svg width="180" height="180" viewBox="0 0 42 42">
        <defs>
          <linearGradient id="donutGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="rgba(139,92,246,0.95)" />
            <stop offset="1" stopColor="rgba(109,40,217,0.75)" />
          </linearGradient>
        </defs>
        <circle cx="21" cy="21" r="15.915" fill="transparent" stroke="rgba(255,255,255,0.10)" strokeWidth="5" />
        <circle
          cx="21"
          cy="21"
          r="15.915"
          fill="transparent"
          stroke="url(#donutGrad)"
          strokeWidth="5"
          strokeDasharray="65 35"
          strokeDashoffset="25"
          strokeLinecap="round"
        />
        <circle
          cx="21"
          cy="21"
          r="10"
          fill="rgba(0,0,0,0.25)"
          stroke="rgba(255,255,255,0.08)"
        />
      </svg>
      <div style={{ marginTop: -10, textAlign: "center" }}>
        <div style={{ fontWeight: 900, fontSize: 18 }}>Customer mix</div>
        <div style={{ color: "var(--muted)", fontSize: 12, marginTop: 6 }}>
          Direct vs Social (placeholder)
        </div>
      </div>
    </div>
  );
}

function Dashboard({ orders }) {
  const [tab, setTab] = useState("A"); // A: Collections Trend, B: Run Performance

  const counts = useMemo(() => {
    const c = { Paid: 0, Failed: 0, "Retry Scheduled": 0, Processing: 0 };
    for (const o of orders) c[o.status] = (c[o.status] || 0) + 1;
    return c;
  }, [orders]);

  const recent = orders.slice(0, 6);

  return (
    <div style={{ display: "grid", gap: 14 }}>
      {/* Top grid like your reference */}
      <div style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr", gap: 14, alignItems: "stretch" }}>
        {/* Big overview card */}
        <div className="card" style={{ padding: 16 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12 }}>
            <div>
              <div style={{ fontWeight: 900, fontSize: 16 }}>Overview</div>
              <div style={{ marginTop: 6, fontSize: 12, color: "var(--muted)" }}>
                {tab === "A"
                  ? "Collections Trend (Paid vs Failed) – placeholder"
                  : "Debit Run Performance (25th run + 1st retry) – placeholder"}
              </div>
            </div>

            <div style={{ display: "flex", gap: 8 }}>
              <button
                onClick={() => setTab("A")}
                style={{
                  padding: "8px 12px",
                  borderRadius: 999,
                  border: tab === "A" ? "1px solid rgba(139,92,246,0.45)" : "1px solid rgba(255,255,255,0.10)",
                  background: tab === "A" ? "rgba(139,92,246,0.16)" : "rgba(255,255,255,0.04)",
                  color: tab === "A" ? "#efeaff" : "var(--text)",
                  fontWeight: 900,
                  cursor: "pointer",
                }}
              >
                A • Trend
              </button>
              <button
                onClick={() => setTab("B")}
                style={{
                  padding: "8px 12px",
                  borderRadius: 999,
                  border: tab === "B" ? "1px solid rgba(139,92,246,0.45)" : "1px solid rgba(255,255,255,0.10)",
                  background: tab === "B" ? "rgba(139,92,246,0.16)" : "rgba(255,255,255,0.04)",
                  color: tab === "B" ? "#efeaff" : "var(--text)",
                  fontWeight: 900,
                  cursor: "pointer",
                }}
              >
                B • Runs
              </button>
            </div>
          </div>

          <div style={{ marginTop: 14 }}>
            {tab === "A" ? (
              <MiniSpark points={[12, 14, 13, 18, 16, 22, 19, 21, 17, 20, 18, 23]} />
            ) : (
              <MiniSpark points={[8, 10, 9, 14, 12, 15, 13, 16, 11, 14, 12, 15]} />
            )}
          </div>

          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 10 }}>
            <StatusBadge status="Paid" />
            <StatusBadge status="Failed" />
            <StatusBadge status="Retry Scheduled" />
            <StatusBadge status="Processing" />
          </div>
        </div>

        {/* Right card */}
        <div className="card" style={{ padding: 16 }}>
          <Donut />
          <div style={{ marginTop: 8, display: "grid", gap: 10 }}>
            <div className="card" style={{ padding: 12, borderRadius: 16 }}>
              <div style={{ fontSize: 12, color: "var(--muted)", fontWeight: 800 }}>Top clients (mock)</div>
              <div style={{ marginTop: 10, display: "grid", gap: 8 }}>
                {["Mokoena Interiors", "Naledi Mthembu", "Ayanda Mokoena"].map((n) => (
                  <div key={n} style={{ display: "flex", justifyContent: "space-between", gap: 10 }}>
                    <div style={{ fontWeight: 800 }}>{n}</div>
                    <div style={{ color: "var(--muted)", fontSize: 12 }}>Active</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Middle row: recent table + quick stats */}
      <div style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr", gap: 14, alignItems: "stretch" }}>
        {/* Recent activity */}
        <div className="card" style={{ padding: 16 }}>
          <div style={{ fontWeight: 900, fontSize: 16 }}>Recent debit orders</div>
          <div style={{ marginTop: 6, fontSize: 12, color: "var(--muted)" }}>
            Placeholder rows. Later driven by webhook events.
          </div>

          <div style={{ marginTop: 12, overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "separate", borderSpacing: 0 }}>
              <thead>
                <tr style={{ color: "var(--muted)" }}>
                  {["Reference", "Client", "Amount", "Status", "Next Charge"].map((h) => (
                    <th
                      key={h}
                      style={{
                        textAlign: "left",
                        fontSize: 12,
                        padding: "10px 10px",
                        borderBottom: "1px solid rgba(255,255,255,0.08)",
                      }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {recent.map((o) => (
                  <tr key={o.reference}>
                    <td style={{ padding: "12px 10px", borderBottom: "1px solid rgba(255,255,255,0.06)", fontWeight: 900 }}>
                      {o.reference}
                    </td>
                    <td style={{ padding: "12px 10px", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                      {o.client}
                    </td>
                    <td style={{ padding: "12px 10px", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                      R {o.amount}
                    </td>
                    <td style={{ padding: "12px 10px", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                      <StatusBadge status={o.status} />
                    </td>
                    <td style={{ padding: "12px 10px", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                      {o.nextCharge || "-"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick stats */}
        <div style={{ display: "grid", gap: 14 }}>
          <div className="card" style={{ padding: 16 }}>
            <div style={{ fontSize: 12, color: "var(--muted)", fontWeight: 900 }}>Paid</div>
            <div style={{ marginTop: 8, fontSize: 30, fontWeight: 900 }}>{counts.Paid || 0}</div>
            <div style={{ marginTop: 6, fontSize: 12, color: "var(--muted)" }}>Successful payments</div>
          </div>

          <div className="card" style={{ padding: 16 }}>
            <div style={{ fontSize: 12, color: "var(--muted)", fontWeight: 900 }}>Failed</div>
            <div style={{ marginTop: 8, fontSize: 30, fontWeight: 900 }}>{counts.Failed || 0}</div>
            <div style={{ marginTop: 6, fontSize: 12, color: "var(--muted)" }}>Needs attention</div>
          </div>

          <div className="card" style={{ padding: 16 }}>
            <div style={{ fontSize: 12, color: "var(--muted)", fontWeight: 900 }}>Retry Scheduled</div>
            <div style={{ marginTop: 8, fontSize: 30, fontWeight: 900 }}>{counts["Retry Scheduled"] || 0}</div>
            <div style={{ marginTop: 6, fontSize: 12, color: "var(--muted)" }}>Queued for 1st retry</div>
          </div>
        </div>
      </div>
    </div>
  );
}
