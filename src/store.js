import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import config from "config";
import rootReducer from "./reducers";

const composeEnhancers =
  config.env === "development"
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
    : compose;

const middlewares = [thunk];

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(...middlewares)),
);

export default store;
