import { T, P, DISPLAY } from "../theme";
import { Tag } from "./Tag";

export function LegalPage({ title, updated, children }) {
  return (
    <>
      <section style={{ background: P.navy, padding: "110px clamp(24px,6vw,80px) 64px", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position:"absolute", inset:0, pointerEvents:"none", backgroundImage:`linear-gradient(${P.blueprintLine} 1px, transparent 1px), linear-gradient(90deg, ${P.blueprintLine} 1px, transparent 1px)`, backgroundSize:"44px 44px" }} />
        <div style={{ position:"relative" }}>
          <Tag color="#93c5fd">Legal</Tag>
          <h1 style={{ fontFamily:DISPLAY, fontSize:"clamp(28px,4vw,48px)", fontWeight:800, color:P.white, marginTop:"8px", letterSpacing:"-0.5px" }}>{title}</h1>
          <p style={{ fontSize:"13px", color:"rgba(255,255,255,0.35)", marginTop:"12px" }}>Last updated: {updated}</p>
        </div>
      </section>
      <section style={{ background:T.bg, padding:"72px clamp(24px,6vw,80px)" }}>
        <div style={{ maxWidth:"780px", margin:"0 auto" }}>{children}</div>
      </section>
    </>
  );
}

export function LegalSection({ heading, children }) {
  return (
    <div style={{ marginBottom:"40px" }}>
      <h2 style={{ fontFamily:DISPLAY, fontSize:"19px", fontWeight:700, color:T.text, marginBottom:"12px", paddingBottom:"8px", borderBottom:`1px solid ${T.border}` }}>{heading}</h2>
      <div style={{ fontSize:"14px", color:T.textMuted, lineHeight:1.85 }}>{children}</div>
    </div>
  );
}

export function LP({ children }) { return <p style={{ marginBottom:"12px" }}>{children}</p>; }

export function LI({ items }) {
  return (
    <ul style={{ paddingLeft:"20px", marginBottom:"12px" }}>
      {items.map(i => <li key={i} style={{ marginBottom:"6px" }}>{i}</li>)}
    </ul>
  );
}
