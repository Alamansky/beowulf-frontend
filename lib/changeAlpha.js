export default function changeAlpha(color, int) {
  let counter = 0;
  return color.split("").reduce((acc, cur, idx, src) => {
    if (counter == 3 && cur != " ") {
      if (src[idx + 1] == ".") {
        src.splice(idx, 2);
      }
      cur = int.toString();

      counter = 0;
    }
    if (cur == ",") {
      counter = counter + 1;
    }
    return (acc += cur);
  }, []);
}
