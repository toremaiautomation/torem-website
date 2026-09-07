import { P } from "../theme";

export function MeshBackground({ simple = false }) {
  return (
    <div style={{
      position: "absolute", inset: 0,
      pointerEvents: "none", zIndex: 0, overflow: "hidden",
    }}>
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: `linear-gradient(${P.blueprintLine} 1px, transparent 1px), linear-gradient(90deg, ${P.blueprintLine} 1px, transparent 1px)`,
        backgroundSize: "44px 44px",
      }} />
      <div style={{
        position: "absolute", top: "-15%", right: "-6%",
        width: "560px", height: "560px", borderRadius: "50%",
        background: "radial-gradient(circle, rgba(0,122,227,0.24) 0%, transparent 68%)",
        filter: "blur(64px)",
      }} />
      <div style={{
        position: "absolute", bottom: "-12%", left: "-4%",
        width: "420px", height: "420px", borderRadius: "50%",
        background: "radial-gradient(circle, rgba(23,84,207,0.16) 0%, transparent 68%)",
        filter: "blur(80px)",
      }} />
      {!simple && (
        <div style={{
          position: "absolute", top: "35%", left: "22%",
          width: "320px", height: "320px", borderRadius: "50%",
          background: "radial-gradient(circle, rgba(0,136,245,0.10) 0%, transparent 70%)",
          filter: "blur(100px)",
        }} />
      )}
    </div>
  );
}
