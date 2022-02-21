import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../css/authscreen.css";
import { useDispatch } from "react-redux";
import { userRegisterAction } from "../actions/userActions";

const RegisterScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmpassword) {
      setPassword("Password does not match");
    } else {
      dispatch(userRegisterAction(name, email, number, password));
    }
  };

  return (
    <div className="authForm">
      <h1>SIGN UP</h1>
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
