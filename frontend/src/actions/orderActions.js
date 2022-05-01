import { CART_CLEAR_ITEM } from "../constants/cartConstants";
import {
  ORDER_CREATE_FAILURE,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_DELIVER_FAIL,
  ORDER_DELIVER_REQUEST,
  ORDER_DELIVER_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_LIST_FAIL,
  ORDER_LIST_MY_FAIL,
  ORDER_LIST_MY_REQUEST,
  ORDER_LIST_MY_SUCCESS,
  ORDER_LIST_REQUEST,
  ORDER_LIST_SUCCESS,
  ORDER_PAY_FAIL,
  ORDER_PAY_REQUEST,
  ORDER_PAY_SUCCESS,
} from "../constants/orderConstants";
import { userLogoutAction } from "./userActions";

export const createOrderAction = (order) => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: ORDER_CREATE_REQUEST });

      const {
        userLogin: { userInfo },
      } = getState();

      const response = await fetch("http://localhost:5001/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },

        body: JSON.stringify(order),
      });

      const resData = await response.json();

      // console.log("resData", resData);

      dispatch({ type: ORDER_CREATE_SUCCESS, payload: resData });

      dispatch({ type: CART_CLEAR_ITEM, payload: resData });

      localStorage.removeItem("cartItems");
    } catch (error) {
      // console.log(error);

      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;

      if (message === "Not authorized, token failed") {
        dispatch(userLogoutAction());
      }

      dispatch({ type: ORDER_CREATE_FAILURE, payload: message });
    }
  };
};

export const getOrderDetails = (id) => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: ORDER_DETAILS_REQUEST });

      const {
        userLogin: { userInfo },
      } = getState();

      const response = await fetch(`http://localhost:5001/api/orders/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      });

      const resData = await response.json();

      // console.log("orderData", resData);

      dispatch({ type: ORDER_DETAILS_SUCCESS, payload: resData });
    } catch (error) {
      // console.log(error);
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;

      if (message === "Not authorized, token failed") {
        dispatch(userLogoutAction());
      }
      dispatch({ type: ORDER_DETAILS_FAIL, payload: message });
    }
  };
};

export const deliverOrderAction = (order) => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: ORDER_DELIVER_REQUEST });

      const {
        userLogin: { userInfo },
      } = getState();

      const response = await fetch(
        `http://localhost:5001/api/orders/${order._id}/deliver`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userInfo.token}`,
          },
          body: JSON.stringify(order),
        }
      );

      const resData = await response.json();

      // console.log("resData", resData);

      dispatch({ type: ORDER_DELIVER_SUCCESS, payload: resData });
    } catch (error) {
      // console.log(error);
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;

      if (message === "Not authorized, token failed") {
        dispatch(userLogoutAction());
      }
      dispatch({ type: ORDER_DELIVER_FAIL, payload: message });
    }
  };
};

export const listMyOrdersAction = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: ORDER_LIST_MY_REQUEST });

      const {
        userLogin: { userInfo },
      } = getState();

      const response = await fetch(
        "http://localhost:5001/api/orders/myorders",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );

      const resData = await response.json();

      // console.log("resDaata", resData);

      dispatch({ type: ORDER_LIST_MY_SUCCESS, payload: resData });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;

      if (message === "Not authorized, token failed") {
        dispatch(userLogoutAction());
      }
      dispatch({ type: ORDER_LIST_MY_FAIL, payload: message });
    }
  };
};

export const orderPayVerifyAction = (data) => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: ORDER_PAY_REQUEST });

      const {
        userLogin: { userInfo },
      } = getState();

      const response = await fetch(
        `http://localhost:5001/api/orders/payment/verify`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userInfo.token}`,
          },
          body: JSON.stringify(data),
        }
      );

      const resData = await response.json();
      // console.log("resData", resData);
      dispatch({ type: ORDER_PAY_SUCCESS, payload: resData });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;

      if (message === "Not authorized, token failed") {
        dispatch(userLogoutAction());
      }
      dispatch({ type: ORDER_PAY_FAIL, payload: message });
    }
  };
};

export const orderListAction = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: ORDER_LIST_REQUEST });

      const {
        userLogin: { userInfo },
      } = getState();

      const response = await fetch("http://localhost:5001/api/orders", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      });

      const resData = await response.json();

      dispatch({ type: ORDER_LIST_SUCCESS, payload: resData });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;

      if (message === "Not authorized, token failed") {
        dispatch(userLogoutAction());
      }
      dispatch({ type: ORDER_LIST_FAIL, payload: message });
    }
  };
};
