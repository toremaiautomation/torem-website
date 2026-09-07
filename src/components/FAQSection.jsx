import { useState } from "react";
import { T, BODY } from "../theme";
import { SectionHead } from "./SectionHead";

const FAQS = [
  { q: "Will my customers know it's AI?", a: "No, the AI is trained to sound like your business. Callers won't know the difference." },
  { q: "How long does setup take?", a: "Typically 3-5 business days from payment to live." },
  { q: "Can I cancel anytime?", a: "Yes, no long-term contracts. Cancel anytime." },
  { q: "What if the AI makes a mistake?", a: "We monitor all calls. You always have the option to review or adjust responses." },
  { q: "What tools does it connect to?", a: "Torem AI integrates with your existing calendar, website, and most popular CRMs. We handle the setup -- no technical work required on your end." },
];

function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom: `1px solid ${T.border}` }}>
      <button
        className="t-faq-q"
        onClick={() => setOpen(o => !o)}
        style={{
          width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center",
          background: "none", border: "none", cursor: "pointer", textAlign: "left",
          padding: "20px 4px", fontFamily: BODY, fontSize: "15px", fontWeight: 700, color: T.text,
        }}
      >
        {q}
        <span style={{
          fontSize: "16px", color: T.blue, transition: "transform 0.25s ease",
          transform: open ? "rotate(45deg)" : "rotate(0deg)", flexShrink: 0, marginLeft: "12px",
        }}>+</span>
      </button>
      <div style={{
        maxHeight: open ? "200px" : "0px", overflow: "hidden",
        transition: "max-height 0.28s ease",
      }}>
        <p style={{ fontSize: "13px", color: T.textMuted, lineHeight: 1.8, padding: "0 4px 20px" }}>{a}</p>
      </div>
    </div>
  );
}

export default function FAQSection() {
  return (
    <section style={{ background: T.bg, padding: "88px clamp(24px,6vw,80px)" }}>
      <div style={{ maxWidth: "720px", margin: "0 auto" }}>
        <SectionHead eyebrow="FAQ" heading="Common Questions" />
        <div>
          {FAQS.map(f => <FAQItem key={f.q} q={f.q} a={f.a} />)}
        </div>
      </div>
    </section>
  );
}
