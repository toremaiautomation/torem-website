import { useState } from "react";
import { motion } from "framer-motion";
import { T, P, DISPLAY, BODY, fieldStyle } from "../theme";

const ROI_CLOSE_RATE = 0.2;

export default function ROICalculator({ setPage }) {
  const [missedCalls, setMissedCalls] = useState(10);
  const [jobValue, setJobValue] = useState(1000);

  const monthlyLoss = Math.max(0, Number(missedCalls) || 0) * Math.max(0, Number(jobValue) || 0) * ROI_CLOSE_RATE;
  const fmt = n => "$" + Math.round(n).toLocaleString("en-US");

  return (
    <div style={{
      display: "grid", gridTemplateColumns: "1fr 1fr", gap: "32px",
      maxWidth: "920px", margin: "0 auto", alignItems: "start",
    }} className="t-two-col">
      {/* Inputs */}
      <div style={{ background: T.bg, borderRadius: "16px", padding: "32px", border: `1px solid ${T.border}`, boxShadow: "0 4px 20px rgba(0,0,0,0.04)" }}>
        <div style={{ marginBottom: "20px" }}>
          <label style={{ display: "block", fontSize: "11px", fontWeight: 700, color: T.textMuted, marginBottom: "8px", letterSpacing: "0.5px", textTransform: "uppercase" }}>
            Inquiries you miss per month
          </label>
          <input
            type="number" min="0"
            value={missedCalls}
            onChange={e => setMissedCalls(e.target.value)}
            style={fieldStyle()}
          />
        </div>
        <div>
          <label style={{ display: "block", fontSize: "11px", fontWeight: 700, color: T.textMuted, marginBottom: "8px", letterSpacing: "0.5px", textTransform: "uppercase" }}>
            Average job value
          </label>
          <div style={{ position: "relative" }}>
            <span style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", fontSize: "14px", color: T.textMuted, pointerEvents: "none" }}>$</span>
            <input
              type="number" min="0"
              value={jobValue}
              onChange={e => setJobValue(e.target.value)}
              style={{ ...fieldStyle(), paddingLeft: "26px" }}
            />
          </div>
        </div>
        <p style={{ marginTop: "18px", fontSize: "11px", color: T.textMuted, fontStyle: "italic", lineHeight: 1.6 }}>
          Rough estimate only. Assumes a 20% close rate and the average job value you entered above.
        </p>
      </div>

      {/* Results */}
      <motion.div
        key={monthlyLoss}
        initial={{ scale: 0.98, opacity: 0.7 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        style={{ background: T.bg, borderRadius: "16px", padding: "32px", border: `2px solid ${T.blue}`, boxShadow: `0 4px 24px rgba(0,122,227,0.10)` }}
      >
        <div style={{ marginBottom: "24px" }}>
          <div style={{ fontSize: "12px", color: T.textMuted, marginBottom: "6px" }}>Estimated monthly revenue slipping away</div>
          <div style={{ fontFamily: DISPLAY, fontSize: "36px", fontWeight: 800, color: "#F87171", letterSpacing: "-0.5px" }}>{fmt(monthlyLoss)}</div>
          <div style={{ fontSize: "13px", color: T.textMuted, marginTop: "4px" }}>per month to missed inquiries</div>
        </div>
        <div style={{ marginBottom: "22px", padding: "14px 16px", background: T.bgAlt, borderRadius: "10px" }}>
          <div style={{ fontFamily: DISPLAY, fontSize: "15px", fontWeight: 700, color: T.text, marginBottom: "4px" }}>Ready to stop losing revenue?</div>
          <div style={{ fontSize: "12px", color: T.textMuted, lineHeight: 1.6 }}>Contact us to see how Torem pays for itself.</div>
        </div>
        {setPage && (
          <button className="t-btn-primary" onClick={() => setPage("Contact")} style={{
            width: "100%", background: T.blue, color: P.white, border: "none",
            padding: "13px", borderRadius: "8px", fontSize: "14px", fontWeight: 700, fontFamily: BODY,
          }}>
            Get Started
          </button>
        )}
      </motion.div>
    </div>
  );
}
