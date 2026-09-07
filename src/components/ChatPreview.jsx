import { T, P, BODY, DISPLAY } from "../theme";

const MSGS = [
  { from: "bot",  text: "Hi! I can help book an appointment or answer questions. What can I do for you?" },
  { from: "user", text: "I'd like to book a consultation for next Tuesday." },
  { from: "bot",  text: "Great choice! I have 10am, 1pm, and 3pm available on Tuesday. Which works best?" },
  { from: "user", text: "1pm works perfectly." },
  { from: "bot",  text: "Done. I've booked you for Tuesday at 1pm and sent a confirmation to your email." },
];

export function ChatPreview() {
  return (
    <div style={{
      background: T.bg, borderRadius:"16px",
      border:`1px solid ${T.border}`,
      boxShadow:"0 20px 60px rgba(0,0,0,0.08)",
      overflow:"hidden", maxWidth:"400px", width:"100%", margin:"0 auto",
      fontFamily: BODY,
    }}>
      {/* Browser chrome */}
      <div style={{ background:P.navy, padding:"12px 16px", display:"flex", alignItems:"center", gap:"8px" }}>
        <div style={{ display:"flex", gap:"5px" }}>
          {["#FF5F57","#FFBD2E","#28CA41"].map(c => (
            <div key={c} style={{ width:"10px", height:"10px", borderRadius:"50%", background:c }} />
          ))}
        </div>
        <div style={{ flex:1, background:"rgba(255,255,255,0.1)", borderRadius:"5px", height:"20px", display:"flex", alignItems:"center", paddingLeft:"8px" }}>
          <span style={{ fontSize:"10px", color:"rgba(255,255,255,0.5)", fontFamily:BODY }}>torem.ai/chat</span>
        </div>
      </div>

      {/* Chat header */}
      <div style={{ background:T.bgAlt, padding:"14px 16px", borderBottom:`1px solid ${T.border}`, display:"flex", alignItems:"center", gap:"10px" }}>
        <img src="https://i.imgur.com/HXc7WQO.png" alt="Torem" style={{ width:"32px", height:"32px", borderRadius:"50%", objectFit:"cover" }} />
        <div>
          <div style={{ fontFamily:DISPLAY, fontWeight:700, fontSize:"13px", color:T.text }}>Torem Assistant</div>
          <div style={{ fontSize:"11px", color:"#22C55E", display:"flex", alignItems:"center", gap:"4px" }}>
            <span style={{ width:"6px", height:"6px", borderRadius:"50%", background:"#22C55E", display:"inline-block" }} />
            Online now
          </div>
        </div>
      </div>

      {/* Messages */}
      <div style={{ padding:"16px", display:"flex", flexDirection:"column", gap:"10px", background:T.bgAlt2 }}>
        {MSGS.map((m, i) => (
          <div key={i} style={{ display:"flex", justifyContent: m.from === "user" ? "flex-end" : "flex-start" }}>
            <div style={{
              maxWidth:"82%",
              background: m.from === "user" ? P.blue : T.bg,
              color: m.from === "user" ? P.white : T.text,
              padding:"9px 12px", borderRadius: m.from === "user" ? "12px 12px 2px 12px" : "12px 12px 12px 2px",
              fontSize:"13px", lineHeight:1.5,
              boxShadow: m.from === "bot" ? "0 2px 8px rgba(0,0,0,0.06)" : "none",
            }}>
              {m.text}
            </div>
          </div>
        ))}
      </div>

      {/* Input area */}
      <div style={{ padding:"12px 14px", borderTop:`1px solid ${T.border}`, display:"flex", gap:"8px", alignItems:"center", background:T.bg }}>
        <div style={{ flex:1, border:`1px solid ${T.border}`, borderRadius:"8px", padding:"9px 12px", fontSize:"13px", color:T.textMuted, background:T.bgAlt2 }}>
          Type a message...
        </div>
        <div style={{ width:"34px", height:"34px", borderRadius:"8px", background:P.blue, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="22" y1="2" x2="11" y2="13"/>
            <polygon points="22 2 15 22 11 13 2 9 22 2"/>
          </svg>
        </div>
      </div>
    </div>
  );
}
