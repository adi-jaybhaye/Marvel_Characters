import React, { useState } from "react";
import GlobalStyles from "../styles/GLobalStyles"; 
import HomePage from "../pages/HomePage";
import CardPage from "../pages/CardPage";

export default function App() {
  const [page, setPage] = useState("home");
  const [transitioning, setTransitioning] = useState(false);

  function goTo(p) {
    if (p === page || transitioning) return;
    setTransitioning(true);
    setTimeout(() => {
      setPage(p);
      setTimeout(() => setTransitioning(false), 320);
    }, 220);
  }

  const wrapStyle = {
    opacity: transitioning ? 0 : 1,
    transition: "opacity 0.22s ease",
    willChange: "opacity",
  };

  return (
    <>
      <GlobalStyles />
      {page === "home" ? (
        <HomePage onViewCards={() => goTo("carousel")} wrapStyle={wrapStyle} />
      ) : (
        <CardPage onGoHome={() => goTo("home")} wrapStyle={wrapStyle} />
      )}
    </>
  );
}