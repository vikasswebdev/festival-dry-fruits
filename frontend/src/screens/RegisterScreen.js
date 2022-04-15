import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../css/authscreen.css";
import { useDispatch, useSelector } from "react-redux";
import { userRegisterAction } from "../actions/userActions";
import Loader from "../components/Loader";

const RegisterScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();

  const location = useLocation();

  const navigate = useNavigate();

  const userRegister = useSelector((state) => state.userRegister);

  const { loading, error, userInfo } = userRegister;

  // console.log(userInfo);

  const redirect = location.search ? location.search.split("=")[1] : "/";

  console.log(redirect);

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmpassword) {
      setMessage("Password does not match");
    } else {
      dispatch(userRegisterAction(name, email, number, password));
    }
  };

  return (
    <div className="authForm">
      <h1>SIGN UP</h1>
      {message && <h3>{message}</h3>}
      {error && <h3>{error}</h3>}
      {loading && <Loader />}
      <form onSubmit={submitHandler}>
        <div className="form-control">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter Your Name"
          />
        </div>

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
          <label htmlFor="number">Number</label>
          <input
            id="number"
            type="text"
            name="number"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            placeholder="Enter Number"
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

        <div className="form-control">
          <label htmlFor="confirmpassword">Confirm Password</label>
          <input
            id="confirmpassword"
            name="confirmpassword"
            value={confirmpassword}
            onChange={(e) => setConfirmpassword(e.target.value)}
            placeholder="Enter Confirm Password"
            type="password"
          />
        </div>

        <button type="submit">REGISTER</button>
      </form>
      <p>
        Have an Account? <Link to="/login"> Login </Link>
      </p>
    </div>
  );
};

export default RegisterScreen;
