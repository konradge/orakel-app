export const setWidestElements = (key, size) => {
  return {
    type: "SET_ELEMENT_SIZE",
    payload: { key, size },
  };
};
