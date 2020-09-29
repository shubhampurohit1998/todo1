const {
  USER_SUCCESS,
  USER_REQUEST,
  USER_FAILURE,
  SELECTED_USER,
} = require("../constants");
const { updateObject } = require("../utility");

const initialState = {
  loading: false,
  error: null,
  users: [],
  selectedUser: [],
};

const userRequest = (state, action) =>
  updateObject(state, {
    loading: true,
    error: null,
    users: [],
  });

const userSuccess = (state, action) =>
  updateObject(state, {
    loading: false,
    error: null,
    users: action.payload,
  });

const userFailure = (state, action) =>
  updateObject(state, {
    loading: false,
    error: action.payload,
    users: [],
  });

const selectedUser = (state, action) =>
  updateObject(state, {
    loading: false,
    error: action.payload,
    selectedUser: [],
  });

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_REQUEST:
      return userRequest(state, action);
    case USER_SUCCESS:
      return userSuccess(state, action);
    case USER_FAILURE:
      return userFailure(state, action);
    case SELECTED_USER:
      return selectedUser(state, action);
    default:
      return state;
  }
};

export default reducer;
