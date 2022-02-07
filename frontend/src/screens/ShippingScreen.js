import React from "react";
import CheckoutSteps from "../components/CheckoutSteps";
import "../css/shippingscreen.css";

const ShippingScreen = () => {
  return (
    <div className="shippingScreen">
      <CheckoutSteps step1 step2 />
      <div className="shippingForm">
        <h1>SHIPPING</h1>
        <form>
          <div className="form-control">
            <label htmlFor="address">Address</label>
            <input
              type="text"
              id="address"
              placeholder="Enter address"
              required
            />
          </div>
          <div className="form-control">
            <label htmlFor="city">City</label>
            <input type="text" id="city" placeholder="Enter city" required />
          </div>
          <div className="form-control">
            <label htmlFor="postalcode">Postal Code</label>
            <input
              type="text"
              id="postalcode"
              placeholder="Enter Postal Code"
              required
            />
          </div>
          <div className="form-control">
            <label htmlFor="country">Country</label>
            <input
              type="text"
              id="country"
              placeholder="Enter country"
              required
            />
          </div>
          <button className="shippBtn" type="submit">
            CONTINUE
          </button>
        </form>
      </div>
    </div>
  );
};

export default ShippingScreen;
