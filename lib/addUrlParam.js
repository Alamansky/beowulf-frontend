export default function addUrlParam({ url, replace, replaceWith }) {
  return url.replace(replace, replaceWith);
}
