import { STATES } from "../constants";

/**
 * The state contains the following values:
 * selectedList: When the custom-section is opened: The key (!) of the list that is currently selected
 * customSectionState: The state of the Custom section (STATES.MAIN or STATES:EDIT)
 */
export default (
  currentState = {
    selectedList: "jahreszeiten",
    customSectionState: STATES.MAIN,
  },
  action
) => {
  switch (action.type) {
    case "SET_SELECTED_LIST":
      return { ...currentState, selectedList: action.payload };
    case "SET_CUSTOM_SECTION_STATE":
      return { ...currentState, customSectionState: action.payload };
    default:
      return currentState;
  }
};

export const setSelectedList = (listKey) => {
  console.log("Changing selected list to " + listKey);
  return { type: "SET_SELECTED_LIST", payload: listKey };
};

export const setCustomSectionState = (state) => {
  return { type: "SET_CUSTOM_SECTION_STATE", payload: state };
};
