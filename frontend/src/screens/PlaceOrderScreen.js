import React from "react";
import { Link } from "react-router-dom";
import CheckoutSteps from "../components/CheckoutSteps";
import "../css/paymentscreen.css";

const PlaceOrderScreen = () => {
  return (
    <div className="placeOrderScreen">
      <CheckoutSteps step1 step2 step3 step4 />
      <div className="placeOrderInfo">
        <div className="left">
          <div className="shipping">
            <h1>SHIPPING</h1>
            <p>Address: VPO KHERAD, TAH. SALUBER, UDAIPUR 313027, India</p>
          </div>
          <hr />
          <div className="paymentMeth">
            <h1>PAYMENT METHOD</h1>
            <p>Method: PayPal</p>
          </div>
          <hr />
          <div className="orderItemsContainer">
            <h1>ORDER ITEMS</h1>
            <div className="orderItems">
              <div className="orderItem">
                <div className="orderItemImg">
                  <img src="../../images/alexa.jpg" />
                </div>
                <Link to="/">Airpods Wireless Bluetooth Headphones</Link>
                <p>1 x $89.99 = $89.99</p>
              </div>
              <div className="orderItem">
                <div className="orderItemImg">
                  <img src="../../images/alexa.jpg" />
                </div>
                <Link to="/">Airpods Wireless Bluetooth Headphones</Link>
                <p>1 x $89.99 = $89.99</p>
              </div>
            </div>
          </div>
        </div>
        <div className="right">
          <div className="orderSummary">
            <h2>ORDER SUMMARY</h2>
            <div className="ordSumItem">
              <p>Items</p>
              <p>$1019.98</p>
            </div>
            <div className="ordSumItem">
              <p>Shipping</p>
              <p>$1019.98</p>
            </div>
            <div className="ordSumItem">
              <p>Tax</p>
              <p>$1019.98</p>
            </div>
            <div className="ordSumItem">
              <p>Total</p>
              <p>$1019.98</p>
            </div>
            <div className="ordSumItem">
              <button className="orderSumBtn">PLACE ORDER</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrderScreen;
