import { combineReducers } from "redux";
import filters from "./filters";
import isLoggedIn from "./loggedIn";

export default combineReducers({ filters, isLoggedIn });
