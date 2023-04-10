const { scaleLinear, extent, axisLeft, axisBottom } = d3;

export const scatterPlot = () => {
  let width;
  let height;
  let data;
  let xValue;
  let yValue;
  let margins;
  let radius;

  const my = (selection) => {
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

    selection
      .selectAll("circle")
      .data(marks)
      .join("circle")
      .attr("cx", (d) => d.x)
      .attr("cy", (d) => d.y)
      .attr("r", radius)
      .attr("fill", "blue")
      .attr("stroke", "black")
      .attr("stroke-width", 2);

    selection
      .append("g")
      .attr("transform", `translate(${margins.left},0)`)
      .call(axisLeft(y));
    selection
      .append("g")
      .attr("transform", `translate(0,${height - margins.bottom})`)
      .call(axisBottom(x));
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
  my.margins = function (_) {
    return arguments.length ? ((margins = _), my) : margins;
  };
  my.radius = function (_) {
    return arguments.length ? ((radius = +_), my) : radius;
  };
  return my;
};
