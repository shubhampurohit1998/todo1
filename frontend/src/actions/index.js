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
  COMPLETE_TODO,
  NOTIFICATION_REQUEST,
  NOTIFICATION_SUCCESS,
  NOTIFICATION_FAILURE,
} from "../constants/index";
import { baseURL, headers } from "../utility/index";
import _ from "lodash";
import { SubmissionError } from "redux-form";
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
      localStorage.setItem("token", response.data.access_token);
      dispatch({ type: AUTH_SUCCESS, payload: response.data.access_token });
      window.location.reload(true);
    })
    .catch((error) => {
      const errors = error.response.data;
      dispatch({ type: AUTH_FAIL, payload: error.message });
      if ("non_field_errors" in errors) {
        errors._error = errors.non_field_errors;
      }
      throw new SubmissionError({
        email: "Email or password is wrong",
        _error: "Login failed!",
      });
    });
};

export const logout = () => (dispatch) => {
  dispatch({ type: AUTH_LOGOUT });
  localStorage.removeItem("token");
  window.location.reload(true);
};

export const getTodo = () => (dispatch) => {
  dispatch({ type: TODOS_REQUEST });
  axios
    .get(`${baseURL}/api/todos/todos_active`, headers)
    .then((response) => {
      dispatch({ type: TODOS_SUCCESS, payload: response.data.results });
    })
    .catch((error) => {
      dispatch({ type: TODOS_FAILURE, payload: error.message });
    });
};

export const getTodoComplete = () => (dispatch) => {
  dispatch({ type: TODOS_REQUEST });
  axios
    .get(`${baseURL}/api/todos_complete`)
    .then((response) => {
      dispatch({ type: COMPLETE_TODO, payload: response.data.results });
    })
    .catch((error) => {
      dispatch({ type: TODOS_FAILURE, payload: error.message });
    });
};

export const createTodo = (values) => (dispatch, getState) => {
  const obj = {
    title: values.todo,
  };
  const todo_list = getState().todo.todos;
  dispatch({ type: TODOS_REQUEST });
  axios
    .post(`${baseURL}/api/todos`, obj, headers)
    .then((response) => {
      todo_list.unshift(response.data);
      dispatch({ type: TODO_CREATED, payload: todo_list });
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
      dispatch({ type: USER_SUCCESS, payload: response.data });
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

export const searchTodo = (params) => (dispatch, getState) => {
  console.log(params);
  dispatch({ type: TODOS_REQUEST });
  axios
    .get(`${baseURL}/api/todos/search-todo?title=${params.title}`, headers)
    .then((response) => {
      dispatch({ type: TODOS_SUCCESS, payload: response.data.results });
    })
    .catch((error) => {
      dispatch({ type: TODOS_FAILURE, payload: error.message });
    });
};

export const updateProfile = (values) => (dispatch) => {
  console.log(values);
  const id = values.id;
  dispatch({ type: PROFILE_REQUEST });
  axios
    .patch(`${baseURL}/api/users/${id}`, values, headers)
    .then((response) => {
      dispatch({ type: PROFILE_SUCCESS, payload: values });
    })
    .catch((error) => {
      dispatch({ type: PROFILE_FAILURE, payload: error.message });
    });
};

export const getNotifications = () => (dispatch) => {
  dispatch({ type: NOTIFICATION_REQUEST });
  axios
    .get(`${baseURL}/api/notifications/my_notifications`, headers)
    .then((response) => {
      dispatch({ type: NOTIFICATION_SUCCESS, payload: response.data });
    })
    .catch((error) => {
      dispatch({ type: NOTIFICATION_FAILURE, payload: error.message });
    });
};
