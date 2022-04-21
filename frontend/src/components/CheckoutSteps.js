import React from "react";
import { Link } from "react-router-dom";
import "../css/shippingscreen.css";

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  return (
    <div className="steps">
      <div className="step">
        {step1 ? <Link to="/login">Sign In</Link> : <p>Sign In</p>}
      </div>
      <div className="step">
        {step2 ? <Link to="/shipping">Shipping</Link> : <p>Shipping</p>}
      </div>
      <div className="step">
        {step3 ? <Link to="/payment">Payment</Link> : <p>Payment</p>}
      </div>
      <div className="step">
        {step4 ? <Link to="/placeorder">Place Order</Link> : <p>Place Order</p>}
      </div>
    </div>
  );
};

export default CheckoutSteps;
