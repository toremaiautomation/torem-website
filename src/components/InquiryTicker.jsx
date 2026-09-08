import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { AlertTriangle } from "lucide-react";
import { T, DISPLAY, BODY } from "../theme";
import { useReducedMotion } from "../hooks/useReducedMotion";

const RISK_RED = "#F87171";
const SIGNAL_BLUE = "#007AE3";

const QUERIES = [
  { initial: "A", text: "Do you have availability this weekend?",  channel: "WEBSITE"      },
  { initial: "M", text: "Can I reschedule my appointment?",        channel: "PHONE"        },
  { initial: "J", text: "Do you offer payment plans?",             channel: "EMAIL"        },
  { initial: "S", text: "Is there a loyalty program?",             channel: "CONTACT FORM" },
  { initial: "R", text: "Can I get a refund?",                     channel: "PHONE"        },
  { initial: "D", text: "Do you deliver to my area?",              channel: "WEBSITE"      },
  { initial: "L", text: "What are your business hours?",           channel: "EMAIL"        },
  { initial: "K", text: "How long does the process take?",         channel: "CONTACT FORM" },
  { initial: "T", text: "Do you offer a free consultation?",       channel: "PHONE"        },
  { initial: "N", text: "Is there a cancellation fee?",            channel: "WEBSITE"      },
];

const AVATAR_COLORS = [
  SIGNAL_BLUE,
  "#1A8AE8",
  "#005FBA",
  "#3B9EFF",
  "#0070D0",
];

const DOUBLED = [...QUERIES, ...QUERIES];

function QueryCard({ initial, text, channel, avatarColor }) {
  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      gap: "14px",
      background: "#FFFFFF",
      borderRadius: "100px",
      padding: "11px 16px 11px 11px",
      boxShadow: "0 2px 12px rgba(0,0,0,0.07)",
      border: "1px solid rgba(0,122,227,0.08)",
    }}>
      <div style={{
        width: "36px",
        height: "36px",
        borderRadius: "50%",
        background: avatarColor,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
        color: "#FFFFFF",
        fontFamily: DISPLAY,
        fontSize: "13px",
        fontWeight: 700,
        userSelect: "none",
      }}>
        {initial}
      </div>
      <p style={{
        flex: 1,
        fontFamily: BODY,
        fontSize: "14px",
        color: T.text,
        margin: 0,
        lineHeight: 1.4,
        minWidth: 0,
      }}>
        {text}
      </p>
      <span style={{
        background: "#EBF2FF",
        color: SIGNAL_BLUE,
        borderRadius: "20px",
        padding: "3px 10px",
        fontSize: "10px",
        fontFamily: BODY,
        fontWeight: 700,
        letterSpacing: "0.8px",
        textTransform: "uppercase",
        flexShrink: 0,
        whiteSpace: "nowrap",
      }}>
        {channel}
      </span>
    </div>
  );
}

export function InquiryTicker() {
  const reduced = useReducedMotion();
  const counterRef = useRef(null);
  const inView = useInView(counterRef, { once: true, margin: "-80px 0px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduced) { setCount(30); return; }
    const target = 30;
    const duration = 1600;
    const startTime = performance.now();
    const tick = (now) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, reduced]);

  return (
    <section style={{ background: T.bgAlt2, padding: "104px clamp(24px,6vw,80px)" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>

        {/* Headline */}
        <div style={{ textAlign: "center", marginBottom: "52px" }}>
          <h2 style={{
            fontFamily: DISPLAY,
            fontSize: "clamp(28px, 4vw, 46px)",
            fontWeight: 800,
            color: T.text,
            lineHeight: 1.15,
            letterSpacing: "-0.5px",
            maxWidth: "640px",
            margin: "0 auto 16px",
          }}>
            Right now, every question lands on you.
          </h2>
          <p style={{
            fontFamily: BODY,
            fontSize: "clamp(15px, 1.8vw, 17px)",
            color: T.textMuted,
            maxWidth: "520px",
            margin: "0 auto",
            lineHeight: 1.7,
          }}>
            Website, phone, email, contact form, and everywhere else. The one you miss at 7pm on a Friday was a customer.
          </p>
        </div>

        {/* Ticker */}
        <div style={{
          maxWidth: "640px",
          margin: "0 auto",
          height: "348px",
          overflow: "hidden",
          WebkitMaskImage: "linear-gradient(to bottom, transparent, black 18%, black 82%, transparent)",
          maskImage: "linear-gradient(to bottom, transparent, black 18%, black 82%, transparent)",
        }}>
          <motion.div
            aria-hidden="true"
            animate={reduced ? {} : { y: ["0%", "-50%"] }}
            transition={{ duration: 22, ease: "linear", repeat: Infinity }}
            style={{ display: "flex", flexDirection: "column", gap: "10px" }}
          >
            {DOUBLED.map((q, i) => (
              <QueryCard
                key={i}
                initial={q.initial}
                text={q.text}
                channel={q.channel}
                avatarColor={AVATAR_COLORS[i % AVATAR_COLORS.length]}
              />
            ))}
          </motion.div>
        </div>

        {/* Counter */}
        <div style={{ textAlign: "center", marginTop: "64px" }}>
          <div
            ref={counterRef}
            style={{ display: "inline-flex", alignItems: "center", gap: "12px", marginBottom: "10px" }}
          >
            <AlertTriangle size={28} color={RISK_RED} strokeWidth={2} />
            <span style={{
              fontFamily: DISPLAY,
              fontSize: "clamp(52px, 6.5vw, 76px)",
              fontWeight: 800,
              color: RISK_RED,
              lineHeight: 1,
              letterSpacing: "-1.5px",
            }}>
              {count}+
            </span>
          </div>

          <p style={{
            fontFamily: BODY,
            fontSize: "11px",
            fontWeight: 700,
            color: RISK_RED,
            letterSpacing: "1.4px",
            textTransform: "uppercase",
            opacity: 0.7,
            marginBottom: "16px",
          }}>
            Illustrative example
          </p>

          <p style={{
            fontFamily: BODY,
            fontSize: "15px",
            color: T.textMuted,
            maxWidth: "440px",
            margin: "0 auto 20px",
            lineHeight: 1.7,
          }}>
            One missed inquiry a day adds up to 30+ potential customers gone in a single month.
          </p>

          <p style={{
            fontFamily: DISPLAY,
            fontSize: "clamp(17px, 2vw, 21px)",
            fontWeight: 700,
            color: T.text,
            maxWidth: "440px",
            margin: "0 auto",
            lineHeight: 1.35,
          }}>
            Every missed question is a customer choosing someone else.
          </p>
        </div>

      </div>
    </section>
  );
}
