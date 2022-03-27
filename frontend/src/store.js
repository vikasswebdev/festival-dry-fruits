import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import {
  productDetailsReducer,
  productListReducer,
} from "./reducers/productReducers";
import {
  userRegisterReducer,
  userLoginReducer,
  userDetailsReducer,
  userProfileUpdateReducer,
  usersListReducer,
  userDeleteReducer,
  updateUserReducer,
} from "./reducers/userReducers";

const rootReducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  userRegister: userRegisterReducer,
  userLogin: userLoginReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userProfileUpdateReducer,
  userList: usersListReducer,
  userDelete: userDeleteReducer,
  userUpdate: updateUserReducer,
});

const userInfoFromStorage = localStorage.getItem("userData")
  ? JSON.parse(localStorage.getItem("userData"))
  : null;

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];

const Store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default Store;
