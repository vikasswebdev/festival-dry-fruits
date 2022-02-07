import React, { useState } from "react";
import CheckoutSteps from "../components/CheckoutSteps";
import "../css/paymentscreen.css";
import { useNavigate } from "react-router-dom";

const PaymentScreen = () => {
  const [paymentMethod, setPayMentMethod] = useState("cod");

  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    console.log("Click on Payment method");
    console.log(paymentMethod);
    navigate("/placeorder");
    //console.log(navigate);
  };

  return (
    <div className="paymentScreen">
      <CheckoutSteps step1 step2 step3 />
      <div className="paymentContainer">
        <h1>PAYMENT METHOD</h1>
        <h2>Select Method</h2>
        <form onSubmit={submitHandler}>
          <div className="payment-form-control">
            <label htmlFor="payment">Case On Delivery</label>
            <input
              type="radio"
              name="payment"
              value={paymentMethod}
              onChange={(e) => setPayMentMethod(e.target.value)}
            />
          </div>
          <button type="submit" className="payMethBtn">
            Continue
          </button>
        </form>
      </div>
    </div>
  );
};

export default PaymentScreen;
