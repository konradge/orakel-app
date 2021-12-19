const defaultSettings = {
  minNumber: -10,
  maxNumber: 10,
  totalDecisionTime: 3000,
  averageDecisionTime: 200,
};
export default (settings = defaultSettings, action) => {
  switch (action.type) {
    case "SET_NUMBER_RANGE":
      return {
        ...settings,
        minNumber: Math.min(...action.payload),
        maxNumber: Math.max(...action.payload),
      };
    case "RESET_APP":
      return defaultSettings;
    case "SET_SETTINGS":
      return action.payload;
    case "SET_TOTAL_DECISION_TIME":
      return { ...settings, totalDecisionTime: action.payload };
    case "SET_AVERAGE_DECISION_TIME":
      return { ...settings, averageDecisionTime: action.payload };
    default:
      return settings;
  }
};

export const setNumberRange = (min, max) => {
  return {
    type: "SET_NUMBER_RANGE",
    payload: [min, max],
  };
};

export const setTotalDecisionTime = (time) => {
  return {
    type: "SET_TOTAL_DECISION_TIME",
    payload: time,
  };
};

export const setAverageDecisionTime = (time) => {
  return {
    type: "SET_AVERAGE_DECISION_TIME",
    payload: time,
  };
};

export const setSettings = (settings) => {
  return {
    type: "SET_SETTINGS",
    payload: settings,
  };
};
