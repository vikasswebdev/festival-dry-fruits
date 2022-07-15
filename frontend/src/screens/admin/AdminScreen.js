import React, { useEffect } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Sidebar from "../../components/admin/Sidebar";
import OrderListScreen from "../OrderListScreen";
import ProductEditScreen from "../ProductEditScreen";
import ProductListScreen from "../ProductListScreen";
import UserEditScreen from "../UserEditScreen";
import UserListScreen from "../UserListScreen";
import "./Admin.css";
import Brands from "./Brand/Brands";
import EditBrand from "./Brand/EditBrand";

const AdminScreen = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname === "/admin") {
      navigate("/admin/orderlist");
    }
  }, [location, navigate]);

  return (
    <div className="admin-screen">
      <div className="admin-screen-body">
        <Sidebar />
        <div className="adminRoutes">
          <Routes>
            <Route path="/orderlist" element={<OrderListScreen />} />
            <Route
              path="/orderlist/:pageNumber"
              element={<OrderListScreen />}
            />
            <Route path="/userlist" element={<UserListScreen />} />
            <Route path="/productlist" element={<ProductListScreen />} />
            <Route
              path="/productlist/:pageNumber"
              element={<ProductListScreen />}
            />
            <Route path="/user/:id/edit" element={<UserEditScreen />} />
            <Route path="/product/:id/edit" element={<ProductEditScreen />} />
            <Route path="/brands" element={<Brands />} />
            <Route path="/brands/add" element={<EditBrand />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default AdminScreen;
