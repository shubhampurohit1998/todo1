import axios from "axios";
import {
  AUTH_FAIL,
  AUTH_REQUEST,
  AUTH_SUCCESS,
  AUTH_LOGOUT,
  GET_SELECTED_TODO,
  TODOS_FAILURE,
  TODOS_REQUEST,
  TODOS_SUCCESS,
  DELETE_TODO,
  TODO_CREATED,
  UPDATE_TODO,
  USER_REQUEST,
  USER_SUCCESS,
  USER_FAILURE,
  PROFILE_REQUEST,
  PROFILE_SUCCESS,
  PROFILE_FAILURE,
  SELECTED_USER,
} from "../constants/index";
import { baseURL, headers } from "../utility/index";
import _ from "lodash";

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
      dispatch({ type: AUTH_SUCCESS, payload: response.data.access_token });
      localStorage.setItem("token", response.data.access_token);
      dispatch(getProfile());
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

export const getTodo = () => (dispatch) => {
  dispatch({ type: TODOS_REQUEST });
  axios
    .get(`${baseURL}/api/todos/get_todos`, headers)
    .then((response) => {
      console.log(response);
      dispatch({ type: TODOS_SUCCESS, payload: response.data.results });
    })
    .catch((error) => {
      dispatch({ type: TODOS_FAILURE, payload: error.message });
    });
};

export const createTodo = (values) => (dispatch) => {
  const obj = {
    title: values.todo,
  };
  console.log(obj);
  dispatch({ type: TODOS_REQUEST });
  axios
    .post(`${baseURL}/api/todos`, obj, headers)
    .then((response) => {
      console.log(response.data);
      dispatch({ type: TODO_CREATED, payload: response.data });
    })
    .catch((error) => {
      console.log(error);
      dispatch({
        type: TODOS_FAILURE,
        payload: "Todo not created successfully",
      });
    });
};

export const deleteTodo = (todo) => (dispatch, getState) => {
  dispatch({ type: TODOS_REQUEST });
  const todo_list = getState().todo.todos;
  const new_todos = _.difference(todo_list, [todo]);
  console.log(new_todos);
  axios
    .delete(`${baseURL}/api/todos/${todo.id}`, headers)
    .then((response) => {
      dispatch({ type: DELETE_TODO, payload: new_todos });
    })
    .catch((error) => {
      console.log(error.message);
      dispatch({ type: TODOS_FAILURE, payload: error.message });
    });
};

export const markComplete = (todo_obj) => (dispatch, getState) => {
  dispatch({ type: TODOS_REQUEST });
  const obj = todo_obj;
  obj.is_complete = !obj.is_complete;

  const todo_list = getState().todo.todos;
  const element = _.find(todo_list, (obj) => {
    return obj.id === todo_obj.id;
  });
  const index = _.indexOf(todo_list, element);
  todo_list.splice(index, 1, obj);

  axios
    .patch(`${baseURL}/api/todos/${obj.id}`, obj, headers)
    .then((response) => {
      dispatch({ type: UPDATE_TODO, payload: todo_list });
    })
    .catch((error) => {
      dispatch({ type: TODOS_FAILURE, error: "Todo didn't update" });
    });
};

export const getSelectedTodo = (id) => (dispatch, getState) => {
  dispatch({ type: TODOS_REQUEST });
  // const newArray = getState().todo.selectedTodo;
  axios
    .get(`${baseURL}/api/todos/${id}`, headers)
    .then((response) => {
      // newArray.push(response.data);
      dispatch({ type: GET_SELECTED_TODO, payload: [response.data] });
    })
    .catch((error) => {
      dispatch({ type: TODOS_FAILURE, payload: error.message });
    });
};

export const getProfile = () => (dispatch) => {
  dispatch({ type: PROFILE_REQUEST });
  axios
    .get(`${baseURL}/api/users/profile`, headers)
    .then((response) => {
      dispatch({ type: PROFILE_SUCCESS, payload: response.data });
    })
    .catch((error) => {
      dispatch({ type: PROFILE_FAILURE, payload: error.message });
    });
};

export const getUsersList = () => (dispatch) => {
  dispatch({ type: USER_REQUEST });
  axios
    .get(`${baseURL}/api/users`, headers)
    .then((response) => {
      dispatch({ type: USER_SUCCESS, payload: response.data.results });
    })
    .catch((error) => {
      dispatch({ type: USER_FAILURE, payload: error.message });
    });
};

export const getSelectedUser = (id) => (dispatch) => {
  dispatch({ type: USER_REQUEST });
  axios
    .get(`${baseURL}/api/users/${id}`, headers)
    .then((response) => {
      dispatch({ type: SELECTED_USER, payload: [response.data] });
    })
    .catch((error) => {
      dispatch({ type: USER_FAILURE, payload: error.message });
    });
};

export const getUserTodo = (id) => (dispatch) => {
  dispatch({ type: TODOS_REQUEST });
  axios
    .get(`${baseURL}/api/users/${id}/todos`, headers)
    .then((response) => {
      dispatch({ type: TODOS_SUCCESS, payload: response.data });
    })
    .catch((error) => {
      dispatch({ type: TODOS_FAILURE, payload: error.message });
    });
};
