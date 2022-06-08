import React, { useRef } from "react";
import { Link } from "react-router-dom";
import SearchBox from "./SearchBox";
import { useDispatch, useSelector } from "react-redux";

const Header = () => {
  const toggleRef = useRef(null);

  const userLogin = useSelector((state) => state.userLogin);

  const { userInfo } = userLogin;

  function toggleDrawer() {
    toggleRef.current.classList.toggle("active");
  }

  return (
    <header className="header">
      <div className="logoContainer">
        <Link className="logo" to="/">
          <h1>Festival</h1>
          <span>dry-fruits & spices</span>
        </Link>
      </div>
      <SearchBox />
      <div className="icons">
        <Link to="/cart">
          <i title="Cart" className="fas fa-shopping-cart icon"></i>
        </Link>
        {userInfo ? (
          <Link to="/profile">
            <i title="User" className="fas fa-user icon"></i>
          </Link>
        ) : (
          <Link to="/login">
            <i title="User" className="fas fa-user icon"></i>
          </Link>
        )}
        {userInfo && userInfo.isAdmin && (
          <Link to="/admin">
            <i title="admin" className="fas fa-user-cog icon"></i>
          </Link>
        )}
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
