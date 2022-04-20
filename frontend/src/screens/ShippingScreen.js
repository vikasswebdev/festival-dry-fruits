import React, { useState, useEffect } from "react";
import CheckoutSteps from "../components/CheckoutSteps";
import "../css/shippingscreen.css";
import { useDispatch, useSelector } from "react-redux";
import { saveShippingAddress } from "../actions/cartActions";
import { useNavigate } from "react-router-dom";

const ShippingScreen = () => {
  const cart = useSelector((state) => state.cart);

  const { shippingAddress } = cart;

  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
  const [country, setCountry] = useState(shippingAddress.country);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    navigate("/payment");
    // console.log("hello");
  };

  return (
    <div className="shippingScreen">
      <CheckoutSteps step1 step2 />
      <div className="shippingForm">
        <h1>SHIPPING</h1>
        <form onSubmit={submitHandler}>
          <div className="form-control">
            <label htmlFor="address">Address</label>
            <input
              type="text"
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter address"
              required
            />
          </div>
          <div className="form-control">
            <label htmlFor="city">City</label>
            <input
              type="text"
              id="city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Enter city"
              required
            />
          </div>
          <div className="form-control">
            <label htmlFor="postalcode">Postal Code</label>
            <input
              type="text"
              id="postalcode"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
              placeholder="Enter Postal Code"
              required
            />
          </div>
          <div className="form-control">
            <label htmlFor="country">Country</label>
            <input
              type="text"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
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
