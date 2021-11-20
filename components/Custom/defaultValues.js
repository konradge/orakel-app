// Get them with getData("custom_lists") || defaultLists
export const defaultLists = {
  jahreszeiten: {
    title: "Jahreszeiten",
    list: [
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
  },
  gerichte: {
    title: "Gerichte",
    list: ["Nudeln", "Reis", "Salat", "Steak", "Suppe"],
  },
  buchstaben: {
    title: "Buchstaben",
    list: Array(26)
      .fill()
      .map((_, i) => String.fromCharCode(65 + i)),
  },
};
