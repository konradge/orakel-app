export const requestSpinning = () => {
  return {
    type: "REQUEST_SPINNING",
  };
};

export const acknowledgeSpinning = () => {
  return {
    type: "ACKNOWLEDGE_SPINNING",
  };
};

export const endSpinning = () => {
  return { type: "END_SPINNING" };
};

export const setStartIndex = (i) => {
  return { type: "SET_START_INDEX", payload: i };
};

export const setEndIndex = (i) => {
  return { type: "SET_END_INDEX", payload: i };
};
