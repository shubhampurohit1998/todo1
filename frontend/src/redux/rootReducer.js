import { reducer as formReducer } from "redux-form";
import { combineReducers } from "redux";
import AuthReducer from "../reducers/AuthReducer";
import TodoReducer from '../reducers/TodoReducer'
const rootReducer = combineReducers({
  form: formReducer,
  auth: AuthReducer,
  todo: TodoReducer
});

export default rootReducer;
