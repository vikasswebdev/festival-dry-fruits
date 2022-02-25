import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "../css/profilescreen.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUserDetailsAction } from "../actions/userActions";

const ProfileScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const userDetails = useSelector((state) => state.userDetails);

  const { loading, error, user } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);

  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    } else {
      if (!user || !user.name) {
        dispatch(getUserDetailsAction("profile"));
      } else {
        setName(user.name);
        setEmail(user.email);
      }
    }
  }, [dispatch, user, userInfo, navigate]);

  return (
    <div className="profileScreen">
      <div className="userProfile">
        <h3>USER PROFILE</h3>
        <div className="userInfo">
          <form className="form">
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
              <label htmlFor="name">Email Address</label>
              <input
                type="text"
                id="name"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your Email Id"
              />
            </div>
            <div className="form-control">
              <label htmlFor="name">Password</label>
              <input
                type="text"
                id="name"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter Password"
              />
            </div>
            <div className="form-control">
              <label htmlFor="name">Confirm Password</label>
              <input
                type="text"
                id="name"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Enter Confirm Password"
              />
            </div>
            <Link className="updateBtn" to="/">
              UPDATE
            </Link>
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
