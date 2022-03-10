import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "../css/profilescreen.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  getUserDetailsAction,
  updateUserProfileAction,
} from "../actions/userActions";
import Message from "../components/Message";

const ProfileScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const userDetails = useSelector((state) => state.userDetails);

  const { loading, error, user } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);

  const { userInfo } = userLogin;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);

  const { success } = userUpdateProfile;

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    } else {
      if (!user || !user.name || success) {
        dispatch(getUserDetailsAction("profile"));
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
      {message && <Message varient="danger">{message}</Message>}
      {success && <Message varient="success">Profile Updated</Message>}
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

            <button className="updateBtn" type="submit">
              UPDATE
            </button>
          </form>
        </div>
      </div>
      <div className="userOrders">
        <h3>MY ORDERS</h3>
        <div className="myOrders">
          <div className="row">
            <div className="rowItem">
              <p>ID</p>
            </div>
            <div className="rowItem">
              <p>DATE</p>
            </div>
            <div className="rowItem">
              <p>TOTAL</p>
            </div>
            <div className="rowItem">
              <p>PAID</p>
            </div>
            <div className="rowItem">
              <p>DELIVERED</p>
            </div>
            <div className="rowItem">
              <p></p>
            </div>
          </div>
          <div className="tabelBody">
            <div className="row">
              <div className="rowItem">
                <p>#345353</p>
              </div>
              <div className="rowItem">
                <p>12-4-2021</p>
              </div>
              <div className="rowItem">
                <p>$2522</p>
              </div>
              <div className="rowItem">
                <p>yes</p>
              </div>
              <div className="rowItem">
                <p>Pending</p>
              </div>
              <div className="rowItem">
                <button>DETAILS</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileScreen;
