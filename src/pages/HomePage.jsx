import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { T, P, DISPLAY, BODY } from "../theme";
import { MeshBackground } from "../components/MeshBackground";
import { SectionHead } from "../components/SectionHead";
import { HubDiagram } from "../components/HubDiagram";
import { ChatPreview } from "../components/ChatPreview";
import { PageHead } from "../components/PageHead";
import { useReducedMotion } from "../hooks/useReducedMotion";
import ROICalculator from "../components/ROICalculator";
import FAQSection from "../components/FAQSection";

const fadeUp = (rm, delay = 0) =>
  rm
    ? {}
    : { initial: { opacity: 0, y: 28 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: "-60px" }, transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] } };

const PAIN_MSGS = [
  { text: "I called 3 times and no one answered.", author: "Lost lead" },
  { text: "Couldn't find your hours anywhere.", author: "Weekend inquiry" },
  { text: "Went with someone who replied faster.", author: "Missed booking" },
  { text: "I just needed a quick estimate...", author: "Late-night visit" },
];

const TABS = [
  { id: "chat",      label: "Chat",      heading: "Instant answers, zero wait time", body: "Your AI assistant responds to every inquiry the moment it arrives, day or night. Answers FAQs, qualifies leads, and captures contact info without a human ever picking up the phone." },
  { id: "booking",   label: "Booking",   heading: "Real appointments, automatically set", body: "Connects directly to your calendar. Visitors pick a slot, the AI confirms it, and a notification lands in your inbox. No back-and-forth, no missed calls." },
  { id: "analytics", label: "Analytics", heading: "See what's driving results", body: "A clean dashboard shows what visitors ask most, which conversations convert to bookings, and where people drop off. Make better decisions with real data." },
  { id: "followup",  label: "Follow-up", heading: "Automated follow-ups that close jobs", body: "After every chat, the system sends a personalized follow-up sequence. Estimates, reminders, review requests — all on autopilot so no lead goes cold." },
];

function PainCard({ msg, i, reduced }) {
  const offsets = [{ x: -30, rotate: -3 }, { x: 40, rotate: 2 }, { x: -10, rotate: -1.5 }, { x: 20, rotate: 1 }];
  const o = offsets[i % offsets.length];
  return (
    <motion.div
      {...(reduced ? {} : {
        initial: { opacity: 0, x: o.x, rotate: o.rotate },
        whileInView: { opacity: 1, x: 0, rotate: 0 },
        viewport: { once: true, margin: "-40px" },
        transition: { duration: 0.6, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] },
        whileHover: { y: -4, boxShadow: "0 16px 40px rgba(0,0,0,0.12)", transition: { type: "spring", stiffness: 400, damping: 24 } },
      })}
      style={{
        background: T.bg, border: `1px solid ${T.border}`, borderRadius: "14px",
        padding: "20px 22px", boxShadow: "0 4px 16px rgba(0,0,0,0.06)",
        cursor: "default",
      }}
    >
      <p style={{ fontSize: "15px", color: T.text, lineHeight: 1.55, marginBottom: "10px", fontStyle: "italic" }}>"{msg.text}"</p>
      <span style={{ fontSize: "11px", fontWeight: 600, color: T.textMuted, letterSpacing: "0.4px", textTransform: "uppercase" }}>{msg.author}</span>
    </motion.div>
  );
}

