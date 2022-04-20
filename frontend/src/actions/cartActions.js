import { CART_ADD_ITEM, CART_REMOVE_ITEM } from "../constants/cartConstants";

export const addToCart = (id, qty) => {
  return async (dispatch, getState) => {
    const response = await fetch(`http://localhost:5001/api/products/${id}`);
    const resData = await response.json();

    // console.log("resData", resData);

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
