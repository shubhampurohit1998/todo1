import {
  PROFILE_FAILURE,
  PROFILE_REQUEST,
  PROFILE_SUCCESS,
} from "../constants";
import { updateObject } from "../utility";

const initialState = {
  loading: false,
  error: null,
  data: null,
};

const profileRequest = (state) =>
  updateObject(state, {
    loading: true,
    data: null,
    error: null,
  });

const profileSuccess = (state, action) =>
  updateObject(state, {
    loading: false,
    data: action.payload,
    error: null,
  });

const profileFailure = (state, action) =>
  updateObject(state, {
    loading: false,
    data: null,
    error: action.payload,
  });

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case PROFILE_REQUEST:
      return profileRequest(state, action);
    case PROFILE_SUCCESS:
      return profileSuccess(state, action);
    case PROFILE_FAILURE:
      return profileFailure(state, action);
    default:
      return state;
  }
};

export default reducer;
