import React from "react";
import { Link } from "react-router-dom";
import "../css/profilescreen.css";

const ProfileScreen = () => {
  return (
    <div className="profileScreen">
      <div className="userProfile">
        <h3>USER PROFILE</h3>
        <div className="userInfo">
          <form className="form">
            <div className="form-control">
              <label htmlFor="name">Name</label>
              <input type="text" id="name" placeholder="Enter your name" />
            </div>
            <div className="form-control">
              <label htmlFor="name">Email Address</label>
              <input type="text" id="name" placeholder="Enter your Email Id" />
            </div>
            <div className="form-control">
              <label htmlFor="name">Password</label>
              <input type="text" id="name" placeholder="Enter Password" />
            </div>
            <div className="form-control">
              <label htmlFor="name">Confirm Password</label>
              <input
                type="text"
                id="name"
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
