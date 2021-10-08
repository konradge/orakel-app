import { combineReducers } from "redux";
import widestElementsReducer from "./widestElementsReducer";
import spinnerReducer from "./spinnerReducer";

export default combineReducers({
  spinner: spinnerReducer,
  widestElements: widestElementsReducer,
});
