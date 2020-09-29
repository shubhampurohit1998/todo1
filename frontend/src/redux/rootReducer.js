import { reducer as formReducer } from "redux-form";
import { combineReducers } from "redux";
import AuthReducer from "../reducers/AuthReducer";
import TodoReducer from "../reducers/TodoReducer";
import UserReducer from "../reducers/UserReducer";
import ProfileReducer from "../reducers/ProfileReducer";
const rootReducer = combineReducers({
  form: formReducer,
  auth: AuthReducer,
  todo: TodoReducer,
  user: UserReducer,
  profile: ProfileReducer,
});

export default rootReducer;
