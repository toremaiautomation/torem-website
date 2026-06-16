import { useState, useEffect } from "react";

// ── PALETTE ─────────────────────────────────────────────────
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

const DISPLAY = "'Bricolage Grotesque', 'Georgia', serif";
const BODY    = "'DM Sans', system-ui, -apple-system, sans-serif";

// ── INJECTED STYLES ─────────────────────────────────────────
const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,600;12..96,700;12..96,800&family=DM+Sans:wght@400;500;600;700&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
  body { font-family: ${BODY}; background: ${P.white}; color: ${P.navy}; }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(20px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes glowPulse {
    0%,100% { opacity: 0.4; }
    50%     { opacity: 0.8; }
  }

  .t-card {
    transition: transform 0.22s ease, box-shadow 0.22s ease;
  }
  .t-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 20px 48px rgba(23,84,207,0.13) !important;
  }
  .t-link { transition: color 0.15s; cursor: pointer; }
  .t-link:hover { color: ${P.blue} !important; }

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
  .t-nav-link:hover { color: ${P.blue} !important; background: ${P.paleBg} !important; }

  input:focus, textarea:focus, select:focus {
    outline: none;
    border-color: ${P.blue} !important;
    box-shadow: 0 0 0 3px rgba(23,84,207,0.12);
  }

  @media (max-width: 760px) {
    .t-hide-mobile { display: none !important; }
    .t-hero-grid { grid-template-columns: 1fr !important; }
    .t-two-col   { grid-template-columns: 1fr !important; }
    .t-three-col { grid-template-columns: 1fr !important; }
    .t-pad       { padding: 48px 24px !important; }
    .t-hero-head { font-size: 36px !important; }
  }
