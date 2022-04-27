import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { createOrderAction } from "../actions/orderActions";
import CheckoutSteps from "../components/CheckoutSteps";
import { ORDER_CREATE_RESET } from "../constants/orderConstants";
import { USER_DEATILS_RESET } from "../constants/userConstants";
import "../css/paymentscreen.css";

const PlaceOrderScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cart = useSelector((state) => state.cart);

  console.log("cart", cart);

  useEffect(() => {
    if (!cart.shippingAddress.address) {
      navigate("/shipping");
    } else if (!cart.paymentMethod) {
      navigate("/payment");
    }
  }, [cart, navigate]);

  const addDecimal = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };

  cart.itemsPrice = addDecimal(
    cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0) // sum of all items price
  );

  cart.shippingPrice = addDecimal(cart.itemsPrice > 500 ? 0 : 40); // shipping price is 40 if itemsPrice is less than 500 else 0

  cart.taxPrice = addDecimal(Number(cart.itemsPrice * 0.1).toFixed(2)); // tax price is 18% of itemsPrice rounded to 2 decimal places

  cart.totalPrice = (
    Number(cart.itemsPrice) +
    Number(cart.shippingPrice) +
    Number(cart.taxPrice)
  ).toFixed(); // total price is itemsPrice + shippingPrice + taxPrice

  const orderCreate = useSelector((state) => state.orderCreate);

  const { order, success, error } = orderCreate;

  useEffect(() => {
    if (success) {
      navigate(`/order/${order._id}`);
      dispatch({ type: USER_DEATILS_RESET });
      dispatch({ type: ORDER_CREATE_RESET });
    }
    // eslint-disable-next-line
  }, [navigate, success]);

  const placeOrderHandler = () => {
    dispatch(
      createOrderAction({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      })
    );
  };

  return (
    <div className="placeOrderScreen">
      <CheckoutSteps step1 step2 step3 step4 />
      <div className="placeOrderInfo">
        <div className="left">
          <div className="shipping">
            <h1>SHIPPING</h1>
            <p>
              <strong> Address: </strong>
              {cart.shippingAddress.address}, {cart.shippingAddress.city}{" "}
              {cart.shippingAddress.postalCode}, {cart.shippingAddress.country}
            </p>
          </div>
          <hr />
          <div className="paymentMeth">
            <h1>PAYMENT METHOD</h1>
            <p>
              <strong> Method: </strong> {cart.paymentMethod}
            </p>
          </div>
          <hr />
          <div className="orderItemsContainer">
            <h1>ORDER ITEMS</h1>
            <div className="orderItems">
              {cart.cartItems.length === 0 ? (
                <div>
                  <h2>No items in cart</h2>
                  <Link to="/">
                    <button className="btn">Continue Shopping</button>
                  </Link>
                </div>
              ) : (
                cart.cartItems.map((item, index) => (
                  <div className="orderItem" key={index}>
                    <div className="orderItemImg">
                      <img src={item.image} alt={item.name} />
                    </div>
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                    <p>
                      {item.qty} x ${item.price} = ${item.qty * item.price}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
        <div className="right">
          <div className="orderSummary">
            <h2>ORDER SUMMARY</h2>
            <div className="ordSumItem">
              <p>Products</p>
              <p>${cart.itemsPrice}</p>
            </div>
            <div className="ordSumItem">
              <p>Shipping</p>
              <p>${cart.shippingPrice}</p>
            </div>
            <div className="ordSumItem">
              <p>Tax</p>
              <p>${cart.taxPrice}</p>
            </div>
            <div className="ordSumItem">
              <p>Total</p>
              <p>${cart.totalPrice}</p>
            </div>
            <div className="ordSumItem">
              <button className="orderSumBtn" onClick={placeOrderHandler}>
                PLACE ORDER
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrderScreen;
