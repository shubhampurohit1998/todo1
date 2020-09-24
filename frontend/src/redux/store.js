import { createStore, applyMiddleware } from "redux";
import rootReducer from "./rootReducer";
import logger from "redux-logger";
import Thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(Thunk, logger))
);

export default store;
