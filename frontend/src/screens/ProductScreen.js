import React from "react";
import { Link } from "react-router-dom";
import "../css/productscreen.css";

const ProductScreen = () => {
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
            <img src="../../images/alexa.jpg" alt="" />
          </div>
          <div className="productDetail">
            <h1>AMAZON ECHO DOT 3RD GENERATION</h1>
            <hr />
            <div className="rating">
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <span> 0 reviews</span>
            </div>
            <hr />
            <div className="price">
              <h3>Price: $99.99</h3>
            </div>
            <hr />
            <div className="description">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Pellentesque euismod, urna eu tincidunt consectetur, nisi urna
                euismod nisi, eget egestas nisl nisl eget nisi.
              </p>
            </div>
          </div>
          <div className="priceCard">
            <div className="price">
              <p>Price:</p>
              <p>$99.99</p>
            </div>
            <hr style={{ color: "gray" }} />
            <div className="status">
              <p>Status:</p>
              <p>In Stock</p>
            </div>
            <hr style={{ color: "gray" }} />
            <div className="quantity">
              <p>Quantity:</p>
              <select>
                <option>1</option>
                <option>2</option>
                <option>3</option>
              </select>
            </div>
            <hr style={{ color: "gray" }} />
            <div>
              <button className="addToCart">Add to Cart</button>
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
