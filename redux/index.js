import { combineReducers } from "redux";
import lists from "./lists";
import currentState from "./currentState";
import settings from "./settings";
export default combineReducers({ lists, currentState, settings });
