import { updateObject } from "../utility/index";
import {
  GET_SELECTED_TODO,
  TODOS_FAILURE,
  TODOS_REQUEST,
  TODOS_SUCCESS,
  TODO_CREATED,
  DELETE_TODO,
  UPDATE_TODO,
} from "../constants/index";
const initialState = {
  loading: false,
  error: null,
  todos: [],
  selectedTodo: [],
};

const getTodoRequest = (state) =>
  updateObject(state, {
    loading: true,
    error: false,
  });

const getTodoSuccess = (state, action) =>
  updateObject(state, {
    loading: false,
    error: null,
    todos: action.payload,
  });

const getTodoFailure = (state, action) =>
  updateObject(state, {
    loading: false,
    error: action.payload,
  });

const deleteTodo = (state, action) => {
  return updateObject(state, {
    loading: false,
    error: null,
    todos: action.payload,
  });
};

const updateTodo = (state, action) => {
  return updateObject(state, {
    loading: false,
    todos: action.payload,
    error: null,
  });
};

const getSelectedTodo = (state, action) =>
  updateObject(state, {
    loading: false,
    error: null,
    selectedTodo: action.payload,
  });

const createTodo = (state, action) =>
  updateObject(state, {
    loading: false,
    error: null,
    todos: [action.payload, ...state.todos],
  });

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case TODOS_REQUEST:
      return getTodoRequest(state);
    case TODOS_SUCCESS:
      return getTodoSuccess(state, action);
    case TODOS_FAILURE:
      return getTodoFailure(state, action);
    case DELETE_TODO:
      return deleteTodo(state, action);
    case GET_SELECTED_TODO:
      return getSelectedTodo(state, action);
    case TODO_CREATED:
      return createTodo(state, action);
    case UPDATE_TODO:
      return updateTodo(state, action);
    default:
      return state;
  }
};

export default reducer;