function TabSwitcher({ reduced }) {
  const [active, setActive] = useState("chat");
  const tab = TABS.find(t => t.id === active);

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "40px", alignItems: "start", maxWidth: "960px", margin: "0 auto" }} className="t-two-col">
      {/* Left sticky nav */}
      <div style={{ position: "sticky", top: "96px" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          {TABS.map(t => (
            <button
              key={t.id}
              onClick={() => setActive(t.id)}
              style={{
                textAlign: "left", border: "none", borderRadius: "10px",
                padding: "14px 18px", fontFamily: BODY, fontSize: "14px", fontWeight: active === t.id ? 700 : 500,
                color: active === t.id ? P.white : T.text,
                background: active === t.id ? P.navy : T.bgAlt,
                borderLeft: `3px solid ${active === t.id ? P.blue : "transparent"}`,
                cursor: "pointer", transition: "background 0.2s, color 0.2s, border-color 0.2s",
              }}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Right panel */}
      <motion.div
        key={active}
        {...(reduced ? {} : {
          initial: { opacity: 0, x: 20 },
          animate: { opacity: 1, x: 0 },
          transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
        })}
        style={{
          background: T.bgAlt, border: `1px solid ${T.border}`, borderRadius: "16px",
          padding: "36px 32px", minHeight: "240px",
        }}
      >
        <h3 style={{ fontFamily: DISPLAY, fontSize: "clamp(18px,2vw,24px)", fontWeight: 800, color: T.text, marginBottom: "16px", letterSpacing: "-0.2px" }}>{tab.heading}</h3>
        <p style={{ fontSize: "15px", color: T.textMuted, lineHeight: 1.75 }}>{tab.body}</p>
      </motion.div>
    </div>
  );
}

export default function HomePage({ setPage }) {
  const reduced = useReducedMotion();
  const [urlVal, setUrlVal] = useState("");

  return (
    <>
      <PageHead
        title="Torem AI | AI Chat Automation for Home Service Contractors"
        description="Torem AI automates customer conversations, books appointments, and follows up on leads so you never miss another job inquiry."
      />

      {/* 1. HERO */}
      <section style={{ position: "relative", overflow: "hidden", background: P.navy, minHeight: "92vh", display: "flex", alignItems: "center", padding: "80px clamp(24px,6vw,80px)" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: `linear-gradient(${P.blueprintLine} 1px, transparent 1px), linear-gradient(90deg, ${P.blueprintLine} 1px, transparent 1px)`, backgroundSize: "44px 44px", pointerEvents: "none" }} />
        <div style={{ position: "absolute", top: "12%", right: "5%", width: "520px", height: "520px", borderRadius: "50%", background: "radial-gradient(circle, rgba(0,122,227,0.22) 0%, transparent 65%)", filter: "blur(64px)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "8%", left: "2%", width: "340px", height: "340px", borderRadius: "50%", background: "radial-gradient(circle, rgba(23,84,207,0.12) 0%, transparent 68%)", filter: "blur(80px)", pointerEvents: "none" }} />

        <div style={{ maxWidth: "1140px", margin: "0 auto", position: "relative", width: "100%" }}>
          <motion.div {...(reduced ? {} : { initial: { opacity: 0, y: 32 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } })}>
            <h1 style={{ fontFamily: DISPLAY, fontSize: "clamp(38px,5.8vw,72px)", fontWeight: 800, color: P.white, lineHeight: 1.08, maxWidth: "760px", marginBottom: "24px", letterSpacing: "-1px" }} className="t-hero-head">
              Never miss another<br />
              <span style={{ color: "#5BB3F5" }}>customer inquiry.</span>
            </h1>
            <p style={{ fontSize: "17px", color: "rgba(255,255,255,0.5)", lineHeight: 1.75, maxWidth: "480px", marginBottom: "40px" }}>
              AI-powered chat automation that answers questions, books appointments, and shows you what is working. Built for small contractors, not enterprise IT teams.
            </p>

            {/* URL input CTA */}
            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", maxWidth: "520px" }}>
              <input
                type="text"
                value={urlVal}
                onChange={e => setUrlVal(e.target.value)}
                placeholder="yourwebsite.com"
                style={{
                  flex: 1, minWidth: "200px", padding: "13px 16px", borderRadius: "9px",
                  border: "1px solid rgba(0,122,227,0.35)", background: "rgba(255,255,255,0.06)",
                  color: P.white, fontSize: "14px", fontFamily: BODY,
                  outline: "none",
                }}
                onFocus={e => { e.target.style.borderColor = P.blue; e.target.style.boxShadow = "0 0 0 3px rgba(0,122,227,0.2)"; }}
                onBlur={e => { e.target.style.borderColor = "rgba(0,122,227,0.35)"; e.target.style.boxShadow = "none"; }}
              />
              <button className="t-btn-primary" onClick={() => setPage("Contact")} style={{
                background: P.blue, color: P.white, border: "none",
                padding: "13px 24px", borderRadius: "9px", fontSize: "14px", fontWeight: 600, fontFamily: BODY, whiteSpace: "nowrap",
              }}>
                Get Started
              </button>
            </div>

            <div style={{ marginTop: "18px", display: "flex", gap: "20px", flexWrap: "wrap" }}>
              {["No credit card required", "Setup in days, not months", "Cancel anytime"].map(t => (
                <span key={t} style={{ fontSize: "12px", color: "rgba(255,255,255,0.4)", display: "flex", alignItems: "center", gap: "5px" }}>
                  <span style={{ color: "#5BB3F5", fontSize: "14px" }}>+</span> {t}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. FLOATING PAIN-POINT CARDS */}
      <section style={{ padding: "100px clamp(24px,6vw,80px)", background: T.bgAlt, position: "relative", overflow: "hidden" }}>
        <MeshBackground simple />
        <div style={{ maxWidth: "1140px", margin: "0 auto", position: "relative" }}>
          <motion.div {...fadeUp(reduced)} style={{ textAlign: "center", marginBottom: "60px" }}>
            <SectionHead
              heading="Every missed call is a missed job."
              sub="These are the moments your business loses customers while you are on the roof, at a job site, or simply asleep."
            />
          </motion.div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "20px" }}>
            {PAIN_MSGS.map((m, i) => <PainCard key={i} msg={m} i={i} reduced={reduced} />)}
          </div>
        </div>
      </section>

      {/* 3. HUB-AND-SPOKE DIAGRAM */}
      <section style={{ padding: "100px clamp(24px,6vw,80px)", background: T.bg }}>
        <div style={{ maxWidth: "1140px", margin: "0 auto" }}>
          <motion.div {...fadeUp(reduced)} style={{ textAlign: "center", marginBottom: "56px" }}>
            <SectionHead
              heading="One AI hub. Every channel covered."
              sub="Torem connects your chat, booking, follow-up, reviews, and analytics into a single automated system that runs itself."
            />
          </motion.div>
          <HubDiagram />
        </div>
      </section>

      {/* 4. TAB SWITCHER */}
      <section style={{ padding: "100px clamp(24px,6vw,80px)", background: T.bgAlt, position: "relative", overflow: "hidden" }}>
        <MeshBackground simple />
        <div style={{ maxWidth: "1140px", margin: "0 auto", position: "relative" }}>
          <motion.div {...fadeUp(reduced)} style={{ textAlign: "center", marginBottom: "60px" }}>
            <SectionHead
              heading="Everything your business needs to convert leads."
              sub="Explore each module and see exactly how Torem works in practice."
            />
          </motion.div>
          <TabSwitcher reduced={reduced} />
        </div>
      </section>

      {/* 5. CHAT PRODUCT DEMO */}
      <section style={{ padding: "100px clamp(24px,6vw,80px)", background: T.bg }}>
        <div style={{ maxWidth: "1140px", margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "64px", alignItems: "center" }} className="t-two-col">
          <motion.div {...fadeUp(reduced)}>
            <SectionHead
              heading="Your customers get answers instantly."
              sub="Watch how Torem handles a real booking conversation from first hello to confirmed appointment, automatically."
              center={false}
            />
            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              {["Responds in under 3 seconds, any time of day", "Books directly into your calendar with no back-and-forth", "Sends confirmation and reminders automatically"].map((item, i) => (
                <motion.div key={i} {...(reduced ? {} : { initial: { opacity: 0, x: -16 }, whileInView: { opacity: 1, x: 0 }, viewport: { once: true }, transition: { duration: 0.4, delay: i * 0.1 } })}
                  style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
                  <div style={{ width: "20px", height: "20px", borderRadius: "50%", background: P.blue, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: "1px" }}>
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  </div>
                  <span style={{ fontSize: "14px", color: T.textMuted, lineHeight: 1.6 }}>{item}</span>
                </motion.div>
              ))}
            </div>
            <button className="t-btn-primary" onClick={() => setPage("Contact")} style={{
              marginTop: "32px", background: P.blue, color: P.white, border: "none",
              padding: "13px 26px", borderRadius: "9px", fontSize: "14px", fontWeight: 600, fontFamily: BODY,
            }}>
              See it live
            </button>
          </motion.div>
          <motion.div {...fadeUp(reduced, 0.12)}>
            <ChatPreview />
          </motion.div>
        </div>
      </section>

      {/* 6. ROI CALCULATOR */}
      <section style={{ padding: "100px clamp(24px,6vw,80px)", background: T.bgAlt, position: "relative", overflow: "hidden" }}>
        <MeshBackground simple />
        <div style={{ maxWidth: "900px", margin: "0 auto", position: "relative" }}>
          <motion.div {...fadeUp(reduced)} style={{ textAlign: "center", marginBottom: "52px" }}>
            <SectionHead
              heading="See the impact on your business."
              sub="Adjust the numbers to match your situation and see what automated follow-up could mean for your revenue."
            />
          </motion.div>
          <ROICalculator />
        </div>
      </section>

      {/* 7. FAQ */}
      <section style={{ padding: "100px clamp(24px,6vw,80px)", background: T.bg }}>
        <div style={{ maxWidth: "760px", margin: "0 auto" }}>
          <motion.div {...fadeUp(reduced)} style={{ textAlign: "center", marginBottom: "52px" }}>
            <SectionHead heading="Common questions." sub="Straight answers about how Torem works and what to expect." />
          </motion.div>
          <FAQSection />
        </div>
      </section>

      {/* 8. FINAL CTA */}
      <section style={{ padding: "100px clamp(24px,6vw,80px)", background: P.navy, position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: `linear-gradient(${P.blueprintLine} 1px, transparent 1px), linear-gradient(90deg, ${P.blueprintLine} 1px, transparent 1px)`, backgroundSize: "44px 44px", pointerEvents: "none" }} />
        <div style={{ position: "absolute", top: "20%", right: "10%", width: "380px", height: "380px", borderRadius: "50%", background: "radial-gradient(circle, rgba(0,122,227,0.25) 0%, transparent 65%)", filter: "blur(80px)", pointerEvents: "none" }} />
        <motion.div {...(reduced ? {} : { initial: { opacity: 0, y: 24 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.6 } })}
          style={{ maxWidth: "640px", margin: "0 auto", textAlign: "center", position: "relative" }}>
          <h2 style={{ fontFamily: DISPLAY, fontSize: "clamp(28px,3.8vw,48px)", fontWeight: 800, color: P.white, lineHeight: 1.1, marginBottom: "20px", letterSpacing: "-0.5px" }}>
            Ready to stop missing leads?
          </h2>
          <p style={{ fontSize: "16px", color: "rgba(255,255,255,0.5)", lineHeight: 1.75, marginBottom: "36px" }}>
            Join contractors who have put their customer conversations on autopilot. Setup is straightforward and takes days, not months.
          </p>
          <div style={{ display: "flex", gap: "14px", justifyContent: "center", flexWrap: "wrap" }}>
            <button className="t-btn-primary" onClick={() => setPage("Contact")} style={{
              background: P.blue, color: P.white, border: "none",
              padding: "14px 30px", borderRadius: "9px", fontSize: "15px", fontWeight: 600, fontFamily: BODY,
            }}>
              Get Started Today
            </button>
            <button className="t-btn-ghost" onClick={() => setPage("Services")} style={{
              background: "rgba(255,255,255,0.07)", color: P.white, border: "1px solid rgba(255,255,255,0.18)",
              padding: "14px 28px", borderRadius: "9px", fontSize: "15px", fontWeight: 500, fontFamily: BODY,
            }}>
              See Services
            </button>
          </div>
        </motion.div>
      </section>
    </>
  );
}
