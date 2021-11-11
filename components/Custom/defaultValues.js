// Get them with getData("custom_lists") || defaultLists
export const defaultLists = {
  jahreszeiten: [
    "Januar",
    "Februar",
    "März",
    "April",
    "Mai",
    "Juni",
    "Juli",
    "August",
    "September",
    "Oktober",
    "November",
    "Dezember",
  ],
  gerichte: ["Nudeln", "Reis", "Salat", "Steak", "Suppe"],
  buchstaben: Array(26)
    .fill()
    .map((_, i) => String.fromCharCode(65 + i)),
};
