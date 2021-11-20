import { combineReducers } from "redux";
import lists from "./lists";
import currentState from "./currentState";
export default combineReducers({ lists, currentState });
