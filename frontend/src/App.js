import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { Routes, Route, useLocation } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import CategoryScreen from "./screens/CategoryScreen";
import LatestScreen from "./screens/LatestScreen";
import CartScreen from "./screens/CartScreen";
import ProfileScreen from "./screens/ProfileScreen";
import ShippingScreen from "./screens/ShippingScreen";
import PaymentScreen from "./screens/PaymentScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import OrderScreen from "./screens/OrderScreen";
import ProductsScreen from "./screens/ProductsScreen";
import UserListScreen from "./screens/UserListScreen";
import UserEditScreen from "./screens/UserEditScreen";
import ProductListScreen from "./screens/ProductListScreen";
import ProductEditScreen from "./screens/ProductEditScreen";
import OrderListScreen from "./screens/OrderListScreen";
import AdminScreen from "./screens/admin/AdminScreen";
import { useEffect } from "react";
import ScrollToTop from "./components/ScrollToTop";
import Page404 from "./screens/Page404";
import MobileBottomTabs from "./components/MobileBottomTabs";

function App() {
  const location = useLocation();

  const myLocation = location.pathname.includes("/admin");

  return (
    <>
      {myLocation ? null : <ScrollToTop />}
      <Header />
      <main>
        <Routes>
          <Route path="admin/*" element={<AdminScreen />} />
          <Route path="/order/:id" element={<OrderScreen />} />
          <Route path="/shipping" element={<ShippingScreen />} />
          <Route path="/register" element={<RegisterScreen />} />
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/orderscreen" element={<OrderScreen />} />
          <Route path="/placeorder" element={<PlaceOrderScreen />} />
          <Route path="/payment" element={<PaymentScreen />} />
          <Route path="/shipping" element={<ShippingScreen />} />
          <Route path="/product/:id" element={<ProductScreen />} />
          <Route path="/cart/:id" element={<CartScreen />} />
          <Route path="/cart" element={<CartScreen />} />
          <Route path="/category" element={<CategoryScreen />} />
          <Route path="/blogs" element={<LatestScreen />} />
          {/* <Route
            path="/admin/product/:id/edit"
            element={<ProductEditScreen />}
          /> */}
          {/* <Route path="/admin/user/:id/edit" element={<UserEditScreen />} /> */}
          {/* <Route path="/admin/productlist" element={<ProductListScreen />} /> */}
          {/* <Route path="/admin/userlist" element={<UserListScreen />} /> */}
          {/* <Route path="/admin/orderlist" element={<OrderListScreen />} /> */}
          <Route path="/profile" element={<ProfileScreen />} />
          <Route path="/products" element={<ProductsScreen />} />
          <Route path="/search/:keyword" element={<HomeScreen />} />
          <Route
            path="/search/:keyword/page/:pageNumber"
            element={<HomeScreen />}
          />
          <Route path="/page/:pageNumber" element={<HomeScreen />} />
          <Route path="/" element={<HomeScreen />} />
          <Route path="*" element={<Page404 />} />
        </Routes>
      </main>
      {myLocation ? null : <Footer />}
      <MobileBottomTabs />
    </>
  );
}

export default App;
