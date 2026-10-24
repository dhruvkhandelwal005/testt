
import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft, ArrowRight, BrainCircuit, Check,
  Command, LockKeyhole, Mail, Sparkles, UserRound
} from "lucide-react";

const API = import.meta.env.VITE_API_URL || "http://localhost:8000";

export default function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!name.trim()) {
      setError("Please enter your full name.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim().toLowerCase(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || "Registration failed.");
      }

      setSuccess("Your account has been created successfully!");

      window.setTimeout(() => {
        navigate("/login", {
          state: { registeredEmail: email.trim().toLowerCase() },
        });
      }, 900);
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
          <div className="eyebrow"><Sparkles size={14} /> START SOMETHING NEW</div>
          <h1>Your next chapter<br />starts <span className="gradient-text">with you.</span></h1>
          <p>
            Create your personal AI workspace and bring your learning,
            planning, and everyday goals into one place.
          </p>

          <div className="auth-benefits">
            <div><span><Check size={15} /></span> Your own personal workspace</div>
            <div><span><Check size={15} /></span> Multiple specialized AI agents</div>
            <div><span><Check size={15} /></span> One place for your next big ideas</div>
          </div>

          <div className="auth-mini-card">
            <span className="mini-orb"><BrainCircuit size={25} /></span>
            <div><b>Meet your personal AI team.</b><small>One workspace. More possibilities.</small></div>
          </div>
        </section>

        <motion.section
          className="auth-card"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
        >
          <div className="auth-card-heading">
            <span className="auth-symbol"><Command size={23} /></span>
            <div className="eyebrow">CREATE YOUR ACCOUNT</div>
            <h2>Join Nexus</h2>
            <p>Your personal AI workspace starts here.</p>
          </div>

          <form onSubmit={handleSubmit}>
            <label htmlFor="register-name">Full name</label>
            <div className="input-wrap">
              <UserRound size={17} />
              <input
                id="register-name"
                autoComplete="name"
                placeholder="e.g. Alex Morgan"
                value={name}
                onChange={e => setName(e.target.value)}
                required
              />
            </div>

            <label htmlFor="register-email">Email address</label>
            <div className="input-wrap">
              <Mail size={17} />
              <input
                id="register-email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
            </div>

            {error && <div className="form-message error-message">{error}</div>}
            {success && <div className="form-message success-message">{success}</div>}

            <button className="btn-primary auth-submit" disabled={loading || !!success}>
              {loading ? <span className="spinner" /> : success ? "Account created!" : "Create your account"}
              {!loading && !success && <ArrowRight size={17} />}
            </button>
          </form>

          <p className="auth-legal">
            Already have an account? <Link to="/login">Sign in</Link>
          </p>

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
