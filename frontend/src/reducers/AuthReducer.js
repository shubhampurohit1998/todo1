import {
  AUTH_REQUEST,
  AUTH_SUCCESS,
  AUTH_FAIL,
  AUTH_LOGOUT,
} from "../constants/index";
import { updateObject } from "../utility/index";
const inititalState = {
  loading: false,
  error: null,
  token: null,
};

const authRequest = (state) =>
  updateObject(state, {
    loading: true,
  });

const authSuccess = (state, action) =>
  updateObject(state, {
    loading: false,
    token: action.payload,
    error: null,
  });

const authFail = (state, action) =>
  updateObject(state, {
    loading: false,
    token: null,
    error: action.payload,
  });

const authLogout = (state) =>
  updateObject(state, {
    token: null,
  });

const reducer = (state = inititalState, action) => {
  switch (action.type) {
    case AUTH_REQUEST:
      return authRequest(state, action);
    case AUTH_SUCCESS:
      return authSuccess(state, action);
    case AUTH_FAIL:
      return authFail(state, action);
    case AUTH_LOGOUT:
      return authLogout();
    default:
      return state;
  }
};

export default reducer;
