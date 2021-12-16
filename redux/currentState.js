import { STATES } from "../constants";

/**
 * The state contains the following values:
 * selectedList: When the custom-section is opened: The key (!) of the list that is currently selected
 * customSectionState: The state of the Custom section (STATES.MAIN or STATES:EDIT)
 */
const defaultState = {
  selectedList: "jahreszeiten",
  customSectionState: STATES.MAIN,
  currentlySpinning: false,
};
export default (currentState = defaultState, action) => {
  switch (action.type) {
    case "SET_SELECTED_LIST":
      return { ...currentState, selectedList: action.payload };
    case "SET_CUSTOM_SECTION_STATE":
      return { ...currentState, customSectionState: action.payload };
    case "RESET_APP":
      return defaultState;
    case "SET_CURRENTLY_SPINNING":
      return { ...currentState, currentlySpinning: action.payload };
    default:
      return currentState;
  }
};

export const setSelectedList = (listKey) => {
  return { type: "SET_SELECTED_LIST", payload: listKey };
};

export const setCustomSectionState = (state) => {
  return { type: "SET_CUSTOM_SECTION_STATE", payload: state };
};

export const setCurrentlySpinning = () => {
  return { type: "SET_CURRENTLY_SPINNING", payload: true };
};

export const resetCurrentlySpinning = () => {
  return { type: "SET_CURRENTLY_SPINNING", payload: false };
};
