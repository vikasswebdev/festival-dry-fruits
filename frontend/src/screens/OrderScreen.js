import React, { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "../css/paymentscreen.css";
import { useDispatch, useSelector } from "react-redux";
import {
  deliverOrderAction,
  getOrderDetails,
  orderPayVerifyAction,
} from "../actions/orderActions";
import Loader from "../components/Loader";
import {
  ORDER_DELIVER_RESET,
  ORDER_PAY_RESET,
} from "../constants/orderConstants";

const OrderScreen = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userLogin = useSelector((state) => state.userLogin);

  const { userInfo } = userLogin;

  const orderDetails = useSelector((state) => state.orderDetails);

  const { order, loading, error } = orderDetails;

  const orderDeliver = useSelector((state) => state.orderDeliver);

  const { loading: loadingDeliver, success: successDeliver } = orderDeliver;

  const orderPay = useSelector((state) => state.orderPay);
  const { loading: loadingPay, success: successPay } = orderPay;

  // console.log("userInfo", userInfo);

  if (!loading && order) {
    //   Calculate prices
    const addDecimals = (num) => {
      return (Math.round(num * 100) / 100).toFixed(2);
    };

    order.itemsPrice = addDecimals(
      order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    );
  }

  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  const displayRozerPay = async () => {
    const response = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!response) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    const result = await fetch("http://localhost:5001/api/orders/payment", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
      body: JSON.stringify({ id: id }),
    });

    const resData = await result.json();

    if (!resData) {
      alert("Server error. Are you online?");
      return;
    }

    // // Getting the order details back
    const { amount, id: order_id, currency } = resData;

    const option = {
      key: "rzp_test_DvRUfbzys6ZwsX",
      amount: amount.toString(),
      currency: currency,
      name: "Festival",
      description: "Test payment",
      image:
        "https://images.unsplash.com/photo-1600841867003-d904bd142d29?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
      order_id: order_id,
      handler: async function (response) {
        const data = {
          orderId: id,
          orderCreationId: order_id,
          razorpayPaymentId: response.razorpay_payment_id,
          razorpayOrderId: response.razorpay_order_id,
          razorpaySignature: response.razorpay_signature,
        };

        dispatch(orderPayVerifyAction(data));
      },

      prefill: {
        name: userInfo.name,
        email: userInfo.email,
        contact: userInfo.phone,
      },
      notes: {
        address: order.shippingAddress,
      },
      theme: {
        color: "#e38b0a",
      },
    };

    const paymentObject = new window.Razorpay(option);
    paymentObject.open();
  };

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    }

    if (!order || successDeliver || successPay || order._id !== id) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch({ type: ORDER_DELIVER_RESET });
      dispatch(getOrderDetails(id));
    }
  }, [dispatch, id, order, successDeliver, successPay, userInfo]);

  const deliverHandler = () => {
    dispatch(deliverOrderAction(order));
  };

  return (
    <div className="placeOrderScreen">
      {loading ? (
        <div>
          <Loader />{" "}
        </div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        order && (
          <div className="placeOrderInfo">
            <div className="left">
              <div className="shipping">
                <h1>Order {order._id}</h1>
                <p>
                  <strong>Name: </strong> {order.user.name}
                </p>
                <p>
                  <strong>Email:</strong> {order.user.email}
                </p>
                <p>
                  <strong>Address:</strong> {order.shippingAddress.address},{" "}
                  {order.shippingAddress.city}{" "}
                  {order.shippingAddress.postalCode},{" "}
                  {order.shippingAddress.country}
                </p>
                {order.isDelivered ? (
                  <div className="status success">
                    <p> Delivered on {order.deliveredAt} </p>
                  </div>
                ) : (
                  <div className="status">
                    <p>Not Delivered</p>
                  </div>
                )}
              </div>
              <hr />
              <div className="paymentMeth">
                <h1>PAYMENT METHOD</h1>
                <p>
                  <strong>Method:</strong> {order.paymentMethod}
                </p>
                {order.isPaid ? (
                  <div className="status success">
                    <p>Paid on {order.paidAt}</p>
                  </div>
                ) : (
                  <div className="status">
                    <p>Not Paid</p>
                  </div>
                )}
              </div>
              <hr />
              <div className="orderItemsContainer">
                <h1>ORDER ITEMS</h1>
                {order.orderItems.length === 0 ? (
                  <div className="status">
                    <p>Not Paid</p>
                  </div>
                ) : (
                  <div className="orderItems">
                    {order.orderItems.map((item, index) => (
                      <div className="orderItem" key={item._id}>
                        <div className="orderItemImg">
                          <img src={item.image} alt={item.name} />
                        </div>
                        <Link to={`/product/${item.product}`}>{item.name}</Link>
                        <p>
                          {item.qty} x ${item.price} = ${item.qty * item.price}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div className="right">
              <div className="orderSummary">
                <h2>ORDER SUMMARY</h2>
                <div className="ordSumItem">
                  <p>Items</p>
                  <p>${order.itemsPrice}</p>
                </div>
                <div className="ordSumItem">
                  <p>Shipping</p>
                  <p>${order.shippingPrice}</p>
                </div>
                <div className="ordSumItem">
                  <p>Tax</p>
                  <p>${order.taxPrice}</p>
                </div>
                <div className="ordSumItem">
                  <p>Total</p>
                  <p>${order.totalPrice}</p>
                </div>
                {!order.isPaid && (
                  <div className="ordSumItem">
                    <button className="orderSumBtn" onClick={displayRozerPay}>
                      Pay
                    </button>
                  </div>
                )}
                {userInfo &&
                  userInfo.isAdmin &&
                  order.isPaid &&
                  !order.isDelivered && (
                    <div className="ordSumItem">
                      <button className="orderSumBtn" onClick={deliverHandler}>
                        {" "}
                        Mark As Delivered
                      </button>
                    </div>
                  )}
              </div>
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default OrderScreen;
