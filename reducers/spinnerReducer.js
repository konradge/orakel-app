export default (
  spinner = {
    shouldSpin: false,
    currentlySpinning: false,
    startIndex: 0,
    endIndex: null,
  },
  action
) => {
  switch (action.type) {
    case "REQUEST_SPINNING":
      return { ...spinner, shouldSpin: true };
    case "ACKNOWLEDGE_SPINNING":
      return { ...spinner, shouldSpin: false, currentlySpinning: true };
    case "END_SPINNING":
      return { ...spinner, currentlySpinning: false };
    case "SET_START_INDEX":
      return { ...spinner, startIndex: action.payload };
    case "SET_END_INDEX":
      return { ...spinner, endIndex: action.payload };
    default:
      return spinner;
  }
};
