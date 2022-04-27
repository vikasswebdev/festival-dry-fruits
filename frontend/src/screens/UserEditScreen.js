import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useNavigate } from "react-router-dom";
import { getUserDetailsAction, updatedUser } from "../actions/userActions";
import Loader from "../components/Loader";
import { UPDATE_USER_RESET } from "../constants/userConstants";

const UserEditScreen = () => {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [isAdmin, setIsAdmin] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userDetails = useSelector((state) => state.userDetails);

  const { loading, error, user } = userDetails;

  const userUpdate = useSelector((state) => state.userUpdate);

  const {
    loading: loadingUpdate,
    success: successUpdate,
    error: errorUpdate,
  } = userUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: UPDATE_USER_RESET });
      navigate("/admin/userlist");
    } else {
      if (!user.name || user._id !== id) {
        dispatch(getUserDetailsAction(id));
      } else {
        setName(user.name);
        setEmail(user.email);
        setNumber(user.number);
        setIsAdmin(user.isAdmin);
      }
    }
  }, [dispatch, navigate, id, user]);

  const userUpdateHandler = (e) => {
    e.preventDefault();
    dispatch(updatedUser({ _id: id, name, email, number, isAdmin }));
  };

  return (
    <div className="authForm">
      <h1>EDIT USER PROFILE</h1>
      {loadingUpdate && <Loader />}
      {errorUpdate && <div className="error">{errorUpdate}</div>}
      {loading ? (
        <Loader />
      ) : error ? (
        <div>{error}</div>
      ) : (
        <form onSubmit={userUpdateHandler}>
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

          <div
            style={{ flexDirection: "row", alignItems: "center" }}
            className="form-control"
          >
            <input
              id="isadmin"
              style={{ width: "20px" }}
              type="checkbox"
              name="isadmin"
              checked={isAdmin}
              onChange={(e) => setIsAdmin(e.target.checked)}
            />
            <label htmlFor="isadmin">IsAdmin</label>
          </div>

          <button type="submit">UPDATE</button>
        </form>
      )}
    </div>
  );
};

export default UserEditScreen;
