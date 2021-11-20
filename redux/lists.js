import { defaultLists } from "../components/Custom/defaultValues";
import _ from "lodash";
const defaultState = defaultLists;
export default (lists = defaultLists, action) => {
  switch (action.type) {
    case "SET_LISTS":
      return action.payload;
    case "SET_LIST":
      const listToEdit = lists[action.payload.listKey];
      return {
        ...lists,
        ...{
          [action.payload.listKey]: {
            ...listToEdit,
            list: action.payload.list,
          },
        },
      };
    case "ADD_LIST":
      return {
        ...lists,
        ...{
          [action.payload.key]: {
            title: action.payload.title,
            list: action.payload.list,
          },
        },
      };
    case "REMOVE_LIST":
      console.log("REMOVE:");
      console.log(action.payload);
      console.log(lists);
      return _.omit(lists, [action.payload]);
    default:
      return lists;
  }
};

export const setLists = (lists) => {
  return { type: "SET_LISTS", payload: lists };
};

export const setList = (listKey, list) => {
  return { type: "SET_LIST", payload: { listKey, list } };
};

export const loadLists = () => {
  return { type: "SET_LISTS", payload: defaultLists };
};

// Adds a new list based on a given title and list
export const addList = (title, list = []) => {
  console.log("Add list with title " + title);
  return {
    type: "ADD_LIST",
    payload: { title, list, key: title.toLowerCase() },
  };
};

export const removeList = (keyToDelete) => {
  console.log(keyToDelete);
  return { type: "REMOVE_LIST", payload: keyToDelete };
};
