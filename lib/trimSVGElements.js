function setViewbox(svg) {
  var bB = svg.getBBox();
  svg.setAttribute(
    "viewBox",
    bB.x + "," + bB.y + "," + bB.width + "," + bB.height
  );
}

const trimSVGElements = () => {
  const svgs = document.getElementsByTagName("svg");
  Array.from(svgs).forEach(svg => setViewbox(svg));
};

export default trimSVGElements;
