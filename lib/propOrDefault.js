export function propOrDefault(prop, defaultValue, addendum = null) {
  return `${prop ? prop : defaultValue}${addendum ? addendum : ""};`;
}
