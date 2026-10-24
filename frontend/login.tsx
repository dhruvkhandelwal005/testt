// import the React hook that stores form values while the user types
import { useState } from "react";
// import the types for the style objects and the submit event (types only, no runtime cost)
import type { CSSProperties, FormEvent } from "react";
// import the router hook that lets code change the page
import { useNavigate } from "react-router-dom";

// browser storage key that marks "this tab is a demo session"
const DEMO_KEY = "orderdesk_demo_session";
// browser storage key for the email shown in the app (the password is never stored)
const EMAIL_KEY = "orderdesk_demo_email";
// page opened after login or register (check this matches your real orders route)
const HOME_PATH = "/orders";
// the bypass works only when VITE_DEMO_MODE=true, so a normal production build stays safe
const DEMO_ENABLED = import.meta.env.VITE_DEMO_MODE === "true";
// shortest password the register form accepts
const MIN_PASSWORD = 8;
// simple email shape check: text, @, text, dot, text (real validation happens on a server)
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// the two screens this page can show
type Mode = "login" | "register";

// helper for your route guard: true when this tab entered through the demo bypass
export function isDemoSession(): boolean {
  // the flag only counts when demo mode is enabled by the environment
  return DEMO_ENABLED && sessionStorage.getItem(DEMO_KEY) === "1";
}

// helper for your header or sidebar: the email used to register, or null
export function getDemoEmail(): string | null {
  // read the stored email (null when nothing was stored)
  return sessionStorage.getItem(EMAIL_KEY);
}

// helper for your logout button: forget the demo session
export function clearDemoSession(): void {
  // remove the demo flag from this tab
  sessionStorage.removeItem(DEMO_KEY);
  // remove the stored email from this tab
  sessionStorage.removeItem(EMAIL_KEY);
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
  // small grey hint under an input
  hint: { margin: 0, fontSize: 12, color: "#8a8a8a" },
  // main orange button
  primary: { marginTop: 16, padding: 12, borderRadius: 8, border: "none", background: "#E8472E", color: "#fff", fontSize: 15, fontWeight: 500, cursor: "pointer" },
  // outlined secondary button
  ghost: { padding: 12, borderRadius: 8, border: "1px solid #E8472E", background: "transparent", color: "#E8472E", fontSize: 15, fontWeight: 500, cursor: "pointer" },
  // text-only button used to switch between sign in and register
  link: { marginTop: 4, padding: 4, border: "none", background: "transparent", color: "#E8472E", fontSize: 13, cursor: "pointer" },
  // error text under the buttons
  error: { margin: 0, fontSize: 13, color: "#b3261e" },
};

// the login and register page, used as the default export for your router
export default function Login() {
  // function that changes the page
  const navigate = useNavigate();
  // which screen is showing, starts on sign in
  const [mode, setMode] = useState<Mode>("login");
  // email text typed by the user
  const [email, setEmail] = useState("");
  // password text typed by the user
  const [password, setPassword] = useState("");
  // second password box, used only on the register screen
  const [confirm, setConfirm] = useState("");
  // message shown when the form is refused
  const [error, setError] = useState("");

  // true on the register screen, used to keep the JSX short
  const isRegister = mode === "register";

  // the bypass: mark the tab as demo and open the app (emailValue is optional)
  function enterDemo(emailValue?: string) {
    // refuse when the environment did not turn demo mode on
    if (!DEMO_ENABLED) {
      // tell the user how to turn it on
      setError("Demo mode is off. Set VITE_DEMO_MODE=true and restart the dev server.");
      // stop here, do not log in
      return;
    }
    // remember in this tab that we are a demo session
    sessionStorage.setItem(DEMO_KEY, "1");
    // keep the email only when one was given (never the password)
    if (emailValue) sessionStorage.setItem(EMAIL_KEY, emailValue);
    // go to the app, replace so the Back button does not return to this page
    navigate(HOME_PATH, { replace: true });
  }

  // check the register fields, return an error message or "" when all is fine
  function validateRegister(): string {
    // the email must look like name@site.tld
    if (!EMAIL_RE.test(email)) return "Enter a valid email address.";
    // the password must be long enough
    if (password.length < MIN_PASSWORD) return `Password must be at least ${MIN_PASSWORD} characters.`;
    // both password boxes must match
    if (password !== confirm) return "Passwords do not match.";
    // nothing wrong found
    return "";
  }

  // runs when the form is submitted (Enter key or the main button)
  function handleSubmit(e: FormEvent) {
    // stop the browser from reloading the page
    e.preventDefault();
    // sign in screen: ignore what was typed and go straight in
    if (!isRegister) {
      // bypass without storing anything
      enterDemo();
      // stop here
      return;
    }
    // register screen: check the fields first
    const problem = validateRegister();
    // show the problem and stop when something is wrong
    if (problem) {
      // put the message on screen
      setError(problem);
      // stop here, do not register
      return;
    }
    // fields are fine: no account is created, open the app with this email
    enterDemo(email);
  }

  // switch between the sign in and register screens
  function switchMode(next: Mode) {
    // show the other screen
    setMode(next);
    // clear any old error message
    setError("");
    // clear the password boxes so they never carry over
    setPassword("");
    // clear the confirm box too
    setConfirm("");
  }

  // what the page draws
  return (
    // full-screen wrapper that centers the card
    <div style={s.page}>
      {/* the form card */}
      <form style={s.card} onSubmit={handleSubmit}>
        {/* brand title */}
        <h1 style={s.brand}>Order Desk</h1>
        {/* short description that changes with the screen */}
        <p style={s.sub}>{isRegister ? "Create an account for your restaurant." : "Sign in to manage your restaurant orders."}</p>
        {/* show the right notice for the current mode */}
        {DEMO_ENABLED ? <div style={s.banner}>{isRegister ? "Demo mode: no account is created and your password is not stored." : "Demo mode: any email and password works."}</div> : <div style={s.warn}>Demo login is disabled in this build.</div>}
        {/* email label */}
        <label style={s.label} htmlFor="email">Email</label>
        {/* email input, value kept in state */}
        <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="owner@restaurant.com" style={s.input} />
        {/* password label */}
        <label style={s.label} htmlFor="password">Password</label>
        {/* password input, value kept in state */}
        <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder={isRegister ? "At least 8 characters" : "Any password"} style={s.input} />
        {/* confirm password box, only on the register screen */}
        {isRegister && (
          // wrapper so the label and input stay together
          <>
            {/* confirm label */}
            <label style={s.label} htmlFor="confirm">Confirm password</label>
            {/* confirm input, value kept in state */}
            <input id="confirm" type="password" value={confirm} onChange={(e) => setConfirm(e.target.value)} placeholder="Type the password again" style={s.input} />
            {/* password rule shown to the user */}
            <p style={s.hint}>Use at least {MIN_PASSWORD} characters.</p>
          </>
        )}
        {/* main button, label changes with the screen, disabled when demo mode is off */}
        <button type="submit" style={s.primary} disabled={!DEMO_ENABLED}>{isRegister ? "Create account" : "Sign in"}</button>
        {/* skip button only on the sign in screen */}
        {!isRegister && <button type="button" style={s.ghost} onClick={() => enterDemo()} disabled={!DEMO_ENABLED}>Skip login (demo)</button>}
        {/* show the error text only when there is one */}
        {error && <p style={s.error}>{error}</p>}
        {/* switch to the other screen */}
        <button type="button" style={s.link} onClick={() => switchMode(isRegister ? "login" : "register")}>{isRegister ? "Already have an account? Sign in" : "New here? Register"}</button>
      </form>
    </div>
  );
}