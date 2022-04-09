import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_CREATE_FAIL,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_UPDATE_FAIL,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_SUCCESS,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DELETE_FAIL,
  PRODUCT_REVIEW_REQUEST,
  PRODUCT_REVIEW_SUCCESS,
  PRODUCT_REVIEW_FAIL,
} from "../constants/productConstants";
import { userLogoutAction } from "./userActions";

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

export const productCreateAction = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: PRODUCT_CREATE_REQUEST });

      const {
        userLogin: { userInfo },
      } = getState();

      const response = await fetch("http://localhost:5001/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
        body: JSON.stringify({}),
      });

      const resData = await response.json();
      console.log("product Created", resData);

      dispatch({ type: PRODUCT_CREATE_SUCCESS, payload: resData });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      if (message === "Not authorized, token failed") {
        dispatch(userLogoutAction());
      }
      dispatch({
        type: PRODUCT_CREATE_FAIL,
        payload: message,
      });
    }
  };
};

export const productUpdateAction = (product) => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: PRODUCT_UPDATE_REQUEST });

      const {
        userLogin: { userInfo },
      } = getState();

      const response = await fetch(
        `http://localhost:5001/api/products/${product._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userInfo.token}`,
          },
          body: JSON.stringify(product),
        }
      );

      const resData = await response.json();

      dispatch({ type: PRODUCT_UPDATE_SUCCESS, payload: resData });

      dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: resData });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      if (message === "Not authorized, token failed") {
        dispatch(userLogoutAction());
      }
      dispatch({
        type: PRODUCT_UPDATE_FAIL,
        payload: message,
      });
    }
  };
};

export const productDeleteAction = (id) => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: PRODUCT_DELETE_REQUEST });

      const {
        userLogin: { userInfo },
      } = getState();

      const response = await fetch(`http://localhost:5001/api/products/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      });

      const resData = await response.json();

      dispatch({ type: PRODUCT_DELETE_SUCCESS });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      if (message === "Not authorized, token failed") {
        dispatch(userLogoutAction());
      }
      dispatch({
        type: PRODUCT_DELETE_FAIL,
        payload: message,
      });
    }
  };
};

export const createProductReviewAction = (productId, review) => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: PRODUCT_REVIEW_REQUEST });

      const {
        userLogin: { userInfo },
      } = getState();

      const response = await fetch(
        `http://localhost:5001/api/products/${productId}/reviews`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userInfo.token}`,
          },
          body: JSON.stringify(review),
        }
      );

      const resData = await response.json();

      dispatch({ type: PRODUCT_REVIEW_SUCCESS, payload: resData });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      if (message === "Not authorized, token failed") {
        dispatch(userLogoutAction());
      }
      dispatch({
        type: PRODUCT_REVIEW_FAIL,
        payload: message,
      });
    }
  };
};
