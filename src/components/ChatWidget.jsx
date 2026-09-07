import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, ThumbsUp, ThumbsDown, Calendar } from "lucide-react";
import { DISPLAY, BODY } from "../theme";

const CHAT_CONFIG = {
  businessName: "Torem AI",
  logoUrl: "https://i.imgur.com/HXc7WQO.png",
  primaryColor: "#007AE3",
  navyColor: "#0B1F3A",
  chatWebhookUrl: "https://toremai.app.n8n.cloud/webhook/torem-chat",
  availabilityWebhookUrl: "https://toremai.app.n8n.cloud/webhook/torem-availability",
  bookWebhookUrl: "https://toremai.app.n8n.cloud/webhook/torem-book",
  contactEmail: "toremaiautomation@gmail.com",
  contactPhone: "(832) 683-8151",
  enabledWorkflows: {
    booking: true,
    reviewGeneration: false,
    leadFollowUp: false,
    crmTracking: false,
  },
  defaultSuggestions: [
    "How does your AI agent work?",
    "What industries do you support?",
    "Can I schedule a strategy call?",
  ],
};

const ALL_SUGGESTIONS = [
  "What's your most popular plan?", "Is there a setup fee?", "Do you offer a free trial?",
  "Can I switch plans later?", "What's the cheapest option?", "Do you require a contract?",
  "How accurate is the AI?", "What happens when AI can't answer?", "Can I customize AI responses?",
  "Does it sound robotic or natural?", "Can it handle multiple languages?", "What if a customer gets frustrated?",
  "What CRMs do you support?", "Can it sync with Google Calendar?", "How long does integration take?",
  "Does it work with Shopify?", "Can it connect to my existing website?", "What about Zapier integration?",
  "What do I need to provide?", "Will there be any downtime?", "How long until it's live?",
  "Do I need any technical skills?", "Can I make changes after launch?", "Who handles the setup?",
  "How does 24/7 answering work?", "What if the AI makes a mistake?", "Can I monitor calls?",
  "Does it work on weekends?", "What happens during business hours?", "Can I take over a call manually?",
  "How fast does it respond to leads?", "What happens to missed calls?", "Can I see captured leads?",
  "Does it qualify leads automatically?", "What info does it collect?", "Can it text leads back instantly?",
  "How does booking automation work?", "Can it sync with my calendar?", "What about rescheduling?",
  "Does it send reminders?", "Can customers book directly?", "What if I'm fully booked?",
  "Do you work with retail businesses?", "Do you support service businesses?", "What about restaurants?",
  "Does this work for healthcare practices?", "Can solo business owners use this?", "What about multi-location businesses?",
  "How do I get started?", "Can I see a demo?", "What makes Torem different?",
  "How much support do I get?", "Can I talk to a real person?", "What's the next step?",
];

const DEFAULT_SUGGESTIONS = CHAT_CONFIG.defaultSuggestions;

const POST_BOOKING_SUGGESTIONS = [
  "What services do you offer?",
  "How does the AI agent work?",
  "Tell me more about pricing",
];

const BOOKING_INTENT_RE = /\b(book|schedule|appointment|call|available|calendar)\b/i;

function parseSlots(text) {
  const slots = [];
  const re = /^\s*\d+[.)]\s*(.+)$/gm;
  let m;
  while ((m = re.exec(text)) !== null) slots.push(m[1].trim());
  return slots.length >= 2 ? slots : [];
}

function slotPreamble(text) {
  return text.replace(/^\s*\d+[.)]\s*.+$/gm, "").trim();
}

function getSuggestions(usedSuggestions) {
  const remaining = ALL_SUGGESTIONS.filter(s => !usedSuggestions.includes(s));
  if (remaining.length < 3) {
    const shuffled = [...ALL_SUGGESTIONS].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 3);
  }
  const shuffled = [...remaining].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, 3);
}

