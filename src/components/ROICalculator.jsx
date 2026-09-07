import { useState } from "react";
import { theme, DISPLAY, BODY, P, fieldStyle } from "../theme";
import { SectionHead } from "./SectionHead";

const ROI_CLOSE_RATE = 0.2;

export default function ROICalculator({ setPage, dark }) {
  const T = theme(dark);
  const [missedCalls, setMissedCalls] = useState(10);
  const [jobValue, setJobValue] = useState(1000);

  const monthlyLoss = Math.max(0, Number(missedCalls) || 0) * Math.max(0, Number(jobValue) || 0) * ROI_CLOSE_RATE;
  const fmt = n => "$" + Math.round(n).toLocaleString("en-US");

  return (
    <section style={{ background: T.bgAlt, padding: "88px clamp(24px,6vw,80px)" }}>
      <div style={{ maxWidth: "1140px", margin: "0 auto" }}>
        <SectionHead dark={dark} eyebrow="ROI Calculator" heading="See Your Potential Revenue Loss"
          sub="Plug in your numbers — this updates instantly as you type." />
        <div style={{
          display: "grid", gridTemplateColumns: "1fr 1fr", gap: "32px",
          maxWidth: "920px", margin: "0 auto", alignItems: "start",
        }} className="t-two-col">
          {/* Inputs */}
          <div style={{ background: T.bg, borderRadius: "16px", padding: "32px", border: `1px solid ${T.border}` }}>
            <div style={{ marginBottom: "18px" }}>
              <label style={{ display: "block", fontSize: "11px", fontWeight: 700, color: T.textMuted, marginBottom: "6px", letterSpacing: "0.5px", textTransform: "uppercase" }}>Inquiries you miss per month</label>
              <input type="number" min="0" value={missedCalls} onChange={e => setMissedCalls(e.target.value)} style={fieldStyle(T)} />
            </div>
            <div style={{ marginBottom: "18px" }}>
              <label style={{ display: "block", fontSize: "11px", fontWeight: 700, color: T.textMuted, marginBottom: "6px", letterSpacing: "0.5px", textTransform: "uppercase" }}>Average job value</label>
              <div style={{ position: "relative" }}>
                <span style={{ position: "absolute", left: "14px", top: "11px", fontSize: "14px", color: T.textMuted }}>$</span>
                <input type="number" min="0" value={jobValue} onChange={e => setJobValue(e.target.value)} style={{ ...fieldStyle(T), paddingLeft: "26px" }} />
              </div>
            </div>
          </div>

          {/* Results */}
          <div style={{ background: T.bg, borderRadius: "16px", padding: "32px", border: `2px solid ${T.blue}` }}>
            <div style={{ marginBottom: "24px" }}>
              <div style={{ fontSize: "12px", color: T.textMuted, marginBottom: "4px" }}>Estimated monthly revenue slipping away</div>
              <div style={{ fontFamily: DISPLAY, fontSize: "30px", fontWeight: 800, color: "#F87171" }}>{fmt(monthlyLoss)}/month</div>
              <div style={{ fontSize: "12px", color: T.textMuted }}>to missed inquiries</div>
              <div style={{ marginTop: "8px", padding: "8px 10px", background: "rgba(248,113,113,0.08)", borderRadius: "6px", fontSize: "11px", color: T.textMuted, fontStyle: "italic", lineHeight: 1.5 }}>
                Rough estimate only. Assumes a 20% close rate and the average job value you entered above.
              </div>
            </div>
            <div style={{ marginBottom: "20px", padding: "14px 16px", background: T.bgAlt, borderRadius: "10px" }}>
              <div style={{ fontFamily: DISPLAY, fontSize: "15px", fontWeight: 700, color: T.text, marginBottom: "4px" }}>Ready to stop losing revenue?</div>
              <div style={{ fontSize: "12px", color: T.textMuted }}>Contact us to see how Torem pays for itself.</div>
            </div>
            <button className="t-btn-primary" onClick={() => setPage("Contact")} style={{
              width: "100%", background: T.blue, color: P.white, border: "none",
              padding: "13px", borderRadius: "8px", fontSize: "14px", fontWeight: 700, fontFamily: BODY,
            }}>
              Get Started →
            </button>
          </div>
        </div>
        <p style={{ textAlign: "center", marginTop: "32px", fontSize: "13px", color: T.textMuted, fontStyle: "italic" }}>
          No setup fee. Get started risk-free — you only pay once Torem AI is actively working for your business.
        </p>
      </div>
    </section>
  );
}
