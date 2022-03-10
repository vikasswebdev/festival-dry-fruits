import React, { useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { userLogoutAction } from "../actions/userActions";
import { useDispatch } from "react-redux";
const Header = () => {
  const toggleRef = useRef(null);
  const dragRef = useRef(null);
  const dragRefAdmin = useRef(null);

  const location = useLocation();

  const dispatch = useDispatch();

  const toggleDrag = () => {
    dragRef.current.classList.toggle("drag");
    dragRefAdmin.current.classList.remove("drag");
  };

  const toggleDragAdmin = () => {
    dragRefAdmin.current.classList.toggle("drag");
    dragRef.current.classList.remove("drag");
  };

  const toggleDrawer = () => {
    toggleRef.current.classList.toggle("active");
  };

  useEffect(() => {
    if (location.pathname === "/profile") {
      dragRef.current.classList.remove("drag");
    }
  }, [location]);

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

        <i
          title="Admin"
          style={{ color: "white", margin: "0px 10px", cursor: "pointer" }}
          className="fas fa-user-cog"
          onClick={toggleDragAdmin}
        ></i>
        <div className="dargDown" style={{ height: 92 }} ref={dragRefAdmin}>
          <ul>
            <li>
              <Link to="/admin/userlist">Users</Link>
            </li>
            <li>
              <Link to="/admin/productlist">Products</Link>
            </li>
            <li>
              <Link to="/admin/orderlist">Orders</Link>
            </li>
          </ul>
        </div>
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
