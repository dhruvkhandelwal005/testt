
import { motion } from "framer-motion";
import {
  ArrowRight, ArrowUpRight, BrainCircuit, Compass,
  GraduationCap, ShieldCheck, Sparkles, Command, Zap
} from "lucide-react";
import { Link } from "react-router-dom";

const agents = [
  {
    name: "Personal Assistant",
    icon: BrainCircuit,
    color: "violet",
    description: "Plan your day, build routines, and organize everything that matters.",
  },
  {
    name: "AI Tutor",
    icon: GraduationCap,
    color: "blue",
    description: "Learn complex concepts and grow your knowledge at your own pace.",
  },
  {
    name: "Travel Agent",
    icon: Compass,
    color: "orange",
    description: "Discover destinations and create personalized travel itineraries.",
  },
  {
    name: "Personal Agent",
    icon: ShieldCheck,
    color: "green",
    description: "Organize personal context, remember important things, and track goals.",
  },
];

export default function Landing() {
  return (
    <div className="landing">
      <nav className="topbar">
        <Link to="/" className="brand">
          <span className="brand-symbol"><Command size={20} /></span>
          NEXUS<span className="brand-dot">.</span>
        </Link>

        <div className="nav-links">
          <a href="#agents">Our agents</a>
          <a href="#features">Features</a>
        </div>

        <div className="nav-actions">
          <Link to="/login" className="btn-ghost">Log in</Link>
          <Link to="/register" className="btn-primary">
            Get started <ArrowUpRight size={16} />
          </Link>
        </div>
      </nav>

      <main>
        <section className="hero">
          <div className="hero-glow glow-one" />
          <div className="hero-glow glow-two" />

          <motion.div
            className="hero-copy"
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="eyebrow">
              <span className="live-dot" />
              YOUR PERSONAL AI ECOSYSTEM
            </div>

            <h1>
              One you.<br />
              <span className="gradient-text">A hundred ways</span><br />
              to think bigger.
            </h1>

            <p className="hero-description">
              Meet your personal AI team. Learn with a tutor, plan with
              an assistant, explore with a travel agent, and bring your
              everyday workflows into one intelligent workspace.
            </p>

            <div className="hero-actions">
              <Link to="/register" className="btn-primary btn-large">
                Build your AI workspace <ArrowRight size={18} />
              </Link>
              <a href="#agents" className="btn-ghost btn-large">
                Explore agents <ArrowUpRight size={17} />
              </a>
            </div>

            <div className="hero-proof">
              <span className="proof-icon"><Sparkles size={15} /></span>
              Your goals. Your agents. Your space.
            </div>
          </motion.div>

          <motion.div
            className="hero-visual"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.15 }}
          >
            <div className="visual-orbit orbit-one" />
            <div className="visual-orbit orbit-two" />

            <div className="visual-core">
              <div className="core-inner">
                <BrainCircuit size={55} strokeWidth={1.3} />
                <span>NEXUS CORE</span>
              </div>
            </div>

            <div className="floating-agent float-a">
              <span className="float-icon purple"><BrainCircuit size={19} /></span>
              <span><b>Personal AI</b><small>Your daily companion</small></span>
              <span className="float-status" />
            </div>

            <div className="floating-agent float-b">
              <span className="float-icon blue"><GraduationCap size={19} /></span>
              <span><b>AI Tutor</b><small>Ready to teach</small></span>
              <span className="float-status" />
            </div>

            <div className="floating-agent float-c">
              <span className="float-icon orange"><Compass size={19} /></span>
              <span><b>Travel Agent</b><small>Ready to explore</small></span>
              <span className="float-status" />
            </div>

            <div className="orbit-caption">
              <Sparkles size={13} /> INTELLIGENCE, CONNECTED
            </div>
          </motion.div>
        </section>

        <section className="metrics-strip">
          <div><strong>01</strong><span>Unified workspace</span></div>
          <div><strong>04+</strong><span>Specialized agents</span></div>
          <div><strong>∞</strong><span>Possibilities</span></div>
          <div className="metric-note"><span className="live-dot" /> Made around you</div>
        </section>

        <section className="section-wrap" id="agents">
          <div className="section-heading">
            <div>
              <div className="eyebrow">MEET YOUR TEAM</div>
              <h2>Different minds.<br /><span className="muted-gradient">One shared purpose.</span></h2>
            </div>
            <p>Purpose-built agents for the parts of life that deserve more of your attention.</p>
          </div>

          <div className="agent-grid">
            {agents.map((agent, index) => {
              const Icon = agent.icon;

              return (
                <motion.div
                  key={agent.name}
                  className={`agent-card agent-${agent.color}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08 }}
                  whileHover={{ y: -6 }}
                >
                  <div className="agent-card-top">
                    <span className="agent-icon"><Icon size={23} /></span>
                    <ArrowUpRight className="card-arrow" size={18} />
                  </div>

                  <span className="agent-type">PERSONAL INTELLIGENCE</span>
                  <h3>{agent.name}</h3>
                  <p>{agent.description}</p>

                  <Link to="/register" className="agent-card-link">
                    Meet your agent <ArrowRight size={15} />
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </section>

        <section className="features-section section-wrap" id="features">
          <div>
            <div className="eyebrow">DESIGNED AROUND YOU</div>
            <h2>Your life is complex.<br /><span className="gradient-text">Your tools shouldn't be.</span></h2>
            <p className="feature-description">
              Less time switching between tools. More time learning,
              creating, planning, and making progress.
            </p>
            <Link to="/register" className="btn-primary">
              Start your journey <ArrowRight size={16} />
            </Link>
          </div>

          <div className="features-list">
            <div className="feature-row">
              <span className="feature-icon"><BrainCircuit size={22} /></span>
              <div><h3>Specialized intelligence</h3><p>Choose an agent designed for the task at hand.</p></div>
            </div>
            <div className="feature-row">
              <span className="feature-icon"><ShieldCheck size={22} /></span>
              <div><h3>Your personal workspace</h3><p>Keep your personal workflows in one organized place.</p></div>
            </div>
            <div className="feature-row">
              <span className="feature-icon"><Zap size={22} /></span>
              <div><h3>Built for momentum</h3><p>Turn everyday intentions into practical next steps.</p></div>
            </div>
          </div>
        </section>

        <section className="final-cta">
          <div className="eyebrow"><Sparkles size={14} /> YOUR NEXT CHAPTER STARTS HERE</div>
          <h2>Make room for<br /><span className="gradient-text">your bigger ideas.</span></h2>
          <p>Your personal AI workspace is one step away.</p>
          <Link to="/register" className="btn-primary btn-large">
            Get started <ArrowRight size={18} />
          </Link>
        </section>
      </main>

      <footer className="footer">
        <Link to="/" className="brand">
          <span className="brand-symbol"><Command size={17} /></span>
          NEXUS<span className="brand-dot">.</span>
        </Link>
        <span>Think better. Do more. Be more you.</span>
        <span>© {new Date().getFullYear()} Nexus AI</span>
      </footer>
    </div>
  );
}
