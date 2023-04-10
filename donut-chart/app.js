import { donutChart } from "./donutChart.js";
const { select } = d3;

// set the dimensions and margins of the graph
const width = 450,
  height = 450,
  margin = 40;

const data = { a: 9, b: 20, c: 30, d: 8, e: 12, f: 3, g: 7, h: 14 };

// The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.
const radius = Math.min(width, height) / 2 - margin;

export function myFunction() {
  const svg = select("#my_dataviz")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

  const main = () => {
    svg.call(
      donutChart()
        .width(width)
        .height(height)
        .data(data)
        .margin(40)
        .radius(radius)
    );
  };
  main();
}
