import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../css/profilescreen.css";
// import "../css/productlistscreen.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  getUserDetailsAction,
  updateUserProfileAction,
  userLogoutAction,
} from "../actions/userActions";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { USER_UPDATE_PROFILE_RESET } from "../constants/userConstants";
import { listMyOrdersAction } from "../actions/orderActions";

const ProfileScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const logoutHandler = (e) => {
    e.preventDefault();
    dispatch(userLogoutAction());
  };

  const userLogin = useSelector((state) => state.userLogin);

  const { userInfo } = userLogin;

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success } = userUpdateProfile;

  const listMyOrder = useSelector((state) => state.listMyOrder);

  const { orders, loading: ordersLoading, error: ordersError } = listMyOrder;

  console.log("orders", orders);

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    } else {
      if (!user || !user.name || success) {
        dispatch({ type: USER_UPDATE_PROFILE_RESET });
        dispatch(getUserDetailsAction("profile"));
        dispatch(listMyOrdersAction());
      } else {
        setName(user.name);
        setEmail(user.email);
        setPhone(user.number);
      }
    }
  }, [dispatch, user, userInfo, navigate, success]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
    } else {
      dispatch(
        updateUserProfileAction({ id: user._id, name, email, phone, password })
      );
    }
  };

  return (
    <div className="profileScreen">
      <div className="profileContainer">
        {message && <Message varient="danger">{message}</Message>}
        {success && <Message varient="success">Profile Updated</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <h4>{error}</h4>
        ) : (
          <div className="userProfile">
            <h3>USER PROFILE</h3>
            <div className="userInfo">
              <form className="form" onSubmit={submitHandler}>
                <div className="form-control">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                  />
                </div>
                <div className="form-control">
                  <label htmlFor="email">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your Email Id"
                  />
                </div>
                <div className="form-control">
                  <label htmlFor="phone">Phone Number</label>
                  <input
                    type="text"
                    id="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Enter your phone number"
                  />
                </div>
                <div className="form-control">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter Password"
                  />
                </div>
                <div className="form-control">
                  <label htmlFor="confirmPassword">Confirm Password</label>
                  <input
                    type="text"
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Enter Confirm Password"
                  />
                </div>
                <div className="btnContainer">
                  <button className="btn" type="submit">
                    UPDATE
                  </button>
                  <button
                    className="btn logOut"
                    onClick={logoutHandler}
                    type="button"
                  >
                    LOG OUT
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        <div className="userOrders">
          <h3>YOUR ORDERS</h3>
          <div className="orderContainer">
            {ordersLoading ? (
              <Loader />
            ) : ordersError ? (
              <h4>{ordersError}</h4>
            ) : orders.length === 0 ? (
              <h4>You have no orders yet</h4>
            ) : (
              orders.map((order) => (
                <div className="orderItem" key={order._id}>
                  <div className="item">
                    <div>
                      <p className="head">Order ID</p>
                      <p className="body">{order._id}</p>
                    </div>
                    <div>
                      <p className="head">Order Date</p>
                      <p className="body">{order.createdAt.substring(0, 10)}</p>
                    </div>
                    <div>
                      <p className="head">Order Status</p>

                      <div
                        className="orderStatus"
                        style={{
                          backgroundColor:
                            order.status === "Not processed"
                              ? "orange"
                              : order.status === "Processing"
                              ? "blue"
                              : order.status === "Shipped"
                              ? "#e91e63"
                              : order.status === "Delivered"
                              ? "green"
                              : "red",
                        }}
                      >
                        <p className="body">{order.status}</p>
                      </div>
                    </div>
                    <div>
                      <p className="head">Order Total</p>
                      <p className="body">{order.totalPrice} &#8377;</p>
                    </div>
                    <Link to={`/order/${order._id}`}>
                      <button className="viewBtn">View Details</button>
                    </Link>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileScreen;