const C = {
  bg: "#FFFFFF", headerBg: CHAT_CONFIG.navyColor, msgBg: "#F1F5F9",
  inputBg: "#FFFFFF", inputBorder: "#D3E0F0",
  text: CHAT_CONFIG.navyColor, textMuted: "#5C6E84", border: "#E2E8F0",
  sugBg: "#FFFFFF", sugBorder: "#D3E0F0", sugText: CHAT_CONFIG.primaryColor,
  actionText: "#94a3b8",
};

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [suggestions, setSuggestions] = useState(DEFAULT_SUGGESTIONS);
  const [sugsVisible, setSugsVisible] = useState(true);
  const [usedSuggestions, setUsedSuggestions] = useState([]);
  const [feedback, setFeedback] = useState({});
  const [copied, setCopied] = useState({});
  const [copiedLast, setCopiedLast] = useState(false);
  const [showSkeleton, setShowSkeleton] = useState(false);
  const [thinkingMode, setThinkingMode] = useState("normal");
  const [chatSize, setChatSize] = useState({ width: 400, height: 600 });

  const sessionId   = useRef(String(Date.now()));
  const chatEndRef  = useRef(null);
  const inputRef    = useRef(null);
  const typingRef   = useRef(null);
  const isResizing  = useRef(false);
  const resizeStart = useRef({ x: 0, y: 0, w: 0, h: 0 });

  useEffect(() => {
    const fn = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);

  useEffect(() => {
    if (chatEndRef.current) chatEndRef.current.scrollIntoView({ behavior: "smooth" });
  }, [messages, thinking]);

  useEffect(() => {
    if (open) {
      setShowSkeleton(true);
      setTimeout(() => setShowSkeleton(false), 500);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  useEffect(() => {
    const lastMsg = messages[messages.length - 1];
    if (lastMsg?.sender === "bot" && lastMsg?.typing === false) {
      setSugsVisible(false);
      if (lastMsg.isConfirmation) {
        setSuggestions(POST_BOOKING_SUGGESTIONS);
      } else {
        const next = getSuggestions(usedSuggestions);
        setSuggestions(next);
        setUsedSuggestions(prev => {
          const updated = [...new Set([...prev, ...next])];
          if (updated.length >= ALL_SUGGESTIONS.length - 3) return [];
          return updated;
        });
      }
      setTimeout(() => setSugsVisible(true), 80);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages]);

  useEffect(() => {
    const onMove = (e) => {
      if (!isResizing.current) return;
      const dx = e.clientX - resizeStart.current.x;
      const dy = e.clientY - resizeStart.current.y;
      setChatSize({
        width:  Math.min(600, Math.max(320, resizeStart.current.w - dx)),
        height: Math.min(800, Math.max(400, resizeStart.current.h - dy)),
      });
    };
    const onUp = () => { isResizing.current = false; };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup",   onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup",   onUp);
    };
  }, []);

  const startResize = (e) => {
    e.preventDefault();
    isResizing.current = true;
    resizeStart.current = { x: e.clientX, y: e.clientY, w: chatSize.width, h: chatSize.height };
  };

  const sendToN8N = async (userMessage) => {
    try {
      const response = await fetch(
        CHAT_CONFIG.chatWebhookUrl,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            message: userMessage,
            sessionId: sessionId.current
          })
        }
      );

      const text = await response.text();
      console.log("n8n raw:", text);

      let aiMessage = `I'm here to help! Email us at ${CHAT_CONFIG.contactEmail}`;

      if (!text || text.trim() === "") {
        aiMessage = `Sorry, something went wrong. Please try again or email ${CHAT_CONFIG.contactEmail}`;
        return aiMessage;
      }

      try {
        const data = JSON.parse(text);
        if (data.ai_response) aiMessage = data.ai_response;
        else if (data.message) aiMessage = data.message;
        else if (Array.isArray(data) && data[0]?.ai_response) aiMessage = data[0].ai_response;
      } catch(e) {
        console.error("Parse error:", e);
        if (text.length > 0 && !text.startsWith("{")) {
          aiMessage = text;
        }
      }

      return aiMessage;
    } catch (err) {
      console.error("Chat fetch error:", err);
      return `Connection issue — please try again or email ${CHAT_CONFIG.contactEmail}`;
    }
  };

  const startTyping = (fullText) => {
    clearInterval(typingRef.current);
    const slots = CHAT_CONFIG.enabledWorkflows.booking ? parseSlots(fullText) : [];
    const isConfirmation = CHAT_CONFIG.enabledWorkflows.booking && /You're booked for/i.test(fullText);
    const displayText = slots.length > 0
      ? (slotPreamble(fullText) || "Here are the available times:")
      : fullText;
    setMessages(prev => [...prev, {
      sender: "bot", text: "", fullText: displayText, typing: true,
      slots: slots.length > 0 ? slots : null,
      isConfirmation,
      slotsUsed: false,
    }]);
    let i = 0;
    typingRef.current = setInterval(() => {
      i++;
      setMessages(prev => {
        const msgs = [...prev];
        const last = msgs[msgs.length - 1];
        if (!last || !last.typing) { clearInterval(typingRef.current); return prev; }
        if (i >= displayText.length) {
          clearInterval(typingRef.current);
          msgs[msgs.length - 1] = { ...last, text: displayText, typing: false };
        } else {
          msgs[msgs.length - 1] = { ...last, text: displayText.slice(0, i) };
        }
        return msgs;
      });
    }, 15);
  };

  const sendMessage = async (text) => {
    const msg = text.trim();
    if (!msg || thinking) return;
    setThinkingMode(CHAT_CONFIG.enabledWorkflows.booking && BOOKING_INTENT_RE.test(msg) ? "booking" : "normal");
    setMessages(prev => [...prev, { sender: "user", text: msg }]);
    setInput("");
    setThinking(true);
    const aiText = await sendToN8N(msg);
    setThinking(false);
    startTyping(aiText);
  };

  const pickSlot = (msgIndex, slot) => {
    setMessages(prev => prev.map((m, i) =>
      i === msgIndex ? { ...m, slotsUsed: true } : m
    ));
    sendMessage(`I'll take ${slot}`);
  };

  const retryLast = async () => {
    if (thinking) return;
    const lastUser = [...messages].reverse().find(m => m.sender === "user");
    if (!lastUser) return;
    setMessages(prev => prev.slice(0, -1));
    setThinking(true);
    const aiText = await sendToN8N(lastUser.text);
    setThinking(false);
    startTyping(aiText);
  };

  const handleKey = e => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(input); }
  };

  const clearChat = () => {
    setMessages([]);
    setSuggestions(DEFAULT_SUGGESTIONS);
    setUsedSuggestions([]);
    setFeedback({});
    setCopied({});
    setInput("");
  };

  const copyMsg = (i, text) => {
    navigator.clipboard.writeText(text).catch(() => {});
    setCopied(prev => ({ ...prev, [i]: true }));
    setTimeout(() => setCopied(prev => ({ ...prev, [i]: false })), 2000);
  };

  const copyLast = () => {
    const lastBot = [...messages].reverse().find(m => m.sender === "bot" && !m.isError);
    if (!lastBot) return;
    navigator.clipboard.writeText(lastBot.text).catch(() => {});
    setCopiedLast(true);
    setTimeout(() => setCopiedLast(false), 2000);
  };

  const msgCount = messages.length;
  const hRad = isMobile ? 0 : "16px 16px 0 0";
  const fRad = isMobile ? 0 : "0 0 16px 16px";

  const winStyle = {
    position: "fixed", zIndex: 9998,
    background: C.bg, display: "flex", flexDirection: "column",
    boxShadow: "0 20px 60px rgba(0,0,0,0.2)",
    ...(isMobile ? {
      bottom: "80px", right: "16px", left: "16px",
      width: "calc(100vw - 32px)", height: "75vh",
      borderRadius: "16px",
      boxShadow: "0 8px 32px rgba(0,0,0,0.25)",
      overflow: "hidden",
    } : {
      bottom: "90px", right: "24px",
      width: `${chatSize.width}px`, height: `${chatSize.height}px`,
      borderRadius: "16px",
    }),
  };

  return (
    <>
      {open && (
        <div style={winStyle}>
          {/* Resize handle (desktop only) */}
          {!isMobile && (
            <div
              onMouseDown={startResize}
              title="Drag to resize"
              style={{
                position: "absolute", top: 0, left: 0, zIndex: 10,
                width: "22px", height: "22px", cursor: "nw-resize",
                borderRadius: "16px 0 6px 0",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}
            >
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <path d="M1 4L4 1M1 7L7 1M4 7L7 4" stroke="rgba(255,255,255,0.45)" strokeWidth="1.3" strokeLinecap="round"/>
              </svg>
            </div>
          )}

          {/* Header */}
          <div style={{
            background: C.headerBg, padding: "12px 14px",
            display: "flex", alignItems: "center", gap: "10px",
            borderRadius: hRad, flexShrink: 0,
          }}>
            <img src={CHAT_CONFIG.logoUrl} alt={CHAT_CONFIG.businessName} style={{
              width: "34px", height: "34px", borderRadius: "50%", objectFit: "cover", flexShrink: 0,
            }} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                <span style={{ fontFamily: DISPLAY, fontSize: "13px", fontWeight: 700, color: "#FFFFFF" }}>{CHAT_CONFIG.businessName}</span>
                <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#34d399", flexShrink: 0 }} />
                <span style={{ fontSize: "10px", color: "rgba(255,255,255,0.5)" }}>Online</span>
              </div>
              <div style={{ fontSize: "10px", color: "rgba(255,255,255,0.4)", marginTop: "1px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                {msgCount > 0 ? `${msgCount} message${msgCount !== 1 ? "s" : ""} in this chat` : `Ask me anything about ${CHAT_CONFIG.businessName}`}
              </div>
            </div>
            <button onClick={() => setOpen(false)} aria-label="Close chat" style={{
              background: "rgba(255,255,255,0.1)", border: "none", color: "#FFFFFF",
              width: "26px", height: "26px", borderRadius: "50%",
              display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer", fontSize: "12px", flexShrink: 0,
            }}>✕</button>
          </div>

          {/* Messages */}
          <div style={{
            flex: 1, overflowY: "auto", padding: "12px",
            display: "flex", flexDirection: "column", gap: "8px",
            background: C.bg,
          }}>
            {showSkeleton && messages.length === 0 && (
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                {[75, 50, 65].map((w, i) => (
                  <div key={i} style={{
                    height: i === 0 ? "44px" : "32px", background: C.msgBg,
                    borderRadius: "12px", width: `${w}%`, opacity: 0.5,
                    animation: "glowPulse 1.2s ease-in-out infinite",
                  }} />
                ))}
              </div>
            )}

            {!showSkeleton && messages.length === 0 && !thinking && (
              <div style={{
                background: C.msgBg, borderRadius: "20px 20px 20px 4px",
                padding: "12px 14px", fontSize: "13px", color: C.text,
                lineHeight: 1.6, maxWidth: "85%",
              }}>
                Hi there! I'm the {CHAT_CONFIG.businessName} assistant. Ask me anything about our automation services!
              </div>
            )}

            <AnimatePresence initial={false}>
            {messages.map((m, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12, scale: 0.96, x: m.sender === "user" ? 20 : -20 }}
                animate={{ opacity: 1, y: 0, scale: 1, x: 0 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                style={{ display: "flex", flexDirection: "column", alignItems: m.sender === "user" ? "flex-end" : "flex-start", gap: "6px" }}
              >
                {/* Booking confirmation card */}
                {m.isConfirmation && !m.typing ? (
                  <div style={{
                    background: "#f0fdf4", border: "1px solid #86efac",
                    borderRadius: "16px", padding: "14px 16px",
                    display: "flex", flexDirection: "column", gap: "8px",
                    maxWidth: "88%",
                  }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <div style={{ width: "20px", height: "20px", borderRadius: "50%", background: "#16a34a", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                      </div>
                      <span style={{ fontFamily: DISPLAY, fontSize: "14px", fontWeight: 700, color: "#16a34a" }}>Booking Confirmed!</span>
                    </div>
                    <p style={{ fontSize: "13px", color: "#166534", lineHeight: 1.5 }}>{m.text}</p>
                    <p style={{ fontSize: "11px", color: "#15803d", opacity: 0.85 }}>You'll receive a confirmation shortly.</p>
                    <button
                      onClick={() => { setSuggestions(DEFAULT_SUGGESTIONS); setUsedSuggestions([]); }}
                      style={{
                        background: "#16a34a", color: "#FFFFFF", border: "none",
                        borderRadius: "8px", padding: "6px 14px",
                        fontSize: "12px", fontWeight: 600, cursor: "pointer", fontFamily: BODY,
                        alignSelf: "flex-start", transition: "background 0.15s",
                      }}
                    >Book Another Call</button>
                  </div>
                ) : (
                  <>
                    {/* Regular message bubble */}
                    <div style={{ display: "flex", alignItems: "flex-end", gap: "8px" }}>
                      {m.sender !== "user" && !m.isError && (
                        <div style={{
                          width: "28px", height: "28px", borderRadius: "50%",
                          flexShrink: 0, overflow: "hidden",
                          boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                        }}>
                          <img src={CHAT_CONFIG.logoUrl} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                        </div>
                      )}
                      <motion.div
                        whileHover={{ scale: 1.01, y: -1 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        style={{ position: "relative", maxWidth: "83%" }}
                      >
                        <div style={{
                          padding: "10px 13px",
                          borderRadius: m.sender === "user" ? "20px 20px 4px 20px" : "20px 20px 20px 4px",
                          background: m.sender === "user" ? CHAT_CONFIG.primaryColor : (m.isError ? "#FEF2F2" : C.msgBg),
                          color: m.sender === "user" ? "#FFFFFF" : (m.isError ? "#991B1B" : C.text),
                          fontSize: "13px", lineHeight: 1.6,
                          border: m.isError ? "1px solid #FECACA" : "none",
                          boxShadow: m.sender === "user"
                            ? `0 8px 20px -4px ${CHAT_CONFIG.primaryColor}55`
                            : "0 4px 12px rgba(0,0,0,0.07)",
                        }}>
                          {m.text}
                          {m.typing && (
                            <span style={{
                              display: "inline-block", width: "2px", height: "14px",
                              background: C.textMuted, marginLeft: "2px",
                              verticalAlign: "text-bottom",
                              animation: "blink 0.8s step-end infinite",
                            }} />
                          )}
                          {m.isError && (
                            <button onClick={retryLast} style={{
                              display: "block", marginTop: "7px",
                              background: "#DC2626", color: "#FFFFFF", border: "none",
                              borderRadius: "6px", padding: "3px 10px",
                              fontSize: "11px", cursor: "pointer", fontFamily: BODY,
                            }}>Retry</button>
                          )}
                        </div>
                        {m.sender === "bot" && !m.isError && !m.typing && (
                          <button onClick={() => copyMsg(i, m.text)} title="Copy" style={{
                            position: "absolute", top: "4px", right: "-22px",
                            background: "none", border: "none", cursor: "pointer",
                            color: copied[i] ? "#34d399" : C.textMuted,
                            fontSize: "11px", padding: "2px", opacity: 0.8,
                            transition: "color 0.15s",
                          }}>{copied[i] ? "✓" : "⧉"}</button>
                        )}
                      </motion.div>
                    </div>

                    {/* Time slot buttons */}
                    {m.slots && !m.slotsUsed && !m.typing && (
                      <div style={{ display: "flex", flexDirection: "column", gap: "6px", paddingLeft: "2px", maxWidth: "88%" }}>
                        {m.slots.map((slot, si) => (
                          <button
                            key={si}
                            onClick={() => pickSlot(i, slot)}
                            style={{
                              background: "#EBF2FF", border: `1px solid ${C.sugText}`,
                              borderRadius: "10px", padding: "9px 14px",
                              fontSize: "13px", color: C.sugText, fontWeight: 600,
                              cursor: "pointer", fontFamily: BODY, textAlign: "left",
                              display: "flex", alignItems: "center", gap: "7px",
                              transition: "background 0.15s",
                            }}
                          >
                            <Calendar size={13} strokeWidth={2} />
                            {slot}
                          </button>
                        ))}
                      </div>
                    )}

                    {/* Feedback row */}
                    {m.sender === "bot" && !m.isError && !m.typing && (
                      <div style={{ display: "flex", alignItems: "center", gap: "5px", flexWrap: "wrap", paddingLeft: "2px" }}>
                        {feedback[i] ? (
                          <span style={{ fontSize: "10px", color: C.textMuted }}>
                            {feedback[i] === "up" ? "Thanks for the feedback!" : "We'll improve this!"}
                          </span>
                        ) : (
                          <>
                            <button onClick={() => setFeedback(p => ({ ...p, [i]: "up" }))} style={{
                              background: "none", border: "none", cursor: "pointer", padding: "1px", opacity: 0.65,
                              color: C.textMuted, display: "flex", alignItems: "center",
                            }}><ThumbsUp size={12} /></button>
                            <button onClick={() => setFeedback(p => ({ ...p, [i]: "down" }))} style={{
                              background: "none", border: "none", cursor: "pointer", padding: "1px", opacity: 0.65,
                              color: C.textMuted, display: "flex", alignItems: "center",
                            }}><ThumbsDown size={12} /></button>
                          </>
                        )}
                        {i === messages.length - 1 && !thinking && !m.slots && (
                          <>
                            <span style={{ fontSize: "10px", color: C.border }}>|</span>
                            <button onClick={() => sendMessage("Can you simplify that?")} style={{
                              background: "none", border: `1px solid ${C.border}`, borderRadius: "10px",
                              padding: "1px 7px", fontSize: "10px", color: C.textMuted,
                              cursor: "pointer", fontFamily: BODY, transition: "all 0.15s",
                            }}>Simplify</button>
                            <button onClick={() => sendMessage("Can you give more detail on that?")} style={{
                              background: "none", border: `1px solid ${C.border}`, borderRadius: "10px",
                              padding: "1px 7px", fontSize: "10px", color: C.textMuted,
                              cursor: "pointer", fontFamily: BODY, transition: "all 0.15s",
                            }}>More detail</button>
                          </>
                        )}
                      </div>
                    )}
                  </>
                )}
              </motion.div>
            ))}
            </AnimatePresence>

            <AnimatePresence>
              {thinking && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.95 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  style={{ display: "flex", justifyContent: "flex-start", alignItems: "flex-end", gap: "8px" }}
                >
                  <div style={{
                    width: "28px", height: "28px", borderRadius: "50%", flexShrink: 0,
                    overflow: "hidden", boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                  }}>
                    <img src={CHAT_CONFIG.logoUrl} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                  </div>
                  <div style={{
                    background: C.msgBg, borderRadius: "20px 20px 20px 4px",
                    padding: "10px 14px", display: "flex", gap: "8px", alignItems: "center",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                  }}>
                    <div style={{ display: "flex", gap: "5px", alignItems: "center" }}>
                      {[0, 1, 2].map(d => (
                        <motion.span
                          key={d}
                          style={{
                            width: "7px", height: "7px", borderRadius: "50%",
                            background: C.textMuted, display: "block",
                          }}
                          animate={{ opacity: [0.4, 1, 0.4], y: [0, -5, 0] }}
                          transition={{ duration: 0.8, repeat: Infinity, delay: d * 0.15, ease: "easeInOut" }}
                        />
                      ))}
                    </div>
                    <span style={{ fontSize: "12px", color: C.textMuted }}>
                      {thinkingMode === "booking" ? "Checking availability..." : "Thinking..."}
                    </span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div ref={chatEndRef} />
          </div>

          {/* Suggestions */}
          <div style={{ padding: "6px 12px 4px", background: C.bg, borderTop: `1px solid ${C.border}` }}>
            <div style={{
              display: "flex", gap: "5px", flexWrap: "wrap",
              opacity: sugsVisible ? 1 : 0,
              transform: sugsVisible ? "translateY(0)" : "translateY(4px)",
              transition: "opacity 0.15s ease, transform 0.15s ease",
            }}>
              {suggestions.map((s, i) => (
                <button key={i} onClick={() => { setInput(s); inputRef.current?.focus(); }} style={{
                  background: C.sugBg, border: `1px solid ${C.sugBorder}`, borderRadius: "20px",
                  padding: "4px 11px", fontSize: "11px", color: C.sugText,
                  cursor: "pointer", fontFamily: BODY, whiteSpace: "nowrap",
                  maxWidth: "calc(100% - 4px)", overflow: "hidden", textOverflow: "ellipsis",
                  transition: "all 0.15s ease",
                }}>{s}</button>
              ))}
            </div>
          </div>

          {/* Input */}
          <div style={{
            padding: "8px 12px", borderTop: `1px solid ${C.border}`,
            display: "flex", gap: "8px", flexShrink: 0, background: C.bg,
          }}>
            <input
              ref={inputRef}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKey}
              disabled={thinking}
              placeholder="Write your message..."
              style={{
                flex: 1, padding: "10px 14px",
                border: `1px solid ${C.inputBorder}`, borderRadius: "20px",
                fontSize: "16px", fontFamily: BODY, outline: "none",
                background: thinking ? C.msgBg : C.inputBg, color: C.text,
                transition: "border-color 0.2s, background 0.2s",
              }}
            />
            <motion.button
              onClick={() => sendMessage(input)}
              disabled={thinking || !input.trim()}
              whileHover={!thinking && input.trim() ? { scale: 1.08 } : {}}
              whileTap={!thinking && input.trim() ? { scale: 0.92 } : {}}
              style={{
                background: thinking || !input.trim() ? "#94a3b8" : CHAT_CONFIG.primaryColor,
                border: "none", color: "#FFFFFF",
                width: "40px", height: "40px", borderRadius: "50%",
                display: "flex", alignItems: "center", justifyContent: "center",
                cursor: thinking || !input.trim() ? "not-allowed" : "pointer",
                flexShrink: 0, transition: "background 0.2s ease",
              }}
            >
              <Send size={16} />
            </motion.button>
          </div>

          {/* Quick actions */}
          <div style={{
            padding: "3px 12px 10px", display: "flex", gap: "14px",
            background: C.bg, borderRadius: fRad,
          }}>
            <button onClick={clearChat} style={{
              background: "none", border: "none", cursor: "pointer",
              fontSize: "11px", color: C.actionText, fontFamily: BODY, padding: "2px 0",
              transition: "color 0.15s",
            }}>Clear Chat</button>
            <button onClick={copyLast} style={{
              background: "none", border: "none", cursor: "pointer",
              fontSize: "11px", color: copiedLast ? "#34d399" : C.actionText,
              fontFamily: BODY, padding: "2px 0", transition: "color 0.15s",
            }}>{copiedLast ? "Copied!" : "Copy Last Response"}</button>
          </div>
        </div>
      )}

      {/* Floating bubble */}
      <button
        onClick={() => setOpen(o => !o)}
        aria-label={open ? "Close chat" : `Open ${CHAT_CONFIG.businessName} chat`}
        style={{
          position: "fixed", bottom: "24px", right: "24px", zIndex: 9999,
          width: "60px", height: "60px", borderRadius: "50%",
          background: "transparent", border: "none", cursor: "pointer",
          padding: 0, overflow: "hidden",
          boxShadow: "0 4px 24px rgba(0,0,0,0.22)",
          transition: "transform 0.2s ease, box-shadow 0.2s ease",
        }}
      >
        {open ? (
          <div style={{
            width: "60px", height: "60px", borderRadius: "50%",
            background: CHAT_CONFIG.primaryColor, display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <span style={{ color: "#FFFFFF", fontSize: "20px", fontWeight: 700 }}>✕</span>
          </div>
        ) : (
          <img
            src={CHAT_CONFIG.logoUrl}
            alt={CHAT_CONFIG.businessName}
            style={{ width: "60px", height: "60px", borderRadius: "50%", objectFit: "cover", display: "block" }}
          />
        )}
      </button>
    </>
  );
}
