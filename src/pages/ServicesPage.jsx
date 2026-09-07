import { useEffect } from "react";
import { theme, P, DISPLAY, BODY } from "../theme";
import { SectionHead } from "../components/SectionHead";
import { Tag } from "../components/Tag";

export default function ServicesPage({ setPage, dark, scrollTarget, setScrollTarget }) {
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
            Simple, powerful chat automation that works for any small business — not just one industry.
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
                    <h3 style={{ fontFamily:DISPLAY, fontSize:"20px", fontWeight:800, color:T.text }}>AI Chat + Knowledge Base</h3>
                    <p style={{ fontSize:"12px", color:T.textMuted, marginTop:"3px" }}>The foundation your chatbot is built on.</p>
                  </div>
                </div>
                <div style={{ textAlign:"right", flexShrink:0, marginLeft:"16px" }}>
                  <div style={{ fontSize:"12px", fontWeight:600, color:T.blue, background:T.chip, padding:"4px 12px", borderRadius:"100px" }}>Contact for pricing</div>
                </div>
              </div>
              <p style={{ fontSize:"14px", color:T.textMuted, lineHeight:1.8, marginBottom:"24px" }}>
                This is the foundation. Your AI learns your business from your website and answers customer questions instantly, 24/7 — so no inquiry goes unanswered, even at 10pm on a Sunday.
              </p>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"8px" }}>
                {["Auto-built from your website","Instant answers to common questions","Lead capture and notifications","Works 24/7 across web and mobile"].map(f => (
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
              { icon:"📅", title:"Booking Built In", desc:"Let customers self-book appointments directly through the chat. Automated reminders reduce no-shows and keep your calendar full.", features:["In-chat booking flow","Calendar sync (Google/Outlook)","Automated reminders","Instant confirmation messages"] },
              { icon:"📊", title:"See What's Working", desc:"A clear analytics view showing which questions get asked most, when customers are most active, and how many bookings your chatbot drives.", features:["Question volume tracking","Booking conversion rate","Peak activity times","Weekly summary reports"] },
              { icon:"🔄", title:"Automated Follow-Up", desc:"Messages that fire automatically after a customer inquiry or booking — so leads stay warm and you stop losing people who weren't ready to commit.", features:["SMS and email follow-up sequences","Customizable timing and copy","Stops when they reply or book","Works across any customer type"] },
              { icon:"⭐", title:"Review Generation", desc:"Automatically request reviews after a completed service or appointment. More 5-star reviews mean more customers finding you first.", features:["Post-service review requests","Google and Facebook targeting","Timed after appointment close","Negative feedback redirect"] },
              { icon:"📲", title:"Instant Response", desc:"An automatic reply fires within seconds of a missed message or inquiry — before the customer moves on to a competitor.", features:["Instant reply on missed contact","Customizable response message","Lead capture follow-through","Works 24/7 automatically"] },
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
            {[...["n8n","Zapier","Supabase","Vercel","Claude API","Google Workspace","Shopify","Calendly","Stripe"],
              ...["n8n","Zapier","Supabase","Vercel","Claude API","Google Workspace","Shopify","Calendly","Stripe"]
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
