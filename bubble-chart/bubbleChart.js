import { colorBox } from "./utils.js";

const { scaleLinear, scaleOrdinal, schemeSet2, extent, axisLeft, axisBottom } =
  d3;

export const bubbleChart = () => {
  let width;
  let height;
  let data;
  let xValue;
  let yValue;
  let zValue;
  let cValue;
  let margin;

  const my = (selection) => {
    //if u pass value to the domain it acts as a settter
    // else it acts as a getter
    const svg = selection.append("g");

    // Add X axis
    // const x = scaleLinear()
    //   .domain([0, 12000])
    //   .range([margin.left, width - margin.right]);
    // // Add Y axis
    // const y = scaleLinear()
    //   .domain(extent(data, yValue))
    //   .range([height - margin.bottom, margin.top]);
    // const z = scaleLinear().domain(extent(data, zValue)).range([4, 40]);

    // svg
    //   .append("g")
    //   .attr("transform", `translate(0,${height - margin.bottom})`)
    //   .call(axisBottom(x));

    // svg
    //   .append("g")
    //   .attr("transform", `translate(${margin.left},0)`)
    //   .call(axisLeft(y));

    // Add a scale for bubble size

    // Add a scale for bubble color
    // const myColor = scaleOrdinal()
    //   .domain(["Asia", "Europe", "Americas", "Africa", "Oceania"])
    //   .range(schemeSet2);

    console.log(data);

    const dataSet = { children: [] };
    data.forEach((element, i) => {
      dataSet.children.push({ children: element });
    });

    var packLayout = d3.pack().size([width, height]).padding(30);

    var rootNode = d3.hierarchy(dataSet).sum(function (d) {
      return d.value;
    });

    packLayout(rootNode);

    const circleGrp = svg
      .selectAll("g")
      .data(rootNode.leaves())
      .enter()
      .append("g")
      .attr("class", "bubbleGroup")
      .attr("transform", (d) => `translate(${d.x + 1},${d.y + 1})`);

    const circle = circleGrp
      .append("circle")
      .attr("class", "bubbles")
      .attr("r", (d) => d.r)
      .attr("fill", (d, i) => (d.children ? "transparent" : d.data.color))
      .attr("stroke", (d) => (d.children ? "transparent" : d.data.color))
      .style("opacity", (d) => (d.children ? "0" : "0.8"));

    // add mouseover and mouseout events to the circles
    const circles = d3.selectAll(".bubbles");

    // leaf
    //   .on("mouseover", function (d) {
    //     // scale the circle up by 50%
    //     console.log(d);
    //     leaf
    //       .transition()
    //       .duration(200)
    //       //   .attr("r", (d) => d.r * 1.5);
    //       .attr("transform", `translate(${d.x + 0.5} , ${d.y})`);
    //   })
    //   .on("mouseout", function (d) {
    //     // scale the circle back down to its original size
    //     leaf
    //       .transition()
    //       .duration(200)
    //       .attr("transform", `translate( ${d.x},  ${d.y})`);
    //   });

    /* Create the text for each block */
    circleGrp
      .append("text")
      .text(function (d) {
        return d.children ? "" : d.data.label;
      })
      .style("text-anchor", "middle")
      .style("font-family", "Roboto")
      .style("font-weight", "600");

    circleGrp
      .append("text")
      .text(function (d) {
        return d.children ? "" : d.data.value;
      })
      .style("text-anchor", "middle")
      .attr("dy", "1.3em")
      .style("font-family", "Roboto")
      .style("font-weight", "600");

    // Add dots
    // svg
    //   .append("g")
    //   .selectAll("dot")
    //   .data(rootNode.descendants())
    //   .join("circle")
    //   .attr("class", "bubbles")
    //   .attr("cx", function (d) {
    //     return d.x;
    //   })
    //   .attr("cy", function (d) {
    //     return d.y;
    //   })
    //   .attr("r", function (d) {
    //     return d.r;
    //   })
    //   .style("fill", (d, i) => (d.children ? "transparent" : d.data.color))
    //   .style("opacity", (d) => (d.children ? "0" : "0.8"))
    //   .style("stroke", (d) => (d.children ? "transparent" : "white"))
    //   .attr("data-depth", (d) => d.depth);
  };

  my.width = function (_) {
    return arguments.length ? ((width = +_), my) : width; // ((width = _),my) this means width is assigned and my function is returned
  };
  my.height = function (_) {
    return arguments.length ? ((height = +_), my) : height; // ((height = _),my) this means height is assigned and my function is returned
  };
  my.data = function (_) {
    return arguments.length ? ((data = _), my) : data;
  };
  my.xValue = function (_) {
    return arguments.length ? ((xValue = _), my) : xValue;
  };
  my.yValue = function (_) {
    return arguments.length ? ((yValue = _), my) : yValue;
  };
  my.zValue = function (_) {
    return arguments.length ? ((zValue = _), my) : zValue;
  };
  my.cValue = function (_) {
    return arguments.length ? ((cValue = _), my) : cValue;
  };
  my.margin = function (_) {
    return arguments.length ? ((margin = _), my) : margin;
  };
  return my;
};
