import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useParams, useNavigate } from "react-router-dom";
import { addToCart, removeFromCartAction } from "../actions/cartActions";
import EmptyCart from "../components/EmptyCart";
import "../css/cartscreen.css";

const CartScreen = () => {
  const { id } = useParams();

  const location = useLocation();

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const qty = location.search ? Number(location.search.split("=")[1]) : 1;

  const cart = useSelector((state) => state.cart);

  const { cartItems } = cart;

  console.log("cartItems", cartItems);

  useEffect(() => {
    if (id) {
      dispatch(addToCart(id, qty));
    }
  }, [dispatch, id, qty]);

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCartAction(id));
  };

  const chackOutHandler = () => {
    navigate("/login?redirect=/shipping");
  };

  return (
    <div className="cartScreen">
      <div className="cartContainer">
        <div className="cartProducts">
          <div>
            <h1>SHOPPING CART</h1>
          </div>
          <div className="cartItems">
            {cartItems.length === 0 ? (
              <EmptyCart />
            ) : (
              cartItems.map((item) => (
                <div className="cartProduct" key={item.product}>
                  <div className="cartProductImage">
                    <img
                      src={`${process.env.REACT_APP_API_URL}${item.image}`}
                      alt={item.name}
                    />
                  </div>
                  <div className="productTitle">
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                  </div>
                  <div className="productPrice">
                    <h1>{item.price} &#8377;</h1>
                  </div>
                  <div className="productQuantity">
                    <select
                      value={item.qty}
                      onChange={(e) => {
                        dispatch(
                          addToCart(item.product, Number(e.target.value))
                        );
                      }}
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="productRemove">
                    <i
                      className="fas fa-trash-alt"
                      onClick={() => removeFromCartHandler(item.product)}
                    ></i>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
        <div className="priceCard">
          <div className="price">
            <p>
              SUBTOTAL ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
              ITEMS
            </p>
            <p style={{ fontSize: 24 }}>
              {cartItems
                .reduce((acc, item) => acc + item.qty * item.price, 0)
                .toFixed(2)}{" "}
              &#8377;
            </p>
          </div>

          <div className="checkout">
            <button
              disabled={cartItems.length === 0 ? true : false}
              onClick={chackOutHandler}
            >
              Proceed To Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartScreen;
