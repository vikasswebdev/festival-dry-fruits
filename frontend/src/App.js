import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { Routes, Route } from "react-router-dom";
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

function App() {
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/register" element={<RegisterScreen />} />
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/orderscreen" element={<OrderScreen />} />
          <Route path="/placeorder" element={<PlaceOrderScreen />} />
          <Route path="/payment" element={<PaymentScreen />} />
          <Route path="/shipping" element={<ShippingScreen />} />
          <Route path="/product/:id" element={<ProductScreen />} />
          <Route path="/category" element={<CategoryScreen />} />
          <Route path="/blogs" element={<LatestScreen />} />
          <Route path="/admin/user/:id/edit" element={<UserEditScreen />} />
          <Route path="/admin/userlist" element={<UserListScreen />} />
          <Route path="/cart" element={<CartScreen />} />
          <Route path="/profile" element={<ProfileScreen />} />
          <Route path="/products" element={<ProductsScreen />} />
          <Route path="/" element={<HomeScreen />} />
        </Routes>
      </main>
      {/* <Footer /> */}
    </>
  );
}

export default App;

{
  /* last work on creaing drawer*/
}
