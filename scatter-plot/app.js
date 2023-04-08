const { csv, select, scaleLinear, min, max, extent, axisLeft, axisBottom } = d3;

//tweakable
const csvUrl = [
  "https://gist.githubusercontent.com/",
  "curran/", // User
  "a08a1080b88344b0c8a7/", // Id of the Gist
  "raw/0e7a9b0a5d22642a06d3d5b9bcbad9890c8ee534/", // commit
  "iris.csv", // File name
].join("");

const parseRow = (d) => {
  d.sepal_length = +d.sepal_length;
  d.sepal_width = +d.sepal_width;
  d.petal_length = +d.petal_length;
  d.petal_width = +d.petal_width;
  return d;
};

const xValue = (d) => d.petal_length;
const yValue = (d) => d.sepal_length;
const margins = {
  top: 20,
  right: 20,
  bottom: 60,
  left: 60,
};
const radius = 5;

const width = window.innerWidth;
const height = window.innerHeight;
const svg = select("body")
  .append("svg")
  .attr("width", width)
  .attr("height", height);

//generic
const main = async () => {
  const data = await csv(csvUrl, parseRow);

  //if u pass value to the domain it acts as a settter
  // else it acts as a getter
  const x = scaleLinear()
    .domain(extent(data, xValue))
    .range([margins.left, width - margins.right]);
  const y = scaleLinear()
    .domain(extent(data, yValue))
    .range([height - margins.bottom, margins.top]);

  const marks = data.map((d) => ({
    x: x(xValue(d)),
    y: y(yValue(d)),
  }));

  svg
    .selectAll("circle")
    .data(marks)
    .join("circle")
    .attr("cx", (d) => d.x)
    .attr("cy", (d) => d.y)
    .attr("r", radius)
    .attr("fill", "blue")
    .attr("stroke", "black")
    .attr("stroke-width", 2);

  svg
    .append("g")
    .attr("transform", `translate(${margins.left},0)`)
    .call(axisLeft(y));
  svg
    .append("g")
    .attr("transform", `translate(0,${height - margins.bottom})`)
    .call(axisBottom(x));
};

main();
