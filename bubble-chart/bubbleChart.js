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
    // const svg = selection.append("g");

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

    // console.log(rootNode.leaves());
    const nodes = rootNode.leaves().map((d) => ({
      x: d.x,
      y: d.y,
      r: Math.max(d.r),
      color: d.data.color,
      label: d.data.label,
      value: d.data.value,
    }));

    // const colors = ["red", "green", "blue", "yellow", "violet", "lime"];

    // const node_data = [...Array(40)].map(() => ({
    //   x: width * Math.random(),
    //   y: height * Math.random(),
    //   r: Math.max(3, d3.randomNormal(8, 5)()),
    //   color: colors[Math.round(colors.length * Math.random())],
    // }));
    // console.log(d3.randomNormal(8, 5)());
    // console.log(nodes, node_data);

    const circleGrp = selection
      .selectAll("g")
      .data(nodes)
      .enter()
      .append("g")
      .attr("class", "blip")
      .attr("transform", (d) => `translate(${d.x},${d.y})`);

    circleGrp
      // .selectAll(".blip")
      // .data(nodes)
      // .enter()
      .append("circle")
      .attr("class", "bubbles")
      .attr("cx", (d) => 0)
      .attr("cy", (d) => 0)
      .attr("r", (d) => d.r)
      .attr("fill", (d, i) => (d.children ? "transparent" : d.color))
      .attr("stroke", (d) => (d.children ? "transparent" : d.color))
      .style("opacity", (d) => (d.children ? "0" : "0.8"));
    // .attr("transform", (d) => `translate(${d.x},${d.y})`);

    // nodes appear animation (circles size from zero to final size)
    // circleGrp
    //   .selectAll(".bubbles")
    //   .transition()
    //   .duration(500)
    //   .attr("r", (d) => {
    //     return d.r;
    //   });

    const sim = d3
      .forceSimulation(nodes)
      .force("x", d3.forceX(width / 2))
      .force("y", d3.forceY(height / 2))
      .force(
        "collide",
        d3.forceCollide().radius((d) => d.r + 20) //nodePadding - 3
      );

    // var simulation = d3
    //   .forceSimulation(nodes)
    //   .force("center", d3.forceCenter(width / 2, height / 2))
    //   .force("charge", d3.forceManyBody().strength(-20))
    //   .force(
    //     "collision",
    //     d3.forceCollide().radius(function (d) {
    //       return d.r;
    //     })
    //   );

    sim.on("tick", () => {
      circleGrp.attr(
        "transform",
        (d) => `translate(${d.x ?? d.x},${d.y ?? d.y})`
      );
    });

    // simulation.on("tick", function () {
    //   // Update the circle positions based on the force simulation
    //   circleGrp.attr(
    //     "transform",
    //     (d) => `translate(${d.x ?? d.x},${d.y ?? d.y})`
    //   );
    // });

    // sim.stop();

    // add mouseover and mouseout events to the circles
    const circles = d3.selectAll(".bubbles");

    // circles.on("mouseenter", function (d) {
    //   sim.force(
    //     "x",
    //     d3
    //       .forceX()
    //       .strength(0.03)
    //       .x((d) => {
    //         return width * 0.65;
    //       })
    //   );
    //   sim.alpha(2).restart();
    // });
    // .on("mouseout", function (d) {
    //   // Reset the x and y velocity of the circle to zero
    //   d.x = 0;
    //   d.y = 0;
    // });
    // .on("mouseleave", function (d) {
    //   // scale the circle back down to its original size
    //   circleGrp
    //     .transition()
    //     .duration(500)
    //     .attr("transform", `translate( ${d.x},  ${d.y})`);
    // });

    /* Create the text for each block */
    circleGrp
      .append("text")
      .text(function (d) {
        return d.children ? "" : d.label;
      })
      .style("text-anchor", "middle")
      .style("font-family", "Roboto")
      .style("font-weight", "600");

    circleGrp
      .append("text")
      .text(function (d) {
        return d.children ? "" : d.value;
      })
      .style("text-anchor", "middle")
      .attr("dy", "1.3em")
      .style("font-family", "Roboto")
      .style("font-weight", "600");
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
