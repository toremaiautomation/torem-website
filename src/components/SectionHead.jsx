import { T, P, DISPLAY } from "../theme";

export function SectionHead({ heading, sub, light = false, center = true }) {
  return (
    <div style={{ textAlign: center ? "center" : "left", marginBottom: "52px" }}>
      <h2 style={{
        fontFamily: DISPLAY,
        fontSize: "clamp(26px, 3.5vw, 42px)",
        fontWeight: 800,
        color: light ? P.white : T.text,
        lineHeight: 1.12,
        letterSpacing: "-0.3px",
        marginBottom: sub ? "16px" : 0,
      }}>{heading}</h2>
      {sub && (
        <p style={{
          fontSize: "15px",
          color: light ? "rgba(255,255,255,0.55)" : T.textMuted,
          maxWidth: "540px",
          margin: center ? "0 auto" : 0,
          lineHeight: 1.75,
        }}>{sub}</p>
      )}
    </div>
  );
}
