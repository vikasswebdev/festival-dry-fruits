import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { userLogoutAction } from "../actions/userActions";
import { useDispatch } from "react-redux";
const Header = () => {
  const toggleRef = useRef(null);
  const dragRef = useRef(null);

  const dispatch = useDispatch();

  const toggleDrag = () => {
    dragRef.current.classList.toggle("drag");
  };

  const toggleDrawer = () => {
    toggleRef.current.classList.toggle("active");
  };

  const logoutHandler = (e) => {
    e.preventDefault();
    dispatch(userLogoutAction());
  };

  return (
    <header className="header">
      <div className="logoContainer">
        <Link className="logo" to="/">
          <h1>Festival</h1>
          <span>dry-fruits & spices</span>
        </Link>
      </div>
      <nav className="navigation">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/products">Products</Link>
          </li>
          <li>
            <Link to="/category">Category</Link>
          </li>
          <li>
            <Link to="/latest">Latest</Link>
          </li>
        </ul>
      </nav>
      <div className="icons">
        <Link to="/cart">
          <i title="Cart" className="fas fa-shopping-cart"></i>
          <span className="cartTag">1</span>
        </Link>
        <i
          style={{ color: "white", margin: "0px 10px", cursor: "pointer" }}
          onClick={toggleDrag}
          title="User"
          className="fas fa-user"
        ></i>
        <div className="dargDown" ref={dragRef}>
          <ul>
            <li>
              <Link to="/profile">Profile</Link>
            </li>
            <li>
              <p onClick={logoutHandler}>Logout</p>
            </li>
          </ul>
        </div>
        <Link to="/admin">
          <i title="Admin" className="fas fa-user-cog"></i>
        </Link>
      </div>
      <i onClick={toggleDrawer} className="fas fa-bars barIcon"></i>
      <div className="drawer active" ref={toggleRef}>
        <div className="drawerHeader">
          <h3>Menu</h3>
          <i onClick={toggleDrawer} className="fas fa-times closeIcon"></i>
        </div>
        <div className="drawerBody">
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/products">Products</Link>
            </li>
            <li>
              <Link to="/category">Category</Link>
            </li>
            <li>
              <Link to="/latest">Latest</Link>
            </li>
            <li>
              <Link to="/cart">Cart</Link>
            </li>
            <li>
              <Link to="/user">User</Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
