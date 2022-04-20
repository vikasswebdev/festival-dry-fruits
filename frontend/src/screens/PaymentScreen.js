import React, { useState } from "react";
import CheckoutSteps from "../components/CheckoutSteps";
import "../css/paymentscreen.css";
import { useNavigate } from "react-router-dom";

const PaymentScreen = () => {
  const [paymentMethod, setPayMentMethod] = useState("");

  const [isCheckedOne, setIsCheckedOne] = useState(false);
  const [isCheckedTwo, setIsCheckedTwo] = useState(false);

  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    console.log("Click on Payment method");
    console.log(paymentMethod);
    // navigate("/placeorder");
    //console.log(navigate);
    const data = {
      caseOnDelevery: isCheckedOne,
      online: isCheckedTwo,
    };

    console.log("data", data);
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
              type="checkbox"
              name="payment"
              value="cod"
              checked={isCheckedOne}
              onChange={() => {
                setIsCheckedOne(!isCheckedOne);
                setIsCheckedTwo(false);
              }}
            />
          </div>
          <div className="payment-form-control">
            <label htmlFor="payment">onLine Payment</label>
            <input
              type="checkbox"
              name="payment"
              value="online"
              checked={isCheckedTwo}
              onChange={() => {
                setIsCheckedTwo(!isCheckedTwo);
                setIsCheckedOne(false);
              }}
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
