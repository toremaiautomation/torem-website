import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { T, P, DISPLAY, BODY } from "../theme";
import { MeshBackground } from "../components/MeshBackground";
import { SectionHead } from "../components/SectionHead";
import { PageHead } from "../components/PageHead";
import { useReducedMotion } from "../hooks/useReducedMotion";

const CORE = {
  title: "AI Chat + Knowledge Base",
  tag: "Foundation",
  desc: "Your AI learns your business from your website and answers customer questions instantly, 24/7, so no inquiry goes unanswered, even at 10pm on a Sunday.",
  features: [
    "Auto-built from your website content",
    "Instant answers to common questions",
    "Lead capture and owner notifications",
    "Works 24/7 across web and mobile",
    "Continuously improves over time",
    "No technical setup required from you",
  ],
};

const ADDONS = [
  {
    id: "booking",
    title: "Booking Built In",
    short: "Customers schedule directly in chat. No calls, no back-and-forth.",
    detail: "Your AI connects to your calendar and lets customers pick a time slot right inside the chat window. Confirmations and reminders go out automatically. You just show up.",
    features: ["Real-time calendar sync", "Automated confirmations", "Reminder sequences", "Reschedule handling"],
  },
  {
    id: "analytics",
    title: "Analytics and Reporting",
    short: "See what's working, what's not, and where leads go.",
    detail: "A clean dashboard shows conversation volume, common questions, booking rates, and drop-off points. Know your numbers without digging through chat logs.",
    features: ["Conversation summaries", "Lead conversion tracking", "Drop-off analysis", "Monthly reports"],
  },
  {
    id: "followup",
    title: "Automated Follow-Up",
    short: "Warm leads go cold fast. Automated sequences keep them engaged.",
    detail: "After every chat, the system sends a personalized follow-up sequence over days or weeks. Estimates, check-ins, review requests — all timed and sent automatically.",
    features: ["Multi-step sequences", "Personalized messages", "Review request automation", "Re-engagement campaigns"],
  },
  {
    id: "reviews",
    title: "Review Generation",
    short: "Turn happy customers into 5-star reviews automatically.",
    detail: "After a completed job, the system sends a review request at the right moment. Simple, timely, and hands-off. Build your reputation while you work.",
    features: ["Timed post-job requests", "Google and Yelp targeting", "Soft-touch follow-up", "Fully automated"],
  },
  {
    id: "instant",
    title: "Instant Response",
    short: "First responder wins. Beat every competitor who's still checking voicemail.",
    detail: "The moment a new lead comes in, the AI fires off a personalized first response within seconds. Across web chat, SMS, or email, depending on how you capture leads.",
    features: ["Sub-3 second response", "Web, SMS, and email", "Lead qualification included", "Works nights and weekends"],
  },
  {
    id: "crm",
    title: "CRM Integration",
    short: "All leads, conversations, and bookings flow into your existing tools.",
    detail: "Connect Torem to your CRM, spreadsheet, or project management tool. Every conversation, lead detail, and booking lands exactly where you need it without manual entry.",
    features: ["Popular CRM connectors", "Google Sheets export", "Zapier-compatible", "Custom field mapping"],
  },
];

const CHECK_ICON = (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={P.blue} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);

