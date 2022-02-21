import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
} from "../constants/productConstants";

export const productsList = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: PRODUCT_LIST_REQUEST });
      const response = await fetch("http://localhost:5001/api/products");
      const data = await response.json();
      console.log(data);
      dispatch({
        type: PRODUCT_LIST_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: PRODUCT_LIST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
};

export const productListDetails = (id) => {
  return async (dispatch) => {
    try {
      dispatch({ type: PRODUCT_DETAILS_REQUEST });
      const response = await fetch(`http://localhost:5001/api/products/${id}`);
      const resData = await response.json();
      dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: resData });
    } catch (error) {
      dispatch({
        type: PRODUCT_DETAILS_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
};
