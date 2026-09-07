// ── PALETTE ─────────────────────────────────────────────────
// Static palette: used for elements that are *always* dark-on-navy
// (hero sections, footer, blue CTA bands) — these don't flip with theme.
export const P = {
  navy:      "#0B1F3A",
  navyMid:   "#122847",
  blue:      "#007AE3",
  blueMid:   "#0088F5",
  paleBg:    "#EEF6FF",
  white:     "#FFFFFF",
  offWhite:  "#F7FAFF",
  gray:      "#5C6E84",
  grayLight: "#F0F4F9",
  border:    "#D3E0F0",
  blueprintLine: "rgba(0,122,227,0.1)",
};

// Single light theme — exported as a static constant.
export const T = {
  bg: "#FFFFFF", bgAlt: "#EEF6FF", bgAlt2: "#F7FAFF",
  text: "#0B1F3A", textMuted: "#5C6E84", border: "#D3E0F0",
  blue: "#007AE3", blueMid: "#0088F5",
  navBg: "rgba(247,250,255,0.82)", navBgTop: "rgba(247,250,255,0.38)", chip: "#EBF2FF",
};

export const DISPLAY = "'Bricolage Grotesque', 'Georgia', serif";
export const BODY    = "'DM Sans', system-ui, -apple-system, sans-serif";

// ── INJECTED STYLES ─────────────────────────────────────────
export function buildCSS() {
  return `
  @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,600;12..96,700;12..96,800&family=DM+Sans:wght@400;500;600;700&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
  body { font-family: ${BODY}; background: ${T.bg}; color: ${T.text}; }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(20px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes glowPulse {
    0%,100% { opacity: 0.4; }
    50%     { opacity: 0.8; }
  }

  .t-card {
    transition: transform 0.22s ease, box-shadow 0.22s ease, background 0.25s, border-color 0.25s;
  }
  .t-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 20px 48px rgba(23,84,207,0.13) !important;
  }
  .t-link { transition: color 0.15s; cursor: pointer; }
  .t-link:hover { color: ${T.blue} !important; }

  .t-btn-primary {
    transition: background 0.18s, transform 0.18s;
    cursor: pointer;
  }
  .t-btn-primary:hover { background: ${P.blueMid} !important; transform: translateY(-1px); }

  .t-btn-ghost {
    transition: background 0.18s, color 0.18s, transform 0.18s;
    cursor: pointer;
  }
  .t-btn-ghost:hover {
    background: rgba(23,84,207,0.08) !important;
    transform: translateY(-1px);
  }

  .t-nav-link {
    transition: color 0.15s, background 0.15s;
    cursor: pointer;
    border-radius: 6px;
  }
  .t-nav-link:hover { color: ${T.blue} !important; background: ${T.bgAlt} !important; }

  .t-social:hover { opacity: 0.7; }
  .t-faq-q:hover { color: ${T.blue} !important; }

  input:focus, textarea:focus, select:focus {
    outline: none;
    border-color: ${T.blue} !important;
    box-shadow: 0 0 0 3px rgba(23,84,207,0.12);
  }

  .t-nav-desktop { display: flex; }
  .t-nav-hamburger-btn { display: none; }
  .t-mobile-link:hover { background: ${T.bgAlt} !important; color: ${T.blue} !important; }

  @keyframes slideDown {
    from { opacity: 0; transform: translateY(-8px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  @keyframes chatDotBounce {
    0%, 60%, 100% { transform: translateY(0); opacity: 0.5; }
    30% { transform: translateY(-6px); opacity: 1; }
  }

  @keyframes blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0; }
  }

  @keyframes marqueeScroll {
    0% { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }

  .marquee-track {
    display: flex;
    width: max-content;
    animation: marqueeScroll 22s linear infinite;
  }

  @media (max-width: 760px) {
    .t-hero-grid { grid-template-columns: 1fr !important; }
    .t-two-col   { grid-template-columns: 1fr !important; }
    .t-three-col { grid-template-columns: 1fr !important; }
    .t-pad       { padding: 48px 24px !important; }
    .t-hero-head { font-size: 36px !important; }
  }

  @media (max-width: 768px) {
    .t-nav-desktop { display: none !important; }
    .t-nav-hamburger-btn { display: flex !important; }
  }

  @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
  .typing-cursor { animation: blink 0.8s infinite; display: inline-block; }
`;
}

// ── SHARED ───────────────────────────────────────────────────
export function fieldStyle() {
  return {
    width: "100%", padding: "11px 14px",
    border: `1px solid ${T.border}`, borderRadius: "8px",
    fontSize: "14px", fontFamily: BODY, background: T.bg, color: T.text,
  };
}
