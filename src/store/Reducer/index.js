import { combineReducers } from "redux";
import opportunitySerch from "./opportunityReducer";
// Combine all reducers as root reducer
export default combineReducers({oppSerch:opportunitySerch});