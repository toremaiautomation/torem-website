import { motion } from "framer-motion";
import { T, P, DISPLAY, BODY } from "../theme";
import { MeshBackground } from "../components/MeshBackground";
import { SectionHead } from "../components/SectionHead";
import { PageHead } from "../components/PageHead";
import { useReducedMotion } from "../hooks/useReducedMotion";

const FOUNDERS = [
  {
    initial: "E", name: "Edlin", role: "Founder and Tech Lead",
    bio: "IT infrastructure and automation specialist who saw small businesses losing customers to missed inquiries and slow follow-up. Built Torem AI to give every small business the same 24/7 responsiveness that big brands have.",
    skills: ["n8n", "Supabase", "React", "Automation"],
  },
  {
    initial: "A", name: "Adrian", role: "Founder and Business Lead",
    bio: "Business strategist focused on helping small businesses grow without adding overhead. Handles growth, partnerships, and client success at Torem AI.",
    skills: ["Business Development", "Sales", "Strategy", "Client Success"],
  },
];

const VALUES = [
  { heading: "Built for operators, not IT teams.", body: "If you need a developer to run it, we haven't done our job. Every Torem system is designed to work hands-off from day one." },
  { heading: "Honest about what AI can do.", body: "We don't overpromise. AI is powerful, but it works best as a support layer, not a full replacement for human judgment." },
  { heading: "Small business first, always.", body: "Our pricing, setup times, and support are designed for 1-5 person crews, not enterprise companies with IT departments." },
];

