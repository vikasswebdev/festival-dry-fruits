import {
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAIL,
  USER_DEATILS_RESET,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_UPDATE_PROFILE_FAIL,
  USER_UPDATE_PROFILE_RESET,
} from "../constants/userConstants";

export const userRegisterAction = (name, email, number, password) => {
  return async (dispatch) => {
    try {
      dispatch({ type: USER_REGISTER_REQUEST });

      const response = await fetch("http://localhost:5001/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          number,
          password,
        }),
      });
      const resData = await response.json();
      //   console.log("resData", resData);
      dispatch({ type: USER_REGISTER_SUCCESS, payload: resData });

      localStorage.setItem("userData", JSON.stringify(resData));
    } catch (error) {
      dispatch({
        type: USER_REGISTER_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
};

export const userLoginAction = (email, password) => {
  return async (dispatch) => {
    try {
      dispatch({ type: USER_LOGIN_REQUEST });
      const response = await fetch("http://localhost:5001/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const resData = await response.json();

      console.log("resData", resData);

      dispatch({ type: USER_LOGIN_SUCCESS, payload: resData });

      localStorage.setItem("userData", JSON.stringify(resData));
    } catch (error) {
      dispatch({
        type: USER_LOGIN_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
};

export const userLogoutAction = () => {
  return (dispatch) => {
    localStorage.removeItem("userData");
    dispatch({ type: USER_LOGOUT });
    dispatch({ type: USER_DEATILS_RESET });
    document.location.href = "/login";
  };
};

export const getUserDetailsAction = (id) => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: USER_DETAILS_REQUEST });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const response = await fetch(
        `http://localhost:5001/api/users/${id}`,
        config
      );

      const resData = await response.json();
      //console.log("resData", resData);
      dispatch({ type: USER_DETAILS_SUCCESS, payload: resData });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;

      if (message === "Not authorized, token failed") {
        dispatch(userLogoutAction());
      }

      dispatch({
        type: USER_DETAILS_FAIL,
        payload: message,
      });
    }
  };
};

export const updateUserProfileAction = (user) => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: USER_UPDATE_PROFILE_REQUEST });

      const {
        userLogin: { userInfo },
      } = getState();

      const response = await fetch("http://localhost:5001/api/users/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      });

      const resData = await response.json();

      dispatch({
        type: USER_UPDATE_PROFILE_SUCCESS,
        payload: resData,
      });

      dispatch({ type: USER_LOGIN_SUCCESS, payload: resData });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;

      if (message === "Not authorized, token failed") {
        dispatch(userLogoutAction());
      }

      dispatch({
        type: USER_UPDATE_PROFILE_FAIL,
        payload: message,
      });
    }
  };
};
