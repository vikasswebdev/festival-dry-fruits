import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { productTopList } from "../actions/productActions";
import Loader from "./Loader";
import Carousel, { CarouselItem } from "./carousel/Carousel";

const SliderCom = () => {
  const myProductTopList = useSelector((state) => state.productTopList);

  const dispatch = useDispatch();

  const { loading, error, products } = myProductTopList;

  useEffect(() => {
    dispatch(productTopList());
  }, [dispatch]);

  const createMarkup = (html) => {
    return { __html: html };
  };

  return loading ? (
    <Loader />
  ) : error ? (
    <div>{error}</div>
  ) : (
    <Carousel>
      {products.map((product, index) => (
        <CarouselItem key={product._id}>
          <Link
            to={`/product/${product._id}`}
            style={{ width: "100%", height: 500 }}
          >
            <div
              style={{
                backgroundImage: `url(${process.env.REACT_APP_API_URL}${product.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                height: "100%",
                width: "100%",
                backgroundClip: "content-box",
              }}
            >
              <div className="carousel-caption">
                <h1>{product.name}</h1>
                <button className="sliderBtn">
                  Buy Now <i className="fas fa-shopping-cart"></i>
                </button>
              </div>
            </div>
          </Link>
        </CarouselItem>
      ))}
    </Carousel>
  );
};

export default SliderCom;