`;

// ── SHARED ───────────────────────────────────────────────────
const FIELD = {
  width: "100%", padding: "11px 14px",
  border: `1px solid ${P.border}`, borderRadius: "8px",
  fontSize: "14px", fontFamily: BODY, background: P.white, color: P.navy,
};

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

function SectionHead({ eyebrow, heading, sub, light = false, center = true }) {
  return (
    <div style={{ textAlign: center ? "center" : "left", marginBottom: "52px" }}>
      <Tag color={light ? "#93c5fd" : P.blue}>{eyebrow}</Tag>
      <h2 style={{
        fontFamily: DISPLAY, fontSize: "clamp(26px, 3.5vw, 40px)",
        fontWeight: 800, color: light ? P.white : P.navy,
        lineHeight: 1.15, marginBottom: sub ? "16px" : 0,
      }}>{heading}</h2>
      {sub && (
        <p style={{
          fontSize: "15px", color: light ? "rgba(255,255,255,0.55)" : P.gray,
          maxWidth: "520px", margin: center ? "0 auto" : 0, lineHeight: 1.7,
        }}>{sub}</p>
      )}
    </div>
  );
}

// ── NAVBAR ───────────────────────────────────────────────────
function Navbar({ page, setPage }) {
  const [solid, setSolid] = useState(false);

  useEffect(() => {
    const fn = () => setSolid(window.scrollY > 24);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 200,
      height: "66px",
      background: solid ? "rgba(255,255,255,0.96)" : P.white,
      backdropFilter: "blur(16px)",
      borderBottom: `1px solid ${solid ? P.border : "transparent"}`,
      padding: "0 clamp(20px, 5vw, 80px)",
      display: "flex", alignItems: "center", justifyContent: "space-between",
      transition: "border-color 0.3s, background 0.3s",
    }}>
      {/* Logo */}
      <div onClick={() => setPage("Home")} style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer" }}>
        <img src="https://i.imgur.com/HXc7WQO.png" alt="Torem AI" style={{ width: "36px", height: "36px", borderRadius: "50%", objectFit: "cover" }} />
        <span style={{ fontFamily: DISPLAY, fontSize: "17px", fontWeight: 800, color: P.navy, letterSpacing: "-0.3px" }}>
          Torem
        </span>
      </div>

      {/* Links */}
      <div className="t-hide-mobile" style={{ display: "flex", alignItems: "center", gap: "4px" }}>
        {["Home", "Services", "About", "Contact"].map(l => (
          <button key={l} className="t-nav-link" onClick={() => setPage(l)} style={{
            background: page === l ? P.paleBg : "none",
            border: "none", padding: "7px 15px",
            fontSize: "13px", fontWeight: page === l ? 600 : 500,
            color: page === l ? P.blue : "#374151",
            fontFamily: BODY,
          }}>
            {l}
          </button>
        ))}
        <button className="t-btn-primary" onClick={() => setPage("Contact")} style={{
          marginLeft: "10px", background: P.blue, color: P.white,
          border: "none", padding: "9px 20px", borderRadius: "8px",
          fontSize: "13px", fontWeight: 600, fontFamily: BODY,
        }}>
          Get Started
        </button>
      </div>
    </nav>
  );
}

// ── FOOTER ───────────────────────────────────────────────────
function Footer({ setPage }) {
  return (
    <footer style={{ background: P.navy, padding: "64px clamp(24px,6vw,80px) 36px" }}>
      <div style={{
        maxWidth: "1140px", margin: "0 auto",
        display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr",
        gap: "48px", marginBottom: "48px",
      }} className="t-hero-grid">
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
            <img src="https://i.imgur.com/HXc7WQO.png" alt="Torem AI" style={{ width: "34px", height: "34px", borderRadius: "50%", objectFit: "cover" }} />
            <span style={{ fontFamily: DISPLAY, fontSize: "16px", fontWeight: 800, color: P.white }}>Torem</span>
          </div>
          <p style={{ fontSize: "13px", color: "#64748b", lineHeight: "1.75", maxWidth: "220px" }}>
            Custom automation systems that eliminate repetitive work for construction and field service businesses.
          </p>
        </div>
        {[
          { h: "Company", links: [["Home","Home"],["Services","Services"],["About","About"],["Contact","Contact"]] },
          { h: "Services", links: [["AI Receptionist",null],["Appointment Booking",null],["Lead Follow-Up",null],["Review Generation",null]] },
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

// ── HOME PAGE ────────────────────────────────────────────────
function HomePage({ setPage }) {
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
      <section style={{ background: P.paleBg, padding: "80px clamp(24px,6vw,80px)" }}>
        <div style={{ maxWidth: "1140px", margin: "0 auto", textAlign: "center" }}>
          <SectionHead
            eyebrow="The Problem"
            heading="Sound familiar?"
            sub="These are the gaps that cost contractors jobs, revenue, and time every single week."
          />
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(190px, 1fr))", gap:"12px" }} className="t-three-col">
            {[
              "Leads fall through the cracks (missed calls, website inquiries)",
              "No one answers phones after hours or on weekends",
              "Following up with prospects takes hours every week",
              "Customers ghost after you send a quote",
              "You're paying someone just to answer phones and schedule",
              "No way to track where leads come from",
            ].map(pain => (
              <div key={pain} style={{
                background: P.white, borderRadius: "10px",
                padding: "16px 18px", border: `1px solid ${P.border}`,
                display: "flex", alignItems: "flex-start", gap: "10px", textAlign: "left",
              }}>
                <span style={{ color: "#F87171", fontSize: "13px", flexShrink: 0, marginTop: "1px" }}>✕</span>
                <span style={{ fontSize: "13px", color: "#374151", fontWeight: 500, lineHeight: 1.5 }}>{pain}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES PREVIEW ── */}
      <section style={{ background: P.white, padding: "96px clamp(24px,6vw,80px)" }}>
        <div style={{ maxWidth: "1140px", margin: "0 auto" }}>
          <SectionHead eyebrow="What We Build" heading="Automation that actually works" sub="Every system is designed around your specific workflow, not adapted from a generic template." />
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(300px, 1fr))", gap:"22px" }} className="t-three-col">
            {[
              { icon:"📞", title:"AI Receptionist + Lead Capture", desc:"Never miss another call or web inquiry. Our AI answers phones 24/7, captures lead info, and notifies you instantly so no opportunity slips through." },
              { icon:"📅", title:"Automated Appointment Booking", desc:"Let prospects book directly into your calendar. No back-and-forth calls, no manual scheduling — just confirmed appointments waiting for you." },
              { icon:"🔄", title:"Lead Follow-Up Sequences", desc:"Automated texts and emails that follow up with prospects after every quote — so you stop chasing and start closing more jobs." },
            ].map(({ icon, title, desc }) => (
              <div key={title} className="t-card" style={{
                background: P.offWhite, borderRadius: "14px",
                padding: "32px", border: `1px solid ${P.border}`,
                borderTop: `3px solid ${P.blue}`,
              }}>
                <div style={{ fontSize: "28px", marginBottom: "16px" }}>{icon}</div>
                <h3 style={{ fontFamily: DISPLAY, fontSize: "18px", fontWeight: 700, color: P.navy, marginBottom: "10px" }}>{title}</h3>
                <p style={{ fontSize: "13px", color: P.gray, lineHeight: 1.75 }}>{desc}</p>
              </div>
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: "36px" }}>
            <button className="t-btn-ghost" onClick={() => setPage("Services")} style={{
              background: "none", border: `2px solid ${P.blue}`, color: P.blue,
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
function ServicesPage({ setPage }) {
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
      <section style={{ background: P.white, padding: "88px clamp(24px,6vw,80px) 48px" }}>
        <div style={{ maxWidth: "1140px", margin: "0 auto" }}>
          <div style={{ textAlign:"center", marginBottom:"36px" }}>
            <span style={{ display:"inline-block", fontSize:"11px", fontWeight:700, letterSpacing:"2px", textTransform:"uppercase", color:P.blue, background:"#EBF2FF", padding:"5px 14px", borderRadius:"100px" }}>The Foundation</span>
          </div>
          <div style={{ maxWidth:"700px", margin:"0 auto" }}>
            <div className="t-card" style={{
              background: P.offWhite, borderRadius:"16px", padding:"40px",
              border:`2px solid ${P.blue}`,
              boxShadow:`0 8px 40px rgba(0,122,227,0.12)`,
            }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:"20px" }}>
                <div style={{ display:"flex", alignItems:"center", gap:"14px" }}>
                  <span style={{ fontSize:"32px" }}>📞</span>
                  <div>
                    <h3 style={{ fontFamily:DISPLAY, fontSize:"20px", fontWeight:800, color:P.navy }}>AI Receptionist + Lead Capture</h3>
                    <p style={{ fontSize:"12px", color:P.gray, marginTop:"3px" }}>Start here. Everything builds on this.</p>
                  </div>
                </div>
                <div style={{ textAlign:"right", flexShrink:0, marginLeft:"16px" }}>
                  <div style={{ fontSize:"13px", fontWeight:700, color:P.blue }}>$400 setup</div>
                  <div style={{ fontSize:"13px", fontWeight:700, color:P.blue }}>+ $200/mo</div>
                </div>
              </div>
              <p style={{ fontSize:"14px", color:P.gray, lineHeight:1.8, marginBottom:"24px" }}>
                This is the base of everything. Your AI answers phones 24/7, qualifies every caller, captures lead info, and notifies you instantly — so no opportunity slips through, even at 10pm on a Sunday.
              </p>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"8px" }}>
                {["24/7 phone answering","Lead qualification scripts","Instant owner notifications","CRM contact creation"].map(f => (
                  <div key={f} style={{ display:"flex", alignItems:"center", gap:"8px" }}>
                    <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><circle cx="6.5" cy="6.5" r="6.5" fill={P.blue} fillOpacity="0.12"/><path d="M4 6.5l1.8 1.8L9 5" stroke={P.blue} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    <span style={{ fontSize:"13px", color:"#374151" }}>{f}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Add-ons */}
      <section style={{ background: P.paleBg, padding: "48px clamp(24px,6vw,80px) 88px" }}>
        <div style={{ maxWidth: "1140px", margin: "0 auto" }}>
          <div style={{ textAlign:"center", marginBottom:"12px" }}>
            <span style={{ display:"inline-block", fontSize:"11px", fontWeight:700, letterSpacing:"2px", textTransform:"uppercase", color:P.gray, background:P.white, padding:"5px 14px", borderRadius:"100px", border:`1px solid ${P.border}` }}>Add What You Need</span>
          </div>
          <p style={{ textAlign:"center", fontSize:"14px", color:P.gray, maxWidth:"560px", margin:"0 auto 36px", lineHeight:1.7 }}>
            Pick and choose the automations that fit your business. Most clients start with the AI Agent, then add 1–2 add-ons as they see results.
          </p>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(300px, 1fr))", gap:"20px" }}>
            {[
              { icon:"📅", title:"Automated Appointment Booking", price:"+$100/mo", desc:"Let prospects self-book estimates directly into your calendar. Automated reminders cut no-shows.", features:["Online booking widget","Calendar sync (Google/Outlook)","Automated reminders","Confirmation texts"] },
              { icon:"🔄", title:"Lead Follow-Up Sequences",      price:"+$50/mo", desc:"Texts and emails that fire automatically after every quote until the prospect books or opts out.", features:["SMS + email drip sequences","Quote follow-up automation","Customizable timing & copy","Stops when they reply or book"] },
              { icon:"🗂️", title:"CRM Pipeline & Job Tracking",  price:"+$150/mo", desc:"A simple visual pipeline from first contact to invoice paid. Always know what needs attention.", features:["Lead-to-job pipeline view","Stage-based status tracking","Automated status updates","Revenue & close-rate reporting"] },
              { icon:"⭐", title:"Review Generation Automation",  price:"+$100/mo", desc:"Auto-send review requests after every completed job. More 5-star Google reviews, more inbound calls.", features:["Post-job review request texts","Google & Facebook targeting","Timing after job close","Negative feedback redirect"] },
              { icon:"📲", title:"Missed Call Text-Back Recovery",price:"+$50/mo", desc:"Instant automated text fires back within seconds of a missed call — before they dial your competitor.", features:["Instant SMS on missed call","Customizable response message","Lead capture follow-through","Works 24/7 automatically"] },
            ].map(({ icon, title, price, desc, features }) => (
              <div key={title} className="t-card" style={{
                background: P.white, borderRadius:"14px",
                padding:"28px", border:`1px solid ${P.border}`,
              }}>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:"16px" }}>
                  <span style={{ fontSize:"26px" }}>{icon}</span>
                  <span style={{ fontSize:"12px", fontWeight:700, color:P.blue, background:"#EBF2FF", padding:"4px 12px", borderRadius:"100px" }}>{price}</span>
                </div>
                <h3 style={{ fontFamily:DISPLAY, fontSize:"16px", fontWeight:700, color:P.navy, marginBottom:"10px" }}>{title}</h3>
                <p style={{ fontSize:"13px", color:P.gray, lineHeight:1.75, marginBottom:"18px" }}>{desc}</p>
                <div style={{ display:"flex", flexDirection:"column", gap:"7px" }}>
                  {features.map(f => (
                    <div key={f} style={{ display:"flex", alignItems:"center", gap:"8px" }}>
                      <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><circle cx="6.5" cy="6.5" r="6.5" fill={P.blue} fillOpacity="0.12"/><path d="M4 6.5l1.8 1.8L9 5" stroke={P.blue} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      <span style={{ fontSize:"12px", color:"#374151" }}>{f}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section style={{ background: P.paleBg, padding: "80px clamp(24px,6vw,80px)", textAlign: "center" }}>
        <div style={{ maxWidth: "1140px", margin: "0 auto" }}>
          <SectionHead eyebrow="Tech Stack" heading="Battle-tested tools" sub="Production-grade infrastructure, not side-project experiments." />
          <div style={{ display:"flex", flexWrap:"wrap", gap:"10px", justifyContent:"center" }}>
            {["n8n","Zapier","Supabase","React","Vercel","Claude API","Procore API","QuickBooks","DocuSign","Google Workspace","Twilio","Stripe"].map(t => (
              <span key={t} style={{ padding:"9px 18px", background:P.white, border:`1px solid ${P.border}`, borderRadius:"100px", fontSize:"12px", fontWeight:600, color:P.navy }}>{t}</span>
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
function AboutPage({ setPage }) {
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
      <section style={{ background: P.white, padding: "88px clamp(24px,6vw,80px)" }}>
        <div style={{ maxWidth: "780px", margin: "0 auto", textAlign: "center" }}>
          <SectionHead eyebrow="Our Mission" heading="Making automation accessible" />
          <p style={{ fontSize: "15px", color: P.gray, lineHeight: 1.85, marginBottom: "20px" }}>
            Most automation tools are too expensive, too generic, or too complicated for small and mid-sized businesses. The result? Companies keep doing things manually — not because they want to, but because nobody's built them the right solution.
          </p>
          <p style={{ fontSize: "15px", color: P.gray, lineHeight: 1.85 }}>
            Torem fills that gap. We build practical, hands-off automations that work for real businesses — not just enterprise companies with a full IT department.
          </p>
        </div>
      </section>

      {/* Founder */}
      <section style={{ background: P.paleBg, padding: "80px clamp(24px,6vw,80px)" }}>
        <div style={{ maxWidth: "1140px", margin: "0 auto" }}>
          <SectionHead eyebrow="The Team" heading="Who we are" />
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
              <div key={name} style={{ background: P.white, borderRadius: "16px", padding: "40px", border: `1px solid ${P.border}`, textAlign: "center" }}>
                <div style={{ width:"72px", height:"72px", borderRadius:"50%", background:`linear-gradient(135deg, ${P.blue}, ${P.navy})`, margin:"0 auto 20px", display:"flex", alignItems:"center", justifyContent:"center" }}>
                  <span style={{ fontFamily: DISPLAY, color: P.white, fontSize:"26px", fontWeight:800 }}>{initial}</span>
                </div>
                <h3 style={{ fontFamily: DISPLAY, fontSize:"20px", fontWeight:800, color:P.navy }}>{name}</h3>
                <p style={{ fontSize:"12px", color:P.blue, fontWeight:600, marginBottom:"16px", marginTop:"4px", letterSpacing:"0.5px", textTransform:"uppercase" }}>{role}</p>
                <p style={{ fontSize:"13px", color:P.gray, lineHeight:1.8 }}>{bio}</p>
                <div style={{ display:"flex", gap:"8px", marginTop:"20px", justifyContent:"center", flexWrap:"wrap" }}>
                  {skills.map(t => (
                    <span key={t} style={{ fontSize:"10px", background:"#EBF2FF", color:P.blue, padding:"4px 10px", borderRadius:"100px", fontWeight:600 }}>{t}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section style={{ background: P.white, padding: "88px clamp(24px,6vw,80px)" }}>
        <div style={{ maxWidth: "1140px", margin: "0 auto" }}>
          <SectionHead eyebrow="How We Work" heading="Our approach" />
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(220px, 1fr))", gap:"22px" }}>
            {[
              { icon:"🏗️", t:"Practical first", b:"We build for real-world use, not demos. Every automation is tested against how your team actually operates before handoff." },
              { icon:"🔒", t:"Simple to manage", b:"Non-technical teams can understand and manage everything we build. Clear documentation is part of every delivery." },
              { icon:"⚡", t:"Fast delivery", b:"First automation live in 3–7 days. No multi-month roadmaps before you see results." },
              { icon:"📞", t:"Direct support", b:"You get a direct line to the person who built your system — not a support ticket queue." },
            ].map(({ icon, t, b }) => (
              <div key={t} style={{ padding:"28px", background:P.paleBg, borderRadius:"12px", border:`1px solid ${P.border}` }}>
                <div style={{ fontSize:"26px", marginBottom:"12px" }}>{icon}</div>
                <h3 style={{ fontFamily:DISPLAY, fontSize:"15px", fontWeight:700, color:P.navy, marginBottom:"8px" }}>{t}</h3>
                <p style={{ fontSize:"13px", color:P.gray, lineHeight:1.75 }}>{b}</p>
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
function ContactPage() {
  const [form, setForm] = useState({ name:"", email:"", company:"", service:"", message:"" });
  const [status, setStatus] = useState("idle"); // idle | sending | success | error

  const set = k => e => setForm({ ...form, [k]: e.target.value });

  const submit = async () => {
    if (!form.name || !form.email || !form.message) { setStatus("error"); return; }
    setStatus("sending");
    await new Promise(r => setTimeout(r, 1100));
    setStatus("success");
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

      <section style={{ background: P.offWhite, padding: "88px clamp(24px,6vw,80px)" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", display:"grid", gridTemplateColumns:"1fr 1.5fr", gap:"64px", alignItems:"start" }} className="t-two-col">

          {/* Left */}
          <div>
            <h2 style={{ fontFamily: DISPLAY, fontSize: "22px", fontWeight: 800, color: P.navy, marginBottom: "14px" }}>What to expect</h2>
            <p style={{ fontSize: "13px", color: P.gray, lineHeight: 1.85, marginBottom: "32px" }}>
              After you reach out we'll schedule a 30-minute discovery call to understand your workflow and scope the right solution. No sales pitch — just an honest conversation about what's slowing you down.
            </p>
            {[
              ["📞", "Free 30-min strategy call", "No commitment required"],
              ["📋", "Custom automation roadmap", "Delivered after the call"],
              ["⚡", "First automation live in 3–7 days", "After you approve the plan"],
            ].map(([icon, title, sub]) => (
              <div key={title} style={{ display:"flex", gap:"14px", marginBottom:"22px" }}>
                <div style={{ width:"42px", height:"42px", background:"#EBF2FF", borderRadius:"10px", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, fontSize:"18px" }}>{icon}</div>
                <div>
                  <div style={{ fontSize:"13px", fontWeight:700, color:P.navy }}>{title}</div>
                  <div style={{ fontSize:"12px", color:P.gray, marginTop:"2px" }}>{sub}</div>
                </div>
              </div>
            ))}
            <div style={{ marginTop:"36px", padding:"18px 20px", background:P.white, borderRadius:"10px", border:`1px solid ${P.border}` }}>
              <div style={{ fontSize:"11px", color:P.gray, marginBottom:"4px", textTransform:"uppercase", letterSpacing:"1px" }}>Email us directly</div>
              <a href="mailto:toremaiautomation@gmail.com" style={{ fontSize:"14px", fontWeight:700, color:P.blue, textDecoration:"underline", fontFamily:BODY }}>toremaiautomation@gmail.com</a>
            </div>
            <div style={{ marginTop:"12px", padding:"18px 20px", background:P.white, borderRadius:"10px", border:`1px solid ${P.border}` }}>
              <div style={{ fontSize:"11px", color:P.gray, marginBottom:"4px", textTransform:"uppercase", letterSpacing:"1px" }}>Call or text us</div>
              <a href="tel:+18326838151" style={{ fontSize:"14px", fontWeight:700, color:P.blue, textDecoration:"underline", fontFamily:BODY }}>(832) 683-8151</a>
            </div>
          </div>

          {/* Right - Form */}
          <div style={{ background: P.white, borderRadius: "16px", padding: "40px", border: `1px solid ${P.border}` }}>
            {status === "success" ? (
              <div style={{ textAlign:"center", padding:"48px 0" }}>
                <div style={{ fontSize:"44px", marginBottom:"16px" }}>✓</div>
                <h3 style={{ fontFamily:DISPLAY, fontSize:"22px", fontWeight:800, color:P.navy, marginBottom:"10px" }}>Message received!</h3>
                <p style={{ color:P.gray, fontSize:"14px", lineHeight:1.7 }}>We'll be in touch within 24 hours to schedule your free strategy call.</p>
              </div>
            ) : (
              <div style={{ display:"flex", flexDirection:"column", gap:"18px" }}>
                <h3 style={{ fontFamily:DISPLAY, fontSize:"18px", fontWeight:800, color:P.navy }}>Send us a message</h3>
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"14px" }}>
                  <div>
                    <label style={{ display:"block", fontSize:"11px", fontWeight:700, color:"#374151", marginBottom:"6px", letterSpacing:"0.5px", textTransform:"uppercase" }}>Your Name *</label>
                    <input style={FIELD} value={form.name} onChange={set("name")} placeholder="John Smith" />
                  </div>
                  <div>
                    <label style={{ display:"block", fontSize:"11px", fontWeight:700, color:"#374151", marginBottom:"6px", letterSpacing:"0.5px", textTransform:"uppercase" }}>Email *</label>
                    <input style={FIELD} type="email" value={form.email} onChange={set("email")} placeholder="john@company.com" />
                  </div>
                </div>
                <div>
                  <label style={{ display:"block", fontSize:"11px", fontWeight:700, color:"#374151", marginBottom:"6px", letterSpacing:"0.5px", textTransform:"uppercase" }}>Company</label>
                  <input style={FIELD} value={form.company} onChange={set("company")} placeholder="Smith Construction Co." />
                </div>
                <div>
                  <label style={{ display:"block", fontSize:"11px", fontWeight:700, color:"#374151", marginBottom:"6px", letterSpacing:"0.5px", textTransform:"uppercase" }}>Service Interest</label>
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
                  <label style={{ display:"block", fontSize:"11px", fontWeight:700, color:"#374151", marginBottom:"6px", letterSpacing:"0.5px", textTransform:"uppercase" }}>Tell us about your workflow *</label>
                  <textarea style={{ ...FIELD, minHeight:"96px", resize:"vertical" }} value={form.message} onChange={set("message")} placeholder="What's the most repetitive thing your team does every day?" />
                </div>
                {status === "error" && (
                  <div style={{ fontSize:"12px", color:"#991b1b", background:"#fef2f2", border:"1px solid #fca5a5", padding:"10px 14px", borderRadius:"6px" }}>
                    Please fill in your name, email, and message.
                  </div>
                )}
                <button className="t-btn-primary" onClick={submit} disabled={status === "sending"} style={{
                  background: status === "sending" ? "#94a3b8" : P.blue,
                  color: P.white, border:"none", padding:"13px",
                  borderRadius:"8px", fontSize:"14px", fontWeight:700, fontFamily:BODY,
                }}>
                  {status === "sending" ? "Sending..." : "Send Message →"}
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

// ── LEGAL SHARED ─────────────────────────────────────────────
function LegalPage({ title, updated, children }) {
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
      <section style={{ background:P.white, padding:"72px clamp(24px,6vw,80px)" }}>
        <div style={{ maxWidth:"780px", margin:"0 auto" }}>{children}</div>
      </section>
    </>
  );
}

function LegalSection({ heading, children }) {
  return (
    <div style={{ marginBottom:"40px" }}>
      <h2 style={{ fontFamily:DISPLAY, fontSize:"19px", fontWeight:700, color:P.navy, marginBottom:"12px", paddingBottom:"8px", borderBottom:`1px solid ${P.border}` }}>{heading}</h2>
      <div style={{ fontSize:"14px", color:P.gray, lineHeight:1.85 }}>{children}</div>
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
function TermsPage() {
  return (
    <LegalPage title="Terms of Service" updated="June 1, 2026">
      <LegalSection heading="1. Acceptance of Terms">
        <LP>By accessing or using any services provided by Torem AI ("Company," "we," "us," or "our"), you agree to be bound by these Terms of Service. If you do not agree to these terms, do not use our services.</LP>
        <LP>These Terms apply to all clients, visitors, and others who access or use our services, including AI automation systems, consulting, and software development.</LP>
      </LegalSection>

      <LegalSection heading="2. Description of Services">
        <LP>Torem AI provides AI-powered automation systems for home service and construction contractors, including but not limited to:</LP>
        <LI items={["AI receptionist and lead capture systems","Automated appointment booking","Lead follow-up sequences","CRM pipeline and job tracking","Review generation automation","Missed call text-back recovery"]} />
        <LP>All services are custom-built and delivered as described in your individual service agreement or proposal.</LP>
      </LegalSection>

      <LegalSection heading="3. Payment Terms">
        <LP>Services are billed according to the pricing agreed upon in your service proposal. Setup fees are due before work begins. Monthly recurring fees are billed on the same date each month.</LP>
        <LP>Late payments (more than 7 days overdue) may result in service suspension. We reserve the right to charge a 1.5% monthly late fee on outstanding balances.</LP>
        <LP>All fees are non-refundable unless otherwise stated in writing. Disputes must be raised within 30 days of the invoice date.</LP>
      </LegalSection>

      <LegalSection heading="4. Cancellation Policy">
        <LP>Monthly services may be cancelled with 30 days written notice to toremaiautomation@gmail.com. You will continue to have access to services through the end of the current billing period.</LP>
        <LP>Setup fees are non-refundable. If you cancel within the first 30 days of a monthly service, no refund will be issued for that month.</LP>
        <LP>We reserve the right to terminate service immediately for violations of these Terms, fraudulent activity, or non-payment.</LP>
      </LegalSection>

      <LegalSection heading="5. Client Responsibilities">
        <LP>You agree to provide accurate information necessary for us to deliver services, including business details, phone numbers, access credentials, and workflow information.</LP>
        <LP>You are responsible for ensuring that your use of our services complies with all applicable laws and regulations, including telemarketing regulations (TCPA), CAN-SPAM, and any local business licensing requirements.</LP>
        <LP>You must not use our services to send spam, harass individuals, or engage in any deceptive or fraudulent business practices.</LP>
      </LegalSection>

      <LegalSection heading="6. Intellectual Property & Data Ownership">
        <LP>All custom automation workflows, scripts, and systems built for you remain your property upon full payment. Torem AI retains the right to use general concepts, techniques, and non-client-specific methodologies in other projects.</LP>
        <LP>You retain full ownership of your business data, customer contact lists, and lead information. We will never sell or share your data with third parties except as required to deliver your services (e.g., integration with third-party platforms you authorize).</LP>
      </LegalSection>

      <LegalSection heading="7. Limitation of Liability">
        <LP>Torem AI's liability for any claim arising out of these Terms or our services is limited to the amount you paid us in the 3 months preceding the claim.</LP>
        <LP>We are not liable for indirect, incidental, special, or consequential damages, including lost revenue, lost leads, or business interruption — even if we have been advised of the possibility of such damages.</LP>
        <LP>AI systems may not be 100% accurate at all times. We do not guarantee specific business outcomes, lead volumes, or revenue results from our automation systems.</LP>
      </LegalSection>

      <LegalSection heading="8. Modifications to Terms">
        <LP>We reserve the right to update these Terms at any time. We will notify active clients by email at least 14 days before material changes take effect. Continued use of our services after changes constitutes acceptance of the updated Terms.</LP>
      </LegalSection>

      <LegalSection heading="9. Governing Law">
        <LP>These Terms are governed by the laws of the State of Texas. Any disputes shall be resolved in the courts of Harris County, Texas, unless we agree in writing to an alternative dispute resolution method.</LP>
      </LegalSection>

      <LegalSection heading="10. Contact">
        <LP>Questions about these Terms? Contact us at <a href="mailto:toremaiautomation@gmail.com" style={{ color:P.blue }}>toremaiautomation@gmail.com</a> or call <a href="tel:+18326838151" style={{ color:P.blue }}>(832) 683-8151</a>.</LP>
      </LegalSection>
    </LegalPage>
  );
}

// ── PRIVACY POLICY ───────────────────────────────────────────
function PrivacyPage() {
  return (
    <LegalPage title="Privacy Policy" updated="June 1, 2026">
      <LegalSection heading="1. Introduction">
        <LP>Torem AI ("we," "us," or "our") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard information when you visit our website or use our services.</LP>
        <LP>This policy applies to our website, AI automation services, and all communications between Torem AI and its clients or website visitors.</LP>
      </LegalSection>

      <LegalSection heading="2. Information We Collect">
        <LP><strong>Information you provide directly:</strong></LP>
        <LI items={["Name, email address, and phone number (contact forms, onboarding)","Business name and address","Payment information (processed securely through third-party processors)","Workflow and operational details shared during onboarding"]} />
        <LP><strong>Information collected automatically:</strong></LP>
        <LI items={["Browser type and version","Pages visited and time spent on site","Referring website","IP address and approximate location","Device type"]} />
        <LP><strong>Information from third-party integrations (when you authorize):</strong></LP>
        <LI items={["Calendar events (Google/Outlook)","CRM contacts and lead data","Phone call logs and recordings (for AI receptionist services)","SMS/email engagement data"]} />
      </LegalSection>

      <LegalSection heading="3. How We Use Your Information">
        <LP>We use the information we collect to:</LP>
        <LI items={["Deliver and maintain your automation services","Communicate with you about your account and support","Process payments and send invoices","Improve our services and develop new features","Comply with legal obligations","Send relevant service updates (you may opt out at any time)"]} />
        <LP>We do not use your data for advertising purposes and will never sell your personal information to third parties.</LP>
      </LegalSection>

      <LegalSection heading="4. Data Storage & Security">
        <LP>Your data is stored on secure, industry-standard infrastructure including Supabase (hosted on AWS) and other platforms listed in our Tech Stack. We implement appropriate technical safeguards including encryption in transit and at rest.</LP>
        <LP>We retain client data for as long as your service is active plus 12 months. Contact information from website inquiries is retained for 24 months. You may request deletion at any time (see Section 6).</LP>
      </LegalSection>

      <LegalSection heading="5. Sharing Your Information">
        <LP>We only share your information with third parties in the following circumstances:</LP>
        <LI items={["Service delivery: with platforms you authorize (e.g., Google Calendar, CRM tools, SMS providers like Twilio)","Legal compliance: if required by law, court order, or government authority","Business transfers: if Torem AI is acquired or merges with another company, with prior notice to clients"]} />
        <LP>All third-party platforms we use are bound by their own privacy policies and data protection agreements.</LP>
      </LegalSection>

      <LegalSection heading="6. Your Rights (including GDPR)">
        <LP>Depending on your location, you may have the following rights regarding your personal data:</LP>
        <LI items={["Access: request a copy of the data we hold about you","Correction: request correction of inaccurate data","Deletion: request deletion of your personal data","Portability: receive your data in a machine-readable format","Objection: object to certain types of processing"]} />
        <LP>To exercise any of these rights, email us at <a href="mailto:toremaiautomation@gmail.com" style={{ color:P.blue }}>toremaiautomation@gmail.com</a>. We will respond within 30 days.</LP>
      </LegalSection>

      <LegalSection heading="7. Children's Privacy">
        <LP>Our services are not directed to individuals under the age of 18. We do not knowingly collect personal information from minors. If you believe a minor has provided us with personal data, please contact us immediately.</LP>
      </LegalSection>

      <LegalSection heading="8. Changes to This Policy">
        <LP>We may update this Privacy Policy periodically. We will notify you of significant changes by email or by posting a notice on our website. Your continued use of our services after the effective date constitutes acceptance of the updated policy.</LP>
      </LegalSection>

      <LegalSection heading="9. Contact">
        <LP>For privacy inquiries, contact us at <a href="mailto:toremaiautomation@gmail.com" style={{ color:P.blue }}>toremaiautomation@gmail.com</a> or <a href="tel:+18326838151" style={{ color:P.blue }}>(832) 683-8151</a>. Torem AI, Houston, TX.</LP>
      </LegalSection>
    </LegalPage>
  );
}

// ── COOKIE POLICY ────────────────────────────────────────────
function CookiePage() {
  return (
    <LegalPage title="Cookie Policy" updated="June 1, 2026">
      <LegalSection heading="1. What Are Cookies">
        <LP>Cookies are small text files stored on your device when you visit a website. They help websites remember your preferences, understand how you interact with content, and provide a better browsing experience.</LP>
        <LP>This Cookie Policy explains what cookies we use on the Torem AI website and how you can control them.</LP>
      </LegalSection>

      <LegalSection heading="2. Cookies We Use">
        <LP><strong>Essential cookies</strong> — required for the website to function. These cannot be disabled:</LP>
        <LI items={["Session management (keeping your form data intact as you navigate)","Security tokens to prevent cross-site request forgery"]} />
        <LP><strong>Analytics cookies</strong> — help us understand how visitors use our site (pages visited, time spent, bounce rate). We may use tools such as Google Analytics. These are anonymized and do not identify you personally.</LP>
        <LP><strong>Preference cookies</strong> — remember choices you've made (e.g., if you've dismissed a banner).</LP>
        <LP>We do not use advertising or tracking cookies. We do not sell data derived from cookie activity.</LP>
      </LegalSection>

      <LegalSection heading="3. Third-Party Cookies">
        <LP>Some pages may include embedded content (e.g., scheduling widgets, video embeds) from third-party providers. These providers may set their own cookies subject to their respective privacy policies. We have no control over these cookies.</LP>
        <LP>Common third parties that may set cookies: Google (Analytics, Fonts, Calendar), Calendly or similar scheduling tools.</LP>
      </LegalSection>

      <LegalSection heading="4. How to Control Cookies">
        <LP>You can control and delete cookies through your browser settings. Here's how for major browsers:</LP>
        <LI items={["Chrome: Settings → Privacy and security → Cookies and other site data","Firefox: Settings → Privacy & Security → Cookies and Site Data","Safari: Preferences → Privacy → Manage Website Data","Edge: Settings → Cookies and site permissions"]} />
        <LP>Disabling essential cookies may affect website functionality. Disabling analytics cookies will not affect your ability to use our services.</LP>
      </LegalSection>

      <LegalSection heading="5. Do Not Track">
        <LP>Our website respects Do Not Track (DNT) signals from browsers where technically feasible. When DNT is enabled, we disable non-essential analytics tracking for your session.</LP>
      </LegalSection>

      <LegalSection heading="6. Updates to This Policy">
        <LP>We may update this Cookie Policy as our practices change or as required by law. The "Last updated" date at the top of this page reflects the most recent revision.</LP>
      </LegalSection>

      <LegalSection heading="7. Contact">
        <LP>Questions about our cookie practices? Email us at <a href="mailto:toremaiautomation@gmail.com" style={{ color:P.blue }}>toremaiautomation@gmail.com</a>.</LP>
      </LegalSection>
    </LegalPage>
  );
}

// ── DISCLAIMER ───────────────────────────────────────────────
function DisclaimerPage() {
  return (
    <LegalPage title="Disclaimer" updated="June 1, 2026">
      <LegalSection heading="1. General Disclaimer">
        <LP>The information provided by Torem AI on this website and through our services is for general informational and operational purposes only. All information is provided in good faith; however, we make no representation or warranty of any kind regarding the accuracy, completeness, or reliability of any information.</LP>
      </LegalSection>

      <LegalSection heading="2. AI Limitations">
        <LP>Our AI-powered systems — including AI receptionists, automated follow-up sequences, and lead capture tools — are designed to assist your business operations. However, AI systems have inherent limitations:</LP>
        <LI items={["AI may misunderstand or misclassify certain caller requests or messages","Responses may not always reflect the nuance of a human conversation","AI cannot replace the judgment of a qualified professional in complex situations","Performance may vary based on call volume, audio quality, and the specificity of your setup"]} />
        <LP>We continuously improve our systems but cannot guarantee error-free operation at all times. We recommend reviewing automated interactions periodically and setting up appropriate human escalation paths for sensitive situations.</LP>
      </LegalSection>

      <LegalSection heading="3. No Legal or Financial Advice">
        <LP>Nothing on this website or in our services constitutes legal, financial, tax, or professional business advice. We are an automation technology company, not a law firm, accounting firm, or business consultant.</LP>
        <LP>Any decisions about your business operations, contracts, pricing, or compliance should be made in consultation with qualified professionals in those fields. Torem AI is not responsible for any business decisions made based on our automation outputs.</LP>
      </LegalSection>

      <LegalSection heading="4. Results Disclaimer">
        <LP>Any references to outcomes such as "more leads," "increased bookings," or "saved hours" are illustrative examples based on typical use cases. Individual results will vary based on your industry, market, service area, business model, and how you implement and use our systems.</LP>
        <LP>Torem AI does not guarantee specific revenue increases, lead volumes, or business growth. Automation is a tool — results depend on how it is used within your broader business strategy.</LP>
      </LegalSection>

      <LegalSection heading="5. Service Availability">
        <LP>While we strive for high uptime and reliability, our services depend on third-party infrastructure providers (including cloud hosting, telephony platforms, and API services) that may experience outages outside our control.</LP>
        <LP>We will communicate planned maintenance in advance and work to resolve unplanned outages promptly. Torem AI is not liable for losses resulting from service interruptions caused by third-party platform failures.</LP>
      </LegalSection>

      <LegalSection heading="6. External Links">
        <LP>Our website may contain links to third-party websites. These links are provided for convenience only. Torem AI has no control over the content, privacy practices, or availability of external sites and is not responsible for any harm or loss resulting from your use of linked websites.</LP>
      </LegalSection>

      <LegalSection heading="7. Liability Cap">
        <LP>To the fullest extent permitted by applicable law, Torem AI's total liability to you for any claim arising out of or relating to our services shall not exceed the total fees paid by you to Torem AI in the three (3) months immediately preceding the event giving rise to the claim.</LP>
        <LP>In no event shall Torem AI be liable for indirect, incidental, punitive, special, or consequential damages of any kind, even if advised of the possibility of such damages.</LP>
      </LegalSection>

      <LegalSection heading="8. Contact">
        <LP>If you have questions about this Disclaimer, please contact us at <a href="mailto:toremaiautomation@gmail.com" style={{ color:P.blue }}>toremaiautomation@gmail.com</a> or <a href="tel:+18326838151" style={{ color:P.blue }}>(832) 683-8151</a>.</LP>
      </LegalSection>
    </LegalPage>
  );
}

// ── APP ──────────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState("Home");

  useEffect(() => {
    const el = document.createElement("style");
    el.textContent = CSS;
    document.head.appendChild(el);
    return () => document.head.removeChild(el);
  }, []);

  useEffect(() => { window.scrollTo(0, 0); }, [page]);

  const go = p => setPage(p);

  return (
    <div style={{ fontFamily: BODY, background: P.white, paddingTop: "66px" }}>
      <Navbar page={page} setPage={go} />
      {page === "Home"     && <HomePage     setPage={go} />}
      {page === "Services" && <ServicesPage setPage={go} />}
      {page === "About"    && <AboutPage    setPage={go} />}
      {page === "Contact"  && <ContactPage />}
      {page === "Terms"    && <TermsPage />}
      {page === "Privacy"  && <PrivacyPage />}
      {page === "Cookies"  && <CookiePage />}
      {page === "Disclaimer" && <DisclaimerPage />}
      <Footer setPage={go} />
    </div>
  );
}
