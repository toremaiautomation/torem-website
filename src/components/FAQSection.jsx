import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { T, P, BODY } from "../theme";

const FAQS = [
  { q: "Will my customers know it's AI?",     a: "No, the AI is trained to sound like your business. Callers will not know the difference." },
  { q: "How long does setup take?",            a: "Typically 3 to 5 business days from payment to live." },
  { q: "Can I cancel anytime?",                a: "Yes, no long-term contracts. Cancel anytime." },
  { q: "What if the AI makes a mistake?",      a: "We monitor all conversations. You always have the option to review or adjust responses." },
  { q: "What tools does it connect to?",       a: "Torem AI integrates with your existing calendar, website, and most popular CRMs. We handle the setup so no technical work is required on your end." },
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
          transition: "color 0.15s",
        }}
      >
        <span>{q}</span>
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.22, ease: "easeInOut" }}
          style={{
            display: "inline-flex", alignItems: "center", justifyContent: "center",
            fontSize: "18px", color: P.blue, flexShrink: 0, marginLeft: "12px",
            lineHeight: 1,
          }}
        >+</motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            style={{ overflow: "hidden" }}
          >
            <p style={{ fontSize: "14px", color: T.textMuted, lineHeight: 1.8, padding: "0 4px 20px" }}>{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQSection() {
  return (
    <div>
      {FAQS.map(f => <FAQItem key={f.q} q={f.q} a={f.a} />)}
    </div>
  );
}
