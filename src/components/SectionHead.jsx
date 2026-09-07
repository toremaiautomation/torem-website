import { T, P, DISPLAY } from "../theme";
import { Tag } from "./Tag";

export function SectionHead({ eyebrow, heading, sub, light = false, center = true }) {
  return (
    <div style={{ textAlign: center ? "center" : "left", marginBottom: "52px" }}>
      <Tag color={light ? "#93c5fd" : T.blue}>{eyebrow}</Tag>
      <h2 style={{
        fontFamily: DISPLAY, fontSize: "clamp(26px, 3.5vw, 40px)",
        fontWeight: 800, color: light ? P.white : T.text,
        lineHeight: 1.15, marginBottom: sub ? "16px" : 0,
      }}>{heading}</h2>
      {sub && (
        <p style={{
          fontSize: "15px", color: light ? "rgba(255,255,255,0.55)" : T.textMuted,
          maxWidth: "520px", margin: center ? "0 auto" : 0, lineHeight: 1.7,
        }}>{sub}</p>
      )}
    </div>
  );
}
