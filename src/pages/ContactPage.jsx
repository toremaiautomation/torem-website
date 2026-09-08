import { useState } from "react";
import { motion } from "framer-motion";
import { T, P, DISPLAY, BODY, fieldStyle } from "../theme";
import { PageHead } from "../components/PageHead";
import { useReducedMotion } from "../hooks/useReducedMotion";

const STEP_ITEMS = [
  { icon: "→", title: "Free 30-min strategy call", sub: "No commitment required" },
  { icon: "→", title: "Custom automation roadmap", sub: "Delivered after the call" },
  { icon: "→", title: "First automation live in 3 to 7 days", sub: "After you approve the plan" },
];

export default function ContactPage() {
  const reduced = useReducedMotion();
  const FIELD = fieldStyle();
  const [form, setForm] = useState({ name: "", email: "", phone: "", company: "", service: "", message: "" });
  const [status, setStatus] = useState("idle");

  const set = k => e => setForm({ ...form, [k]: e.target.value });

  const submit = async () => {
    if (!form.name || !form.email || !form.message) { setStatus("error"); return; }
    setStatus("sending");
    try {
      await fetch("https://toremai.app.n8n.cloud/webhook/torem-contact", {
        method: "POST",
        mode: "cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          company: form.company,
          service: form.service,
          message: form.message,
          source: "contact-form",
        }),
      });
      setStatus("success");
    } catch {
      setStatus("fetchError");
    }
  };

  return (
    <>
      <PageHead
        title="Contact Torem AI | Book a Free Strategy Call"
        description="Reach out to Torem AI to book a free 30-minute strategy call. We'll map out where automation saves your business the most time."
      />

      {/* Hero */}
      <section style={{ background: P.navy, padding: "110px clamp(24px,6vw,80px) 72px", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none", backgroundImage: `linear-gradient(${P.blueprintLine} 1px, transparent 1px), linear-gradient(90deg, ${P.blueprintLine} 1px, transparent 1px)`, backgroundSize: "44px 44px" }} />
        <div style={{ position: "absolute", top: "10%", right: "8%", width: "360px", height: "360px", borderRadius: "50%", background: "radial-gradient(circle, rgba(0,122,227,0.2) 0%, transparent 65%)", filter: "blur(64px)", pointerEvents: "none" }} />
        <motion.div style={{ position: "relative" }} {...(reduced ? {} : { initial: { opacity: 0, y: 24 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.6 } })}>
          <h1 style={{ fontFamily: DISPLAY, fontSize: "clamp(32px,5vw,58px)", fontWeight: 800, color: P.white, marginBottom: "16px", letterSpacing: "-0.5px" }}>
            Let's Talk
          </h1>
          <p style={{ fontSize: "15px", color: "rgba(255,255,255,0.45)", maxWidth: "400px", margin: "0 auto", lineHeight: 1.7 }}>
            Tell us about your workflow and we'll show you where automation saves the most time.
          </p>
        </motion.div>
      </section>

      {/* Content */}
      <section style={{ background: T.bgAlt2, padding: "88px clamp(24px,6vw,80px)" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1.5fr", gap: "64px", alignItems: "start" }} className="t-two-col">

          {/* Left */}
          <motion.div {...(reduced ? {} : { initial: { opacity: 0, x: -20 }, whileInView: { opacity: 1, x: 0 }, viewport: { once: true }, transition: { duration: 0.5 } })}>
            <h2 style={{ fontFamily: DISPLAY, fontSize: "22px", fontWeight: 800, color: T.text, marginBottom: "14px" }}>What to expect</h2>
            <p style={{ fontSize: "13px", color: T.textMuted, lineHeight: 1.85, marginBottom: "32px" }}>
              After you reach out we'll schedule a 30-minute discovery call to understand your workflow and scope the right solution. No sales pitch, just an honest conversation about what's slowing you down.
            </p>
            {STEP_ITEMS.map(({ icon, title, sub }, i) => (
              <motion.div key={title} {...(reduced ? {} : { initial: { opacity: 0, x: -12 }, whileInView: { opacity: 1, x: 0 }, viewport: { once: true }, transition: { duration: 0.4, delay: i * 0.1 } })}
                style={{ display: "flex", gap: "14px", marginBottom: "22px" }}>
                <div style={{ width: "42px", height: "42px", background: T.bgAlt, border: `1px solid ${T.border}`, borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: "18px", color: T.blue, fontWeight: 700 }}>{icon}</div>
                <div>
                  <div style={{ fontSize: "13px", fontWeight: 700, color: T.text }}>{title}</div>
                  <div style={{ fontSize: "12px", color: T.textMuted, marginTop: "2px" }}>{sub}</div>
                </div>
              </motion.div>
            ))}
            <div style={{ marginTop: "36px", padding: "18px 20px", background: T.bg, borderRadius: "10px", border: `1px solid ${T.border}` }}>
              <div style={{ fontSize: "11px", color: T.textMuted, marginBottom: "4px", textTransform: "uppercase", letterSpacing: "1px" }}>Email us directly</div>
              <a href="mailto:toremaiautomation@gmail.com" style={{ fontSize: "14px", fontWeight: 700, color: T.blue, textDecoration: "underline", fontFamily: BODY }}>toremaiautomation@gmail.com</a>
            </div>
          </motion.div>

          {/* Right - Form (logic untouched) */}
          <motion.div {...(reduced ? {} : { initial: { opacity: 0, x: 20 }, whileInView: { opacity: 1, x: 0 }, viewport: { once: true }, transition: { duration: 0.5, delay: 0.1 } })}
            style={{ background: T.bg, borderRadius: "16px", padding: "40px", border: `1px solid ${T.border}`, boxShadow: "0 8px 32px rgba(0,0,0,0.05)" }}>
            {status === "success" ? (
              <div style={{ textAlign: "center", padding: "48px 0" }}>
                <div style={{ width: "56px", height: "56px", borderRadius: "50%", background: "#f0fdf4", border: "2px solid #86efac", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                </div>
                <h3 style={{ fontFamily: DISPLAY, fontSize: "22px", fontWeight: 800, color: T.text, marginBottom: "10px" }}>Message received!</h3>
                <p style={{ color: T.textMuted, fontSize: "14px", lineHeight: 1.7 }}>We'll be in touch within 24 hours.</p>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
                <h3 style={{ fontFamily: DISPLAY, fontSize: "18px", fontWeight: 800, color: T.text }}>Send us a message</h3>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
                  <div>
                    <label style={{ display: "block", fontSize: "11px", fontWeight: 700, color: T.textMuted, marginBottom: "6px", letterSpacing: "0.5px", textTransform: "uppercase" }}>Your Name *</label>
                    <input style={FIELD} value={form.name} onChange={set("name")} placeholder="John Smith" />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "11px", fontWeight: 700, color: T.textMuted, marginBottom: "6px", letterSpacing: "0.5px", textTransform: "uppercase" }}>Email *</label>
                    <input style={FIELD} type="email" value={form.email} onChange={set("email")} placeholder="john@company.com" />
                  </div>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
                  <div>
                    <label style={{ display: "block", fontSize: "11px", fontWeight: 700, color: T.textMuted, marginBottom: "6px", letterSpacing: "0.5px", textTransform: "uppercase" }}>Phone</label>
                    <input style={FIELD} type="tel" value={form.phone} onChange={set("phone")} placeholder="(555) 000-0000" />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "11px", fontWeight: 700, color: T.textMuted, marginBottom: "6px", letterSpacing: "0.5px", textTransform: "uppercase" }}>Company</label>
                    <input style={FIELD} value={form.company} onChange={set("company")} placeholder="Acme Co." />
                  </div>
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "11px", fontWeight: 700, color: T.textMuted, marginBottom: "6px", letterSpacing: "0.5px", textTransform: "uppercase" }}>Service Interest</label>
                  <select style={FIELD} value={form.service} onChange={set("service")}>
                    <option value="">Select a service...</option>
                    <option>AI Chat + Knowledge Base</option>
                    <option>Booking Built In</option>
                    <option>Analytics &amp; Reporting</option>
                    <option>Automated Follow-Up</option>
                    <option>Review Generation</option>
                    <option>Instant Response</option>
                    <option>Not sure yet</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "11px", fontWeight: 700, color: T.textMuted, marginBottom: "6px", letterSpacing: "0.5px", textTransform: "uppercase" }}>Tell us about your workflow *</label>
                  <textarea style={{ ...FIELD, minHeight: "96px", resize: "vertical" }} value={form.message} onChange={set("message")} placeholder="Tell us about your business — what questions do customers ask most?" />
                </div>
                {status === "error" && (
                  <div style={{ fontSize: "12px", color: "#991b1b", background: "#fef2f2", border: "1px solid #fca5a5", padding: "10px 14px", borderRadius: "6px" }}>
                    Please fill in your name, email, and message.
                  </div>
                )}
                {status === "fetchError" && (
                  <div style={{ fontSize: "12px", color: "#991b1b", background: "#fef2f2", border: "1px solid #fca5a5", padding: "10px 14px", borderRadius: "6px" }}>
                    Something went wrong. Please email us directly at <a href="mailto:toremaiautomation@gmail.com" style={{ color: "#991b1b" }}>toremaiautomation@gmail.com</a>
                  </div>
                )}
                <button className="t-btn-primary" onClick={submit} disabled={status === "sending"} style={{
                  background: status === "sending" ? "#94a3b8" : T.blue,
                  color: P.white, border: "none", padding: "13px",
                  borderRadius: "8px", fontSize: "14px", fontWeight: 700, fontFamily: BODY,
                }}>
                  {status === "sending" ? "Sending..." : "Send Message"}
                </button>
              </div>
            )}
          </motion.div>
        </div>
      </section>
    </>
  );
}
