import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = () => {
  const location = useLocation();
  return (
    <div className="sidebar">
      <div className="head">
        <h2
          style={{
            fontSize: "2rem",
          }}
        >
          Admin
        </h2>
      </div>
      <div className="body">
        <ul>
          <Link to="/admin/orderlist">
            <li
              className={
                location.pathname === "/admin/orderlist" ? "active" : ""
              }
            >
              Orders
            </li>
          </Link>
          <Link to="/admin/userlist">
            <li
              className={
                location.pathname === "/admin/userlist" ? "active" : ""
              }
            >
              Users
            </li>
          </Link>
          <Link to="/admin/productlist">
            <li
              className={
                location.pathname === "/admin/productlist" ? "active" : ""
              }
            >
              Products
            </li>
          </Link>
          <Link to="/admin/brands">
            <li
              className={location.pathname === "/admin/brands" ? "active" : ""}
            >
              Brands
            </li>
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
