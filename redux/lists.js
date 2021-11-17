import { defaultLists } from "../components/Custom/defaultValues";
const defaultState = defaultLists;
export default (state = defaultLists, action) => {
  switch (action.type) {
    case "SET_LISTS":
      if (action.payload) {
        return action.payload;
      } else {
        return defaultState;
      }
    default:
      return state;
  }
};

export const setLists = (lists) => {
  return { type: "SET_LISTS", payload: lists };
};
