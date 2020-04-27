import addUrlParam from "./addUrlParam";

export default function getCSSBackgroundImage({ url, screenWidth }) {
  let width = screenWidth > 1000 ? Math.floor(screenWidth) : 1000;
  return addUrlParam({
    url,
    replace: "upload",
    replaceWith: `upload/c_scale,w_${width}`,
  });
}
