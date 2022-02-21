import React, { useEffect } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import "../css/productscreen.css";
import { useDispatch, useSelector } from "react-redux";
import { productListDetails } from "../actions/productActions";

const ProductScreen = () => {
  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);

  const { product, loading, error } = productDetails;
  console.log("productDetails", product);

  const { id } = useParams();

  useEffect(() => {
    if (!product._id || product._id !== id) {
      dispatch(productListDetails(id));
    }
  }, [dispatch]);

  return (
    <>
      <div className="backHome">
        <Link to="/">
          <i className="fas fa-arrow-left"></i>
        </Link>
      </div>
      <div className="container">
        <div className="productInfo">
          <div className="productImage">
            <img src={product.image} alt="" />
          </div>
          <div className="productDetail">
            <h1>{product.name}</h1>
            <hr />
            <div className="rating">
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <span> {product.numReviews} reviews</span>
            </div>
            <hr />
            <div className="price">
              <h3>Price: ${product.price}</h3>
            </div>
            <hr />
            <div className="description">
              <p>{product.description}</p>
            </div>
          </div>
          <div className="priceCard">
            <div className="price">
              <p>Price:</p>
              <p>${product.price}</p>
            </div>
            <hr style={{ color: "gray" }} />
            <div className="status">
              <p>Status:</p>
              <p>{product.countInStock > 0 ? "In Stock" : "Out Of Stock"}</p>
            </div>
            <hr style={{ color: "gray" }} />
            {product.countInStock > 0 && (
              <div className="quantity">
                <p>Quantity:</p>
                <select>
                  {[...Array(product.countInStock).keys()].map((x) => (
                    <option key={x + 1} value={x + 1}>
                      {x + 1}
                    </option>
                  ))}
                </select>
              </div>
            )}
            <hr style={{ color: "gray" }} />
            <div>
              <button
                className="addToCart"
                disabled={product.countInStock === 0}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
        <div className="container reviewContainer">
          <div className="writeReview">
            <h1>Write a Review</h1>
            <form>
              <div className="form-control">
                <label htmlFor="rating">Rating</label>
                <select name="rating" id="rating">
                  <option value="">Select...</option>
                  <option value="1">1 - Poor</option>
                  <option value="2">2 - Fair</option>
                  <option value="3">3 - Good</option>
                  <option value="4">4 - Very Good</option>
                  <option value="5">5 - Excellent</option>
                </select>
              </div>
              <div className="form-control">
                <label htmlFor="comment">Comment</label>
                <textarea
                  name="comment"
                  id="comment"
                  cols="30"
                  rows="10"
                ></textarea>
              </div>
              <button className="submitReview">Submit Review</button>
            </form>
          </div>
          <hr />
          <div>
            <h3>vikas patel</h3>
            <div className="rating">
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
            </div>
            <div className="reviewDesc">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Pellentesque euismod, urna eu tincidunt consectetur, nisi urna
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductScreen;
