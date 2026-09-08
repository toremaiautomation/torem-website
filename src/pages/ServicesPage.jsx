import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { T, P, DISPLAY, BODY } from "../theme";
import { MeshBackground } from "../components/MeshBackground";
import { SectionHead } from "../components/SectionHead";
import { PageHead } from "../components/PageHead";
import { useReducedMotion } from "../hooks/useReducedMotion";

const FOUNDATION_FEATURES = [
  "AI chat trained on your website content",
  "Instant answers to customer questions, 24/7",
  "Lead capture and owner notifications",
  "Live analytics and reporting dashboard",
  "Conversation history and search",
  "Works across web and mobile",
  "No setup fee for first customers",
  "Cancel anytime",
];

const ADDONS = [
  {
    id: "booking",
    title: "Booking Built In",
    price: "+$20/mo",
    priceNote: null,
    desc: "Customers book appointments directly inside the chat. Confirmations and reminders go out automatically.",
  },
  {
    id: "reviews",
    title: "Review Generation",
    price: "+$10/mo",
    priceNote: null,
    desc: "Mark a job complete in your analytics dashboard and Torem automatically sends the review request at the right moment.",
  },
  {
    id: "followup",
    title: "Automated Follow-Up",
    price: "+$15/mo",
    priceNote: null,
    desc: "If a chat captures an email but doesn't result in a booking, Torem automatically follows up to bring the customer back.",
  },
  {
    id: "custom",
    title: "Custom Add-On",
    price: "Contact us",
    priceNote: "for pricing",
    desc: "Need something specific built for your chatbot? We'll scope and build it for you.",
  },
];

const CHECK_ICON = (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={P.blue} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);

const CHECK_WHITE = (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);

