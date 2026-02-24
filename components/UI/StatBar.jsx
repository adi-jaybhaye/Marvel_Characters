import React, { useState, useEffect } from "react";

export default function StatBar({ label, value, accent }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <div style={{ marginBottom: 13 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5, alignItems: "baseline" }}>
        <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.65rem", fontWeight: 500, letterSpacing: "1.5px", textTransform: "uppercase", color: "rgba(0,0,0,0.3)" }}>{label}</span>
        <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.75rem", fontWeight: 600, color: "rgba(0,0,0,0.5)" }}>{value}</span>
      </div>
      <div style={{ height: 2.5, background: "rgba(0,0,0,0.05)", borderRadius: 2, overflow: "hidden" }}>
        <div style={{
          height: "100%", borderRadius: 2,
          background: accent || "#111",
          width: mounted ? `${value}%` : "0%",
          transition: "width 0.9s cubic-bezier(0.22,1,0.36,1)",
          transformOrigin: "left",
        }} />
      </div>
    </div>
  );
}