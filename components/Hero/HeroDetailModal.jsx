import React, { useState, useEffect } from "react";
import StatBar from "../UI/StatBar";

function Label({ children }) {
  return (
    <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.58rem", fontWeight: 600, letterSpacing: "2.5px", textTransform: "uppercase", color: "rgba(0,0,0,0.25)", marginBottom: 13 }}>
      {children}
    </div>
  );
}

export default function HeroDetailModal({ hero, onClose }) {
  const [tab, setTab] = useState("story");
  const [closing, setClosing] = useState(false);

  function close() {
    setClosing(true);
    setTimeout(onClose, 240);
  }

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const onKey = (e) => { if (e.key === "Escape") close(); };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  const TABS = ["story", "powers", "history", "films"];
  const phase = closing ? "close" : "open";

  return (
    <div className={`modal-overlay ${phase}`} onClick={close}>
      <div className={`modal-panel ${phase}`} onClick={e => e.stopPropagation()}>
        <div style={{ display: "flex", flexShrink: 0, borderBottom: "1px solid rgba(0,0,0,0.055)", position: "relative" }}>
          <div style={{ width: 156, flexShrink: 0, background: "#f7f7f7", borderRight: "1px solid rgba(0,0,0,0.05)", position: "relative", overflow: "hidden", minHeight: 205 }}>
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: hero.accent, zIndex: 1 }} />
            {hero.image ? (
              <img src={hero.image} alt={hero.name} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top center", display: "block" }} />
            ) : (
              <div style={{ width: "100%", minHeight: 205, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 8 }}>
                <svg width="38" height="50" viewBox="0 0 44 56" fill="none">
                  <circle cx="22" cy="16" r="10" fill="rgba(0,0,0,0.06)" />
                  <path d="M2 54C2 40 10 34 22 34C34 34 42 40 42 54" stroke="rgba(0,0,0,0.06)" strokeWidth="3.5" strokeLinecap="round" />
                </svg>
                <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.52rem", fontWeight: 500, letterSpacing: "2px", textTransform: "uppercase", color: "rgba(0,0,0,0.18)" }}>Photo</span>
              </div>
            )}
          </div>

          <div style={{ flex: 1, padding: "22px 26px 18px", display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 5 }}>
              <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.57rem", fontWeight: 500, letterSpacing: "2.5px", textTransform: "uppercase", color: "rgba(0,0,0,0.27)" }}>{hero.alias}</span>
              {hero.avenger && (
                <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.5rem", fontWeight: 600, letterSpacing: "1.5px", textTransform: "uppercase", color: "#e62429", border: "1px solid rgba(230,36,41,0.2)", padding: "1px 7px", borderRadius: 4 }}>Avenger</span>
              )}
            </div>
            <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(1.8rem, 3.5vw, 2.7rem)", letterSpacing: "1px", lineHeight: 1, color: "#0f0f0f", marginBottom: 7 }}>{hero.name}</h2>
            <div style={{ width: 20, height: 1.5, background: hero.accent, borderRadius: 1, marginBottom: 10, opacity: 0.85 }} />
            <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.69rem", color: "rgba(0,0,0,0.36)", lineHeight: 1.7, marginBottom: 12 }}>{hero.power}</div>
            <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.79rem", fontStyle: "italic", color: "rgba(0,0,0,0.38)", lineHeight: 1.75, borderLeft: `1.5px solid ${hero.accent}`, paddingLeft: 10, marginBottom: "auto" }}>"{hero.quote}"</div>
            <div style={{ marginTop: 14 }}>
              <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.55rem", fontWeight: 500, letterSpacing: "2px", textTransform: "uppercase", color: "rgba(0,0,0,0.2)", marginBottom: 2 }}>Signature</div>
              <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.78rem", fontWeight: 500, color: "rgba(0,0,0,0.48)" }}>{hero.suit}</div>
            </div>
          </div>
          <button className="close-x" onClick={close} style={{ position: "absolute", top: 13, right: 13, background: "rgba(0,0,0,0.035)", border: "none", width: 28, height: 28, borderRadius: "50%", color: "rgba(0,0,0,0.28)", fontSize: "0.78rem", cursor: "pointer" }}>✕</button>
        </div>

        <div style={{ display: "flex", borderBottom: "1px solid rgba(0,0,0,0.055)", flexShrink: 0, background: "rgba(255,255,255,0.95)" }}>
          {TABS.map(t => (
            <button key={t} className="modal-tab-btn" onClick={() => setTab(t)} style={{ fontWeight: tab === t ? 600 : 400, color: tab === t ? "#111" : "rgba(0,0,0,0.3)", borderBottom: tab === t ? `1.5px solid ${hero.accent}` : "1.5px solid transparent" }}>{t.charAt(0).toUpperCase() + t.slice(1)}</button>
          ))}
        </div>

        <div className="modal-scroll" style={{ flex: 1, overflowY: "auto", padding: "24px 28px 30px", background: "#fff" }}>
          <div key={tab} style={{ animation: "tabSwitch 0.24s cubic-bezier(0.22,1,0.36,1) both" }}>
            {tab === "story" && (
              <div>
                <Label>The Story</Label>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.85rem", fontWeight: 300, lineHeight: 1.92, color: "rgba(0,0,0,0.56)", marginBottom: 28 }}>{hero.story}</p>
                <Label>Power Stats</Label>
                {Object.entries(hero.stats).map(([k, v]) => <StatBar key={k} label={k} value={v} accent={hero.accent} />)}
              </div>
            )}
            {tab === "powers" && (
              <div>
                <Label>Abilities</Label>
                <div style={{ display: "flex", flexDirection: "column", gap: 5, marginBottom: 20 }}>
                  {hero.powers.map((p, i) => (
                    <div key={i} className="power-row" style={{ display: "flex", alignItems: "flex-start", gap: 12, padding: "10px 12px", background: "rgba(0,0,0,0.013)", border: "1px solid rgba(0,0,0,0.038)" }}>
                      <div style={{ width: 19, height: 19, borderRadius: "50%", background: "#efefef", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Inter', sans-serif", fontSize: "0.58rem", fontWeight: 600, color: "rgba(0,0,0,0.32)", marginTop: 2 }}>{i + 1}</div>
                      <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.82rem", fontWeight: 300, color: "rgba(0,0,0,0.6)", lineHeight: 1.65 }}>{p}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {tab === "history" && (
              <div>
                <Label>Origin & History</Label>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.85rem", fontWeight: 300, lineHeight: 1.92, color: "rgba(0,0,0,0.56)" }}>{hero.history}</p>
              </div>
            )}
            {tab === "films" && (
              <div>
                <Label>MCU Appearances</Label>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 7, marginBottom: 26 }}>
                  {hero.appearances.map((f, i) => (
                    <div key={i} className="film-chip" style={{ padding: "7px 14px", borderRadius: 7, background: "#f6f6f6", border: "1px solid rgba(0,0,0,0.055)", fontFamily: "'Inter', sans-serif", fontSize: "0.77rem", fontWeight: 400, color: "rgba(0,0,0,0.52)" }}>{f}</div>
                  ))}
                </div>
                <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "4rem", lineHeight: 1, letterSpacing: "2px", color: "rgba(0,0,0,0.038)" }}>
                  {hero.appearances.length}
                  <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.6rem", fontWeight: 600, letterSpacing: "3px", textTransform: "uppercase", color: "rgba(0,0,0,0.16)", marginTop: 4 }}>Appearances</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}