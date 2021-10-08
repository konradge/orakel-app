export default (elementSize = {}, action) => {
  switch (action.type) {
    case "SET_ELEMENT_SIZE":
      let newElementSize = { ...elementSize };
      elementSize[action.payload.key] = action.payload.size;
      return newElementSize;
    default:
      return elementSize;
  }
};
