import React, { useState } from "react";
import HeroDetailModal from "../components/Hero/HeroDetailModal";
import { characters } from "../data/mcuData";

export default function CardPage({ onGoHome, wrapStyle }) {
  const [activeCard, setActiveCard] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [selectedHero, setSelectedHero] = useState(null);

  function rotate(dir) {
    if (animating) return;
    setAnimating(true);
    setActiveCard(prev => (prev + dir + characters.length) % characters.length);
    setTimeout(() => setAnimating(false), 620);
  }

  function getCardStyle(index) {
    const total = characters.length;
    const diff = ((index - activeCard) % total + total) % total;
    const nd = diff > total / 2 ? diff - total : diff;
    const angle = (nd / total) * 360;
    const rad = (angle * Math.PI) / 180;
    const R = 400;
    const x = Math.sin(rad) * R;
    const z = Math.cos(rad) * R - R;
    const scale = 0.52 + (Math.cos(rad) + 1) * 0.24;
    const opacity = 0.18 + (Math.cos(rad) + 1) * 0.41;
    return {
      transform: `translateX(${x}px) translateZ(${z}px) scale(${scale})`,
      opacity,
      zIndex: Math.round(scale * 100),
      transition: "transform 0.64s cubic-bezier(0.22,1,0.36,1), opacity 0.64s cubic-bezier(0.22,1,0.36,1)",
      cursor: "pointer",
    };
  }

  const char = characters[activeCard];

  return (
    <div style={{ minHeight: "100vh", background: "#fff", overflow: "hidden", ...wrapStyle }}>
      <div style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000, height: 56,
        display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 30px",
        background: "rgba(255,255,255,0.9)", backdropFilter: "blur(14px)", WebkitBackdropFilter: "blur(14px)",
        borderBottom: "1px solid rgba(0,0,0,0.05)",
      }}>
        <button className="mnav-link" onClick={onGoHome}>← Back</button>
        <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "1.15rem", letterSpacing: "6px", color: "#e62429" }}>MARVEL</div>
        <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.68rem", color: "rgba(0,0,0,0.25)" }}>{activeCard + 1} / {characters.length}</div>
      </div>

      <div style={{ position: "fixed", left: "50%", top: "50%", transform: "translate(-50%,-50%)", width: "100%", height: "100%", perspective: "960px" }}>
        <div style={{ position: "absolute", left: "50%", top: "50%", transformStyle: "preserve-3d", width: 0, height: 0 }}>
          {characters.map((c, i) => {
            const total = characters.length;
            const diff = ((i - activeCard) % total + total) % total;
            const nd = diff > total / 2 ? diff - total : diff;
            const isActive = nd === 0;
            return (
              <div key={c.id} className="card-wrap" style={getCardStyle(i)} onClick={() => { if (isActive) setSelectedHero(c); else setActiveCard(i); }}>
                <div className={`card-face ${isActive ? "active-card" : "inactive-card"}`}>
                  <div style={{ flex: "0 0 58%", position: "relative", overflow: "hidden", background: "#f8f8f8", borderBottom: "1px solid rgba(0,0,0,0.04)" }}>
                    {c.image ? <img src={c.image} alt={c.name} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top center", display: "block" }} /> : (
                      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 9 }}>
                        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: c.accent }} />
                        <svg width="36" height="46" viewBox="0 0 44 56" fill="none"><circle cx="22" cy="16" r="10" fill="rgba(0,0,0,0.06)" /><path d="M2 54C2 40 10 34 22 34C34 34 42 40 42 54" stroke="rgba(0,0,0,0.06)" strokeWidth="3.5" strokeLinecap="round" /></svg>
                        <span className="ph-pulse" style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.52rem", fontWeight: 500, letterSpacing: "2.5px", textTransform: "uppercase", color: "rgba(0,0,0,0.18)" }}>Photo</span>
                      </div>
                    )}
                  </div>
                  <div style={{ flex: 1, padding: "13px 15px 15px", display: "flex", flexDirection: "column", background: "#fff" }}>
                    <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.53rem", fontWeight: 500, letterSpacing: "2px", textTransform: "uppercase", color: "rgba(0,0,0,0.25)", marginBottom: 4 }}>{c.alias}</div>
                    <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "1.45rem", letterSpacing: "1px", lineHeight: 1, color: "#111", marginBottom: 7 }}>{c.name}</div>
                    <div style={{ width: 18, height: 1.5, background: c.accent, borderRadius: 1, marginBottom: 8 }} />
                    <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.58rem", color: "rgba(0,0,0,0.3)", lineHeight: 1.6, marginBottom: "auto" }}>{c.power}</div>
                    {isActive && <button className="profile-btn" onClick={e => { e.stopPropagation(); setSelectedHero(c); }}>View Profile</button>}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <button className="c-arrow" onClick={() => rotate(-1)} style={{ left: 18, transform: "translateY(-50%)" }}>‹</button>
      <button className="c-arrow" onClick={() => rotate(1)} style={{ right: 18, transform: "translateY(-50%)" }}>›</button>

      <div style={{ position: "fixed", bottom: 24, left: "50%", transform: "translateX(-50%)", display: "flex", gap: 5, zIndex: 900 }}>
        {characters.map((_, i) => (
          <div key={i} className="c-dot" onClick={() => setActiveCard(i)} style={{ width: i === activeCard ? 18 : 4, background: i === activeCard ? "#111" : "rgba(0,0,0,0.11)" }} />
        ))}
      </div>

      {selectedHero && <HeroDetailModal hero={selectedHero} onClose={() => setSelectedHero(null)} />}
    </div>
  );
}