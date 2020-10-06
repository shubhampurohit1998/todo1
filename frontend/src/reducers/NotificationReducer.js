import {
  NOTIFICATION_FAILURE,
  NOTIFICATION_REQUEST,
  NOTIFICATION_SUCCESS,
} from "../constants/index";
import { updateObject } from "../utility/index";
const inititalState = {
  loading: false,
  error: null,
  data: {},
};

const notificationRequest = (state) =>
  updateObject(state, {
    loading: true,
    error: null,
    data: {},
  });

const notificationSuccess = (state, action) =>
  updateObject(state, {
    loading: false,
    error: null,
    data: action.payload,
  });

const notificationFailure = (state, action) =>
  updateObject(state, {
    loading: false,
    error: action.payload,
    data: {},
  });

const reducer = (state = inititalState, action) => {
  switch (action.type) {
    case NOTIFICATION_REQUEST:
      return notificationRequest(state);
    case NOTIFICATION_SUCCESS:
      return notificationSuccess(state, action);
    case NOTIFICATION_FAILURE:
      return notificationFailure(state, action);
    default:
      return state;
  }
};

export default reducer;
