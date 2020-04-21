const fs = require("fs");

function setViewbox(svg) {
  var bB = svg.getBBox();
  svg.setAttribute(
    "viewBox",
    bB.x + "," + bB.y + "," + bB.width + "," + bB.height
  );
}

function isSVG(file) {
  return (
    file
      .split("")
      .slice(-3)
      .join("") === "svg"
  );
}

fs.readdir("./", (err, files) => {
  files.forEach(
    file =>
      isSVG(file) &&
      fs.readFile(`./${file}`, "utf-8", (err, data) => setViewbox(data))
  );
});
