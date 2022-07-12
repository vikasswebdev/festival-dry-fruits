import React, { useEffect, useState } from "react";

const ScrollToTop = () => {
  const [showScroll, setShowScroll] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      const isTop = window.scrollY < 100;
      if (isTop !== true) {
        setShowScroll(true);
      } else {
        setShowScroll(false);
      }
    });
  }, []);

  return (
    showScroll && (
      <div
        style={{
          position: "fixed",
          bottom: "70px",
          right: "30px",
          width: "50px",
          height: "50px",
          backgroundColor: "white",
          boxShadow: "0px 0px 5px #a5a5a5",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          zIndex: 1000,
          animation: "fadeIn 0.5s",
        }}
        onClick={() => {
          window.scroll({
            top: 0,
            left: 0,
            behavior: "smooth",
          });
        }}
      >
        <i className="fas fa-arrow-up"></i>
      </div>
    )
  );
};

export default ScrollToTop;
