import React from "react";
import { Link } from "react-router-dom";
import "../css/authscreen.css";

const RegisterScreen = () => {
  return (
    <div className="authForm">
      <h1>SIGN UP</h1>
      <form>
        <div className="form-control">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            name="name"
            placeholder="Enter Your Name"
          />
        </div>

        <div className="form-control">
          <label htmlFor="email">Email Address</label>
          <input
            id="email"
            type="text"
            name="email"
            placeholder="Enter Email"
          />
        </div>

        <div className="form-control">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            placeholder="Enter Password"
            type="password"
          />
        </div>

        <div className="form-control">
          <label htmlFor="confirmpassword">Confirm Password</label>
          <input
            id="confirmpassword"
            name="confirmpassword"
            placeholder="Enter Confirm Password"
            type="password"
          />
        </div>

        <button>REGISTER</button>
      </form>
      <p>
        Have an Account? <Link to="/login"> Login </Link>
      </p>
    </div>
  );
};

export default RegisterScreen;
