import { reducer as formReducer } from "redux-form";
import { combineReducers } from "redux";
import AuthReducer from "../reducers/AuthReducer";
const rootReducer = combineReducers({
  form: formReducer,
  auth: AuthReducer,
});

export default rootReducer;
