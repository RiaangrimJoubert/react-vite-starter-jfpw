import { useState } from "react";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import AppShell from "./layouts/AppShell";

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  if (!loggedIn) {
    return <Login />;
  }

  return (
    <AppShell>
      <Dashboard />
    </AppShell>
  );
}
