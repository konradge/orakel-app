export const getColor = (value) => {
  let red = "ff",
    green = "ff";
  if (value < 0.5) {
    red = Math.floor(2 * value * 255).toString(16);
  } else if (value > 0.5) {
    green = Math.floor(2 * (1 - value) * 255).toString(16);
  }
  return `#${red}${green}00`;
};

export const isNumber = (string) => string.match(/^\d*$/g) !== null;

export const generateNumber = (min, max) =>
  Math.floor(Math.random() * Math.abs(max - min)) + min;

export const sleep = async (time) =>
  await new Promise((r) => setTimeout(r, time));

export const addDay = (oldDate, dayNumber = 1) => {
  let date = new Date(oldDate);
  date.setDate(date.getDate() + dayNumber);
  return new Date(date);
};

export const rotate = async (
  inputArray,
  onUpdate,
  goalIndex,
  onFinish,
  durationMin = 1800,
  durationMax = 2200,
  intervalMin = 30,
  intervalMax = 60
) => {
  const duration = generateNumber(durationMin, durationMax);
  let intervalArray = [];
  while (intervalArray.reduce((x, y) => x + y, 0) < duration) {
    intervalArray.push(generateNumber(intervalMin, intervalMax));
  }
  let start = (goalIndex - intervalArray.length) % inputArray.length;
  for (let i = 0; i < intervalArray.length; i++) {
    onUpdate(inputArray[start]);
    start = (start + 1) % inputArray.length;
    await sleep(intervalArray[i]);
  }
  onUpdate(inputArray[start]);
  onFinish(inputArray[start]);
};
