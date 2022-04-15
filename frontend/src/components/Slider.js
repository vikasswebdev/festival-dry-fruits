import React, { useEffect, useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";
import "../css/homescreen.css";
import { useDispatch, useSelector } from "react-redux";
import { productTopList } from "../actions/productActions";
import Loader from "./Loader";

const SliderCom = () => {
  const myProductTopList = useSelector((state) => state.productTopList);

  const dispatch = useDispatch();

  const { loading, error, products } = myProductTopList;

  useEffect(() => {
    dispatch(productTopList());
  }, [dispatch]);

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

  return loading ? (
    <Loader />
  ) : error ? (
    <div>{error}</div>
  ) : (
    <div className="slider">
      <Slider {...settings}>
        {products.map((product, index) => (
          <div className="sliderItem" key={product._id}>
            <Link to={`/product/${product._id}`}>
              <img className="image" src={`${product.image}`} alt="" />
            </Link>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default SliderCom;
