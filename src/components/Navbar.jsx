import { useState, useEffect } from "react";
import { T, DISPLAY, BODY, P } from "../theme";

const MOBILE_NAV_ITEMS = [
  { label: "Home", target: "Home" },
  { label: "How It Works", target: "Services" },
  { label: "About", target: "About" },
  { label: "Contact", target: "Contact" },
  { label: "Book a Call", target: "Contact" },
];

export default function Navbar({ page, setPage }) {
  const [solid, setSolid] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fn = () => setSolid(window.scrollY > 24);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [page]);
  useEffect(() => {
    const fn = () => { if (window.innerWidth > 768) setMenuOpen(false); };
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);

  const goTo = target => { setPage(target); setMenuOpen(false); };

  return (
    <>
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 200,
        height: "66px",
        background: solid ? T.navBg : T.navBgTop,
        backdropFilter: "blur(24px) saturate(160%)",
        WebkitBackdropFilter: "blur(24px) saturate(160%)",
        borderBottom: `1px solid ${solid ? "rgba(0,122,227,0.12)" : "transparent"}`,
        padding: "0 clamp(20px, 5vw, 80px)",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        transition: "border-color 0.3s, background 0.3s",
      }}>
        {/* Logo */}
        <div onClick={() => setPage("Home")} style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer" }}>
          <img src="https://i.imgur.com/HXc7WQO.png" alt="Torem AI" style={{
            width: "48px", height: "48px", borderRadius: "50%", objectFit: "cover",
            boxShadow: `0 0 0 3px ${T.bgAlt}, 0 4px 14px rgba(0,122,227,0.35)`,
          }} />
          <span style={{ fontFamily: DISPLAY, fontSize: "17px", fontWeight: 800, color: T.text, letterSpacing: "-0.3px" }}>
            Torem
          </span>
        </div>

        {/* Desktop links */}
        <div className="t-nav-desktop" style={{ alignItems: "center", gap: "4px" }}>
          {["Home", "Services", "About", "Contact"].map(l => (
            <button key={l} className="t-nav-link" onClick={() => setPage(l)} style={{
              background: page === l ? T.bgAlt : "none",
              border: "none", padding: "7px 15px",
              fontSize: "13px", fontWeight: page === l ? 600 : 500,
              color: page === l ? T.blue : T.textMuted,
              fontFamily: BODY,
            }}>
              {l}
            </button>
          ))}
          <button className="t-btn-primary" onClick={() => setPage("Contact")} style={{
            marginLeft: "10px", background: T.blue, color: P.white,
            border: "none", padding: "9px 20px", borderRadius: "8px",
            fontSize: "13px", fontWeight: 600, fontFamily: BODY,
          }}>
            Get Started
          </button>
        </div>

        {/* Mobile: hamburger only */}
        <div className="t-nav-hamburger-btn" style={{ alignItems: "center", gap: "8px" }}>
          <button
            onClick={() => setMenuOpen(o => !o)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            style={{
              width: "38px", height: "38px", borderRadius: "8px",
              border: `1px solid ${T.border}`, background: menuOpen ? T.blue : T.bgAlt,
              color: menuOpen ? P.white : T.text,
              fontSize: "18px", display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer", transition: "background 0.18s, color 0.18s",
            }}
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>
      </nav>

      {/* Mobile slide-out menu */}
      {menuOpen && (
        <div
          className="t-nav-hamburger-btn"
          style={{
            position: "fixed", top: "66px", left: 0, right: 0, zIndex: 199,
            background: T.navBg,
            backdropFilter: "blur(24px) saturate(160%)",
            WebkitBackdropFilter: "blur(24px) saturate(160%)",
            borderBottom: "1px solid rgba(0,122,227,0.12)",
            boxShadow: "0 12px 32px rgba(0,0,0,0.08)",
            padding: "10px clamp(20px, 5vw, 80px) 18px",
            flexDirection: "column", gap: "2px",
            animation: "slideDown 0.18s ease",
          }}
        >
          {MOBILE_NAV_ITEMS.map(({ label, target }) => (
            <button
              key={label}
              className="t-mobile-link"
              onClick={() => goTo(target)}
              style={{
                display: "block", width: "100%", textAlign: "left",
                background: page === target ? T.bgAlt : "none",
                border: "none", borderRadius: "8px",
                padding: "13px 14px", fontSize: "15px",
                fontWeight: page === target ? 700 : 500,
                color: page === target ? T.blue : T.text,
                fontFamily: BODY, cursor: "pointer", transition: "background 0.15s, color 0.15s",
              }}
            >
              {label}
            </button>
          ))}
          <button className="t-btn-primary" onClick={() => goTo("Contact")} style={{
            marginTop: "8px", background: T.blue, color: P.white,
            border: "none", padding: "12px", borderRadius: "8px",
            fontSize: "14px", fontWeight: 600, fontFamily: BODY,
          }}>
            Get Started
          </button>
        </div>
      )}
    </>
  );
}
