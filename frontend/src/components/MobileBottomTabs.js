import React from "react";
import { Link, useLocation } from "react-router-dom";

const MobileBottomTabs = () => {
  return (
    <div className="bottomTabContainer">
      <div className="bottomTab">
        <Link to={"/"} className="bottomTabItem">
          <i className="fas fa-home"></i>
          <p>Home</p>
        </Link>
        <div className="bottomTabItem">
          <i className="fas fa-search"></i>
          <p>Search</p>
        </div>
        <Link to={"/cart"} className="bottomTabItem">
          <i className="fas fa-shopping-cart"></i>
          <p>Cart</p>
        </Link>
        <Link to={"/profile"} className="bottomTabItem">
          <i className="fas fa-user"></i>
          <p>User</p>
        </Link>
      </div>
    </div>
  );
};

export default MobileBottomTabs;
