export const capitalizeFirstLetter = (str) =>
  str
    .split("")
    .map((x, i) => (i == "0" ? x.toUpperCase() : x))
    .join("");
