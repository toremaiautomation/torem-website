import { useEffect, useRef } from "react";
import { P, T } from "../theme";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const NODES = [
  { label: "Chat",      angle: 0   },
  { label: "Booking",   angle: 60  },
  { label: "Follow-up", angle: 120 },
  { label: "Reviews",   angle: 180 },
  { label: "Analytics", angle: 240 },
  { label: "CRM",       angle: 300 },
];

const CX = 400, CY = 250, R = 190, NR = 46;

function toXY(angleDeg) {
  const rad = (angleDeg - 90) * (Math.PI / 180);
  return { x: CX + R * Math.cos(rad), y: CY + R * Math.sin(rad) };
}

export function HubDiagram() {
  const svgRef = useRef(null);
  const ctxRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const lines = svgRef.current.querySelectorAll(".hub-line");
      lines.forEach((line, i) => {
        gsap.to(line, {
          strokeDashoffset: 0,
          duration: 0.65,
          delay: i * 0.12,
          ease: "power2.out",
          scrollTrigger: {
            trigger: svgRef.current,
            start: "top 80%",
          },
        });
      });
    }, svgRef);
    ctxRef.current = ctx;
    return () => ctx.revert();
  }, []);

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 800 500"
      style={{ width: "100%", maxWidth: "820px", margin: "0 auto", display: "block", overflow: "visible" }}
      aria-hidden="true"
    >
      {/* Spoke lines */}
      {NODES.map((n, i) => {
        const { x, y } = toXY(n.angle);
        return (
          <line
            key={i}
            className="hub-line"
            x1={CX} y1={CY} x2={x} y2={y}
            stroke={P.blue}
            strokeWidth="2"
            strokeDasharray="190"
            strokeDashoffset="190"
            opacity="0.45"
          />
        );
      })}

      {/* Center node */}
      <circle cx={CX} cy={CY} r="64" fill={P.navy} />
      <circle cx={CX} cy={CY} r="64" fill="none" stroke={P.blue} strokeWidth="2" opacity="0.55" />
      <text x={CX} y={CY - 8} textAnchor="middle" fill="white" fontSize="12" fontWeight="700" letterSpacing="1.5">TOREM</text>
      <text x={CX} y={CY + 11} textAnchor="middle" fill={P.blue} fontSize="10.5" opacity="0.8">AI HUB</text>

      {/* Outer nodes */}
      {NODES.map((n, i) => {
        const { x, y } = toXY(n.angle);
        return (
          <g key={i}>
            <circle cx={x} cy={y} r={NR} fill={T.bgAlt} stroke={P.blue} strokeWidth="1.5" opacity="0.9" />
            <text x={x} y={y + 5} textAnchor="middle" fill={T.text} fontSize="11.5" fontWeight="600">{n.label}</text>
          </g>
        );
      })}
    </svg>
  );
}
