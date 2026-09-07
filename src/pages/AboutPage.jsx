import { theme, P, DISPLAY, BODY } from "../theme";
import { SectionHead } from "../components/SectionHead";
import { Tag } from "../components/Tag";

export default function AboutPage({ setPage, dark }) {
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
                bio:"IT infrastructure & automation specialist who saw small businesses losing customers to missed inquiries and slow follow-up. Built Torem AI to give every small business the same 24/7 responsiveness that big brands have.",
                skills:["n8n","Supabase","React","Automation"],
              },
              {
                initial:"A", name:"Adrian", role:"Founder & Business Lead",
                bio:"Business strategist focused on helping small businesses grow without adding overhead. Handles growth, partnerships, and client success at Torem AI.",
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
              { icon:"✅", t:"Practical first", b:"We build for real-world use, not demos. Your chatbot is tested and tuned before it ever talks to a customer." },
              { icon:"🔒", t:"Simple to manage", b:"Non-technical teams can understand and manage everything we build. Clear documentation is part of every delivery." },
              { icon:"⚡", t:"Fast delivery", b:"Your chatbot goes live in days, not months. No long implementation timelines or IT projects." },
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
        <h2 style={{ fontFamily: DISPLAY, fontSize: "clamp(24px,3vw,36px)", fontWeight: 800, color: P.white, marginBottom: "14px" }}>Let's get your chatbot live</h2>
        <button className="t-btn-primary" onClick={() => setPage("Contact")} style={{ background:P.white, color:P.blue, border:"none", padding:"13px 28px", borderRadius:"8px", fontSize:"13px", fontWeight:700, fontFamily:BODY, marginTop:"6px" }}>
          Get in Touch →
        </button>
      </section>
    </>
  );
}