export default function AboutPage({ setPage }) {
  const reduced = useReducedMotion();
  const fadeUp = (delay = 0) =>
    reduced ? {} : {
      initial: { opacity: 0, y: 24 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true, margin: "-60px" },
      transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] },
    };

  return (
    <>
      <PageHead
        title="About Torem AI | Built for Small Service Businesses"
        description="Torem AI was founded to give small contractors the same 24/7 customer responsiveness that big brands have, without the enterprise price tag or IT team."
      />

      {/* Hero */}
      <section style={{ background: P.navy, padding: "110px clamp(24px,6vw,80px) 72px", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none", backgroundImage: `linear-gradient(${P.blueprintLine} 1px, transparent 1px), linear-gradient(90deg, ${P.blueprintLine} 1px, transparent 1px)`, backgroundSize: "44px 44px" }} />
        <div style={{ position: "absolute", top: "10%", right: "8%", width: "380px", height: "380px", borderRadius: "50%", background: "radial-gradient(circle, rgba(0,122,227,0.22) 0%, transparent 65%)", filter: "blur(64px)", pointerEvents: "none" }} />
        <motion.div style={{ position: "relative" }} {...(reduced ? {} : { initial: { opacity: 0, y: 24 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.65 } })}>
          <h1 style={{ fontFamily: DISPLAY, fontSize: "clamp(32px,5vw,58px)", fontWeight: 800, color: P.white, marginBottom: "16px", letterSpacing: "-0.5px" }}>
            Built by builders
          </h1>
          <p style={{ fontSize: "15px", color: "rgba(255,255,255,0.45)", maxWidth: "460px", margin: "0 auto", lineHeight: 1.7 }}>
            Torem AI started with a simple belief: businesses shouldn't waste skilled hours on work that machines can handle.
          </p>
        </motion.div>
      </section>

      {/* Mission */}
      <section style={{ background: T.bg, padding: "100px clamp(24px,6vw,80px)" }}>
        <div style={{ maxWidth: "780px", margin: "0 auto", textAlign: "center" }}>
          <motion.div {...fadeUp()}>
            <SectionHead heading="Making automation accessible." />
            <p style={{ fontSize: "15px", color: T.textMuted, lineHeight: 1.85, marginBottom: "20px" }}>
              Most automation tools are too expensive, too generic, or too complicated for small and mid-sized businesses. The result is that companies keep doing things manually, not because they want to, but because nobody has built them the right solution.
            </p>
            <p style={{ fontSize: "15px", color: T.textMuted, lineHeight: 1.85 }}>
              Torem fills that gap. We build practical, hands-off automations that work for real businesses, not just enterprise companies with a full IT department.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section style={{ background: T.bgAlt, padding: "100px clamp(24px,6vw,80px)", position: "relative", overflow: "hidden" }}>
        <MeshBackground simple />
        <div style={{ maxWidth: "1140px", margin: "0 auto", position: "relative" }}>
          <motion.div {...fadeUp()} style={{ textAlign: "center", marginBottom: "52px" }}>
            <SectionHead heading="How we think." sub="The principles that guide every product decision at Torem." />
          </motion.div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "24px" }}>
            {VALUES.map((v, i) => (
              <motion.div key={v.heading}
                {...(reduced ? {} : { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] } })}
                className="t-card"
                style={{ background: T.bg, border: `1px solid ${T.border}`, borderRadius: "16px", padding: "32px", boxShadow: "0 4px 16px rgba(0,0,0,0.04)" }}
              >
                <div style={{ width: "36px", height: "4px", background: P.blue, borderRadius: "2px", marginBottom: "20px" }} />
                <h3 style={{ fontFamily: DISPLAY, fontSize: "17px", fontWeight: 800, color: T.text, marginBottom: "10px", lineHeight: 1.3 }}>{v.heading}</h3>
                <p style={{ fontSize: "13px", color: T.textMuted, lineHeight: 1.8 }}>{v.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section style={{ background: T.bg, padding: "100px clamp(24px,6vw,80px)" }}>
        <div style={{ maxWidth: "1140px", margin: "0 auto" }}>
          <motion.div {...fadeUp()} style={{ textAlign: "center", marginBottom: "52px" }}>
            <SectionHead heading="The team behind Torem." />
          </motion.div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "24px", maxWidth: "820px", margin: "0 auto" }}>
            {FOUNDERS.map(({ initial, name, role, bio, skills }, i) => (
              <motion.div key={name}
                {...(reduced ? {} : { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.5, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] } })}
                className="t-card"
                style={{ background: T.bgAlt, border: `1px solid ${T.border}`, borderRadius: "20px", padding: "40px", textAlign: "center", boxShadow: "0 4px 20px rgba(0,0,0,0.04)" }}
              >
                <div style={{ width: "72px", height: "72px", borderRadius: "50%", background: `linear-gradient(135deg, ${P.blue}, ${P.navy})`, margin: "0 auto 20px", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: `0 0 0 4px ${T.bgAlt}, 0 8px 24px rgba(0,122,227,0.25)` }}>
                  <span style={{ fontFamily: DISPLAY, color: P.white, fontSize: "26px", fontWeight: 800 }}>{initial}</span>
                </div>
                <h3 style={{ fontFamily: DISPLAY, fontSize: "20px", fontWeight: 800, color: T.text }}>{name}</h3>
                <p style={{ fontSize: "12px", color: T.blue, fontWeight: 600, marginBottom: "16px", marginTop: "4px", letterSpacing: "0.5px", textTransform: "uppercase" }}>{role}</p>
                <p style={{ fontSize: "13px", color: T.textMuted, lineHeight: 1.8, marginBottom: "20px" }}>{bio}</p>
                <div style={{ display: "flex", gap: "8px", justifyContent: "center", flexWrap: "wrap" }}>
                  {skills.map(tag => (
                    <span key={tag} style={{ fontSize: "11px", fontWeight: 600, color: T.blue, background: T.bgAlt2, border: `1px solid ${T.border}`, padding: "4px 10px", borderRadius: "100px" }}>{tag}</span>
                  ))}
                </div>
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
          style={{ maxWidth: "560px", margin: "0 auto", textAlign: "center", position: "relative" }}
        >
          <h2 style={{ fontFamily: DISPLAY, fontSize: "clamp(26px,3.5vw,44px)", fontWeight: 800, color: P.white, marginBottom: "18px", letterSpacing: "-0.4px" }}>
            Ready to work with us?
          </h2>
          <p style={{ fontSize: "15px", color: "rgba(255,255,255,0.45)", lineHeight: 1.75, marginBottom: "32px" }}>
            Book a free 30-minute call. We'll listen first and show you exactly where automation can help.
          </p>
          <button className="t-btn-primary" onClick={() => setPage("Contact")} style={{
            background: P.blue, color: P.white, border: "none",
            padding: "14px 28px", borderRadius: "9px", fontSize: "14px", fontWeight: 600, fontFamily: BODY,
          }}>
            Get in Touch
          </button>
        </motion.div>
      </section>
    </>
  );
}
