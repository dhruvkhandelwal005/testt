
import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft, ArrowRight, BrainCircuit, Command,
  LockKeyhole, Mail, Sparkles, UserRound
} from "lucide-react";

const API = import.meta.env.VITE_API_URL || "http://localhost:8000";

type User = {
  id: number;
  name: string;
  email: string;
};

export default function Login() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [user, setUser] = useState<User | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch(`${API}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim().toLowerCase(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || "Unable to sign in.");
      }

      setUser(data.user);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to connect to the server."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-page">
      <nav className="auth-nav">
        <Link to="/" className="brand">
          <span className="brand-symbol"><Command size={20} /></span>
          NEXUS<span className="brand-dot">.</span>
        </Link>
        <Link to="/" className="btn-ghost auth-back">
          <ArrowLeft size={15} /> Home
        </Link>
      </nav>

      <main className="auth-layout">
        <section className="auth-pitch">
          <div className="eyebrow"><Sparkles size={14} /> YOUR PERSONAL AI ECOSYSTEM</div>
          <h1>Big ideas need<br /><span className="gradient-text">the right minds.</span></h1>
          <p>
            Your personal agents are ready to help you learn, plan,
            explore, and make progress.
          </p>

          <div className="auth-benefits">
            <div><span>✓</span> One workspace for your AI agents</div>
            <div><span>✓</span> Personalized productivity</div>
            <div><span>✓</span> Your next step starts here</div>
          </div>

          <div className="auth-mini-card">
            <span className="mini-orb"><BrainCircuit size={25} /></span>
            <div><b>Your workspace awaits.</b><small>Let's make something happen today.</small></div>
          </div>
        </section>

        <motion.section
          className="auth-card"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
        >
          {user ? (
            <div className="auth-success">
              <span className="auth-symbol"><BrainCircuit size={25} /></span>
              <div className="eyebrow">LOGIN SUCCESSFUL</div>
              <h2>Welcome back, {user.name}!</h2>
              <p>You are signed in as {user.email}.</p>
              <Link to="/" className="btn-primary auth-submit">
                Return to home <ArrowRight size={17} />
              </Link>
            </div>
          ) : (
            <>
              <div className="auth-card-heading">
                <span className="auth-symbol"><Command size={23} /></span>
                <div className="eyebrow">WELCOME BACK</div>
                <h2>Sign in to Nexus</h2>
                <p>Your agents are ready when you are.</p>
              </div>

              <form onSubmit={handleSubmit}>
                <label htmlFor="login-name">Full name</label>
                <div className="input-wrap">
                  <UserRound size={17} />
                  <input
                    id="login-name"
                    autoComplete="name"
                    placeholder="Enter your registered name"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    required
                  />
                </div>

                <label htmlFor="login-email">Email address</label>
                <div className="input-wrap">
                  <Mail size={17} />
                  <input
                    id="login-email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                  />
                </div>

                {error && <div className="form-message error-message">{error}</div>}

                <button className="btn-primary auth-submit" disabled={loading}>
                  {loading ? <span className="spinner" /> : "Sign in to Nexus"}
                  {!loading && <ArrowRight size={17} />}
                </button>
              </form>

              <p className="auth-legal">
                New to Nexus? <Link to="/register">Create your account</Link>
              </p>
            </>
          )}

          <div className="auth-security">
            <LockKeyhole size={13} /> Your personal AI workspace
          </div>
        </motion.section>
      </main>

      <footer className="auth-footer">
        © {new Date().getFullYear()} Nexus AI · Built around you
      </footer>
    </div>
  );
}
