import React, { useState } from "react";
import CheckoutSteps from "../components/CheckoutSteps";
import "../css/paymentscreen.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { savePaymentMethod } from "../actions/cartActions";

const PaymentScreen = () => {
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);

  const { shippingAddress } = cart;

  if (!shippingAddress.address) {
    navigate("/shipping");
  }

  const [paymentMethod, setPayMentMethod] = useState("Razorpay");

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    console.log("paymentMethod", paymentMethod);
    dispatch(savePaymentMethod(paymentMethod));
    navigate("/placeorder");
  };

  return (
    <div className="paymentScreen">
      <CheckoutSteps step1 step2 step3 />
      <div className="paymentContainer">
        <h1>PAYMENT METHOD</h1>
        <form onSubmit={submitHandler}>
          {/* onSubmit={submitHandler} */}
          {/* <div className="payment-form-control">
            <label htmlFor="payment">Razorpay</label>
            <input
              type="checkbox"
              name="payment"
              value="Razorpay"
              onChange={(e) => setPayMentMethod(e.target.value)}
            />
          </div>
          <div className="payment-form-control">
            <label htmlFor="payment">Case On Delivery</label>
            <input
              type="checkbox"
              name="payment"
              value="cod"
              onChange={(e) => setPayMentMethod(e.target.value)}
            />
          </div> */}
          <div className="payment-form-control">
            <label>
              Razorpay
              <input
                type="radio"
                name="radio"
                checked
                value="Razorpay"
                onChange={(e) => setPayMentMethod(e.target.value)}
              />
            </label>
          </div>
          <div className="payment-form-control">
            <label>
              Cash On Delivery
              <input
                type="radio"
                name="radio"
                value="cod"
                onChange={(e) => setPayMentMethod(e.target.value)}
              />
            </label>
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
