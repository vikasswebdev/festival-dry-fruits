import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_PAYMENT_METHOD,
  CART_SAVE_SHIPPING_ADDRESS,
} from "../constants/cartConstants";

export const addToCart = (id, qty) => {
  return async (dispatch, getState) => {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/api/products/${id}`
    );
    const resData = await response.json();

    const item = {
      product: resData._id,
      name: resData.name,
      image: resData.image,
      price: resData.price,
      countInStock: resData.countInStock,
      qty: qty,
    };

    dispatch({
      type: CART_ADD_ITEM,
      payload: item,
    });

    localStorage.setItem(
      "cartItems",
      JSON.stringify(getState().cart.cartItems)
    );
  };
};

export const removeFromCartAction = (id) => {
  return async (dispatch, getState) => {
    dispatch({
      type: CART_REMOVE_ITEM,
      payload: id,
    });

    localStorage.setItem(
      "cartItems",
      JSON.stringify(getState().cart.cartItems)
    );
  };
};

export const saveShippingAddress = (data) => {
  return (dispatch) => {
    dispatch({ type: CART_SAVE_SHIPPING_ADDRESS, payload: data });
    localStorage.setItem("shippingAddress", JSON.stringify(data));
  };
};

export const savePaymentMethod = (data) => {
  return (dispatch) => {
    dispatch({ type: CART_SAVE_PAYMENT_METHOD, payload: data });
    localStorage.setItem("paymentMethod", JSON.stringify(data));
  };
};
