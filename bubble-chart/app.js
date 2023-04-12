import { bubbleChart } from "./bubbleChart.js";
import { testData1 } from "./constants.js";
import { setData } from "./utils.js";

// import { donutChart } from "./donutChart.js";
const { select, csv } = d3;

// set the dimensions and margins of the graph
const margin = { top: 10, right: 20, bottom: 30, left: 50 },
  width = window.innerWidth - margin.left - margin.right,
  height = window.innerHeight - margin.top - margin.bottom;

const csvUrl =
  "https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/4_ThreeNum.csv";
const parseRow = (d) => {
  d.label = d.label;
  d.color = d.color;
  d.value = +d.value;
  return d;
};

export function myFunction() {
  const svg = select("#my_dataviz")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

  // await csv(csvUrl, parseRow)

  const massagedData = setData(testData1);
  //   console.log(massagedData);

  const main = async () => {
    svg.call(
      bubbleChart()
        .width(width)
        .height(height)
        .data(massagedData, parseRow)
        .xValue((d) => d.label)
        .yValue((d) => d.value)
        // .zValue((d) => d.pop)
        .cValue((d) => d.color)
        .margin(margin)
    );
  };
  main();
}
