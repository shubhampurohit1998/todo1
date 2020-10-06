import { reducer as formReducer } from "redux-form";
import { combineReducers } from "redux";
import AuthReducer from "../reducers/AuthReducer";
import TodoReducer from "../reducers/TodoReducer";
import UserReducer from "../reducers/UserReducer";
import ProfileReducer from "../reducers/ProfileReducer";
import NotificationReducer from "../reducers/NotificationReducer";
const rootReducer = combineReducers({
  form: formReducer,
  auth: AuthReducer,
  todo: TodoReducer,
  user: UserReducer,
  profile: ProfileReducer,
  notification: NotificationReducer,
});

export default rootReducer;
