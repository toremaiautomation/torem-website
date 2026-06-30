import { useState, useEffect, useRef } from "react";

// ── PALETTE ─────────────────────────────────────────────────
// Static palette: used for elements that are *always* dark-on-navy
// (hero sections, footer, blue CTA bands) — these don't flip with theme.
const P = {
  navy:      "#0B1F3A",
  navyMid:   "#122847",
  blue:      "#007AE3",
  blueMid:   "#0088F5",
  paleBg:    "#EEF6FF",
  white:     "#FFFFFF",
  offWhite:  "#F7FAFF",
  gray:      "#5C6E84",
  grayLight: "#F0F4F9",
  border:    "#D3E0F0",
  blueprintLine: "rgba(0,122,227,0.1)",
};

// Dynamic theme: used for "page surface" elements (section backgrounds,
// cards, body text, borders) that should flip between light and dark mode.
function theme(dark) {
  return dark ? {
    bg: "#0B1F3A", bgAlt: "#122847", bgAlt2: "#0F2238",
    text: "#F1F6FC", textMuted: "#9FB3C8", border: "#21344E",
    blue: "#3B9EFF", blueMid: "#5BB3F5",
    navBg: "rgba(11,31,58,0.96)", chip: "#16314F",
  } : {
    bg: "#FFFFFF", bgAlt: "#EEF6FF", bgAlt2: "#F7FAFF",
    text: "#0B1F3A", textMuted: "#5C6E84", border: "#D3E0F0",
    blue: "#007AE3", blueMid: "#0088F5",
    navBg: "rgba(255,255,255,0.96)", chip: "#EBF2FF",
  };
}

const DISPLAY = "'Bricolage Grotesque', 'Georgia', serif";
const BODY    = "'DM Sans', system-ui, -apple-system, sans-serif";

// ── INJECTED STYLES ─────────────────────────────────────────
function buildCSS(T) {
  return `
  @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,600;12..96,700;12..96,800&family=DM+Sans:wght@400;500;600;700&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
  body { font-family: ${BODY}; background: ${T.bg}; color: ${T.text}; transition: background 0.25s, color 0.25s; }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(20px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes glowPulse {
    0%,100% { opacity: 0.4; }
    50%     { opacity: 0.8; }
  }

  .t-card {
    transition: transform 0.22s ease, box-shadow 0.22s ease, background 0.25s, border-color 0.25s;
  }
  .t-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 20px 48px rgba(23,84,207,0.13) !important;
  }
  .t-link { transition: color 0.15s; cursor: pointer; }
  .t-link:hover { color: ${T.blue} !important; }

  .t-btn-primary {
    transition: background 0.18s, transform 0.18s;
    cursor: pointer;
  }
  .t-btn-primary:hover { background: ${P.blueMid} !important; transform: translateY(-1px); }

  .t-btn-ghost {
    transition: background 0.18s, color 0.18s, transform 0.18s;
    cursor: pointer;
  }
  .t-btn-ghost:hover {
    background: rgba(23,84,207,0.08) !important;
    transform: translateY(-1px);
  }

  .t-nav-link {
    transition: color 0.15s, background 0.15s;
    cursor: pointer;
    border-radius: 6px;
  }
  .t-nav-link:hover { color: ${T.blue} !important; background: ${T.bgAlt} !important; }

  .t-social:hover { opacity: 0.7; }
  .t-faq-q:hover { color: ${T.blue} !important; }
  .t-dark-toggle:hover { transform: translateY(-1px); }

  input:focus, textarea:focus, select:focus {
    outline: none;
    border-color: ${T.blue} !important;
    box-shadow: 0 0 0 3px rgba(23,84,207,0.12);
  }

  .t-nav-desktop { display: flex; }
  .t-nav-hamburger-btn { display: none; }
  .t-mobile-link:hover { background: ${T.bgAlt} !important; color: ${T.blue} !important; }

  @keyframes slideDown {
    from { opacity: 0; transform: translateY(-8px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  @keyframes chatDotBounce {
    0%, 60%, 100% { transform: translateY(0); opacity: 0.5; }
    30% { transform: translateY(-6px); opacity: 1; }
  }

  @keyframes blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0; }
  }

  @keyframes marqueeScroll {
    0% { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }

  .marquee-track {
    display: flex;
    width: max-content;
    animation: marqueeScroll 22s linear infinite;
  }

  @media (max-width: 760px) {
    .t-hero-grid { grid-template-columns: 1fr !important; }
    .t-two-col   { grid-template-columns: 1fr !important; }
    .t-three-col { grid-template-columns: 1fr !important; }
    .t-pad       { padding: 48px 24px !important; }
    .t-hero-head { font-size: 36px !important; }
  }

  @media (max-width: 768px) {
    .t-nav-desktop { display: none !important; }
    .t-nav-hamburger-btn { display: flex !important; }
  }

  @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
  .typing-cursor { animation: blink 0.8s infinite; display: inline-block; }
`;
}

// ── SHARED ───────────────────────────────────────────────────
function fieldStyle(T) {
  return {
    width: "100%", padding: "11px 14px",
    border: `1px solid ${T.border}`, borderRadius: "8px",
    fontSize: "14px", fontFamily: BODY, background: T.bg, color: T.text,
  };
}

function Tag({ children, color = P.blue }) {
  return (
    <span style={{
      display: "inline-block",
      fontSize: "11px", fontWeight: 700, letterSpacing: "1.8px",
      textTransform: "uppercase", color, marginBottom: "14px",
    }}>
      {children}
    </span>
  );
}

function SectionHead({ eyebrow, heading, sub, light = false, center = true, dark = false }) {
  const T = theme(dark);
  return (
    <div style={{ textAlign: center ? "center" : "left", marginBottom: "52px" }}>
      <Tag color={light ? "#93c5fd" : T.blue}>{eyebrow}</Tag>
      <h2 style={{
        fontFamily: DISPLAY, fontSize: "clamp(26px, 3.5vw, 40px)",
        fontWeight: 800, color: light ? P.white : T.text,
        lineHeight: 1.15, marginBottom: sub ? "16px" : 0,
      }}>{heading}</h2>
      {sub && (
        <p style={{
          fontSize: "15px", color: light ? "rgba(255,255,255,0.55)" : T.textMuted,
          maxWidth: "520px", margin: center ? "0 auto" : 0, lineHeight: 1.7,
        }}>{sub}</p>
      )}
    </div>
  );
}

// ── NAVBAR ───────────────────────────────────────────────────
// Mobile menu items map to existing pages — "How It Works" and "Pricing"
// both point to the Services page, which is where pricing info lives.
const MOBILE_NAV_ITEMS = [
  { label: "Home", target: "Home" },
  { label: "How It Works", target: "Services" },
  { label: "About", target: "About" },
  { label: "Contact", target: "Contact" },
  { label: "Pricing", target: "Services" },
];

function Navbar({ page, setPage, dark, setDark }) {
  const [solid, setSolid] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const T = theme(dark);

  useEffect(() => {
    const fn = () => setSolid(window.scrollY > 24);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  // Close the mobile menu whenever the page changes or the viewport
  // grows back past the mobile breakpoint.
  useEffect(() => { setMenuOpen(false); }, [page]);
  useEffect(() => {
    const fn = () => { if (window.innerWidth > 768) setMenuOpen(false); };
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);

  const goTo = target => { setPage(target); setMenuOpen(false); };

  return (
    <>
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 200,
        height: "66px",
        background: solid ? T.navBg : T.bg,
        backdropFilter: "blur(16px)",
        borderBottom: `1px solid ${solid ? T.border : "transparent"}`,
        padding: "0 clamp(20px, 5vw, 80px)",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        transition: "border-color 0.3s, background 0.3s",
      }}>
        {/* Logo */}
        <div onClick={() => setPage("Home")} style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer" }}>
          <img src="https://i.imgur.com/HXc7WQO.png" alt="Torem AI" style={{
            width: "48px", height: "48px", borderRadius: "50%", objectFit: "cover",
            boxShadow: `0 0 0 3px ${T.bgAlt}, 0 4px 14px rgba(0,122,227,0.35)`,
          }} />
          <span style={{ fontFamily: DISPLAY, fontSize: "17px", fontWeight: 800, color: T.text, letterSpacing: "-0.3px" }}>
            Torem
          </span>
        </div>

        {/* Desktop links */}
        <div className="t-nav-desktop" style={{ alignItems: "center", gap: "4px" }}>
          {["Home", "Services", "About", "Contact"].map(l => (
            <button key={l} className="t-nav-link" onClick={() => setPage(l)} style={{
              background: page === l ? T.bgAlt : "none",
              border: "none", padding: "7px 15px",
              fontSize: "13px", fontWeight: page === l ? 600 : 500,
              color: page === l ? T.blue : T.textMuted,
              fontFamily: BODY,
            }}>
              {l}
            </button>
          ))}
          <button
            className="t-dark-toggle"
            onClick={() => setDark(d => !d)}
            aria-label="Toggle dark mode"
            title="Toggle dark mode"
            style={{
              marginLeft: "8px", width: "34px", height: "34px", borderRadius: "50%",
              border: `1px solid ${T.border}`, background: T.bgAlt, color: T.text,
              fontSize: "15px", display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer", transition: "transform 0.18s",
            }}
          >
            {dark ? "☀️" : "🌙"}
          </button>
          <button className="t-btn-primary" onClick={() => setPage("Contact")} style={{
            marginLeft: "10px", background: T.blue, color: P.white,
            border: "none", padding: "9px 20px", borderRadius: "8px",
            fontSize: "13px", fontWeight: 600, fontFamily: BODY,
          }}>
            Get Started
          </button>
        </div>

        {/* Mobile: dark toggle + hamburger */}
        <div className="t-nav-hamburger-btn" style={{ alignItems: "center", gap: "8px" }}>
          <button
            className="t-dark-toggle"
            onClick={() => setDark(d => !d)}
            aria-label="Toggle dark mode"
            title="Toggle dark mode"
            style={{
              width: "34px", height: "34px", borderRadius: "50%",
              border: `1px solid ${T.border}`, background: T.bgAlt, color: T.text,
              fontSize: "15px", display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer", transition: "transform 0.18s",
            }}
          >
            {dark ? "☀️" : "🌙"}
          </button>
          <button
            onClick={() => setMenuOpen(o => !o)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            style={{
              width: "38px", height: "38px", borderRadius: "8px",
              border: `1px solid ${T.border}`, background: menuOpen ? T.blue : T.bgAlt,
              color: menuOpen ? P.white : T.text,
              fontSize: "18px", display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer", transition: "background 0.18s, color 0.18s",
            }}
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>
      </nav>

      {/* Mobile slide-out menu */}
      {menuOpen && (
        <div
          className="t-nav-hamburger-btn"
          style={{
            position: "fixed", top: "66px", left: 0, right: 0, zIndex: 199,
            background: T.bg, borderBottom: `1px solid ${T.border}`,
            boxShadow: "0 12px 28px rgba(0,0,0,0.12)",
            padding: "10px clamp(20px, 5vw, 80px) 18px",
            flexDirection: "column", gap: "2px",
            animation: "slideDown 0.18s ease",
          }}
        >
          {MOBILE_NAV_ITEMS.map(({ label, target }) => (
            <button
              key={label}
              className="t-mobile-link"
              onClick={() => goTo(target)}
              style={{
                display: "block", width: "100%", textAlign: "left",
                background: page === target ? T.bgAlt : "none",
                border: "none", borderRadius: "8px",
                padding: "13px 14px", fontSize: "15px",
                fontWeight: page === target ? 700 : 500,
                color: page === target ? T.blue : T.text,
                fontFamily: BODY, cursor: "pointer", transition: "background 0.15s, color 0.15s",
              }}
            >
              {label}
            </button>
          ))}
          <button className="t-btn-primary" onClick={() => goTo("Contact")} style={{
            marginTop: "8px", background: T.blue, color: P.white,
            border: "none", padding: "12px", borderRadius: "8px",
            fontSize: "14px", fontWeight: 600, fontFamily: BODY,
          }}>
            Get Started
          </button>
        </div>
      )}
    </>
  );
}

// ── FOOTER ───────────────────────────────────────────────────
const SOCIAL_LINKS = [
  { icon: "𝕏", label: "Twitter / X", url: "https://x.com/Torem_Ai" },
  { icon: "in", label: "LinkedIn", url: "https://www.linkedin.com/in/torem-ai/" },
  { icon: "📷", label: "Instagram", url: "https://www.instagram.com/torem_ai/?hl=en" },
];

function Footer({ setPage, page, setScrollTarget }) {
  const goService = (anchor) => {
    if (page === "Services") {
      document.getElementById(anchor)?.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      setPage("Services");
      setScrollTarget(anchor);
    }
  };

  return (
    <footer style={{ background: P.navy, padding: "64px clamp(24px,6vw,80px) 36px" }}>
      <div style={{
        maxWidth: "1140px", margin: "0 auto",
        display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr",
        gap: "40px", marginBottom: "48px",
      }} className="t-hero-grid">
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
            <img src="https://i.imgur.com/HXc7WQO.png" alt="Torem AI" style={{
              width: "42px", height: "42px", borderRadius: "50%", objectFit: "cover",
              boxShadow: "0 0 0 3px rgba(255,255,255,0.06), 0 4px 16px rgba(0,122,227,0.4)",
            }} />
            <span style={{ fontFamily: DISPLAY, fontSize: "16px", fontWeight: 800, color: P.white }}>Torem</span>
          </div>
          <p style={{ fontSize: "13px", color: "#64748b", lineHeight: "1.75", maxWidth: "220px" }}>
            Custom automation systems that eliminate repetitive work for construction and field service businesses.
          </p>
        </div>
        {[
          { h: "Company", links: [["Home","Home","nav"],["Services","Services","nav"],["About","About","nav"],["Contact","Contact","nav"]] },
          { h: "Services", links: [["AI Receptionist","foundation","scroll"],["Appointment Booking","addons","scroll"],["Lead Follow-Up","addons","scroll"],["Review Generation","addons","scroll"]] },
          { h: "Contact",  links: [["toremaiautomation@gmail.com","mailto:toremaiautomation@gmail.com","email"],["(832) 683-8151","tel:+18326838151","tel"],["Houston, TX",null,null],["Book a Call","Contact","nav"]] },
        ].map(({ h, links }) => (
          <div key={h}>
            <div style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "2px", color: "#475569", textTransform: "uppercase", marginBottom: "18px" }}>{h}</div>
            {links.map(([label, target, type]) => {
              if (type === "email" || type === "tel") return (
                <div key={label} style={{ marginBottom: "11px" }}>
                  <a href={target} style={{ fontSize: "13px", color: P.blue, textDecoration: "underline", fontFamily: BODY }}>{label}</a>
                </div>
              );
              if (type === "scroll") return (
                <div key={label} className="t-link" onClick={() => goService(target)}
                  style={{ fontSize: "13px", color: "#94a3b8", marginBottom: "11px", cursor: "pointer" }}>{label}</div>
              );
              if (type === "nav") return (
                <div key={label} className="t-link" onClick={() => setPage(target)}
                  style={{ fontSize: "13px", color: "#94a3b8", marginBottom: "11px", cursor: "pointer" }}>{label}</div>
              );
              return (
                <div key={label} style={{ fontSize: "13px", color: "#94a3b8", marginBottom: "11px" }}>{label}</div>
              );
            })}
          </div>
        ))}
        <div>
          <div style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "2px", color: "#475569", textTransform: "uppercase", marginBottom: "18px" }}>Follow</div>
          {SOCIAL_LINKS.map(({ icon, label, url }) => (
            <a key={label} href={url} target="_blank" rel="noopener noreferrer" className="t-social"
              style={{
                display: "flex", alignItems: "center", gap: "9px", marginBottom: "11px",
                fontSize: "13px", color: P.blue, textDecoration: "underline", fontFamily: BODY,
                transition: "opacity 0.15s",
              }}>
              <span style={{
                width: "20px", height: "20px", borderRadius: "50%", background: "rgba(0,122,227,0.16)",
                display: "inline-flex", alignItems: "center", justifyContent: "center",
                fontSize: "11px", fontWeight: 700, flexShrink: 0, textDecoration: "none",
              }}>{icon}</span>
              {label}
            </a>
          ))}
        </div>
      </div>
      <div style={{ borderTop: "1px solid #1e3254", paddingTop: "24px", maxWidth: "1140px", margin: "0 auto", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "12px", alignItems: "center" }}>
        <span style={{ fontSize: "12px", color: "#334155" }}>© 2026 Torem AI. All rights reserved.</span>
        <div style={{ display: "flex", gap: "18px", flexWrap: "wrap" }}>
          {[["Terms","Terms"],["Privacy","Privacy"],["Cookies","Cookies"],["Disclaimer","Disclaimer"]].map(([label, p]) => (
            <span key={label} className="t-link" onClick={() => setPage(p)} style={{ fontSize: "12px", color: "#475569", cursor: "pointer" }}>{label}</span>
          ))}
        </div>
      </div>
    </footer>
  );
}

