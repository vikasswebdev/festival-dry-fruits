import React, { useEffect, useState } from "react";
import "../css/authscreen.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { userLoginAction } from "../actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const location = useLocation();

  const userLogin = useSelector((state) => state.userLogin);

  const { loading, error, userInfo } = userLogin;

  const redirect = location.search ? location.search.split("=")[1] : "/";

  console.log(location.search);

  useEffect(() => {
    if (userInfo) {
      navigate(`${redirect}`);
    }
  }, [navigate, userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(userLoginAction(email, password));
  };

  return (
    <div className="authForm">
      <h1>SIGN IN</h1>
      {error && <div className="error">{error}</div>}
      {loading && <Loader />}
      <form onSubmit={submitHandler}>
        <div className="form-control">
          <label htmlFor="email">Email Address</label>
          <input
            id="email"
            type="text"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter Email"
          />
        </div>
        <div className="form-control">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
