import React, { useEffect } from "react";
import Product from "../components/Product";
import SliderCom from "../components/Slider";
import "../css/homescreen.css";
import { useSelector, useDispatch } from "react-redux";
import { productsList } from "../actions/productActions";
import Loader from "../components/Loader";
import { useParams } from "react-router-dom";
import Paginate from "../components/Paginate";
import Carousel, { CarouselItem } from "../components/carousel/Carousel";

const HomeScreen = () => {
  const productList = useSelector((state) => state.productList);
  const { loading, error, products, pages, page } = productList;

  const dispatch = useDispatch();

  const { keyword, pageNumber } = useParams();

  const mypageNumber = pageNumber || 1;

  useEffect(() => {
    dispatch(productsList(keyword, mypageNumber));
  }, [dispatch, keyword, mypageNumber]);

  return (
    <>
      <SliderCom />
      <div className="productContainer">
        <h1 style={{ fontSize: 36, fontFamily: "sans-serif", marginLeft: 55 }}>
          hot product
        </h1>
        {loading ? (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Loader />
          </div>
        ) : error ? (
          <div>{error}</div>
        ) : (
          <>
            <div className="productRow">
              {products.map((product, index) => (
                <Product key={index} id={index} product={product} />
              ))}
            </div>
            {pages > 1 && (
              <Paginate
                pages={pages}
                page={page}
                keyword={keyword ? keyword : ""}
              />
            )}
          </>
        )}
      </div>
    </>
  );
};

export default HomeScreen;