// ── ROI CALCULATOR ───────────────────────────────────────────
const ROI_CLOSE_RATE = 0.2;

function ROICalculator({ setPage, dark }) {
  const T = theme(dark);
  const [missedCalls, setMissedCalls] = useState(10);
  const [jobValue, setJobValue] = useState(1000);

  const monthlyLoss = Math.max(0, Number(missedCalls) || 0) * Math.max(0, Number(jobValue) || 0) * ROI_CLOSE_RATE;
  const fmt = n => "$" + Math.round(n).toLocaleString("en-US");

  return (
    <section style={{ background: T.bgAlt, padding: "88px clamp(24px,6vw,80px)" }}>
      <div style={{ maxWidth: "1140px", margin: "0 auto" }}>
        <SectionHead dark={dark} eyebrow="ROI Calculator" heading="See Your Potential Revenue Loss"
          sub="Plug in your numbers — this updates instantly as you type." />
        <div style={{
          display: "grid", gridTemplateColumns: "1fr 1fr", gap: "32px",
          maxWidth: "920px", margin: "0 auto", alignItems: "start",
        }} className="t-two-col">
          {/* Inputs */}
          <div style={{ background: T.bg, borderRadius: "16px", padding: "32px", border: `1px solid ${T.border}` }}>
            <div style={{ marginBottom: "18px" }}>
              <label style={{ display: "block", fontSize: "11px", fontWeight: 700, color: T.textMuted, marginBottom: "6px", letterSpacing: "0.5px", textTransform: "uppercase" }}>Calls you miss per month</label>
              <input type="number" min="0" value={missedCalls} onChange={e => setMissedCalls(e.target.value)} style={fieldStyle(T)} />
            </div>
            <div style={{ marginBottom: "18px" }}>
              <label style={{ display: "block", fontSize: "11px", fontWeight: 700, color: T.textMuted, marginBottom: "6px", letterSpacing: "0.5px", textTransform: "uppercase" }}>Average job value</label>
              <div style={{ position: "relative" }}>
                <span style={{ position: "absolute", left: "14px", top: "11px", fontSize: "14px", color: T.textMuted }}>$</span>
                <input type="number" min="0" value={jobValue} onChange={e => setJobValue(e.target.value)} style={{ ...fieldStyle(T), paddingLeft: "26px" }} />
              </div>
            </div>
          </div>

          {/* Results */}
          <div style={{ background: T.bg, borderRadius: "16px", padding: "32px", border: `2px solid ${T.blue}` }}>
            <div style={{ marginBottom: "24px" }}>
              <div style={{ fontSize: "12px", color: T.textMuted, marginBottom: "4px" }}>You're losing</div>
              <div style={{ fontFamily: DISPLAY, fontSize: "30px", fontWeight: 800, color: "#F87171" }}>{fmt(monthlyLoss)}/month</div>
              <div style={{ fontSize: "12px", color: T.textMuted }}>to missed calls</div>
            </div>
            <div style={{ marginBottom: "20px", padding: "14px 16px", background: T.bgAlt, borderRadius: "10px" }}>
              <div style={{ fontFamily: DISPLAY, fontSize: "15px", fontWeight: 700, color: T.text, marginBottom: "4px" }}>Ready to stop losing revenue?</div>
              <div style={{ fontSize: "12px", color: T.textMuted }}>Contact us to see how Torem pays for itself.</div>
            </div>
            <p style={{ fontSize: "11px", color: T.textMuted, marginBottom: "18px", lineHeight: 1.6 }}>*Estimate based on a 20% close rate on missed calls</p>
            <button className="t-btn-primary" onClick={() => setPage("Contact")} style={{
              width: "100%", background: T.blue, color: P.white, border: "none",
              padding: "13px", borderRadius: "8px", fontSize: "14px", fontWeight: 700, fontFamily: BODY,
            }}>
              Get Pricing →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── FAQ SECTION ──────────────────────────────────────────────
const FAQS = [
  { q: "Will my customers know it's AI?", a: "No, the AI is trained to sound like your business. Callers won't know the difference." },
  { q: "How long does setup take?", a: "Typically 3-5 business days from payment to live." },
  { q: "Can I cancel anytime?", a: "Yes, no long-term contracts. Cancel anytime." },
  { q: "What if the AI makes a mistake?", a: "We monitor all calls. You always have the option to review or adjust responses." },
  { q: "Do you integrate with Procore/QuickBooks?", a: "Yes, we integrate with most construction tools. Ask us during your discovery call." },
];

function FAQItem({ q, a, dark }) {
  const [open, setOpen] = useState(false);
  const T = theme(dark);
  return (
    <div style={{ borderBottom: `1px solid ${T.border}` }}>
      <button
        className="t-faq-q"
        onClick={() => setOpen(o => !o)}
        style={{
          width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center",
          background: "none", border: "none", cursor: "pointer", textAlign: "left",
          padding: "20px 4px", fontFamily: BODY, fontSize: "15px", fontWeight: 700, color: T.text,
        }}
      >
        {q}
        <span style={{
          fontSize: "16px", color: T.blue, transition: "transform 0.25s ease",
          transform: open ? "rotate(45deg)" : "rotate(0deg)", flexShrink: 0, marginLeft: "12px",
        }}>+</span>
      </button>
      <div style={{
        maxHeight: open ? "200px" : "0px", overflow: "hidden",
        transition: "max-height 0.28s ease",
      }}>
        <p style={{ fontSize: "13px", color: T.textMuted, lineHeight: 1.8, padding: "0 4px 20px" }}>{a}</p>
      </div>
    </div>
  );
}

function FAQSection({ dark }) {
  const T = theme(dark);
  return (
    <section style={{ background: T.bg, padding: "88px clamp(24px,6vw,80px)" }}>
      <div style={{ maxWidth: "720px", margin: "0 auto" }}>
        <SectionHead dark={dark} eyebrow="FAQ" heading="Common Questions" />
        <div>
          {FAQS.map(f => <FAQItem key={f.q} q={f.q} a={f.a} dark={dark} />)}
        </div>
      </div>
    </section>
  );
}

// ── HOME PAGE ────────────────────────────────────────────────
function HomePage({ setPage, dark }) {
  const T = theme(dark);
  return (
    <>
      {/* ── HERO ── */}
      <section style={{
        paddingTop: "120px", paddingBottom: "96px",
        padding: "120px clamp(24px,6vw,80px) 96px",
        background: P.navy,
        position: "relative", overflow: "hidden", minHeight: "92vh",
        display: "flex", alignItems: "center",
      }}>
        {/* Blueprint grid */}
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          backgroundImage: `linear-gradient(${P.blueprintLine} 1px, transparent 1px), linear-gradient(90deg, ${P.blueprintLine} 1px, transparent 1px)`,
          backgroundSize: "44px 44px",
        }} />
        {/* Glow orbs */}
        <div style={{ position:"absolute", top:"15%", right:"8%", width:"420px", height:"420px", borderRadius:"50%", background:`radial-gradient(circle, rgba(23,84,207,0.18) 0%, transparent 68%)`, animation:"glowPulse 5s ease-in-out infinite", pointerEvents:"none" }} />
        <div style={{ position:"absolute", bottom:"10%", left:"3%", width:"280px", height:"280px", borderRadius:"50%", background:`radial-gradient(circle, rgba(23,84,207,0.09) 0%, transparent 70%)`, pointerEvents:"none" }} />

        <div style={{ maxWidth: "1140px", margin: "0 auto", position: "relative", animation: "fadeUp 0.7s ease both" }}>
          <div style={{ display:"inline-flex", alignItems:"center", gap:"8px", background:"rgba(23,84,207,0.18)", border:"1px solid rgba(23,84,207,0.35)", borderRadius:"100px", padding:"5px 14px", marginBottom:"28px" }}>
            <span style={{ width:"6px", height:"6px", borderRadius:"50%", background:"#34d399", display:"block" }} />
            <span style={{ fontSize:"11px", color:"#93c5fd", fontWeight:600, letterSpacing:"0.4px" }}>Now serving construction & field service companies</span>
          </div>

          <h1 style={{
            fontFamily: DISPLAY, fontSize: "clamp(38px, 5.8vw, 72px)",
            fontWeight: 800, color: P.white, lineHeight: 1.08,
            maxWidth: "820px", marginBottom: "22px", letterSpacing: "-1px",
          }} className="t-hero-head">
            Your AI Operations System<br />
            <span style={{ color: "#5BB3F5" }}>for Home Service Contractors</span>
          </h1>

          <p style={{ fontSize: "17px", color: "rgba(255,255,255,0.5)", lineHeight: 1.75, maxWidth: "500px", marginBottom: "40px" }}>
            Capture every lead, answer phones 24/7, book appointments automatically, and replace your office admin with AI.
          </p>

          <div style={{ display:"flex", gap:"12px", flexWrap:"wrap" }}>
            <button className="t-btn-primary" onClick={() => setPage("Contact")} style={{
              background: P.blue, color: P.white, border: "none",
              padding: "14px 28px", borderRadius: "9px", fontSize: "14px", fontWeight: 600, fontFamily: BODY,
            }}>
              Book a Free Strategy Call
            </button>
            <button className="t-btn-ghost" onClick={() => setPage("Services")} style={{
              background: "transparent", color: "rgba(255,255,255,0.75)",
              border: "1px solid rgba(255,255,255,0.18)",
              padding: "14px 28px", borderRadius: "9px", fontSize: "14px", fontWeight: 500, fontFamily: BODY,
            }}>
              See Our Services →
            </button>
          </div>

          {/* Stat pills */}
          <div style={{ display:"flex", gap:"14px", marginTop:"60px", flexWrap:"wrap" }}>
            {[
              ["50+ hrs", "saved per client monthly"],
              ["3–7 days", "average delivery time"],
              ["100%", "custom-built, no templates"],
            ].map(([val, label]) => (
              <div key={val} style={{
                background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.09)",
                borderRadius: "10px", padding: "16px 22px",
              }}>
                <div style={{ fontFamily: DISPLAY, fontSize: "22px", fontWeight: 800, color: P.white }}>{val}</div>
                <div style={{ fontSize: "11px", color: "#475569", marginTop: "3px" }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PAIN POINTS ── */}
      <section style={{ background: T.bgAlt, padding: "80px clamp(24px,6vw,80px)" }}>
        <div style={{ maxWidth: "1140px", margin: "0 auto", textAlign: "center" }}>
          <SectionHead
            dark={dark}
            eyebrow="The Problem"
            heading="Sound familiar?"
            sub="These are the gaps that cost contractors jobs, revenue, and time every single week."
          />
          <div style={{ display:"grid", gridTemplateColumns:"repeat(3, 1fr)", gap:"12px" }} className="t-three-col">
            {[
              "Leads fall through the cracks (missed calls, website inquiries)",
              "No one answers phones after hours or on weekends",
              "Following up with prospects takes hours every week",
              "Customers ghost after you send a quote",
              "You're paying someone just to answer phones and schedule",
              "No way to track where leads come from",
            ].map(pain => (
              <div key={pain} style={{
                background: T.bg, borderRadius: "10px",
                padding: "16px 18px", border: `1px solid ${T.border}`,
                display: "flex", alignItems: "flex-start", gap: "10px", textAlign: "left",
              }}>
                <span style={{ color: "#F87171", fontSize: "13px", flexShrink: 0, marginTop: "1px" }}>✕</span>
                <span style={{ fontSize: "13px", color: T.text, fontWeight: 500, lineHeight: 1.5 }}>{pain}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES PREVIEW ── */}
      <section style={{ background: T.bg, padding: "96px clamp(24px,6vw,80px)" }}>
        <div style={{ maxWidth: "1140px", margin: "0 auto" }}>
          <SectionHead dark={dark} eyebrow="What We Build" heading="Automation that actually works" sub="Every system is designed around your specific workflow, not adapted from a generic template." />
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(300px, 1fr))", gap:"22px" }} className="t-three-col">
            {[
              { icon:"📞", title:"AI Receptionist + Lead Capture", desc:"Never miss another call or web inquiry. Our AI answers phones 24/7, captures lead info, and notifies you instantly so no opportunity slips through." },
              { icon:"📅", title:"Automated Appointment Booking", desc:"Let prospects book directly into your calendar. No back-and-forth calls, no manual scheduling — just confirmed appointments waiting for you." },
              { icon:"🔄", title:"Lead Follow-Up Sequences", desc:"Automated texts and emails that follow up with prospects after every quote — so you stop chasing and start closing more jobs." },
            ].map(({ icon, title, desc }) => (
              <div key={title} className="t-card" style={{
                background: T.bgAlt2, borderRadius: "14px",
                padding: "32px", border: `1px solid ${T.border}`,
                borderTop: `3px solid ${T.blue}`,
              }}>
                <div style={{ fontSize: "28px", marginBottom: "16px" }}>{icon}</div>
                <h3 style={{ fontFamily: DISPLAY, fontSize: "18px", fontWeight: 700, color: T.text, marginBottom: "10px" }}>{title}</h3>
                <p style={{ fontSize: "13px", color: T.textMuted, lineHeight: 1.75 }}>{desc}</p>
              </div>
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: "36px" }}>
            <button className="t-btn-ghost" onClick={() => setPage("Services")} style={{
              background: "none", border: `2px solid ${T.blue}`, color: T.blue,
              padding: "12px 26px", borderRadius: "8px", fontSize: "13px",
              fontWeight: 700, fontFamily: BODY,
            }}>
              View All Services →
            </button>
          </div>
        </div>
      </section>

      {/* ── PROCESS ── */}
      <section style={{ background: P.navy, padding: "96px clamp(24px,6vw,80px)", position: "relative", overflow: "hidden" }}>
        <div style={{ position:"absolute", inset:0, pointerEvents:"none", backgroundImage:`linear-gradient(${P.blueprintLine} 1px, transparent 1px), linear-gradient(90deg, ${P.blueprintLine} 1px, transparent 1px)`, backgroundSize:"44px 44px" }} />
        <div style={{ maxWidth: "1140px", margin: "0 auto", position: "relative" }}>
          <SectionHead light eyebrow="How It Works" heading="Live in three steps" />
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(260px, 1fr))", gap:"32px" }} className="t-three-col">
            {[
              { step:"01", label:"Discovery Call", body:"We map your current workflow, find the highest-ROI bottlenecks, and scope a custom solution — in under 30 minutes." },
              { step:"02", label:"We Build It",    body:"Your automation is built in 3–7 days. You see a live demo before anything connects to your real systems." },
              { step:"03", label:"You Move Faster", body:"Handoff includes documentation your non-technical team can follow. Ongoing support is included." },
            ].map(({ step, label, body }) => (
              <div key={step} style={{ borderLeft: `2px solid rgba(23,84,207,0.4)`, paddingLeft: "24px" }}>
                <div style={{ fontFamily: DISPLAY, fontSize: "44px", fontWeight: 800, color: "rgba(23,84,207,0.35)", lineHeight: 1, marginBottom: "8px" }}>{step}</div>
                <h3 style={{ fontFamily: DISPLAY, fontSize: "19px", fontWeight: 700, color: P.white, marginBottom: "10px" }}>{label}</h3>
                <p style={{ fontSize: "13px", color: "#4a6380", lineHeight: 1.75 }}>{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ROI CALCULATOR ── */}
      <ROICalculator setPage={setPage} dark={dark} />

      {/* ── FAQ ── */}
      <FAQSection dark={dark} />

      {/* ── CTA ── */}
      <section style={{ background: P.blue, padding: "80px clamp(24px,6vw,80px)", textAlign: "center" }}>
        <h2 style={{ fontFamily: DISPLAY, fontSize: "clamp(26px,3.5vw,40px)", fontWeight: 800, color: P.white, marginBottom: "14px" }}>
          Ready to get your time back?
        </h2>
        <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "15px", marginBottom: "30px" }}>
          Book a free 30-minute strategy call. We'll map an automation plan for your business — no commitment needed.
        </p>
        <button className="t-btn-primary" onClick={() => setPage("Contact")} style={{
          background: P.white, color: P.blue, border: "none",
          padding: "15px 32px", borderRadius: "9px", fontSize: "14px", fontWeight: 700, fontFamily: BODY,
          boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
        }}>
          Book Your Free Call
        </button>
      </section>
    </>
  );
}

// ── SERVICES PAGE ────────────────────────────────────────────
function ServicesPage({ setPage, dark, scrollTarget, setScrollTarget }) {
  useEffect(() => {
    if (scrollTarget) {
      const el = document.getElementById(scrollTarget);
      if (el) setTimeout(() => { el.scrollIntoView({ behavior: "smooth", block: "start" }); setScrollTarget(null); }, 120);
    }
  }, [scrollTarget]);
  const T = theme(dark);
  return (
    <>
      <section style={{ background: P.navy, padding: "110px clamp(24px,6vw,80px) 72px", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position:"absolute", inset:0, pointerEvents:"none", backgroundImage:`linear-gradient(${P.blueprintLine} 1px, transparent 1px), linear-gradient(90deg, ${P.blueprintLine} 1px, transparent 1px)`, backgroundSize:"44px 44px" }} />
        <div style={{ position: "relative" }}>
          <Tag color="#93c5fd">Services</Tag>
          <h1 style={{ fontFamily: DISPLAY, fontSize: "clamp(32px,5vw,58px)", fontWeight: 800, color: P.white, marginTop: "8px", marginBottom: "16px", letterSpacing: "-0.5px" }}>
            What We Build
          </h1>
          <p style={{ fontSize: "15px", color: "rgba(255,255,255,0.45)", maxWidth: "460px", margin: "0 auto", lineHeight: 1.7 }}>
            Every automation is designed around your specific workflow — not a template we drop in and forget.
          </p>
        </div>
      </section>

      {/* Foundation */}
      <section id="foundation" style={{ background: T.bg, padding: "88px clamp(24px,6vw,80px) 48px" }}>
        <div style={{ maxWidth: "1140px", margin: "0 auto" }}>
          <div style={{ textAlign:"center", marginBottom:"36px" }}>
            <span style={{ display:"inline-block", fontSize:"11px", fontWeight:700, letterSpacing:"2px", textTransform:"uppercase", color:T.blue, background:T.chip, padding:"5px 14px", borderRadius:"100px" }}>The Foundation</span>
          </div>
          <div style={{ maxWidth:"700px", margin:"0 auto" }}>
            <div className="t-card" style={{
              background: T.bgAlt2, borderRadius:"16px", padding:"40px",
              border:`2px solid ${T.blue}`,
              boxShadow:`0 8px 40px rgba(0,122,227,0.12)`,
            }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:"20px" }}>
                <div style={{ display:"flex", alignItems:"center", gap:"14px" }}>
                  <span style={{ fontSize:"32px" }}>📞</span>
                  <div>
                    <h3 style={{ fontFamily:DISPLAY, fontSize:"20px", fontWeight:800, color:T.text }}>AI Receptionist + Lead Capture</h3>
                    <p style={{ fontSize:"12px", color:T.textMuted, marginTop:"3px" }}>Start here. Everything builds on this.</p>
                  </div>
                </div>
                <div style={{ textAlign:"right", flexShrink:0, marginLeft:"16px" }}>
                  <div style={{ fontSize:"12px", fontWeight:600, color:T.blue, background:T.chip, padding:"4px 12px", borderRadius:"100px" }}>Contact for pricing</div>
                </div>
              </div>
              <p style={{ fontSize:"14px", color:T.textMuted, lineHeight:1.8, marginBottom:"24px" }}>
                This is the base of everything. Your AI answers phones 24/7, qualifies every caller, captures lead info, and notifies you instantly — so no opportunity slips through, even at 10pm on a Sunday.
              </p>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"8px" }}>
                {["24/7 phone answering","Lead qualification scripts","Instant owner notifications","CRM contact creation"].map(f => (
                  <div key={f} style={{ display:"flex", alignItems:"center", gap:"8px" }}>
                    <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><circle cx="6.5" cy="6.5" r="6.5" fill={T.blue} fillOpacity="0.12"/><path d="M4 6.5l1.8 1.8L9 5" stroke={T.blue} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    <span style={{ fontSize:"13px", color:T.text }}>{f}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Add-ons */}
      <section id="addons" style={{ background: T.bgAlt, padding: "48px clamp(24px,6vw,80px) 88px" }}>
        <div style={{ maxWidth: "1140px", margin: "0 auto" }}>
          <div style={{ textAlign:"center", marginBottom:"12px" }}>
            <span style={{ display:"inline-block", fontSize:"11px", fontWeight:700, letterSpacing:"2px", textTransform:"uppercase", color:T.textMuted, background:T.bg, padding:"5px 14px", borderRadius:"100px", border:`1px solid ${T.border}` }}>Add What You Need</span>
          </div>
          <p style={{ textAlign:"center", fontSize:"14px", color:T.textMuted, maxWidth:"560px", margin:"0 auto 36px", lineHeight:1.7 }}>
            Pick and choose the automations that fit your business. Most clients start with the AI Agent, then add 1–2 add-ons as they see results.
          </p>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(300px, 1fr))", gap:"20px" }}>
            {[
              { icon:"📅", title:"Automated Appointment Booking", desc:"Let prospects self-book estimates directly into your calendar. Automated reminders cut no-shows.", features:["Online booking widget","Calendar sync (Google/Outlook)","Automated reminders","Confirmation texts"] },
              { icon:"🔄", title:"Lead Follow-Up Sequences",      desc:"Texts and emails that fire automatically after every quote until the prospect books or opts out.", features:["SMS + email drip sequences","Quote follow-up automation","Customizable timing & copy","Stops when they reply or book"] },
              { icon:"🗂️", title:"CRM Pipeline & Job Tracking",  desc:"A simple visual pipeline from first contact to invoice paid. Always know what needs attention.", features:["Lead-to-job pipeline view","Stage-based status tracking","Automated status updates","Revenue & close-rate reporting"] },
              { icon:"⭐", title:"Review Generation Automation",  desc:"Auto-send review requests after every completed job. More 5-star Google reviews, more inbound calls.", features:["Post-job review request texts","Google & Facebook targeting","Timing after job close","Negative feedback redirect"] },
              { icon:"📲", title:"Missed Call Text-Back Recovery", desc:"Instant automated text fires back within seconds of a missed call — before they dial your competitor.", features:["Instant SMS on missed call","Customizable response message","Lead capture follow-through","Works 24/7 automatically"] },
            ].map(({ icon, title, desc, features }) => (
              <div key={title} className="t-card" style={{
                background: T.bg, borderRadius:"14px",
                padding:"28px", border:`1px solid ${T.border}`,
              }}>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:"16px" }}>
                  <span style={{ fontSize:"26px" }}>{icon}</span>
                  <span style={{ fontSize:"11px", fontWeight:600, color:T.blue, background:T.chip, padding:"4px 12px", borderRadius:"100px" }}>Contact for pricing</span>
                </div>
                <h3 style={{ fontFamily:DISPLAY, fontSize:"16px", fontWeight:700, color:T.text, marginBottom:"10px" }}>{title}</h3>
                <p style={{ fontSize:"13px", color:T.textMuted, lineHeight:1.75, marginBottom:"18px" }}>{desc}</p>
                <div style={{ display:"flex", flexDirection:"column", gap:"7px" }}>
                  {features.map(f => (
                    <div key={f} style={{ display:"flex", alignItems:"center", gap:"8px" }}>
                      <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><circle cx="6.5" cy="6.5" r="6.5" fill={T.blue} fillOpacity="0.12"/><path d="M4 6.5l1.8 1.8L9 5" stroke={T.blue} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      <span style={{ fontSize:"12px", color:T.text }}>{f}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack — full-width marquee */}
      <section style={{ background: T.bgAlt, padding: "72px 0", textAlign: "center" }}>
        <div style={{ maxWidth: "1140px", margin: "0 auto", padding: "0 clamp(24px,6vw,80px) 36px" }}>
          <SectionHead dark={dark} eyebrow="Tech Stack" heading="Battle-tested tools" sub="Production-grade infrastructure, not side-project experiments." />
        </div>
        <div style={{
          overflow: "hidden", width: "100%",
          WebkitMaskImage: "linear-gradient(to right, transparent, black 80px, black calc(100% - 80px), transparent)",
          maskImage: "linear-gradient(to right, transparent, black 80px, black calc(100% - 80px), transparent)",
        }}>
          <div className="marquee-track">
            {[...["n8n","Zapier","Supabase","Vercel","Claude API","QuickBooks","Google Workspace","Aircall","Stripe"],
              ...["n8n","Zapier","Supabase","Vercel","Claude API","QuickBooks","Google Workspace","Aircall","Stripe"]
            ].map((t, i) => (
              <span key={i} style={{
                padding:"9px 20px", background:T.bg, border:`1px solid ${T.border}`,
                borderRadius:"100px", fontSize:"12px", fontWeight:600, color:T.text,
                margin:"0 7px", flexShrink:0, whiteSpace:"nowrap",
                display:"inline-block",
              }}>{t}</span>
            ))}
          </div>
        </div>
      </section>

      <section style={{ background: P.blue, padding: "76px clamp(24px,6vw,80px)", textAlign: "center" }}>
        <h2 style={{ fontFamily: DISPLAY, fontSize: "clamp(24px,3vw,36px)", fontWeight: 800, color: P.white, marginBottom: "14px" }}>Not sure what you need?</h2>
        <p style={{ color: "rgba(255,255,255,0.65)", fontSize: "14px", marginBottom: "26px" }}>Book a free call and we'll figure it out together in 30 minutes.</p>
        <button className="t-btn-primary" onClick={() => setPage("Contact")} style={{ background:P.white, color:P.blue, border:"none", padding:"13px 28px", borderRadius:"8px", fontSize:"13px", fontWeight:700, fontFamily:BODY }}>
          Talk to Us →
        </button>
      </section>
    </>
  );
}

// ── ABOUT PAGE ───────────────────────────────────────────────
function AboutPage({ setPage, dark }) {
  const T = theme(dark);
  return (
    <>
      <section style={{ background: P.navy, padding: "110px clamp(24px,6vw,80px) 72px", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position:"absolute", inset:0, pointerEvents:"none", backgroundImage:`linear-gradient(${P.blueprintLine} 1px, transparent 1px), linear-gradient(90deg, ${P.blueprintLine} 1px, transparent 1px)`, backgroundSize:"44px 44px" }} />
        <div style={{ position: "relative" }}>
          <Tag color="#93c5fd">About</Tag>
          <h1 style={{ fontFamily: DISPLAY, fontSize: "clamp(32px,5vw,58px)", fontWeight: 800, color: P.white, marginTop: "8px", marginBottom: "16px", letterSpacing: "-0.5px" }}>
            Built by builders
          </h1>
          <p style={{ fontSize: "15px", color: "rgba(255,255,255,0.45)", maxWidth: "460px", margin: "0 auto", lineHeight: 1.7 }}>
            Torem AI started with a simple belief: businesses shouldn't waste skilled hours on work that machines can handle.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section style={{ background: T.bg, padding: "88px clamp(24px,6vw,80px)" }}>
        <div style={{ maxWidth: "780px", margin: "0 auto", textAlign: "center" }}>
          <SectionHead dark={dark} eyebrow="Our Mission" heading="Making automation accessible" />
          <p style={{ fontSize: "15px", color: T.textMuted, lineHeight: 1.85, marginBottom: "20px" }}>
            Most automation tools are too expensive, too generic, or too complicated for small and mid-sized businesses. The result? Companies keep doing things manually — not because they want to, but because nobody's built them the right solution.
          </p>
          <p style={{ fontSize: "15px", color: T.textMuted, lineHeight: 1.85 }}>
            Torem fills that gap. We build practical, hands-off automations that work for real businesses — not just enterprise companies with a full IT department.
          </p>
        </div>
      </section>

      {/* Founder */}
      <section style={{ background: T.bgAlt, padding: "80px clamp(24px,6vw,80px)" }}>
        <div style={{ maxWidth: "1140px", margin: "0 auto" }}>
          <SectionHead dark={dark} eyebrow="The Team" heading="Who we are" />
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(300px, 1fr))", gap:"24px", maxWidth:"880px", margin:"0 auto" }}>
            {[
              {
                initial:"E", name:"Edlin", role:"Founder & Tech Lead",
                bio:"IT infrastructure & automation specialist who saw contractors losing jobs to missed calls and slow follow-up. Built Torem AI to automate the front office so contractors can focus on what they do best.",
                skills:["n8n","Supabase","React","Automation"],
              },
              {
                initial:"A", name:"Adrian", role:"Founder & Business Lead",
                bio:"Business strategist focused on helping home service companies scale without adding headcount. Handles growth, partnerships, and client success at Torem AI.",
                skills:["Business Development","Sales","Strategy","Client Success"],
              },
            ].map(({ initial, name, role, bio, skills }) => (
              <div key={name} style={{ background: T.bg, borderRadius: "16px", padding: "40px", border: `1px solid ${T.border}`, textAlign: "center" }}>
                <div style={{ width:"72px", height:"72px", borderRadius:"50%", background:`linear-gradient(135deg, ${T.blue}, ${P.navy})`, margin:"0 auto 20px", display:"flex", alignItems:"center", justifyContent:"center" }}>
                  <span style={{ fontFamily: DISPLAY, color: P.white, fontSize:"26px", fontWeight:800 }}>{initial}</span>
                </div>
                <h3 style={{ fontFamily: DISPLAY, fontSize:"20px", fontWeight:800, color:T.text }}>{name}</h3>
                <p style={{ fontSize:"12px", color:T.blue, fontWeight:600, marginBottom:"16px", marginTop:"4px", letterSpacing:"0.5px", textTransform:"uppercase" }}>{role}</p>
                <p style={{ fontSize:"13px", color:T.textMuted, lineHeight:1.8 }}>{bio}</p>
                <div style={{ display:"flex", gap:"8px", marginTop:"20px", justifyContent:"center", flexWrap:"wrap" }}>
                  {skills.map(t => (
                    <span key={t} style={{ fontSize:"10px", background:T.chip, color:T.blue, padding:"4px 10px", borderRadius:"100px", fontWeight:600 }}>{t}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section style={{ background: T.bg, padding: "88px clamp(24px,6vw,80px)" }}>
        <div style={{ maxWidth: "1140px", margin: "0 auto" }}>
          <SectionHead dark={dark} eyebrow="How We Work" heading="Our approach" />
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(220px, 1fr))", gap:"22px" }}>
            {[
              { icon:"🏗️", t:"Practical first", b:"We build for real-world use, not demos. Every automation is tested against how your team actually operates before handoff." },
              { icon:"🔒", t:"Simple to manage", b:"Non-technical teams can understand and manage everything we build. Clear documentation is part of every delivery." },
              { icon:"⚡", t:"Fast delivery", b:"First automation live in 3–7 days. No multi-month roadmaps before you see results." },
              { icon:"📞", t:"Direct support", b:"You get a direct line to the person who built your system — not a support ticket queue." },
            ].map(({ icon, t, b }) => (
              <div key={t} style={{ padding:"28px", background:T.bgAlt, borderRadius:"12px", border:`1px solid ${T.border}` }}>
                <div style={{ fontSize:"26px", marginBottom:"12px" }}>{icon}</div>
                <h3 style={{ fontFamily:DISPLAY, fontSize:"15px", fontWeight:700, color:T.text, marginBottom:"8px" }}>{t}</h3>
                <p style={{ fontSize:"13px", color:T.textMuted, lineHeight:1.75 }}>{b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ background: P.blue, padding: "76px clamp(24px,6vw,80px)", textAlign: "center" }}>
        <h2 style={{ fontFamily: DISPLAY, fontSize: "clamp(24px,3vw,36px)", fontWeight: 800, color: P.white, marginBottom: "14px" }}>Let's build something together</h2>
        <button className="t-btn-primary" onClick={() => setPage("Contact")} style={{ background:P.white, color:P.blue, border:"none", padding:"13px 28px", borderRadius:"8px", fontSize:"13px", fontWeight:700, fontFamily:BODY, marginTop:"6px" }}>
          Get in Touch →
        </button>
      </section>
    </>
  );
}

// ── CONTACT PAGE ─────────────────────────────────────────────
function ContactPage({ dark }) {
  const T = theme(dark);
  const FIELD = fieldStyle(T);
  const [form, setForm] = useState({ name:"", email:"", phone:"", company:"", service:"", message:"" });
<<<<<<< HEAD
  const [status, setStatus] = useState("idle"); // idle | sending | success | error
=======
  const [status, setStatus] = useState("idle"); // idle | sending | success | error | fetchError
>>>>>>> d9aff0aca804d809e5c4c8eb9f41bf8a81d8bcfb

  const set = k => e => setForm({ ...form, [k]: e.target.value });

  const submit = async () => {
    if (!form.name || !form.email || !form.message) { setStatus("error"); return; }
    setStatus("sending");
    try {
      await fetch("https://toremai.app.n8n.cloud/webhook/torem-contact", {
        method: "POST",
<<<<<<< HEAD
=======
        mode: "cors",
>>>>>>> d9aff0aca804d809e5c4c8eb9f41bf8a81d8bcfb
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          service: form.service,
          message: form.message,
          source: "contact-form",
<<<<<<< HEAD
          notify_email: "toremaiautomation@gmail.com",
          subject: `New Lead from ${form.name} - Torem AI Contact Form`,
        }),
      });
      fetch("https://toremai.app.n8n.cloud/webhook/torem-contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: "toremaiautomation@gmail.com",
          subject: `New Lead: ${form.name} | ${form.service}`,
          body: `New lead from Torem AI website:\n\nName: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone}\nService: ${form.service}\nMessage: ${form.message}\nSubmitted: ${new Date().toLocaleString()}`,
          source: "contact-form",
        }),
      }).catch(() => {});
      setStatus("success");
    } catch {
      setStatus("fetch-error");
=======
        }),
      });
      setStatus("success");
    } catch {
      setStatus("fetchError");
>>>>>>> d9aff0aca804d809e5c4c8eb9f41bf8a81d8bcfb
    }
  };

  return (
    <>
      <section style={{ background: P.navy, padding: "110px clamp(24px,6vw,80px) 72px", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position:"absolute", inset:0, pointerEvents:"none", backgroundImage:`linear-gradient(${P.blueprintLine} 1px, transparent 1px), linear-gradient(90deg, ${P.blueprintLine} 1px, transparent 1px)`, backgroundSize:"44px 44px" }} />
        <div style={{ position: "relative" }}>
          <Tag color="#93c5fd">Contact</Tag>
          <h1 style={{ fontFamily: DISPLAY, fontSize: "clamp(32px,5vw,58px)", fontWeight: 800, color: P.white, marginTop: "8px", marginBottom: "16px", letterSpacing: "-0.5px" }}>
            Let's Talk
          </h1>
          <p style={{ fontSize: "15px", color: "rgba(255,255,255,0.45)", maxWidth: "400px", margin: "0 auto", lineHeight: 1.7 }}>
            Tell us about your workflow and we'll show you where automation saves the most time.
          </p>
        </div>
      </section>

      <section style={{ background: T.bgAlt2, padding: "88px clamp(24px,6vw,80px)" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", display:"grid", gridTemplateColumns:"1fr 1.5fr", gap:"64px", alignItems:"start" }} className="t-two-col">

          {/* Left */}
          <div>
            <h2 style={{ fontFamily: DISPLAY, fontSize: "22px", fontWeight: 800, color: T.text, marginBottom: "14px" }}>What to expect</h2>
            <p style={{ fontSize: "13px", color: T.textMuted, lineHeight: 1.85, marginBottom: "32px" }}>
              After you reach out we'll schedule a 30-minute discovery call to understand your workflow and scope the right solution. No sales pitch — just an honest conversation about what's slowing you down.
            </p>
            {[
              ["📞", "Free 30-min strategy call", "No commitment required"],
              ["📋", "Custom automation roadmap", "Delivered after the call"],
              ["⚡", "First automation live in 3–7 days", "After you approve the plan"],
            ].map(([icon, title, sub]) => (
              <div key={title} style={{ display:"flex", gap:"14px", marginBottom:"22px" }}>
                <div style={{ width:"42px", height:"42px", background:T.chip, borderRadius:"10px", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, fontSize:"18px" }}>{icon}</div>
                <div>
                  <div style={{ fontSize:"13px", fontWeight:700, color:T.text }}>{title}</div>
                  <div style={{ fontSize:"12px", color:T.textMuted, marginTop:"2px" }}>{sub}</div>
                </div>
              </div>
            ))}
            <div style={{ marginTop:"36px", padding:"18px 20px", background:T.bg, borderRadius:"10px", border:`1px solid ${T.border}` }}>
              <div style={{ fontSize:"11px", color:T.textMuted, marginBottom:"4px", textTransform:"uppercase", letterSpacing:"1px" }}>Email us directly</div>
              <a href="mailto:toremaiautomation@gmail.com" style={{ fontSize:"14px", fontWeight:700, color:T.blue, textDecoration:"underline", fontFamily:BODY }}>toremaiautomation@gmail.com</a>
            </div>
            <div style={{ marginTop:"12px", padding:"18px 20px", background:T.bg, borderRadius:"10px", border:`1px solid ${T.border}` }}>
              <div style={{ fontSize:"11px", color:T.textMuted, marginBottom:"4px", textTransform:"uppercase", letterSpacing:"1px" }}>Call or text us</div>
              <a href="tel:+18326838151" style={{ fontSize:"14px", fontWeight:700, color:T.blue, textDecoration:"underline", fontFamily:BODY }}>(832) 683-8151</a>
            </div>
          </div>

          {/* Right - Form */}
          <div style={{ background: T.bg, borderRadius: "16px", padding: "40px", border: `1px solid ${T.border}` }}>
<<<<<<< HEAD
            <div style={{ display:"flex", flexDirection:"column", gap:"18px" }}>
              <h3 style={{ fontFamily:DISPLAY, fontSize:"18px", fontWeight:800, color:T.text }}>Send us a message</h3>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"14px" }}>
                <div>
                  <label style={{ display:"block", fontSize:"11px", fontWeight:700, color:T.textMuted, marginBottom:"6px", letterSpacing:"0.5px", textTransform:"uppercase" }}>Your Name *</label>
                  <input style={FIELD} value={form.name} onChange={set("name")} placeholder="John Smith" />
                </div>
                <div>
                  <label style={{ display:"block", fontSize:"11px", fontWeight:700, color:T.textMuted, marginBottom:"6px", letterSpacing:"0.5px", textTransform:"uppercase" }}>Email *</label>
                  <input style={FIELD} type="email" value={form.email} onChange={set("email")} placeholder="john@company.com" />
                </div>
              </div>
              <div>
                <label style={{ display:"block", fontSize:"11px", fontWeight:700, color:T.textMuted, marginBottom:"6px", letterSpacing:"0.5px", textTransform:"uppercase" }}>Phone</label>
                <input type="tel" style={FIELD} value={form.phone} onChange={set("phone")} placeholder="(555) 123-4567" />
=======
            {status === "success" ? (
              <div style={{ textAlign:"center", padding:"48px 0" }}>
                <div style={{ fontSize:"44px", marginBottom:"16px" }}>✓</div>
                <h3 style={{ fontFamily:DISPLAY, fontSize:"22px", fontWeight:800, color:T.text, marginBottom:"10px" }}>Thanks!</h3>
                <p style={{ color:T.textMuted, fontSize:"14px", lineHeight:1.7 }}>We'll be in touch within 24 hours.</p>
              </div>
            ) : (
              <div style={{ display:"flex", flexDirection:"column", gap:"18px" }}>
                <h3 style={{ fontFamily:DISPLAY, fontSize:"18px", fontWeight:800, color:T.text }}>Send us a message</h3>
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"14px" }}>
                  <div>
                    <label style={{ display:"block", fontSize:"11px", fontWeight:700, color:T.textMuted, marginBottom:"6px", letterSpacing:"0.5px", textTransform:"uppercase" }}>Your Name *</label>
                    <input style={FIELD} value={form.name} onChange={set("name")} placeholder="John Smith" />
                  </div>
                  <div>
                    <label style={{ display:"block", fontSize:"11px", fontWeight:700, color:T.textMuted, marginBottom:"6px", letterSpacing:"0.5px", textTransform:"uppercase" }}>Email *</label>
                    <input style={FIELD} type="email" value={form.email} onChange={set("email")} placeholder="john@company.com" />
                  </div>
                </div>
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"14px" }}>
                  <div>
                    <label style={{ display:"block", fontSize:"11px", fontWeight:700, color:T.textMuted, marginBottom:"6px", letterSpacing:"0.5px", textTransform:"uppercase" }}>Phone</label>
                    <input style={FIELD} type="tel" value={form.phone} onChange={set("phone")} placeholder="(832) 555-0100" />
                  </div>
                  <div>
                    <label style={{ display:"block", fontSize:"11px", fontWeight:700, color:T.textMuted, marginBottom:"6px", letterSpacing:"0.5px", textTransform:"uppercase" }}>Company</label>
                    <input style={FIELD} value={form.company} onChange={set("company")} placeholder="Smith Construction Co." />
                  </div>
                </div>
                <div>
                  <label style={{ display:"block", fontSize:"11px", fontWeight:700, color:T.textMuted, marginBottom:"6px", letterSpacing:"0.5px", textTransform:"uppercase" }}>Service Interest</label>
                  <select style={FIELD} value={form.service} onChange={set("service")}>
                    <option value="">Select a service...</option>
                    <option>AI Receptionist + Lead Capture</option>
                    <option>Automated Appointment Booking</option>
                    <option>Lead Follow-Up Sequences</option>
                    <option>CRM Pipeline &amp; Job Tracking</option>
                    <option>Review Generation Automation</option>
                    <option>Missed Call Text-Back Recovery</option>
                    <option>Not sure yet</option>
                  </select>
                </div>
                <div>
                  <label style={{ display:"block", fontSize:"11px", fontWeight:700, color:T.textMuted, marginBottom:"6px", letterSpacing:"0.5px", textTransform:"uppercase" }}>Tell us about your workflow *</label>
                  <textarea style={{ ...FIELD, minHeight:"96px", resize:"vertical" }} value={form.message} onChange={set("message")} placeholder="What's the most repetitive thing your team does every day?" />
                </div>
                {status === "error" && (
                  <div style={{ fontSize:"12px", color:"#991b1b", background:"#fef2f2", border:"1px solid #fca5a5", padding:"10px 14px", borderRadius:"6px" }}>
                    Please fill in your name, email, and message.
                  </div>
                )}
                {status === "fetchError" && (
                  <div style={{ fontSize:"12px", color:"#991b1b", background:"#fef2f2", border:"1px solid #fca5a5", padding:"10px 14px", borderRadius:"6px" }}>
                    Something went wrong. Please email us directly at <a href="mailto:toremaiautomation@gmail.com" style={{ color:"#991b1b" }}>toremaiautomation@gmail.com</a>
                  </div>
                )}
                <button className="t-btn-primary" onClick={submit} disabled={status === "sending"} style={{
                  background: status === "sending" ? "#94a3b8" : T.blue,
                  color: P.white, border:"none", padding:"13px",
                  borderRadius:"8px", fontSize:"14px", fontWeight:700, fontFamily:BODY,
                }}>
                  {status === "sending" ? "Sending..." : "Send Message →"}
                </button>
>>>>>>> d9aff0aca804d809e5c4c8eb9f41bf8a81d8bcfb
              </div>
              <div>
                <label style={{ display:"block", fontSize:"11px", fontWeight:700, color:T.textMuted, marginBottom:"6px", letterSpacing:"0.5px", textTransform:"uppercase" }}>Company</label>
                <input style={FIELD} value={form.company} onChange={set("company")} placeholder="Smith Construction Co." />
              </div>
              <div>
                <label style={{ display:"block", fontSize:"11px", fontWeight:700, color:T.textMuted, marginBottom:"6px", letterSpacing:"0.5px", textTransform:"uppercase" }}>Service Interest</label>
                <select style={FIELD} value={form.service} onChange={set("service")}>
                  <option value="">Select a service...</option>
                  <option>AI Receptionist + Lead Capture</option>
                  <option>Automated Appointment Booking</option>
                  <option>Lead Follow-Up Sequences</option>
                  <option>CRM Pipeline &amp; Job Tracking</option>
                  <option>Review Generation Automation</option>
                  <option>Missed Call Text-Back Recovery</option>
                  <option>Not sure yet</option>
                </select>
              </div>
              <div>
                <label style={{ display:"block", fontSize:"11px", fontWeight:700, color:T.textMuted, marginBottom:"6px", letterSpacing:"0.5px", textTransform:"uppercase" }}>Tell us about your workflow *</label>
                <textarea style={{ ...FIELD, minHeight:"96px", resize:"vertical" }} value={form.message} onChange={set("message")} placeholder="What's the most repetitive thing your team does every day?" />
              </div>
              {status === "error" && (
                <div style={{ fontSize:"12px", color:"#991b1b", background:"#fef2f2", border:"1px solid #fca5a5", padding:"10px 14px", borderRadius:"6px" }}>
                  Please fill in your name, email, and message.
                </div>
              )}
              <button className="t-btn-primary" onClick={submit} disabled={status === "sending"} style={{
                background: status === "sending" ? "#94a3b8" : T.blue,
                color: P.white, border:"none", padding:"13px",
                borderRadius:"8px", fontSize:"14px", fontWeight:700, fontFamily:BODY,
              }}>
                {status === "sending" ? "Sending..." : "Send Message →"}
              </button>
              {status === "success" && (
                <div style={{ fontSize:"13px", color:"#15803d", background:"#f0fdf4", border:"1px solid #86efac", padding:"10px 14px", borderRadius:"6px" }}>
                  Thanks! We'll be in touch within 24 hours.
                </div>
              )}
              {status === "fetch-error" && (
                <div style={{ fontSize:"13px", color:"#991b1b", background:"#fef2f2", border:"1px solid #fca5a5", padding:"10px 14px", borderRadius:"6px" }}>
                  Something went wrong. Email us at toremaiautomation@gmail.com
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

// ── LEGAL SHARED ─────────────────────────────────────────────
function LegalPage({ title, updated, children, dark }) {
  const T = theme(dark);
  return (
    <>
      <section style={{ background: P.navy, padding: "110px clamp(24px,6vw,80px) 64px", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position:"absolute", inset:0, pointerEvents:"none", backgroundImage:`linear-gradient(${P.blueprintLine} 1px, transparent 1px), linear-gradient(90deg, ${P.blueprintLine} 1px, transparent 1px)`, backgroundSize:"44px 44px" }} />
        <div style={{ position:"relative" }}>
          <Tag color="#93c5fd">Legal</Tag>
          <h1 style={{ fontFamily:DISPLAY, fontSize:"clamp(28px,4vw,48px)", fontWeight:800, color:P.white, marginTop:"8px", letterSpacing:"-0.5px" }}>{title}</h1>
          <p style={{ fontSize:"13px", color:"rgba(255,255,255,0.35)", marginTop:"12px" }}>Last updated: {updated}</p>
        </div>
      </section>
      <section style={{ background:T.bg, padding:"72px clamp(24px,6vw,80px)" }}>
        <div style={{ maxWidth:"780px", margin:"0 auto" }}>{children}</div>
      </section>
    </>
  );
}

function LegalSection({ heading, children, dark }) {
  const T = theme(dark);
  return (
    <div style={{ marginBottom:"40px" }}>
      <h2 style={{ fontFamily:DISPLAY, fontSize:"19px", fontWeight:700, color:T.text, marginBottom:"12px", paddingBottom:"8px", borderBottom:`1px solid ${T.border}` }}>{heading}</h2>
      <div style={{ fontSize:"14px", color:T.textMuted, lineHeight:1.85 }}>{children}</div>
    </div>
  );
}

function LP({ children }) { return <p style={{ marginBottom:"12px" }}>{children}</p>; }
function LI({ items }) {
  return (
    <ul style={{ paddingLeft:"20px", marginBottom:"12px" }}>
      {items.map(i => <li key={i} style={{ marginBottom:"6px" }}>{i}</li>)}
    </ul>
  );
}

// ── TERMS OF SERVICE ─────────────────────────────────────────
function TermsPage({ dark }) {
  const Section = p => <LegalSection {...p} dark={dark} />;
  return (
    <LegalPage dark={dark} title="Terms of Service" updated="June 1, 2026">
      <Section heading="1. Acceptance of Terms">
        <LP>By accessing or using any services provided by Torem AI ("Company," "we," "us," or "our"), you agree to be bound by these Terms of Service. If you do not agree to these terms, do not use our services.</LP>
        <LP>These Terms apply to all clients, visitors, and others who access or use our services, including AI automation systems, consulting, and software development.</LP>
      </Section>

      <Section heading="2. Description of Services">
        <LP>Torem AI provides AI-powered automation systems for home service and construction contractors, including but not limited to:</LP>
        <LI items={["AI receptionist and lead capture systems","Automated appointment booking","Lead follow-up sequences","CRM pipeline and job tracking","Review generation automation","Missed call text-back recovery"]} />
        <LP>All services are custom-built and delivered as described in your individual service agreement or proposal.</LP>
      </Section>

      <Section heading="3. Payment Terms">
        <LP>Services are billed according to the pricing agreed upon in your service proposal. Setup fees are due before work begins. Monthly recurring fees are billed on the same date each month.</LP>
        <LP>Late payments (more than 7 days overdue) may result in service suspension. We reserve the right to charge a 1.5% monthly late fee on outstanding balances.</LP>
        <LP>All fees are non-refundable unless otherwise stated in writing. Disputes must be raised within 30 days of the invoice date.</LP>
      </Section>

      <Section heading="4. Cancellation Policy">
        <LP>Monthly services may be cancelled with 30 days written notice to toremaiautomation@gmail.com. You will continue to have access to services through the end of the current billing period.</LP>
        <LP>Setup fees are non-refundable. If you cancel within the first 30 days of a monthly service, no refund will be issued for that month.</LP>
        <LP>We reserve the right to terminate service immediately for violations of these Terms, fraudulent activity, or non-payment.</LP>
      </Section>

      <Section heading="5. Client Responsibilities">
        <LP>You agree to provide accurate information necessary for us to deliver services, including business details, phone numbers, access credentials, and workflow information.</LP>
        <LP>You are responsible for ensuring that your use of our services complies with all applicable laws and regulations, including telemarketing regulations (TCPA), CAN-SPAM, and any local business licensing requirements.</LP>
        <LP>You must not use our services to send spam, harass individuals, or engage in any deceptive or fraudulent business practices.</LP>
      </Section>

      <Section heading="6. Intellectual Property & Data Ownership">
        <LP>All custom automation workflows, scripts, and systems built for you remain your property upon full payment. Torem AI retains the right to use general concepts, techniques, and non-client-specific methodologies in other projects.</LP>
        <LP>You retain full ownership of your business data, customer contact lists, and lead information. We will never sell or share your data with third parties except as required to deliver your services (e.g., integration with third-party platforms you authorize).</LP>
      </Section>

      <Section heading="7. Limitation of Liability">
        <LP>Torem AI's liability for any claim arising out of these Terms or our services is limited to the amount you paid us in the 3 months preceding the claim.</LP>
        <LP>We are not liable for indirect, incidental, special, or consequential damages, including lost revenue, lost leads, or business interruption — even if we have been advised of the possibility of such damages.</LP>
        <LP>AI systems may not be 100% accurate at all times. We do not guarantee specific business outcomes, lead volumes, or revenue results from our automation systems.</LP>
      </Section>

      <Section heading="8. Modifications to Terms">
        <LP>We reserve the right to update these Terms at any time. We will notify active clients by email at least 14 days before material changes take effect. Continued use of our services after changes constitutes acceptance of the updated Terms.</LP>
      </Section>

      <Section heading="9. Governing Law">
        <LP>These Terms are governed by the laws of the State of Texas. Any disputes shall be resolved in the courts of Harris County, Texas, unless we agree in writing to an alternative dispute resolution method.</LP>
      </Section>

      <Section heading="10. Contact">
        <LP>Questions about these Terms? Contact us at <a href="mailto:toremaiautomation@gmail.com" style={{ color:P.blue }}>toremaiautomation@gmail.com</a> or call <a href="tel:+18326838151" style={{ color:P.blue }}>(832) 683-8151</a>.</LP>
      </Section>
    </LegalPage>
  );
}

// ── PRIVACY POLICY ───────────────────────────────────────────
function PrivacyPage({ dark }) {
  const Section = p => <LegalSection {...p} dark={dark} />;
  return (
    <LegalPage dark={dark} title="Privacy Policy" updated="June 1, 2026">
      <Section heading="1. Introduction">
        <LP>Torem AI ("we," "us," or "our") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard information when you visit our website or use our services.</LP>
        <LP>This policy applies to our website, AI automation services, and all communications between Torem AI and its clients or website visitors.</LP>
      </Section>

      <Section heading="2. Information We Collect">
        <LP><strong>Information you provide directly:</strong></LP>
        <LI items={["Name, email address, and phone number (contact forms, onboarding)","Business name and address","Payment information (processed securely through third-party processors)","Workflow and operational details shared during onboarding"]} />
        <LP><strong>Information collected automatically:</strong></LP>
        <LI items={["Browser type and version","Pages visited and time spent on site","Referring website","IP address and approximate location","Device type"]} />
        <LP><strong>Information from third-party integrations (when you authorize):</strong></LP>
        <LI items={["Calendar events (Google/Outlook)","CRM contacts and lead data","Phone call logs and recordings (for AI receptionist services)","SMS/email engagement data"]} />
      </Section>

      <Section heading="3. How We Use Your Information">
        <LP>We use the information we collect to:</LP>
        <LI items={["Deliver and maintain your automation services","Communicate with you about your account and support","Process payments and send invoices","Improve our services and develop new features","Comply with legal obligations","Send relevant service updates (you may opt out at any time)"]} />
        <LP>We do not use your data for advertising purposes and will never sell your personal information to third parties.</LP>
      </Section>

      <Section heading="4. Data Storage & Security">
        <LP>Your data is stored on secure, industry-standard infrastructure including Supabase (hosted on AWS) and other platforms listed in our Tech Stack. We implement appropriate technical safeguards including encryption in transit and at rest.</LP>
        <LP>We retain client data for as long as your service is active plus 12 months. Contact information from website inquiries is retained for 24 months. You may request deletion at any time (see Section 6).</LP>
      </Section>

      <Section heading="5. Sharing Your Information">
        <LP>We only share your information with third parties in the following circumstances:</LP>
        <LI items={["Service delivery: with platforms you authorize (e.g., Google Calendar, CRM tools, SMS providers like Twilio)","Legal compliance: if required by law, court order, or government authority","Business transfers: if Torem AI is acquired or merges with another company, with prior notice to clients"]} />
        <LP>All third-party platforms we use are bound by their own privacy policies and data protection agreements.</LP>
      </Section>

      <Section heading="6. Your Rights (including GDPR)">
        <LP>Depending on your location, you may have the following rights regarding your personal data:</LP>
        <LI items={["Access: request a copy of the data we hold about you","Correction: request correction of inaccurate data","Deletion: request deletion of your personal data","Portability: receive your data in a machine-readable format","Objection: object to certain types of processing"]} />
        <LP>To exercise any of these rights, email us at <a href="mailto:toremaiautomation@gmail.com" style={{ color:P.blue }}>toremaiautomation@gmail.com</a>. We will respond within 30 days.</LP>
      </Section>

      <Section heading="7. Children's Privacy">
        <LP>Our services are not directed to individuals under the age of 18. We do not knowingly collect personal information from minors. If you believe a minor has provided us with personal data, please contact us immediately.</LP>
      </Section>

      <Section heading="8. Changes to This Policy">
        <LP>We may update this Privacy Policy periodically. We will notify you of significant changes by email or by posting a notice on our website. Your continued use of our services after the effective date constitutes acceptance of the updated policy.</LP>
      </Section>

      <Section heading="9. Contact">
        <LP>For privacy inquiries, contact us at <a href="mailto:toremaiautomation@gmail.com" style={{ color:P.blue }}>toremaiautomation@gmail.com</a> or <a href="tel:+18326838151" style={{ color:P.blue }}>(832) 683-8151</a>. Torem AI, Houston, TX.</LP>
      </Section>
    </LegalPage>
  );
}

// ── COOKIE POLICY ────────────────────────────────────────────
function CookiePage({ dark }) {
  const Section = p => <LegalSection {...p} dark={dark} />;
  return (
    <LegalPage dark={dark} title="Cookie Policy" updated="June 1, 2026">
      <Section heading="1. What Are Cookies">
        <LP>Cookies are small text files stored on your device when you visit a website. They help websites remember your preferences, understand how you interact with content, and provide a better browsing experience.</LP>
        <LP>This Cookie Policy explains what cookies we use on the Torem AI website and how you can control them.</LP>
      </Section>

      <Section heading="2. Cookies We Use">
        <LP><strong>Essential cookies</strong> — required for the website to function. These cannot be disabled:</LP>
        <LI items={["Session management (keeping your form data intact as you navigate)","Security tokens to prevent cross-site request forgery"]} />
        <LP><strong>Analytics cookies</strong> — help us understand how visitors use our site (pages visited, time spent, bounce rate). We may use tools such as Google Analytics. These are anonymized and do not identify you personally.</LP>
        <LP><strong>Preference cookies</strong> — remember choices you've made (e.g., if you've dismissed a banner).</LP>
        <LP>We do not use advertising or tracking cookies. We do not sell data derived from cookie activity.</LP>
      </Section>

      <Section heading="3. Third-Party Cookies">
        <LP>Some pages may include embedded content (e.g., scheduling widgets, video embeds) from third-party providers. These providers may set their own cookies subject to their respective privacy policies. We have no control over these cookies.</LP>
        <LP>Common third parties that may set cookies: Google (Analytics, Fonts, Calendar), Calendly or similar scheduling tools.</LP>
      </Section>

      <Section heading="4. How to Control Cookies">
        <LP>You can control and delete cookies through your browser settings. Here's how for major browsers:</LP>
        <LI items={["Chrome: Settings → Privacy and security → Cookies and other site data","Firefox: Settings → Privacy & Security → Cookies and Site Data","Safari: Preferences → Privacy → Manage Website Data","Edge: Settings → Cookies and site permissions"]} />
        <LP>Disabling essential cookies may affect website functionality. Disabling analytics cookies will not affect your ability to use our services.</LP>
      </Section>

      <Section heading="5. Do Not Track">
        <LP>Our website respects Do Not Track (DNT) signals from browsers where technically feasible. When DNT is enabled, we disable non-essential analytics tracking for your session.</LP>
      </Section>

      <Section heading="6. Updates to This Policy">
        <LP>We may update this Cookie Policy as our practices change or as required by law. The "Last updated" date at the top of this page reflects the most recent revision.</LP>
      </Section>

      <Section heading="7. Contact">
        <LP>Questions about our cookie practices? Email us at <a href="mailto:toremaiautomation@gmail.com" style={{ color:P.blue }}>toremaiautomation@gmail.com</a>.</LP>
      </Section>
    </LegalPage>
  );
}

// ── DISCLAIMER ───────────────────────────────────────────────
function DisclaimerPage({ dark }) {
  const Section = p => <LegalSection {...p} dark={dark} />;
  return (
    <LegalPage dark={dark} title="Disclaimer" updated="June 1, 2026">
      <Section heading="1. General Disclaimer">
        <LP>The information provided by Torem AI on this website and through our services is for general informational and operational purposes only. All information is provided in good faith; however, we make no representation or warranty of any kind regarding the accuracy, completeness, or reliability of any information.</LP>
      </Section>

      <Section heading="2. AI Limitations">
        <LP>Our AI-powered systems — including AI receptionists, automated follow-up sequences, and lead capture tools — are designed to assist your business operations. However, AI systems have inherent limitations:</LP>
        <LI items={["AI may misunderstand or misclassify certain caller requests or messages","Responses may not always reflect the nuance of a human conversation","AI cannot replace the judgment of a qualified professional in complex situations","Performance may vary based on call volume, audio quality, and the specificity of your setup"]} />
        <LP>We continuously improve our systems but cannot guarantee error-free operation at all times. We recommend reviewing automated interactions periodically and setting up appropriate human escalation paths for sensitive situations.</LP>
      </Section>

      <Section heading="3. No Legal or Financial Advice">
        <LP>Nothing on this website or in our services constitutes legal, financial, tax, or professional business advice. We are an automation technology company, not a law firm, accounting firm, or business consultant.</LP>
        <LP>Any decisions about your business operations, contracts, pricing, or compliance should be made in consultation with qualified professionals in those fields. Torem AI is not responsible for any business decisions made based on our automation outputs.</LP>
      </Section>

      <Section heading="4. Results Disclaimer">
        <LP>Any references to outcomes such as "more leads," "increased bookings," or "saved hours" are illustrative examples based on typical use cases. Individual results will vary based on your industry, market, service area, business model, and how you implement and use our systems.</LP>
        <LP>Torem AI does not guarantee specific revenue increases, lead volumes, or business growth. Automation is a tool — results depend on how it is used within your broader business strategy.</LP>
      </Section>

      <Section heading="5. Service Availability">
        <LP>While we strive for high uptime and reliability, our services depend on third-party infrastructure providers (including cloud hosting, telephony platforms, and API services) that may experience outages outside our control.</LP>
        <LP>We will communicate planned maintenance in advance and work to resolve unplanned outages promptly. Torem AI is not liable for losses resulting from service interruptions caused by third-party platform failures.</LP>
      </Section>

      <Section heading="6. External Links">
        <LP>Our website may contain links to third-party websites. These links are provided for convenience only. Torem AI has no control over the content, privacy practices, or availability of external sites and is not responsible for any harm or loss resulting from your use of linked websites.</LP>
      </Section>

      <Section heading="7. Liability Cap">
        <LP>To the fullest extent permitted by applicable law, Torem AI's total liability to you for any claim arising out of or relating to our services shall not exceed the total fees paid by you to Torem AI in the three (3) months immediately preceding the event giving rise to the claim.</LP>
        <LP>In no event shall Torem AI be liable for indirect, incidental, punitive, special, or consequential damages of any kind, even if advised of the possibility of such damages.</LP>
      </Section>

      <Section heading="8. Contact">
        <LP>If you have questions about this Disclaimer, please contact us at <a href="mailto:toremaiautomation@gmail.com" style={{ color:P.blue }}>toremaiautomation@gmail.com</a> or <a href="tel:+18326838151" style={{ color:P.blue }}>(832) 683-8151</a>.</LP>
      </Section>
    </LegalPage>
  );
}

// ── CHAT WIDGET ──────────────────────────────────────────────

const DEFAULT_SUGGESTIONS = [
  "How does your AI agent work?",
  "What industries do you support?",
  "How much does it cost?",
];

function getSuggestions(input, lastBotText) {
  const lc = input.toLowerCase();
  if (input.length > 1) {
    if (lc.includes("price") || lc.includes("cost")) {
      return ["What's your most popular plan?", "Is there a setup fee?", "Do you offer a free trial?"];
    }
    if (lc.includes("how")) {
      return ["How long does setup take?", "How do I get started?", "How does billing work?"];
    }
    if (lc.includes("work")) {
      return ["What does the workflow look like?", "Can I see a demo?", "What integrations do you support?"];
    }
    if (lc.includes("industry") || lc.includes("support")) {
      return ["Do you work with HVAC companies?", "Do you support plumbing businesses?", "What about landscaping?"];
    }
    if (lc.includes("book") || lc.includes("call") || lc.includes("schedule")) {
      return ["How do I book a call?", "What happens on the call?", "Is the call really free?"];
    }
  }
  if (lastBotText) {
    const lb = lastBotText.toLowerCase();
    if (lb.includes("price") || lb.includes("cost") || lb.includes("$") || lb.includes("plan")) {
      return ["What's included in each plan?", "Can I upgrade later?", "How do I sign up?"];
    }
    if (lb.includes("ai") || lb.includes("agent") || lb.includes("receptionist")) {
      return ["How accurate is the AI?", "What happens when AI can't answer?", "Can I customize AI responses?"];
    }
    if (lb.includes("integrat") || lb.includes("crm") || lb.includes("calendar")) {
      return ["What CRMs do you support?", "Can it sync with Google Calendar?", "How long does integration take?"];
    }
    if (lb.includes("setup") || lb.includes("day") || lb.includes("build")) {
      return ["What do I need to provide?", "Will there be any downtime?", "Book a free strategy call"];
    }
    if (lb.includes("call") || lb.includes("phone") || lb.includes("miss")) {
      return ["How does 24/7 answering work?", "What if the AI makes a mistake?", "Can I monitor calls?"];
    }
  }
  return DEFAULT_SUGGESTIONS;
}

function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [chatDark, setChatDark] = useState(false);
  const [suggestions, setSuggestions] = useState(DEFAULT_SUGGESTIONS);
  const [sugsVisible, setSugsVisible] = useState(true);
  const [feedback, setFeedback] = useState({});
  const [copied, setCopied] = useState({});
  const [copiedLast, setCopiedLast] = useState(false);
  const [showSkeleton, setShowSkeleton] = useState(false);

  const sessionId = useRef(String(Date.now()));
  const chatEndRef = useRef(null);
  const inputRef = useRef(null);
  const sugTimeoutRef = useRef(null);
  const typingRef = useRef(null);

  useEffect(() => {
    const fn = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);

  useEffect(() => {
    if (chatEndRef.current) chatEndRef.current.scrollIntoView({ behavior: "smooth" });
  }, [messages, thinking]);

  useEffect(() => {
    if (open) {
      setShowSkeleton(true);
      setTimeout(() => setShowSkeleton(false), 500);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

<<<<<<< HEAD
  const typeMessage = (fullText, messageId) => {
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setMessages(prev => prev.map(m =>
        m.id === messageId ? { ...m, text: fullText.slice(0, i) } : m
      ));
      if (i >= fullText.length) {
        clearInterval(interval);
        setMessages(prev => prev.map(m =>
          m.id === messageId ? { ...m, typing: false } : m
        ));
      }
    }, 18);
=======
  useEffect(() => {
    clearTimeout(sugTimeoutRef.current);
    const lastBot = [...messages].reverse().find(m => m.sender === "bot" && !m.typing)?.text || "";
    const next = getSuggestions(input, lastBot);
    setSugsVisible(false);
    sugTimeoutRef.current = setTimeout(() => {
      setSuggestions(next);
      setSugsVisible(true);
    }, 120);
    return () => clearTimeout(sugTimeoutRef.current);
  }, [input, messages]);

  const sendToN8N = async (userMessage) => {
    try {
      const response = await fetch(
        "https://toremai.app.n8n.cloud/webhook/torem-chat",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            message: userMessage + " (Keep response under 2 sentences. No asterisks, no bullet points, no bold text. Talk naturally.)",
            sessionId: sessionId.current
          })
        }
      );

      const text = await response.text();
      console.log("n8n raw:", text);

      let aiMessage = "I'm here to help! Email us at toremaiautomation@gmail.com";
      try {
        const data = JSON.parse(text);
        if (data.ai_response) aiMessage = data.ai_response;
        else if (data.message) aiMessage = data.message;
      } catch(e) {
        console.error("Parse error:", e);
      }

      return aiMessage;
    } catch (err) {
      console.error("Chat fetch error:", err);
      return "Connection issue — please try again or email toremaiautomation@gmail.com";
    }
  };

  const startTyping = (fullText) => {
    clearInterval(typingRef.current);
    setMessages(prev => [...prev, { sender: "bot", text: "", fullText, typing: true }]);
    let i = 0;
    typingRef.current = setInterval(() => {
      i++;
      setMessages(prev => {
        const msgs = [...prev];
        const last = msgs[msgs.length - 1];
        if (!last || !last.typing) { clearInterval(typingRef.current); return prev; }
        if (i >= fullText.length) {
          clearInterval(typingRef.current);
          msgs[msgs.length - 1] = { sender: "bot", text: fullText, typing: false };
        } else {
          msgs[msgs.length - 1] = { ...last, text: fullText.slice(0, i) };
        }
        return msgs;
      });
    }, 20);
>>>>>>> d9aff0aca804d809e5c4c8eb9f41bf8a81d8bcfb
  };

  const sendMessage = async (text) => {
    const msg = text.trim();
    if (!msg || thinking) return;
<<<<<<< HEAD

    setMessages(prev => [...prev, { id: Date.now(), sender: "user", text: msg }]);
=======
    setMessages(prev => [...prev, { sender: "user", text: msg }]);
>>>>>>> d9aff0aca804d809e5c4c8eb9f41bf8a81d8bcfb
    setInput("");
    setThinking(true);
    const aiText = await sendToN8N(msg);
    setThinking(false);
    startTyping(aiText);
  };

<<<<<<< HEAD
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 15000);

      const response = await fetch("https://toremai.app.n8n.cloud/webhook/torem-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: msg, sessionId: sessionId.current }),
        signal: controller.signal,
      });
      clearTimeout(timeout);

      const data = await response.json();
      console.log("n8n response:", JSON.stringify(data));

      let aiText = null;
      if (typeof data === "string") {
        aiText = data;
      } else if (data.message) {
        aiText = data.message;
      } else if (data.aiMessage) {
        aiText = data.aiMessage;
      } else if (Array.isArray(data) && data[0]) {
        aiText = data[0].message || data[0].aiMessage || data[0].json?.aiMessage || JSON.stringify(data[0]);
      } else {
        aiText = JSON.stringify(data);
      }

      const botMsgId = Date.now();
      setMessages(prev => [...prev, { id: botMsgId, sender: "bot", text: "", typing: true }]);
      setThinking(false);
      typeMessage(aiText, botMsgId);
    } catch (error) {
      console.error("Chat error:", error);
      const botMsgId = Date.now();
      const errText = "Sorry, I'm having trouble right now. Please email us at toremaiautomation@gmail.com";
      setMessages(prev => [...prev, { id: botMsgId, sender: "bot", text: "", typing: true }]);
      setThinking(false);
      typeMessage(errText, botMsgId);
    }
