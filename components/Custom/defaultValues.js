export const defaultListNames = ["Jahreszeiten", "Gerichte", "Buchstaben"].map(
  (name) => ({ title: name, id: name.toLowerCase() })
);

export const defaultListValues = {
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
