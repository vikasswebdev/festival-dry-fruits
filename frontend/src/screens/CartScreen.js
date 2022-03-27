import React from "react";
import { Link } from "react-router-dom";
import "../css/cartscreen.css";

const CartScreen = () => {
  return (
    <div className="cartScreen">
      <div className="cartProducts">
        <div>
          <h1>SHOPPING CART</h1>
        </div>
        <div className="cartProduct">
          <div className="cartProductImage">
            <img src="../../images/alexa.jpg" alt="" />
          </div>
          <div className="productTitle">
            <Link to="/">This is my first productPrice</Link>
          </div>
          <div className="productPrice">
            <h1>$99.99</h1>
          </div>
          <div className="productQuantity">
            <select>
              <option>1</option>
              <option>2</option>
              <option>3</option>
            </select>
          </div>
          <div className="productRemove">
            <i class="fas fa-trash-alt"></i>
          </div>
        </div>
        <div className="cartProduct">
          <div className="cartProductImage">
            <img src="../../images/alexa.jpg" alt="" />
          </div>
          <div className="productTitle">
            <Link to="/">AMAZON ECHO DOT 3RD GENERATION</Link>
          </div>
          <div className="productPrice">
            <h1>$99.99</h1>
          </div>
          <div className="productQuantity">
            <select>
              <option>1</option>
              <option>2</option>
              <option>3</option>
            </select>
          </div>
          <div className="productRemove">
            <i className="fas fa-trash-alt"></i>
          </div>
        </div>
      </div>
      <div className="priceCard">
        <div className="price">
          <h3>SUBTOTAL (2) ITEMS</h3>
          <p style={{ fontSize: 24 }}>$99.99</p>
        </div>

        <div className="checkout">
          <Link to="/checkout">PROCEED TO CHECKOUT</Link>
        </div>
      </div>
    </div>
  );
};

export default CartScreen;
