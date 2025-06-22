import { setStore, createStore } from "hooks-for-redux";
import { applyMiddleware } from "redux";

// example middle-ware
// const logDispatch = store => next => action => {
//   console.log("dispatching", action);
//   return next(action);
// };
import logger from "redux-logger";
import { composeWithDevTools } from "redux-devtools-extension";

export default setStore(
  createStore({}, composeWithDevTools(applyMiddleware(logger)))
);
