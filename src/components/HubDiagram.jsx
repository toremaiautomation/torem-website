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
const CX = 400, CY = 240, R = 160, NR = 38;

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
          duration: 0.6,
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
    <svg ref={svgRef} viewBox="0 0 800 480" style={{ width:"100%", maxWidth:"660px", margin:"0 auto", display:"block", overflow:"visible" }} aria-hidden="true">
      {NODES.map((n, i) => {
        const { x, y } = toXY(n.angle);
        return (
          <line
            key={i}
            className="hub-line"
            x1={CX} y1={CY} x2={x} y2={y}
            stroke={P.blue}
            strokeWidth="2"
            strokeDasharray="160"
            strokeDashoffset="160"
            opacity="0.5"
          />
        );
      })}
      {/* Center node */}
      <circle cx={CX} cy={CY} r="52" fill={P.navy} />
      <circle cx={CX} cy={CY} r="52" fill="none" stroke={P.blue} strokeWidth="2" opacity="0.6" />
      <text x={CX} y={CY - 7} textAnchor="middle" fill="white" fontSize="11" fontWeight="700" letterSpacing="1">TOREM</text>
      <text x={CX} y={CY + 10} textAnchor="middle" fill={P.blue} fontSize="10" opacity="0.8">AI HUB</text>

      {/* Outer nodes */}
      {NODES.map((n, i) => {
        const { x, y } = toXY(n.angle);
        return (
          <g key={i}>
            <circle cx={x} cy={y} r={NR} fill={T.bgAlt} stroke={P.blue} strokeWidth="1.5" opacity="0.9" />
            <text x={x} y={y + 5} textAnchor="middle" fill={T.text} fontSize="11" fontWeight="600">{n.label}</text>
          </g>
        );
      })}
    </svg>
  );
}
