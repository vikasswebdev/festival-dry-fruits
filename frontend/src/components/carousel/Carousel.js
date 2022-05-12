import React, { useState, useEffect } from "react";
import "./Carousel.css";

export const CarouselItem = ({ children, width }) => {
  return (
    <div className="carousel-item" style={{ width: width }}>
      {children}
    </div>
  );
};

const Carousel = ({ children }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((activeIndex + 1) % children.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [activeIndex, children]);

  const updateActiveIndex = (index) => {
    if (index < 0) {
      index = 0;
    } else if (index >= React.Children.count(children)) {
      index = React.Children.count(children) - 1;
    }

    setActiveIndex(index);
  };

  return (
    <div className="carousel">
      <div
        className="inner"
        style={{ transform: `translateX(-${activeIndex * 100}%)` }}
      >
        {React.Children.map(children, (child, index) => {
          return React.cloneElement(child, { width: "100%" });
        })}
      </div>
      <div className="controls">
        {React.Children.map(children, (child, index) => {
          return (
            <button
              className={index === activeIndex ? "active" : ""}
              onClick={() => updateActiveIndex(index)}
            ></button>
          );
        })}
      </div>
    </div>
  );
};

export default Carousel;
