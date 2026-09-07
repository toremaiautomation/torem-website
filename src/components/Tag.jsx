import { P } from "../theme";

export function Tag({ children, color = P.blue }) {
  return (
    <span style={{
      display: "inline-block",
      fontSize: "11px", fontWeight: 700, letterSpacing: "1.8px",
      textTransform: "uppercase", color, marginBottom: "14px",
    }}>
      {children}
    </span>
  );
}
