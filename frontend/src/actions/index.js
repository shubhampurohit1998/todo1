import axios from "axios";
import {
  AUTH_FAIL,
  AUTH_REQUEST,
  AUTH_SUCCESS,
  AUTH_LOGOUT,
} from "../constants/index";
import { baseURL } from "../utility/index";

export const authCheckState = () => (dispatch) => {
  dispatch({ type: AUTH_REQUEST });
  const token = localStorage.getItem("token");
  if (token !== undefined) {
    dispatch({ type: AUTH_SUCCESS, payload: token });
  } else {
    dispatch({ type: AUTH_FAIL, payload: "Authentication failed" });
  }
};

export const login = (values) => (dispatch) => {
  console.log(values);
  console.log(baseURL);
  dispatch({ type: AUTH_REQUEST });
  axios
    .post(`${baseURL}/auth/login/`, values)
    .then((response) => {
      dispatch({ type: AUTH_SUCCESS, payload: response.data.key });
      localStorage.setItem("token", response.data.key);
    })
    .catch((error) => {
      console.log(error.message);
      dispatch({ type: AUTH_FAIL, payload: error.message });
    });
};

export const logout = () => (dispatch) => {
  dispatch({ type: AUTH_LOGOUT });
  localStorage.removeItem("token");
};
