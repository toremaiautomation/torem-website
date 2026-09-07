import { Camera } from "lucide-react";
import { DISPLAY, BODY, P } from "../theme";

const SOCIAL_LINKS = [
  { icon: "𝕏",     label: "Twitter / X", url: "https://x.com/Torem_Ai" },
  { icon: "in",    label: "LinkedIn",    url: "https://www.linkedin.com/in/torem-ai/" },
  { icon: null,    label: "Instagram",   url: "https://www.instagram.com/torem_ai/?hl=en", isCamera: true },
];

export default function Footer({ setPage, page, setScrollTarget }) {
  const goService = (anchor) => {
    if (page === "Services") {
      document.getElementById(anchor)?.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      setPage("Services");
      setScrollTarget(anchor);
    }
  };

  return (
    <footer style={{ background: P.navy, padding: "64px clamp(24px,6vw,80px) 36px" }}>
      <div style={{
        maxWidth: "1140px", margin: "0 auto",
        display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr",
        gap: "40px", marginBottom: "48px",
      }} className="t-hero-grid">
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
            <img src="https://i.imgur.com/HXc7WQO.png" alt="Torem AI" style={{
              width: "42px", height: "42px", borderRadius: "50%", objectFit: "cover",
              boxShadow: "0 0 0 3px rgba(255,255,255,0.06), 0 4px 16px rgba(0,122,227,0.4)",
            }} />
            <span style={{ fontFamily: DISPLAY, fontSize: "16px", fontWeight: 800, color: P.white }}>Torem</span>
          </div>
          <p style={{ fontSize: "13px", color: "#64748b", lineHeight: "1.75", maxWidth: "220px" }}>
            AI-powered chat automation built for small businesses. Capture inquiries, book appointments, and see what is working.
          </p>
        </div>
        {[
          { h: "Company", links: [["Home","Home","nav"],["Services","Services","nav"],["About","About","nav"],["Contact","Contact","nav"]] },
          { h: "Services", links: [["Knowledge Base","foundation","scroll"],["Booking Built In","addons","scroll"],["Analytics","addons","scroll"],["Any Business","addons","scroll"]] },
          { h: "Contact",  links: [["toremaiautomation@gmail.com","mailto:toremaiautomation@gmail.com","email"],["(832) 683-8151","tel:+18326838151","tel"],["Houston, TX",null,null],["Book a Call","Contact","nav"]] },
        ].map(({ h, links }) => (
          <div key={h}>
            <div style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "2px", color: "#475569", textTransform: "uppercase", marginBottom: "18px" }}>{h}</div>
            {links.map(([label, target, type]) => {
              if (type === "email" || type === "tel") return (
                <div key={label} style={{ marginBottom: "11px" }}>
                  <a href={target} style={{ fontSize: "13px", color: P.blue, textDecoration: "underline", fontFamily: BODY }}>{label}</a>
                </div>
              );
              if (type === "scroll") return (
                <div key={label} className="t-link" onClick={() => goService(target)}
                  style={{ fontSize: "13px", color: "#94a3b8", marginBottom: "11px", cursor: "pointer" }}>{label}</div>
              );
              if (type === "nav") return (
                <div key={label} className="t-link" onClick={() => setPage(target)}
                  style={{ fontSize: "13px", color: "#94a3b8", marginBottom: "11px", cursor: "pointer" }}>{label}</div>
              );
              return (
                <div key={label} style={{ fontSize: "13px", color: "#94a3b8", marginBottom: "11px" }}>{label}</div>
              );
            })}
          </div>
        ))}
        <div>
          <div style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "2px", color: "#475569", textTransform: "uppercase", marginBottom: "18px" }}>Follow</div>
          {SOCIAL_LINKS.map(({ icon, label, url, isCamera }) => (
            <a key={label} href={url} target="_blank" rel="noopener noreferrer" className="t-social"
              style={{
                display: "flex", alignItems: "center", gap: "9px", marginBottom: "11px",
                fontSize: "13px", color: P.blue, textDecoration: "underline", fontFamily: BODY,
                transition: "opacity 0.15s",
              }}>
              <span style={{
                width: "20px", height: "20px", borderRadius: "50%", background: "rgba(0,122,227,0.16)",
                display: "inline-flex", alignItems: "center", justifyContent: "center",
                fontSize: "11px", fontWeight: 700, flexShrink: 0, textDecoration: "none",
              }}>
                {isCamera ? <Camera size={11} strokeWidth={2} color={P.blue} /> : icon}
              </span>
              {label}
            </a>
          ))}
        </div>
      </div>
      <div style={{ borderTop: "1px solid #1e3254", paddingTop: "24px", maxWidth: "1140px", margin: "0 auto", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "12px", alignItems: "center" }}>
        <span style={{ fontSize: "12px", color: "#334155" }}>© 2026 Torem AI. All rights reserved.</span>
        <div style={{ display: "flex", gap: "18px", flexWrap: "wrap" }}>
          {[["Terms","Terms"],["Privacy","Privacy"],["Cookies","Cookies"],["Disclaimer","Disclaimer"]].map(([label, p]) => (
            <span key={label} className="t-link" onClick={() => setPage(p)} style={{ fontSize: "12px", color: "#475569", cursor: "pointer" }}>{label}</span>
          ))}
        </div>
      </div>
    </footer>
  );
}
