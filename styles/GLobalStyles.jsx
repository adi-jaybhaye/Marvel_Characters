import React from "react";

const G = `
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@300;400;500;600&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }

  /* ── Keyframes ── */
  @keyframes fadeIn { from { opacity:0 } to { opacity:1 } }
  @keyframes fadeOut { from { opacity:1 } to { opacity:0 } }
  @keyframes slideUp { from { opacity:0; transform: translateY(24px) scale(0.98); } to { opacity:1; transform: translateY(0) scale(1); } }
  @keyframes slideDown { from { opacity:1; transform: translateY(0) scale(1); } to { opacity:0; transform: translateY(16px) scale(0.98); } }
  @keyframes tabSwitch { from { opacity:0; transform: translateY(8px); } to { opacity:1; transform: translateY(0); } }
  @keyframes wordReveal { from { opacity:0; transform: translateY(18px); } to { opacity:1; transform: translateY(0); } }
  @keyframes revealUp { from { opacity:0; transform: translateY(28px); } to { opacity:1; transform: translateY(0); } }
  @keyframes revealLeft { from { opacity:0; transform: translateX(-24px); } to { opacity:1; transform: translateX(0); } }

  .mnav-link {
    font-family: 'Inter', sans-serif; font-size: 0.78rem; font-weight: 500;
    color: rgba(0,0,0,0.38); background: none; border: none; cursor: pointer;
  }
  .mnav-link:hover { color: #111; }

  .pill-btn {
    display: inline-flex; align-items: center; background: #111; color: #fff; border: none;
    padding: 13px 32px; border-radius: 100px; font-family: 'Inter', sans-serif; font-size: 0.8rem; cursor: pointer;
  }
  .pill-btn:hover { background: #e62429; }

  .card-wrap { width: 248px; height: 364px; position: absolute; left: 50%; top: 50%; margin-left: -124px; margin-top: -182px; transform-style: preserve-3d; }
  .card-face { width: 100%; height: 100%; border-radius: 14px; position: relative; overflow: hidden; background: #fff; border: 1px solid rgba(0,0,0,0.06); }
  .card-face.active-card { box-shadow: 0 20px 48px rgba(0,0,0,0.07); }

  .modal-overlay { position: fixed; inset: 0; z-index: 2000; display: flex; align-items: center; justify-content: center; background: rgba(248,248,248,0.82); backdrop-filter: blur(28px); }
  .modal-panel { width: 100%; max-width: 800px; max-height: 88vh; border-radius: 20px; overflow: hidden; background: #fff; }
`;

export default function GlobalStyles() {
  return <style dangerouslySetInnerHTML={{ __html: G }} />;
}