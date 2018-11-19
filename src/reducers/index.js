import { combineReducers } from "redux";
import auth from "./auth";
import UI from "./UI";

const rootReducer = combineReducers({
  auth,
  UI,
});

export default rootReducer;
