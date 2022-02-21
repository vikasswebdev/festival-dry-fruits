import React, { useEffect } from "react";
import Product from "../components/Product";
import SliderCom from "../components/Slider";
import "../css/homescreen.css";
import { useSelector, useDispatch } from "react-redux";
import { productsList } from "../actions/productActions";

const HomeScreen = () => {
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(productsList());
  }, [dispatch]);

  return (
    <>
      <SliderCom />
      <div className="productContainer">
        <h1 style={{ fontSize: 36, fontFamily: "sans-serif", marginLeft: 55 }}>
          Letest Product
        </h1>
        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div>{error}</div>
        ) : (
          <>
            <div className="productRow">
              {products.map((product, index) => (
                <Product key={index} id={index} product={product} />
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default HomeScreen;
