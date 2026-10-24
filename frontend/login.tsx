// import the React hook that stores form values while the user types
import { useState } from "react";
// import the types for the style objects and the submit event (types only, no runtime cost)
import type { CSSProperties, FormEvent } from "react";
// import the router hook that lets code change the page
import { useNavigate } from "react-router-dom";

// browser storage key that marks "this tab is a demo session"
const DEMO_KEY = "orderdesk_demo_session";
// page opened after login (check this matches your real orders route)
const HOME_PATH = "/orders";
// the bypass works only when VITE_DEMO_MODE=true, so a normal production build stays safe
const DEMO_ENABLED = import.meta.env.VITE_DEMO_MODE === "true";

// helper for your route guard: true when this tab entered through the demo bypass
export function isDemoSession(): boolean {
  // the flag only counts when demo mode is enabled by the environment
  return DEMO_ENABLED && sessionStorage.getItem(DEMO_KEY) === "1";
}

// helper for your logout button: forget the demo session
export function clearDemoSession(): void {
  // remove the flag from this tab
  sessionStorage.removeItem(DEMO_KEY);
}

// all styles in one place, each entry has a comment saying what it styles
const s: Record<string, CSSProperties> = {
  // full-screen cream background, card centered
  page: { minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#FFF5EC", fontFamily: "system-ui, sans-serif" },
  // white card with soft shadow, children stacked in a column
  card: { width: 360, padding: 32, background: "#fff", borderRadius: 16, boxShadow: "0 4px 24px rgba(0,0,0,0.08)", display: "flex", flexDirection: "column", gap: 8 },
  // brand name in the app's orange-red
  brand: { margin: 0, fontSize: 28, fontWeight: 500, color: "#E8472E" },
  // grey line under the brand
  sub: { margin: "0 0 12px", fontSize: 14, color: "#6b6b6b" },
  // yellow notice shown when demo mode is on
  banner: { padding: "8px 12px", borderRadius: 8, background: "#FFF1D6", color: "#8a5a00", fontSize: 13 },
  // red notice shown when demo mode is off
  warn: { padding: "8px 12px", borderRadius: 8, background: "#FDECEA", color: "#b3261e", fontSize: 13 },
  // small label above each input
  label: { marginTop: 8, fontSize: 13, fontWeight: 500 },
  // text inputs
  input: { padding: "10px 12px", borderRadius: 8, border: "1px solid #ddd", fontSize: 14 },
  // main orange button
  primary: { marginTop: 16, padding: 12, borderRadius: 8, border: "none", background: "#E8472E", color: "#fff", fontSize: 15, fontWeight: 500, cursor: "pointer" },
  // outlined secondary button
  ghost: { padding: 12, borderRadius: 8, border: "1px solid #E8472E", background: "transparent", color: "#E8472E", fontSize: 15, fontWeight: 500, cursor: "pointer" },
  // error text under the buttons
  error: { margin: 0, fontSize: 13, color: "#b3261e" },
};

// the login page component, used as the default export for your router
export default function Login() {
  // function that changes the page
  const navigate = useNavigate();
  // email text typed by the user (not checked in demo mode)
  const [email, setEmail] = useState("");
  // password text typed by the user (not checked in demo mode)
  const [password, setPassword] = useState("");
  // message shown when the bypass is refused
  const [error, setError] = useState("");

  // the bypass: mark the tab as demo and open the app
  function enterDemo() {
    // refuse when the environment did not turn demo mode on
    if (!DEMO_ENABLED) {
      // tell the user how to turn it on
      setError("Demo mode is off. Set VITE_DEMO_MODE=true and restart the dev server.");
      // stop here, do not log in
      return;
    }
    // remember in this tab that we are a demo session
    sessionStorage.setItem(DEMO_KEY, "1");
    // go to the app, replace so the Back button does not return to login
    navigate(HOME_PATH, { replace: true });
  }

  // runs when the form is submitted (Enter key or Sign in button)
  function handleSubmit(e: FormEvent) {
    // stop the browser from reloading the page
    e.preventDefault();
    // ignore the typed email and password, go straight in
    enterDemo();
  }

  // what the page draws
  return (
    // full-screen wrapper that centers the card
    <div style={s.page}>
      {/* the form card */}
      <form style={s.card} onSubmit={handleSubmit}>
        {/* brand title */}
        <h1 style={s.brand}>Order Desk</h1>
        {/* short description */}
        <p style={s.sub}>Sign in to manage your restaurant orders.</p>
        {/* show the right notice for the current mode */}
        {DEMO_ENABLED ? <div style={s.banner}>Demo mode: any email and password works.</div> : <div style={s.warn}>Demo login is disabled in this build.</div>}
        {/* email label */}
        <label style={s.label} htmlFor="email">Email</label>
        {/* email input, value kept in state */}
        <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="owner@restaurant.com" style={s.input} />
        {/* password label */}
        <label style={s.label} htmlFor="password">Password</label>
        {/* password input, value kept in state */}
        <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Any password" style={s.input} />
        {/* submit button, disabled when demo mode is off */}
        <button type="submit" style={s.primary} disabled={!DEMO_ENABLED}>Sign in</button>
        {/* skip button, same bypass without typing */}
        <button type="button" style={s.ghost} onClick={enterDemo} disabled={!DEMO_ENABLED}>Skip login (demo)</button>
        {/* show the error text only when there is one */}
        {error && <p style={s.error}>{error}</p>}
      </form>
    </div>
  );
}