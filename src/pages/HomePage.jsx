import { Bot, Calendar, BarChart2, Building2 } from "lucide-react";
import { T, P, DISPLAY, BODY } from "../theme";
import { SectionHead } from "../components/SectionHead";
import ROICalculator from "../components/ROICalculator";
import FAQSection from "../components/FAQSection";
import { PageHead } from "../components/PageHead";

export default function HomePage({ setPage }) {
  return (
    <>
      <PageHead
        title="Torem AI -- 24/7 AI Chat Automation for Small Businesses"
        description="Torem AI builds custom AI chat automation for small businesses -- answer inquiries, book appointments, and capture leads around the clock."
      />

      {/* HERO */}
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

        <div style={{
          maxWidth: "1140px", margin: "0 auto", position: "relative",
          animation: "fadeUp 0.7s ease both",
          background: "rgba(0,122,227,0.065)",
          backdropFilter: "blur(28px) saturate(160%)",
          WebkitBackdropFilter: "blur(28px) saturate(160%)",
          borderRadius: "20px",
          border: "1px solid rgba(0,122,227,0.14)",
          padding: "56px clamp(20px,4vw,64px) 48px",
          boxSizing: "border-box",
        }}>
          <div style={{ display:"inline-flex", alignItems:"center", gap:"8px", background:"rgba(0,122,227,0.14)", border:"1px solid rgba(0,122,227,0.28)", borderRadius:"100px", padding:"5px 14px", marginBottom:"28px" }}>
            <span style={{ fontSize:"11px", color:"#93c5fd", fontWeight:600, letterSpacing:"0.4px" }}>Built for small businesses</span>
          </div>

          <h1 style={{
            fontFamily: DISPLAY, fontSize: "clamp(38px, 5.8vw, 72px)",
            fontWeight: 800, color: P.white, lineHeight: 1.08,
            maxWidth: "820px", marginBottom: "22px", letterSpacing: "-1px",
          }} className="t-hero-head">
            Never miss another<br />
            <span style={{ color: "#5BB3F5" }}>customer inquiry.</span>
          </h1>

          <p style={{ fontSize: "17px", color: "rgba(255,255,255,0.5)", lineHeight: 1.75, maxWidth: "500px", marginBottom: "40px" }}>
            AI-powered chat automation that answers questions, books appointments, and shows you exactly what's working -- built for small businesses, not enterprise IT teams.
          </p>

          <div style={{ display:"flex", gap:"12px", flexWrap:"wrap" }}>
            <button className="t-btn-primary" onClick={() => setPage("Contact")} style={{
              background: P.blue, color: P.white, border: "none",
              padding: "14px 28px", borderRadius: "9px", fontSize: "14px", fontWeight: 600, fontFamily: BODY,
            }}>
              Get Your Chatbot Live
            </button>
            <button className="t-btn-ghost" onClick={() => setPage("Services")} style={{
              background: "transparent", color: "rgba(255,255,255,0.75)",
              border: "1px solid rgba(255,255,255,0.18)",
              padding: "14px 28px", borderRadius: "9px", fontSize: "14px", fontWeight: 500, fontFamily: BODY,
            }}>
              See How It Works →
            </button>
          </div>

          {/* Stat pills */}
          <div style={{ display:"flex", gap:"14px", marginTop:"60px", flexWrap:"wrap" }}>
            {[
              ["24/7", "customer coverage"],
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

      {/* PAIN POINTS */}
      <section style={{ background: T.bgAlt, padding: "80px clamp(24px,6vw,80px)" }}>
        <div style={{ maxWidth: "1140px", margin: "0 auto", textAlign: "center" }}>
          <SectionHead
            eyebrow="The Problem"
            heading="Sound familiar?"
            sub="These are the gaps that cost small businesses customers and revenue every single week."
          />
          <div style={{ display:"grid", gridTemplateColumns:"repeat(3, 1fr)", gap:"12px" }} className="t-three-col">
            {[
              "Leads fall through the cracks (missed chats, website inquiries)",
              "No one answers customer questions after hours or on weekends",
              "Following up with prospects takes hours every week",
              "Customers leave without booking because no one responded fast enough",
              "You're paying staff to answer the same questions over and over",
              "No visibility into which questions or channels drive the most interest",
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

      {/* SERVICES PREVIEW */}
      <section style={{ background: T.bg, padding: "96px clamp(24px,6vw,80px)" }}>
        <div style={{ maxWidth: "1140px", margin: "0 auto" }}>
          <SectionHead eyebrow="Features" heading="Everything your chatbot needs, from day one" sub="Four core capabilities that work together -- no IT setup, no long implementation." />
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(300px, 1fr))", gap:"22px" }} className="t-three-col">
            {[
              { Icon: Bot,       title:"Auto-Built Knowledge Base", desc:"Your chatbot learns your business from your website automatically. No manual setup -- it answers your customers' most common questions instantly, around the clock." },
              { Icon: Calendar,  title:"Booking Built In",          desc:"Let customers book appointments directly through the chat. No back-and-forth, no phone tag -- confirmed bookings land straight in your calendar." },
              { Icon: BarChart2, title:"See What's Working",        desc:"A clear dashboard showing which questions get asked most, how many bookings the chatbot drives, and when your customers are most active." },
              { Icon: Building2, title:"Built for Any Business",    desc:"Retail, services, healthcare, hospitality -- if you have customers asking questions, Torem AI works for you. No industry-specific templates required." },
            ].map(({ Icon, title, desc }) => (
              <div key={title} className="t-card" style={{
                background: T.bgAlt2, borderRadius: "14px",
                padding: "32px", border: `1px solid ${T.border}`,
                borderTop: `3px solid ${T.blue}`,
              }}>
                <div style={{ marginBottom: "16px" }}>
                  <Icon size={28} color={T.blue} />
                </div>
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

      {/* PROCESS */}
      <section style={{ background: P.navy, padding: "96px clamp(24px,6vw,80px)", position: "relative", overflow: "hidden" }}>
        <div style={{ position:"absolute", inset:0, pointerEvents:"none", backgroundImage:`linear-gradient(${P.blueprintLine} 1px, transparent 1px), linear-gradient(90deg, ${P.blueprintLine} 1px, transparent 1px)`, backgroundSize:"44px 44px" }} />
        <div style={{ maxWidth: "1140px", margin: "0 auto", position: "relative" }}>
          <SectionHead light eyebrow="How It Works" heading="Live in three steps" />
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(260px, 1fr))", gap:"32px" }} className="t-three-col">
            {[
              { step:"01", label:"Share your website", body:"Give us your URL and we handle the rest. Your AI reads your content and builds a knowledge base automatically -- no manual data entry." },
              { step:"02", label:"Go live in days",    body:"Your chatbot is configured, tested, and deployed in days. You see it working before it ever talks to a customer." },
              { step:"03", label:"Add what you need", body:"Start with chat and knowledge base, then layer in booking, analytics, and follow-up as your business grows." },
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

      {/* ROI CALCULATOR */}
      <ROICalculator setPage={setPage} />

      {/* FAQ */}
      <FAQSection />

      {/* CTA */}
      <section style={{
        background: P.blue,
        backgroundImage: "linear-gradient(160deg, rgba(255,255,255,0.09) 0%, rgba(255,255,255,0.02) 45%, rgba(0,44,140,0.14) 100%)",
        padding: "88px clamp(24px,6vw,80px)",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}>
        <h2 style={{ fontFamily: DISPLAY, fontSize: "clamp(26px,3.5vw,40px)", fontWeight: 800, color: P.white, marginBottom: "14px" }}>
          Ready to stop missing customers?
        </h2>
        <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "15px", marginBottom: "30px" }}>
          Let's get your chatbot live this week.
        </p>
        <button className="t-btn-primary" onClick={() => setPage("Contact")} style={{
          background: P.white, color: P.blue, border: "none",
          padding: "15px 32px", borderRadius: "9px", fontSize: "14px", fontWeight: 700, fontFamily: BODY,
          boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
        }}>
          Get Started This Week
        </button>
      </section>
    </>
  );
}