function AddonCard({ addon, i, reduced, setPage }) {
  const isCustom = addon.id === "custom";

  return (
    <motion.div
      {...(reduced ? {} : {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-40px" },
        transition: { duration: 0.5, delay: i * 0.09, ease: [0.22, 1, 0.36, 1] },
        whileHover: { y: -3, boxShadow: "0 16px 40px rgba(0,0,0,0.08)", transition: { type: "spring", stiffness: 380, damping: 24 } },
      })}
      className="t-card"
      style={{
        background: T.bg,
        border: `1px solid ${T.border}`,
        borderRadius: "14px",
        padding: "28px",
        boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
        display: "flex",
        flexDirection: "column",
        gap: "12px",
      }}
    >
      {/* Price badge */}
      <div style={{ display: "flex", alignItems: "baseline", gap: "4px" }}>
        <span style={{
          fontFamily: DISPLAY, fontSize: "22px", fontWeight: 800,
          color: isCustom ? T.textMuted : P.blue,
          letterSpacing: "-0.3px",
        }}>
          {addon.price}
        </span>
        {addon.priceNote && (
          <span style={{ fontSize: "12px", color: T.textMuted, fontWeight: 500 }}>{addon.priceNote}</span>
        )}
      </div>

      {/* Title */}
      <h3 style={{ fontFamily: DISPLAY, fontSize: "16px", fontWeight: 800, color: T.text, lineHeight: 1.25, margin: 0 }}>
        {addon.title}
      </h3>

      {/* Description */}
      <p style={{ fontSize: "13px", color: T.textMuted, lineHeight: 1.65, margin: 0, flex: 1 }}>
        {addon.desc}
      </p>

      {/* Stacks-on indicator */}
      <div style={{
        display: "inline-flex", alignItems: "center", gap: "6px",
        fontSize: "11px", fontWeight: 600, color: T.textMuted,
        background: T.bgAlt, border: `1px solid ${T.border}`,
        borderRadius: "100px", padding: "4px 10px", alignSelf: "flex-start",
      }}>
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={T.textMuted} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="6 9 12 15 18 9"/>
        </svg>
        Requires Foundation
      </div>

      {isCustom && (
        <button className="t-btn-primary" onClick={() => setPage("Contact")} style={{
          background: P.blue, color: P.white, border: "none",
          padding: "10px 16px", borderRadius: "8px",
          fontSize: "13px", fontWeight: 600, fontFamily: BODY, marginTop: "4px",
        }}>
          Get in Touch
        </button>
      )}
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
        title="Torem AI Services and Pricing | AI Chat Automation for Small Businesses"
        description="Torem AI starts at $40/month with no setup fee. Includes AI chat, knowledge base, and live analytics. Add booking, follow-up, and review automation as you grow."
      />

      {/* Hero */}
      <section style={{ background: P.navy, padding: "110px clamp(24px,6vw,80px) 72px", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none", backgroundImage: `linear-gradient(${P.blueprintLine} 1px, transparent 1px), linear-gradient(90deg, ${P.blueprintLine} 1px, transparent 1px)`, backgroundSize: "44px 44px" }} />
        <div style={{ position: "absolute", top: "10%", right: "8%", width: "380px", height: "380px", borderRadius: "50%", background: "radial-gradient(circle, rgba(0,122,227,0.22) 0%, transparent 65%)", filter: "blur(64px)", pointerEvents: "none" }} />
        <motion.div style={{ position: "relative" }} {...(reduced ? {} : { initial: { opacity: 0, y: 24 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.65 } })}>
          <h1 style={{ fontFamily: DISPLAY, fontSize: "clamp(32px,5vw,58px)", fontWeight: 800, color: P.white, marginBottom: "16px", letterSpacing: "-0.5px" }}>
            Simple, transparent pricing.
          </h1>
          <p style={{ fontSize: "15px", color: "rgba(255,255,255,0.45)", maxWidth: "460px", margin: "0 auto", lineHeight: 1.7 }}>
            Start with the foundation. Add what you need as you grow. No setup fees, no long-term contracts.
          </p>
        </motion.div>
      </section>

      {/* Foundation pricing card */}
      <section id="foundation" style={{ background: T.bgAlt, padding: "100px clamp(24px,6vw,80px) 80px", position: "relative", overflow: "hidden" }}>
        <MeshBackground simple />
        <div style={{ maxWidth: "860px", margin: "0 auto", position: "relative" }}>

          <motion.div
            {...(reduced ? {} : { initial: { opacity: 0, y: 24 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } })}
            style={{
              background: P.navy, borderRadius: "24px",
              border: "1px solid rgba(0,122,227,0.28)",
              boxShadow: "0 24px 80px rgba(0,0,0,0.22)",
              overflow: "hidden",
            }}
          >
            {/* Card top bar */}
            <div style={{ background: "rgba(0,122,227,0.12)", borderBottom: "1px solid rgba(0,122,227,0.18)", padding: "12px 48px 12px clamp(24px,4vw,48px)", display: "flex", alignItems: "center", gap: "10px" }}>
              <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#22C55E" }} />
              <span style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", color: "#93c5fd" }}>Foundation Plan — Live Now</span>
            </div>

            <div style={{ padding: "48px clamp(24px,4vw,56px)", display: "grid", gridTemplateColumns: "1fr auto", gap: "48px", alignItems: "start" }} className="t-two-col">
              {/* Left: what's included */}
              <div>
                <h2 style={{ fontFamily: DISPLAY, fontSize: "clamp(20px,2.5vw,28px)", fontWeight: 800, color: P.white, marginBottom: "8px", letterSpacing: "-0.3px" }}>
                  AI Chat + Knowledge Base + Analytics
                </h2>
                <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.45)", lineHeight: 1.7, marginBottom: "28px", maxWidth: "420px" }}>
                  Everything your business needs to capture and respond to every inquiry, 24 hours a day, seven days a week.
                </p>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px 20px" }}>
                  {FOUNDATION_FEATURES.map((f, i) => (
                    <motion.div key={f}
                      {...(reduced ? {} : { initial: { opacity: 0, x: -8 }, whileInView: { opacity: 1, x: 0 }, viewport: { once: true }, transition: { duration: 0.3, delay: i * 0.05 } })}
                      style={{ display: "flex", alignItems: "center", gap: "8px" }}
                    >
                      <div style={{ flexShrink: 0 }}>{CHECK_WHITE}</div>
                      <span style={{ fontSize: "13px", color: "rgba(255,255,255,0.75)", lineHeight: 1.45 }}>{f}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Right: price + CTA */}
              <div style={{ textAlign: "center", minWidth: "180px" }}>
                <div style={{ fontFamily: DISPLAY, fontSize: "54px", fontWeight: 800, color: P.white, letterSpacing: "-2px", lineHeight: 1 }}>$40</div>
                <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.45)", marginTop: "4px", marginBottom: "24px" }}>per month</div>
                <button className="t-btn-primary" onClick={() => setPage("Contact")} style={{
                  background: P.blue, color: P.white, border: "none",
                  padding: "13px 22px", borderRadius: "10px",
                  fontSize: "14px", fontWeight: 700, fontFamily: BODY,
                  width: "100%",
                }}>
                  Get Started
                </button>
                <div style={{ marginTop: "14px", fontSize: "11px", color: "rgba(255,255,255,0.3)", lineHeight: 1.6 }}>
                  No setup fee for first customers.<br />Cancel anytime.
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Add-ons */}
      <section id="addons" style={{ background: T.bg, padding: "80px clamp(24px,6vw,80px) 100px" }}>
        <div style={{ maxWidth: "920px", margin: "0 auto" }}>
          <motion.div {...(reduced ? {} : { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.55 } })}
            style={{ textAlign: "center", marginBottom: "52px" }}>
            <SectionHead
              heading="Stack on what you need."
              sub="Each add-on layers on the foundation plan. No additional setup cost. Add or remove at any time."
            />
          </motion.div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "18px" }}>
            {ADDONS.map((addon, i) => (
              <AddonCard key={addon.id} addon={addon} i={i} reduced={reduced} setPage={setPage} />
            ))}
          </div>

          {/* Pricing summary row */}
          <motion.div
            {...(reduced ? {} : { initial: { opacity: 0, y: 12 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.45, delay: 0.3 } })}
            style={{
              marginTop: "36px", padding: "20px 28px",
              background: T.bgAlt, border: `1px solid ${T.border}`, borderRadius: "12px",
              display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "14px",
            }}
          >
            <div>
              <div style={{ fontSize: "13px", fontWeight: 700, color: T.text, marginBottom: "2px" }}>
                Example: Foundation + Booking + Follow-Up
              </div>
              <div style={{ fontSize: "12px", color: T.textMuted }}>
                The most popular combination for small service businesses.
              </div>
            </div>
            <div style={{ fontFamily: DISPLAY, fontSize: "22px", fontWeight: 800, color: P.blue, letterSpacing: "-0.3px", flexShrink: 0 }}>
              $75/mo
            </div>
          </motion.div>
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

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: "14px", maxWidth: "880px", margin: "0 auto" }}>
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
        <div style={{ position: "absolute", top: "20%", right: "10%", width: "340px", height: "340px", borderRadius: "50%", background: "radial-gradient(circle, rgba(0,122,227,0.22) 0%, transparent 65%)", filter: "blur(80px)", pointerEvents: "none" }} />
        <motion.div
          {...(reduced ? {} : { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.55 } })}
          style={{ maxWidth: "600px", margin: "0 auto", textAlign: "center", position: "relative" }}
        >
          <h2 style={{ fontFamily: DISPLAY, fontSize: "clamp(26px,3.5vw,44px)", fontWeight: 800, color: P.white, marginBottom: "18px", letterSpacing: "-0.4px" }}>
            Not sure which add-ons you need?
          </h2>
          <p style={{ fontSize: "15px", color: "rgba(255,255,255,0.45)", lineHeight: 1.75, marginBottom: "32px" }}>
            Book a free call and we'll walk through your workflow together and tell you exactly what fits.
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
