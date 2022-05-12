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

  return loading ? (
    <Loader />
  ) : error ? (
    <div>{error}</div>
  ) : (
    <Carousel>
      {products.map((product, index) => (
        <CarouselItem key={product._id}>
          <Link to={`/product/${product._id}`}>
            <div
              style={{
                borderRadius: "50%",
                overflow: "hidden",
              }}
            >
              <img
                style={{ width: "100%", height: "90%" }}
                src={`${product.image}`}
                alt=""
              />
            </div>
          </Link>
        </CarouselItem>
      ))}
    </Carousel>
  );
};

export default SliderCom;
