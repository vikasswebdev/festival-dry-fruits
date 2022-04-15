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
  USER_LIST_FAIL,
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAIL,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAIL,
} from "../constants/userConstants";

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

      if (resData.message === "Invalid email or paswword") {
        dispatch({ type: USER_LOGIN_FAIL, payload: resData.message });
      } else {
        dispatch({ type: USER_LOGIN_SUCCESS, payload: resData });
        localStorage.setItem("userData", JSON.stringify(resData));
      }

      // dispatch({ type: USER_LOGIN_SUCCESS, payload: resData });
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

      console.log("resData", resData);

      if (resData.message === "User already exists") {
        dispatch({ type: USER_REGISTER_FAIL, payload: resData.message });
        // document.location.href = "/register";
        return;
      }

      dispatch({ type: USER_REGISTER_SUCCESS, payload: resData });

      dispatch({ type: USER_LOGIN_SUCCESS, payload: resData });

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

export const getUserDetailsAction = (id) => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: USER_DETAILS_REQUEST });

      const {
        userLogin: { userInfo },
      } = getState();

      console.log("userInfo", userInfo);

      const response = await fetch(`http://localhost:5001/api/users/${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      });

      const resData = await response.json();

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
        body: JSON.stringify(user),
      });

      const resData = await response.json();

      dispatch({
        type: USER_UPDATE_PROFILE_SUCCESS,
        payload: resData,
      });

      dispatch({ type: USER_LOGIN_SUCCESS, payload: resData });

      localStorage.setItem("userData", JSON.stringify(resData));
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;

      if (message) {
        dispatch(userLogoutAction());
      }

      dispatch({
        type: USER_UPDATE_PROFILE_FAIL,
        payload: message,
      });
    }
  };
};

export const listUsersAction = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: USER_LIST_REQUEST });

      const {
        userLogin: { userInfo },
      } = getState();

      const response = await fetch("http://localhost:5001/api/users", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      });

      const resData = await response.json();

      dispatch({ type: USER_LIST_SUCCESS, payload: resData });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      if (message === "Not authorized, token failed") {
        dispatch(userLogoutAction());
      }
      dispatch({
        type: USER_LIST_FAIL,
        payload: message,
      });
    }
  };
};

export const deleteUser = (id) => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: DELETE_USER_REQUEST });

      const {
        userLogin: { userInfo },
      } = getState();

      const response = await fetch(`http://localhost:5001/api/users/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      });

      const resData = await response.json();

      dispatch({ type: DELETE_USER_SUCCESS, payload: resData });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      if (message === "Not authorized, token failed") {
        dispatch(userLogoutAction());
      }
      dispatch({
        type: DELETE_USER_FAIL,
        payload: message,
      });
    }
  };
};

export const updatedUser = (user) => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: UPDATE_USER_REQUEST });

      const {
        userLogin: { userInfo },
      } = getState();

      const response = await fetch(
        `http://localhost:5001/api/users/${user._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userInfo.token}`,
          },
          body: JSON.stringify(user),
        }
      );

      const resData = await response.json();

      dispatch({ type: UPDATE_USER_SUCCESS });

      dispatch({ type: USER_DETAILS_SUCCESS, payload: resData });

      dispatch({ type: USER_DEATILS_RESET });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      if (message === "Not authorized, token failed") {
        dispatch(userLogoutAction());
      }
      dispatch({
        type: UPDATE_USER_FAIL,
        payload: message,
      });
    }
  };
};