=======
  const retryLast = async () => {
    if (thinking) return;
    const lastUser = [...messages].reverse().find(m => m.sender === "user");
    if (!lastUser) return;
    setMessages(prev => prev.slice(0, -1));
    setThinking(true);
    const aiText = await sendToN8N(lastUser.text);
    setThinking(false);
    startTyping(aiText);
>>>>>>> d9aff0aca804d809e5c4c8eb9f41bf8a81d8bcfb
  };

  const handleKey = e => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(input); }
  };

  const clearChat = () => {
    setMessages([]);
    setSuggestions(DEFAULT_SUGGESTIONS);
    setFeedback({});
    setCopied({});
    setInput("");
  };

  const copyMsg = (i, text) => {
    navigator.clipboard.writeText(text).catch(() => {});
    setCopied(prev => ({ ...prev, [i]: true }));
    setTimeout(() => setCopied(prev => ({ ...prev, [i]: false })), 2000);
  };

  const copyLast = () => {
    const lastBot = [...messages].reverse().find(m => m.sender === "bot" && !m.isError);
    if (!lastBot) return;
    navigator.clipboard.writeText(lastBot.text).catch(() => {});
    setCopiedLast(true);
    setTimeout(() => setCopiedLast(false), 2000);
  };

  const C = chatDark ? {
    bg: "#1a1a2e", headerBg: "#0B1F3A", msgBg: "#16213e",
    inputBg: "#16213e", inputBorder: "#2d3a4a",
    text: "#e2e8f0", textMuted: "#94a3b8", border: "#2d3a4a",
    sugBg: "#16213e", sugBorder: "#2d3a4a", sugText: "#60a5fa",
    actionText: "#475569",
  } : {
    bg: "#FFFFFF", headerBg: "#0B1F3A", msgBg: "#F1F5F9",
    inputBg: "#FFFFFF", inputBorder: "#D3E0F0",
    text: "#0B1F3A", textMuted: "#5C6E84", border: "#E2E8F0",
    sugBg: "#FFFFFF", sugBorder: "#D3E0F0", sugText: "#007AE3",
    actionText: "#94a3b8",
  };

  const msgCount = messages.length;
  const hRad = isMobile ? 0 : "16px 16px 0 0";
  const fRad = isMobile ? 0 : "0 0 16px 16px";

  const winStyle = {
    position: "fixed", zIndex: 9998,
    background: C.bg, display: "flex", flexDirection: "column",
    boxShadow: "0 20px 60px rgba(0,0,0,0.2)",
    transition: "background 0.2s ease",
    ...(isMobile ? {
      bottom: "80px", right: "16px", left: "16px",
      width: "calc(100vw - 32px)", height: "75vh",
      borderRadius: "16px",
      boxShadow: "0 8px 32px rgba(0,0,0,0.25)",
      overflow: "hidden",
    } : {
      bottom: "90px", right: "24px",
      width: "400px", maxHeight: "590px",
      borderRadius: "16px",
    }),
  };

  return (
    <>
      {open && (
        <div style={winStyle}>
          {/* ── Header ── */}
          <div style={{
<<<<<<< HEAD
            background: "#0B1F3A",
            padding: "12px 16px",
            display: "flex", alignItems: "center", gap: "12px",
            borderRadius: headerRadius, flexShrink: 0,
=======
            background: C.headerBg, padding: "12px 14px",
            display: "flex", alignItems: "center", gap: "10px",
            borderRadius: hRad, flexShrink: 0,
>>>>>>> d9aff0aca804d809e5c4c8eb9f41bf8a81d8bcfb
          }}>
            <img src="https://i.imgur.com/HXc7WQO.png" alt="Torem AI" style={{
              width: "34px", height: "34px", borderRadius: "50%", objectFit: "cover", flexShrink: 0,
            }} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                <span style={{ fontFamily: DISPLAY, fontSize: "13px", fontWeight: 700, color: "#FFFFFF" }}>Torem AI</span>
                <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#34d399", flexShrink: 0 }} />
                <span style={{ fontSize: "10px", color: "rgba(255,255,255,0.5)" }}>Online</span>
              </div>
              <div style={{ fontSize: "10px", color: "rgba(255,255,255,0.4)", marginTop: "1px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                {msgCount > 0 ? `${msgCount} message${msgCount !== 1 ? "s" : ""} in this chat` : "Ask me anything about Torem AI"}
              </div>
            </div>
<<<<<<< HEAD
            <button
              onClick={() => setOpen(false)}
              aria-label="Close chat"
              style={{
                background: "rgba(255,255,255,0.1)", border: "none", color: "#FFFFFF",
                width: "32px", height: "32px", borderRadius: "50%",
                display: "flex", alignItems: "center", justifyContent: "center",
                cursor: "pointer", fontSize: "14px", flexShrink: 0,
              }}
            >✕</button>
=======
            <button onClick={() => setChatDark(d => !d)} title="Toggle dark mode" style={{
              background: "rgba(255,255,255,0.1)", border: "none", color: "#FFFFFF",
              width: "26px", height: "26px", borderRadius: "50%",
              display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer", fontSize: "12px", flexShrink: 0,
            }}>{chatDark ? "☀️" : "🌙"}</button>
            <button onClick={() => setOpen(false)} aria-label="Close chat" style={{
              background: "rgba(255,255,255,0.1)", border: "none", color: "#FFFFFF",
              width: "26px", height: "26px", borderRadius: "50%",
              display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer", fontSize: "12px", flexShrink: 0,
            }}>✕</button>
>>>>>>> d9aff0aca804d809e5c4c8eb9f41bf8a81d8bcfb
          </div>

          {/* ── Messages ── */}
          <div style={{
            flex: 1, overflowY: "auto", padding: "12px",
            display: "flex", flexDirection: "column", gap: "8px",
            background: C.bg,
          }}>
            {showSkeleton && messages.length === 0 && (
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                {[75, 50, 65].map((w, i) => (
                  <div key={i} style={{
                    height: i === 0 ? "44px" : "32px", background: C.msgBg,
                    borderRadius: "12px", width: `${w}%`, opacity: 0.5,
                    animation: "glowPulse 1.2s ease-in-out infinite",
                  }} />
                ))}
              </div>
            )}

            {!showSkeleton && messages.length === 0 && !thinking && (
              <div style={{
                background: C.msgBg, borderRadius: "20px 20px 20px 4px",
                padding: "12px 14px", fontSize: "13px", color: C.text,
                lineHeight: 1.6, maxWidth: "85%",
              }}>
                Hi there! 👋 I'm the Torem AI assistant. Ask me anything about our automation services!
              </div>
            )}

            {messages.map((m, i) => (
<<<<<<< HEAD
              <div key={m.id || i} style={{ display: "flex", justifyContent: m.sender === "user" ? "flex-end" : "flex-start" }}>
                <div style={{
                  maxWidth: "80%", padding: "10px 14px",
                  borderRadius: m.sender === "user" ? "12px 12px 2px 12px" : "12px 12px 12px 2px",
                  background: m.sender === "user" ? "#007AE3" : "#F1F5F9",
                  color: m.sender === "user" ? "#FFFFFF" : "#0B1F3A",
                  fontSize: "13px", lineHeight: 1.6,
                }}>
                  {m.text}{m.typing && <span className="typing-cursor">▋</span>}
=======
              <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: m.sender === "user" ? "flex-end" : "flex-start", gap: "4px" }}>
                <div style={{ position: "relative", maxWidth: "83%" }}>
                  <div style={{
                    padding: "10px 13px",
                    borderRadius: m.sender === "user" ? "20px 20px 4px 20px" : "20px 20px 20px 4px",
                    background: m.sender === "user" ? "#007AE3" : (m.isError ? "#FEF2F2" : C.msgBg),
                    color: m.sender === "user" ? "#FFFFFF" : (m.isError ? "#991B1B" : C.text),
                    fontSize: "13px", lineHeight: 1.6,
                    border: m.isError ? "1px solid #FECACA" : "none",
                  }}>
                    {m.text}
                    {m.typing && (
                      <span style={{
                        display: "inline-block", width: "2px", height: "14px",
                        background: C.textMuted, marginLeft: "2px",
                        verticalAlign: "text-bottom",
                        animation: "blink 0.8s step-end infinite",
                      }} />
                    )}
                    {m.isError && (
                      <button onClick={retryLast} style={{
                        display: "block", marginTop: "7px",
                        background: "#DC2626", color: "#FFFFFF", border: "none",
                        borderRadius: "6px", padding: "3px 10px",
                        fontSize: "11px", cursor: "pointer", fontFamily: BODY,
                      }}>Retry</button>
                    )}
                  </div>
                  {m.sender === "bot" && !m.isError && !m.typing && (
                    <button onClick={() => copyMsg(i, m.text)} title="Copy" style={{
                      position: "absolute", top: "4px", right: "-22px",
                      background: "none", border: "none", cursor: "pointer",
                      color: copied[i] ? "#34d399" : C.textMuted,
                      fontSize: "11px", padding: "2px", opacity: 0.8,
                      transition: "color 0.15s",
                    }}>{copied[i] ? "✓" : "⧉"}</button>
                  )}
>>>>>>> d9aff0aca804d809e5c4c8eb9f41bf8a81d8bcfb
                </div>

                {m.sender === "bot" && !m.isError && !m.typing && (
                  <div style={{ display: "flex", alignItems: "center", gap: "5px", flexWrap: "wrap", paddingLeft: "2px" }}>
                    {feedback[i] ? (
                      <span style={{ fontSize: "10px", color: C.textMuted }}>
                        {feedback[i] === "up" ? "Thanks for the feedback!" : "We'll improve this!"}
                      </span>
                    ) : (
                      <>
                        <button onClick={() => setFeedback(p => ({ ...p, [i]: "up" }))} style={{
                          background: "none", border: "none", cursor: "pointer", fontSize: "13px", padding: "1px", opacity: 0.65,
                        }}>👍</button>
                        <button onClick={() => setFeedback(p => ({ ...p, [i]: "down" }))} style={{
                          background: "none", border: "none", cursor: "pointer", fontSize: "13px", padding: "1px", opacity: 0.65,
                        }}>👎</button>
                      </>
                    )}
                    {i === messages.length - 1 && !thinking && (
                      <>
                        <span style={{ fontSize: "10px", color: C.border }}>|</span>
                        <button onClick={() => sendMessage("Can you simplify that?")} style={{
                          background: "none", border: `1px solid ${C.border}`, borderRadius: "10px",
                          padding: "1px 7px", fontSize: "10px", color: C.textMuted,
                          cursor: "pointer", fontFamily: BODY, transition: "all 0.15s",
                        }}>Simplify</button>
                        <button onClick={() => sendMessage("Can you give more detail on that?")} style={{
                          background: "none", border: `1px solid ${C.border}`, borderRadius: "10px",
                          padding: "1px 7px", fontSize: "10px", color: C.textMuted,
                          cursor: "pointer", fontFamily: BODY, transition: "all 0.15s",
                        }}>More detail</button>
                      </>
                    )}
                  </div>
                )}
              </div>
            ))}

            {thinking && (
              <div style={{ display: "flex", justifyContent: "flex-start" }}>
                <div style={{
                  background: C.msgBg, borderRadius: "20px 20px 20px 4px",
                  padding: "12px 16px", display: "flex", gap: "5px", alignItems: "center",
                }}>
                  {[0, 1, 2].map(d => (
                    <span key={d} style={{
                      width: "7px", height: "7px", borderRadius: "50%", background: C.textMuted,
                      display: "block",
                      animation: `chatDotBounce 1.1s ease-in-out ${d * 0.16}s infinite`,
                    }} />
                  ))}
                </div>
              </div>
            )}

            <div ref={chatEndRef} />
          </div>

          {/* ── Suggestions ── */}
          <div style={{ padding: "6px 12px 4px", background: C.bg, borderTop: `1px solid ${C.border}` }}>
            <div style={{
              display: "flex", gap: "5px", flexWrap: "wrap",
              opacity: sugsVisible ? 1 : 0,
              transform: sugsVisible ? "translateY(0)" : "translateY(4px)",
              transition: "opacity 0.15s ease, transform 0.15s ease",
            }}>
              {suggestions.map((s, i) => (
                <button key={i} onClick={() => { setInput(s); inputRef.current?.focus(); }} style={{
                  background: C.sugBg, border: `1px solid ${C.sugBorder}`, borderRadius: "20px",
                  padding: "4px 11px", fontSize: "11px", color: C.sugText,
                  cursor: "pointer", fontFamily: BODY, whiteSpace: "nowrap",
                  maxWidth: "calc(100% - 4px)", overflow: "hidden", textOverflow: "ellipsis",
                  transition: "all 0.15s ease",
                }}>{s}</button>
              ))}
            </div>
          </div>

          {/* ── Input ── */}
          <div style={{
<<<<<<< HEAD
            padding: "12px", borderTop: "1px solid #E2E8F0",
            display: "flex", gap: "8px", flexShrink: 0,
            background: "#FFFFFF", borderRadius: footerRadius,
=======
            padding: "8px 12px", borderTop: `1px solid ${C.border}`,
            display: "flex", gap: "8px", flexShrink: 0, background: C.bg,
>>>>>>> d9aff0aca804d809e5c4c8eb9f41bf8a81d8bcfb
          }}>
            <input
              ref={inputRef}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKey}
              disabled={thinking}
              placeholder="Write your message..."
              style={{
                flex: 1, padding: "10px 14px",
<<<<<<< HEAD
                border: "1px solid #D3E0F0", borderRadius: "20px",
                fontSize: "16px", fontFamily: BODY, outline: "none",
                background: thinking ? "#F8FAFC" : "#FFFFFF", color: "#0B1F3A",
=======
                border: `1px solid ${C.inputBorder}`, borderRadius: "20px",
                fontSize: "16px", fontFamily: BODY, outline: "none",
                background: thinking ? C.msgBg : C.inputBg, color: C.text,
                transition: "border-color 0.2s, background 0.2s",
>>>>>>> d9aff0aca804d809e5c4c8eb9f41bf8a81d8bcfb
              }}
            />
            <button
              onClick={() => sendMessage(input)}
              disabled={thinking || !input.trim()}
              style={{
                background: thinking || !input.trim() ? "#94a3b8" : "#007AE3",
                border: "none", color: "#FFFFFF",
                width: "40px", height: "40px", borderRadius: "50%",
                display: "flex", alignItems: "center", justifyContent: "center",
                cursor: thinking || !input.trim() ? "not-allowed" : "pointer",
                flexShrink: 0, fontSize: "16px", transition: "background 0.2s ease",
              }}
            >↑</button>
          </div>

          {/* ── Quick actions ── */}
          <div style={{
            padding: "3px 12px 10px", display: "flex", gap: "14px",
            background: C.bg, borderRadius: fRad,
          }}>
            <button onClick={clearChat} style={{
              background: "none", border: "none", cursor: "pointer",
              fontSize: "11px", color: C.actionText, fontFamily: BODY, padding: "2px 0",
              transition: "color 0.15s",
            }}>Clear Chat</button>
            <button onClick={copyLast} style={{
              background: "none", border: "none", cursor: "pointer",
              fontSize: "11px", color: copiedLast ? "#34d399" : C.actionText,
              fontFamily: BODY, padding: "2px 0", transition: "color 0.15s",
            }}>{copiedLast ? "Copied!" : "Copy Last Response"}</button>
          </div>
        </div>
      )}

      {/* ── Floating bubble ── */}
      <button
        onClick={() => setOpen(o => !o)}
        aria-label={open ? "Close chat" : "Open Torem AI chat"}
        style={{
          position: "fixed", bottom: "24px", right: "24px", zIndex: 9999,
          width: "60px", height: "60px", borderRadius: "50%",
          background: "transparent", border: "none", cursor: "pointer",
          padding: 0, overflow: "hidden",
          boxShadow: "0 4px 24px rgba(0,0,0,0.22)",
          transition: "transform 0.2s ease, box-shadow 0.2s ease",
        }}
      >
        {open ? (
          <div style={{
            width: "60px", height: "60px", borderRadius: "50%",
            background: "#007AE3", display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <span style={{ color: "#FFFFFF", fontSize: "20px", fontWeight: 700 }}>✕</span>
          </div>
        ) : (
          <img
            src="https://i.imgur.com/HXc7WQO.png"
            alt="Torem AI"
            style={{ width: "60px", height: "60px", borderRadius: "50%", objectFit: "cover", display: "block" }}
          />
        )}
      </button>
    </>
  );
}

