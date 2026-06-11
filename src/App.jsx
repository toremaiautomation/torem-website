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
          { h: "Services", links: [["Workflow Automation",null],["API Integrations",null],["Custom Dashboards",null],["Field Operations",null]] },
          { h: "Contact",  links: [["hello@torem.ai",null],["Houston, TX",null],["Book a Call","Contact"]] },
        ].map(({ h, links }) => (
          <div key={h}>
            <div style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "2px", color: "#475569", textTransform: "uppercase", marginBottom: "18px" }}>{h}</div>
            {links.map(([label, nav]) => (
              <div key={label} className={nav ? "t-link" : ""} onClick={nav ? () => setPage(nav) : undefined}
                style={{ fontSize: "13px", color: "#94a3b8", marginBottom: "11px" }}>
                {label}
              </div>
            ))}
          </div>
        ))}
      </div>
      <div style={{ borderTop: "1px solid #1e3254", paddingTop: "24px", maxWidth: "1140px", margin: "0 auto", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "12px" }}>
        <span style={{ fontSize: "12px", color: "#334155" }}>© 2026 Torem AI. All rights reserved.</span>
        <span style={{ fontSize: "12px", color: "#334155" }}>Houston, TX · Built for businesses that move fast.</span>
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
            Automate the Work<br />
            <span style={{ color: "#5BB3F5" }}>Slowing You Down</span>
          </h1>

          <p style={{ fontSize: "17px", color: "rgba(255,255,255,0.5)", lineHeight: 1.75, maxWidth: "500px", marginBottom: "40px" }}>
            Torem AI builds custom automation systems that connect your tools, cut manual tasks, and give your team back hours every week.
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
            heading="Your team is too good for this work"
            sub="Every hour spent copy-pasting, chasing approvals, or sending manual updates is an hour not spent building."
          />
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(190px, 1fr))", gap:"12px" }} className="t-three-col">
            {[
              "Copying data between apps manually",
              "Sending the same status emails daily",
              "Chasing invoice and change order approvals",
              "Scheduling crews by phone and text",
              "Building reports from spreadsheets",
              "Manually routing documents for signature",
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
              { icon:"⚡", title:"Workflow Automation", desc:"End-to-end pipelines built with n8n that handle your most repetitive operations around the clock without human intervention." },
              { icon:"🔗", title:"API & System Integrations", desc:"Connect Procore, QuickBooks, Google Workspace, and more — so data flows automatically between the tools you already use." },
              { icon:"📊", title:"Custom Dashboards", desc:"Real-time visibility into your operations, built in React and deployed in days. No more hunting through spreadsheets for answers." },
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

      <section style={{ background: P.white, padding: "88px clamp(24px,6vw,80px)" }}>
        <div style={{ maxWidth: "1140px", margin: "0 auto" }}>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(320px, 1fr))", gap:"24px" }}>
            {[
              { icon:"⚡", title:"Workflow Automation",  price:"From $400/mo", desc:"Full end-to-end pipelines built with n8n and Zapier. Status updates, approval chains, document routing — built for your exact process, not a generic template.", features:["Custom trigger logic","Error handling + fallbacks","Email / SMS / Slack alerts","Supabase data storage"] },
              { icon:"🔗", title:"API & Tool Integrations", price:"From $800",    desc:"Connect the tools you already use — Procore, QuickBooks, DocuSign, Buildertrend, Google Workspace. Data flows between them automatically with no manual copy-paste.", features:["REST & webhook integrations","Bi-directional data sync","Auth + credential handling","Rate limit management"] },
              { icon:"📊", title:"Custom Dashboards",    price:"From $600",    desc:"React dashboards giving you real-time visibility into your operations. Filter by project, crew, date range — built to answer the questions your team asks every morning.", features:["Live data from your systems","Mobile responsive","Role-based access controls","Deployed on Vercel"] },
              { icon:"📋", title:"Document Automation",  price:"From $500",    desc:"Auto-generate contracts, change orders, invoices, and reports. Pull data from your project system, route for signature, and store automatically — no manual steps.", features:["DocuSign integration","Template-based generation","Auto-filing in Google Drive","Client notification emails"] },
              { icon:"👷", title:"Field Operations",     price:"From $300/mo", desc:"Tools built for crews on the job site. Daily status updates, incident reports, material requests — simple enough for anyone to submit from a phone in under 60 seconds.", features:["Mobile-first form widgets","Real-time project alerts","Photo upload support","Offline-capable options"] },
              { icon:"🤖", title:"AI-Powered Automation", price:"Custom",     desc:"Layer Claude AI into your workflows — auto-classify documents, summarize weekly reports, draft client updates, flag anomalies in your project data, and more.", features:["Powered by Claude API","Trained on your context","Human-in-the-loop options","Scales with your volume"] },
            ].map(({ icon, title, price, desc, features }) => (
              <div key={title} className="t-card" style={{
                background: P.offWhite, borderRadius: "14px",
                padding: "30px", border: `1px solid ${P.border}`,
              }}>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:"18px" }}>
                  <span style={{ fontSize:"26px" }}>{icon}</span>
                  <span style={{ fontSize:"11px", fontWeight:700, color:P.blue, background:"#EBF2FF", padding:"4px 10px", borderRadius:"100px" }}>{price}</span>
                </div>
                <h3 style={{ fontFamily:DISPLAY, fontSize:"17px", fontWeight:700, color:P.navy, marginBottom:"10px" }}>{title}</h3>
                <p style={{ fontSize:"13px", color:P.gray, lineHeight:1.75, marginBottom:"20px" }}>{desc}</p>
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
          <div style={{ maxWidth: "440px", margin: "0 auto", background: P.white, borderRadius: "16px", padding: "40px", border: `1px solid ${P.border}`, textAlign: "center" }}>
            <div style={{ width:"72px", height:"72px", borderRadius:"50%", background:`linear-gradient(135deg, ${P.blue}, ${P.navy})`, margin:"0 auto 20px", display:"flex", alignItems:"center", justifyContent:"center" }}>
              <span style={{ fontFamily: DISPLAY, color: P.white, fontSize:"26px", fontWeight:800 }}>E</span>
            </div>
            <h3 style={{ fontFamily: DISPLAY, fontSize:"20px", fontWeight:800, color:P.navy }}>Eddy</h3>
            <p style={{ fontSize:"12px", color:P.blue, fontWeight:600, marginBottom:"16px", marginTop:"4px", letterSpacing:"0.5px", textTransform:"uppercase" }}>Founder & Lead Engineer</p>
            <p style={{ fontSize:"13px", color:P.gray, lineHeight:1.8 }}>
              Computer Information Systems student and IT practicum graduate with hands-on experience in network infrastructure, automation engineering, and full-stack development. Founded Torem AI to make enterprise-grade automation accessible to businesses that actually need it.
            </p>
            <div style={{ display:"flex", gap:"8px", marginTop:"20px", justifyContent:"center", flexWrap:"wrap" }}>
              {["n8n","Supabase","React","IT Infrastructure","Cybersecurity"].map(t => (
                <span key={t} style={{ fontSize:"10px", background:"#EBF2FF", color:P.blue, padding:"4px 10px", borderRadius:"100px", fontWeight:600 }}>{t}</span>
              ))}
            </div>
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
              <div style={{ fontSize:"14px", fontWeight:700, color:P.blue }}>hello@torem.ai</div>
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
                    <option>Workflow Automation</option>
                    <option>API Integrations</option>
                    <option>Custom Dashboard</option>
                    <option>Document Automation</option>
                    <option>Field Operations</option>
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
      <Footer setPage={go} />
    </div>
  );
}
