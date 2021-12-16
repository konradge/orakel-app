const defaultSettings = {
  minNumber: -10,
  maxNumber: 10,
  decisionTime: 2000,
};
export default (settings = defaultState, action) => {
  switch (action.type) {
    case "SET_NUMBER_RANGE":
      return {
        ...settings,
        minNumber: Math.min(action.payload),
        maxNumber: Math.max(action.payload),
      };
    case "SET_DECISION_TIME":
      return { ...settings, decisionTime: action.payload };
    case "RESET_APP":
      return { ...settings };
    default:
      return currentState;
  }
};

export const setNumberRange = (min, max) => {
  return {
    type: "SET_NUMBER_RANGE",
    payload: [min, max],
  };
};
