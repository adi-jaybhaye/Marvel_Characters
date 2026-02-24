import React, { useState, useEffect, useRef } from "react";

function useReveal() {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } }, { threshold: 0.12 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, vis];
}

export default function Reveal({ children, delay = 0, dir = "up", style = {} }) {
  const [ref, vis] = useReveal();
  const anim = dir === "left" ? "revealLeft" : "revealUp";
  return (
    <div ref={ref} style={{
      opacity: vis ? 1 : 0,
      animation: vis ? `${anim} 0.72s cubic-bezier(0.22,1,0.36,1) ${delay}s both` : "none",
      ...style,
    }}>
      {children}
    </div>
  );
}