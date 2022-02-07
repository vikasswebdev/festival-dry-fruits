import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";

const SliderCom = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    swipe: true,
  };

  return (
    <div>
      <Slider {...settings}>
        <Link to="/">
          <img
            className="image"
            src="https://images.unsplash.com/photo-1598371623789-44e341c1b6ab?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80"
            alt=""
          />
        </Link>
        <Link to="/">
          <img
            className="image"
            src="https://images.unsplash.com/photo-1601368157676-bdf57977c398?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80"
            alt=""
          />
        </Link>
        <Link to="/">
          <img
            className="image"
            src="https://images.unsplash.com/photo-1598371623789-44e341c1b6ab?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80"
            alt=""
          />
        </Link>
        <Link to="/">
          <img
            className="image"
            src="https://images.unsplash.com/photo-1598371623789-44e341c1b6ab?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80"
            alt=""
          />
        </Link>
      </Slider>
    </div>
  );
};

export default SliderCom;
