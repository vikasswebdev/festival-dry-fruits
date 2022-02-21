import React from "react";
import { Link } from "react-router-dom";

const Product = ({ product }) => {
  return (
    <div className="productCard">
      <div className="productImage">
        <Link to={`/product/${product._id}`}>
          <img src={product.image} alt="" />
        </Link>
      </div>
      <div className="productInfo">
        <Link to={`/product/${product._id}`}>
          <div className="productTitle">
            <strong>{product.name}</strong>
          </div>
        </Link>
        <div className="rating">
          <i className="fas fa-star"></i>
          <i className="fas fa-star"></i>
          <i className="fas fa-star"></i>
          <i className="fas fa-star"></i>
          <i className="fas fa-star"></i>
          <span> {product.numReviews} reviews</span>
        </div>
        <div className="price">
          <h3>${product.price}</h3>
        </div>
      </div>
    </div>
  );
};

export default Product;
