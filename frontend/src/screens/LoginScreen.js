import React from "react";
import "../css/authscreen.css";
import { Link, useNavigate } from "react-router-dom";

const LoginScreen = () => {
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    console.log("login");
    navigate("/");
  };

  return (
    <div className="authForm">
      <h1>SIGN IN</h1>
      <form onSubmit={submitHandler}>
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
        <button type="submit">SIGN IN</button>
      </form>
      <p>
        New Customer? <Link to="/register"> Register </Link>
      </p>
    </div>
  );
};

export default LoginScreen;