// ── APP ──────────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState("Home");
  const [dark, setDark] = useState(() => {
    try { return localStorage.getItem("torem-theme") === "dark"; } catch { return false; }
  });
  const [scrollTarget, setScrollTarget] = useState(null);
  const T = theme(dark);

  useEffect(() => {
    const el = document.createElement("style");
    el.textContent = buildCSS(T);
    document.head.appendChild(el);
    return () => document.head.removeChild(el);
  }, [dark]);

  useEffect(() => {
    try { localStorage.setItem("torem-theme", dark ? "dark" : "light"); } catch {}
  }, [dark]);

  useEffect(() => { window.scrollTo(0, 0); }, [page]);

  const go = p => setPage(p);

  return (
    <div style={{ fontFamily: BODY, background: T.bg, paddingTop: "66px", minHeight: "100vh" }}>
      <Navbar page={page} setPage={go} dark={dark} setDark={setDark} />
      {page === "Home"     && <HomePage     setPage={go} dark={dark} />}
      {page === "Services" && <ServicesPage setPage={go} dark={dark} scrollTarget={scrollTarget} setScrollTarget={setScrollTarget} />}
      {page === "About"    && <AboutPage    setPage={go} dark={dark} />}
      {page === "Contact"  && <ContactPage  dark={dark} />}
      {page === "Terms"    && <TermsPage    dark={dark} />}
      {page === "Privacy"  && <PrivacyPage  dark={dark} />}
      {page === "Cookies"  && <CookiePage   dark={dark} />}
      {page === "Disclaimer" && <DisclaimerPage dark={dark} />}
      <Footer setPage={go} page={page} setScrollTarget={setScrollTarget} />
      <ChatWidget />
    </div>
  );
}