function AddonCard({ addon, i, reduced }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      {...(reduced ? {} : {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-40px" },
        transition: { duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] },
        whileHover: { y: -3, boxShadow: "0 16px 40px rgba(0,0,0,0.09)", transition: { type: "spring", stiffness: 380, damping: 24 } },
      })}
      className="t-card"
      style={{
        background: T.bg, border: `1px solid ${expanded ? T.blue : T.border}`,
        borderRadius: "14px", padding: "28px", cursor: "pointer",
        boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
        transition: "border-color 0.2s",
      }}
      onClick={() => setExpanded(e => !e)}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "12px" }}>
        <div style={{ flex: 1 }}>
          <h3 style={{ fontFamily: DISPLAY, fontSize: "17px", fontWeight: 800, color: T.text, marginBottom: "6px" }}>{addon.title}</h3>
          <p style={{ fontSize: "13px", color: T.textMuted, lineHeight: 1.6 }}>{addon.short}</p>
        </div>
        <motion.div
          animate={{ rotate: expanded ? 45 : 0 }}
          transition={{ duration: 0.22 }}
          style={{ fontSize: "20px", color: P.blue, flexShrink: 0, marginTop: "2px", fontWeight: 300 }}
        >+</motion.div>
      </div>

      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            key="detail"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            style={{ overflow: "hidden" }}
          >
            <div style={{ paddingTop: "18px", borderTop: `1px solid ${T.border}`, marginTop: "18px" }}>
              <p style={{ fontSize: "13px", color: T.textMuted, lineHeight: 1.75, marginBottom: "14px" }}>{addon.detail}</p>
              <div style={{ display: "flex", flexDirection: "column", gap: "7px" }}>
                {addon.features.map(f => (
                  <div key={f} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    {CHECK_ICON}
                    <span style={{ fontSize: "13px", color: T.text }}>{f}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function ServicesPage({ setPage, scrollTarget, setScrollTarget }) {
  const reduced = useReducedMotion();

  useEffect(() => {
    if (scrollTarget) {
      const el = document.getElementById(scrollTarget);
      if (el) setTimeout(() => { el.scrollIntoView({ behavior: "smooth", block: "start" }); setScrollTarget(null); }, 120);
    }
  }, [scrollTarget, setScrollTarget]);

  return (
    <>
      <PageHead
        title="Torem AI Services | AI Chat, Booking, and Automation for Contractors"
        description="From AI chat and booking automation to follow-up sequences and analytics, Torem AI builds everything your service business needs to convert more leads."
      />

      {/* Hero */}
      <section style={{ background: P.navy, padding: "110px clamp(24px,6vw,80px) 72px", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none", backgroundImage: `linear-gradient(${P.blueprintLine} 1px, transparent 1px), linear-gradient(90deg, ${P.blueprintLine} 1px, transparent 1px)`, backgroundSize: "44px 44px" }} />
        <div style={{ position: "absolute", top: "10%", right: "8%", width: "380px", height: "380px", borderRadius: "50%", background: "radial-gradient(circle, rgba(0,122,227,0.22) 0%, transparent 65%)", filter: "blur(64px)", pointerEvents: "none" }} />
        <motion.div style={{ position: "relative" }} {...(reduced ? {} : { initial: { opacity: 0, y: 24 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.65 } })}>
          <h1 style={{ fontFamily: DISPLAY, fontSize: "clamp(32px,5vw,58px)", fontWeight: 800, color: P.white, marginBottom: "16px", letterSpacing: "-0.5px" }}>
            What We Build
          </h1>
          <p style={{ fontSize: "15px", color: "rgba(255,255,255,0.45)", maxWidth: "460px", margin: "0 auto", lineHeight: 1.7 }}>
            Simple, powerful chat automation that works for any small business.
          </p>
        </motion.div>
      </section>

      {/* Foundation */}
      <section id="foundation" style={{ background: T.bgAlt, padding: "100px clamp(24px,6vw,80px)", position: "relative", overflow: "hidden" }}>
        <MeshBackground simple />
        <div style={{ maxWidth: "1140px", margin: "0 auto", position: "relative" }}>
          <motion.div {...(reduced ? {} : { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.55 } })}
            style={{ textAlign: "center", marginBottom: "52px" }}>
            <SectionHead heading={CORE.title} sub={CORE.desc} />
          </motion.div>

          <motion.div
            {...(reduced ? {} : { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.55, delay: 0.1 } })}
            style={{
              maxWidth: "760px", margin: "0 auto",
              background: P.navy, borderRadius: "20px", padding: "48px clamp(24px,4vw,56px)",
              border: `1px solid rgba(0,122,227,0.25)`,
              boxShadow: "0 16px 64px rgba(0,0,0,0.18)",
            }}
          >
            <div style={{ display: "inline-block", fontSize: "10px", fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: "#93c5fd", background: "rgba(0,122,227,0.14)", border: "1px solid rgba(0,122,227,0.25)", padding: "5px 14px", borderRadius: "100px", marginBottom: "28px" }}>Foundation</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px 24px" }}>
              {CORE.features.map((f, i) => (
                <motion.div key={f} {...(reduced ? {} : { initial: { opacity: 0, x: -8 }, whileInView: { opacity: 1, x: 0 }, viewport: { once: true }, transition: { duration: 0.35, delay: i * 0.06 } })}
                  style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <div style={{ width: "18px", height: "18px", borderRadius: "50%", background: "rgba(0,122,227,0.25)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke={P.blue} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  </div>
                  <span style={{ fontSize: "13px", color: "rgba(255,255,255,0.8)", lineHeight: 1.5 }}>{f}</span>
                </motion.div>
              ))}
            </div>
            <div style={{ marginTop: "32px", paddingTop: "24px", borderTop: "1px solid rgba(255,255,255,0.08)", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "16px" }}>
              <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.4)" }}>Everything starts here.</div>
              <button className="t-btn-primary" onClick={() => setPage("Contact")} style={{
                background: P.blue, color: P.white, border: "none",
                padding: "11px 22px", borderRadius: "8px", fontSize: "13px", fontWeight: 600, fontFamily: BODY,
              }}>Get in Touch</button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Add-ons */}
      <section id="addons" style={{ background: T.bg, padding: "100px clamp(24px,6vw,80px)" }}>
        <div style={{ maxWidth: "1140px", margin: "0 auto" }}>
          <motion.div {...(reduced ? {} : { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.55 } })}
            style={{ textAlign: "center", marginBottom: "52px" }}>
            <SectionHead
              heading="Add the modules your business needs."
              sub="Each add-on layers on top of the foundation. Pick what fits your workflow today and expand as you grow."
            />
          </motion.div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "20px" }}>
            {ADDONS.map((addon, i) => (
              <AddonCard key={addon.id} addon={addon} i={i} reduced={reduced} />
            ))}
          </div>
        </div>
      </section>

      {/* Any Business */}
      <section style={{ background: T.bgAlt, padding: "100px clamp(24px,6vw,80px)", position: "relative", overflow: "hidden" }}>
        <MeshBackground simple />
        <div style={{ maxWidth: "1140px", margin: "0 auto", position: "relative" }}>
          <motion.div {...(reduced ? {} : { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.55 } })}
            style={{ textAlign: "center", marginBottom: "52px" }}>
            <SectionHead
              heading="Works for any small service business."
              sub="If customers call, text, or fill out forms to reach you, Torem can handle it."
            />
          </motion.div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: "16px", maxWidth: "880px", margin: "0 auto" }}>
            {["Roofing", "Remodeling", "Fencing", "Painting", "Siding", "Windows", "Landscaping", "HVAC", "Plumbing", "Cleaning", "Pest Control", "Any trade"].map((cat, i) => (
              <motion.div key={cat}
                {...(reduced ? {} : { initial: { opacity: 0, scale: 0.94 }, whileInView: { opacity: 1, scale: 1 }, viewport: { once: true }, transition: { duration: 0.3, delay: i * 0.04 } })}
                style={{
                  background: T.bg, border: `1px solid ${T.border}`, borderRadius: "10px",
                  padding: "14px 16px", textAlign: "center", fontSize: "13px", fontWeight: 600, color: T.text,
                }}
              >
                {cat}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: P.navy, padding: "100px clamp(24px,6vw,80px)", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none", backgroundImage: `linear-gradient(${P.blueprintLine} 1px, transparent 1px), linear-gradient(90deg, ${P.blueprintLine} 1px, transparent 1px)`, backgroundSize: "44px 44px" }} />
        <motion.div
          {...(reduced ? {} : { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.55 } })}
          style={{ maxWidth: "600px", margin: "0 auto", textAlign: "center", position: "relative" }}
        >
          <h2 style={{ fontFamily: DISPLAY, fontSize: "clamp(26px,3.5vw,44px)", fontWeight: 800, color: P.white, marginBottom: "18px", letterSpacing: "-0.4px" }}>
            Not sure which modules you need?
          </h2>
          <p style={{ fontSize: "15px", color: "rgba(255,255,255,0.45)", lineHeight: 1.75, marginBottom: "32px" }}>
            Book a free call and we'll walk through your workflow together and recommend exactly what fits.
          </p>
          <button className="t-btn-primary" onClick={() => setPage("Contact")} style={{
            background: P.blue, color: P.white, border: "none",
            padding: "14px 28px", borderRadius: "9px", fontSize: "14px", fontWeight: 600, fontFamily: BODY,
          }}>
            Book a Free Call
          </button>
        </motion.div>
      </section>
    </>
  );
}
