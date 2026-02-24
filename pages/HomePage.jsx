import React, { useState, useEffect } from "react";
import Reveal from "../components/UI/Reveal";
import { MCU_FACTS, MCU_TIMELINE } from "../data/mcuData";

export default function HomePage({ onViewCards, wrapStyle }) {
  const [navSolid, setNavSolid] = useState(false);

  useEffect(() => {
    const fn = () => setNavSolid(window.scrollY > 30);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <div style={{ minHeight: "100vh", background: "#fff", fontFamily: "'Inter', sans-serif", color: "#111", overflowX: "hidden", ...wrapStyle }}>
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000, height: 62,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 clamp(24px, 6vw, 80px)",
        background: navSolid ? "rgba(255,255,255,0.94)" : "transparent",
        borderBottom: navSolid ? "1px solid rgba(0,0,0,0.05)" : "1px solid transparent",
        backdropFilter: navSolid ? "blur(16px)" : "none",
        WebkitBackdropFilter: navSolid ? "blur(16px)" : "none",
        transition: "background 0.35s ease, border-color 0.35s ease, backdrop-filter 0.35s ease",
      }}>
        <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "1.5rem", letterSpacing: "5px", color: "#e62429" }}>MARVEL</div>
        <button className="pill-btn" onClick={onViewCards} style={{ padding: "9px 22px", fontSize: "0.74rem" }}>View Cards</button>
      </nav>

      <section style={{
        minHeight: "100vh", display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center", textAlign: "center",
        padding: "120px clamp(24px, 8vw, 120px) 80px", position: "relative", overflow: "hidden",
      }}>
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none", background: "radial-gradient(ellipse 65% 55% at 50% 58%, rgba(230,36,41,0.035) 0%, transparent 100%)" }} />
        
        <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.65rem", fontWeight: 600, letterSpacing: "5px", textTransform: "uppercase", color: "#e62429", marginBottom: 28, animation: "wordReveal 0.7s ease both" }}>Marvel Cinematic Universe</div>
        <h1 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(4.5rem, 12vw, 9.5rem)", lineHeight: 0.88, letterSpacing: "2px", color: "#111", marginBottom: 28, position: "relative", zIndex: 1 }}>
          <span className="home-word" style={{ animationDelay: "0.08s" }}>Earth's</span>
          <br></br>
          <span className="home-word" style={{ animationDelay: "0.18s", color: "#e62429" }}>Mightiest</span>
          <br></br>
          <span className="home-word" style={{ animationDelay: "0.28s" }}>Heroes</span>
        </h1>
        <div style={{ width: 36, height: 2, background: "#e62429", borderRadius: 2, marginBottom: 28, animation: "lineGrow 0.7s cubic-bezier(0.22,1,0.36,1) 0.5s both" }} />
        <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 300, fontSize: "clamp(0.9rem, 1.8vw, 1.05rem)", lineHeight: 1.85, color: "rgba(0,0,0,0.42)", maxWidth: 440, marginBottom: 44, animation: "wordReveal 0.8s ease 0.45s both" }}>
          Explore every hero, every story, every sacrifice.
        </p>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center", animation: "wordReveal 0.8s ease 0.58s both" }}>
          <button className="pill-btn" onClick={onViewCards}>Explore Heroes →</button>
        </div>
      </section>

    </div>
  );
}