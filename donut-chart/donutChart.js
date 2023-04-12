export const donutChart = () => {
  let width;
  let height;
  let data;
  let margin;
  let radius;

  const my = (selection) => {
    // append the svg object to the div called 'my_dataviz'
    const svg = selection
      .append("g")
      .attr("transform", `translate(${width / 2},${height / 2})`); //for centering pie chart in the svg

    // set the color scale
    const color = d3
      .scaleOrdinal()
      .domain(Object.keys(data))
      .range(d3.schemeDark2);

    // Compute the position of each group on the pie:
    const pie = d3
      .pie()
      .sort(null) // Do not sort group by size
      .value((d) => d[1]);
    const data_ready = pie(Object.entries(data));

    // The arc generator
    const arc = d3
      .arc()
      .innerRadius(radius * 0.5) // This is the size of the donut hole
      .outerRadius(radius * 0.8);

    // Another arc that won't be drawn. Just for labels positioning
    const outerArc = d3
      .arc()
      .innerRadius(radius * 0.9)
      .outerRadius(radius * 0.9);

    // Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
    svg
      .selectAll("allSlices")
      .data(data_ready)
      .join("path")
      .attr("d", arc)
      .attr("fill", (d) => color(d.data[1]))
      .attr("stroke", "white")
      .style("stroke-width", "2px")
      .style("opacity", 0.7);

    // Add the polylines between chart and labels:
    svg
      .selectAll("allPolylines")
      .data(data_ready)
      .join("polyline")
      .attr("stroke", "black")
      .style("fill", "none")
      .attr("stroke-width", 1)
      .attr("points", function (d) {
        const posA = arc.centroid(d); // line insertion in the slice
        const posB = outerArc.centroid(d); // line break: we use the other arc generator that has been built only for that
        const posC = outerArc.centroid(d); // Label position = almost the same as posB
        const midangle = d.startAngle + (d.endAngle - d.startAngle) / 2; // we need the angle to see if the X position will be at the extreme right or extreme left
        posC[0] = radius * 0.95 * (midangle < Math.PI ? 1 : -1); // multiply by 1 or -1 to put it on the right or on the left
        return [posA, posB, posC];
      });

    // Add the polylines between chart and labels:
    svg
      .selectAll("allLabels")
      .data(data_ready)
      .join("text")
      .text((d) => d.data[0])
      .attr("transform", function (d) {
        const pos = outerArc.centroid(d);
        const midangle = d.startAngle + (d.endAngle - d.startAngle) / 2;
        pos[0] = radius * 0.99 * (midangle < Math.PI ? 1 : -1);
        return `translate(${pos})`;
      })
      .style("text-anchor", function (d) {
        const midangle = d.startAngle + (d.endAngle - d.startAngle) / 2;
        return midangle < Math.PI ? "start" : "end";
      });
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
  my.margin = function (_) {
    return arguments.length ? ((margin = _), my) : margin;
  };
  my.radius = function (_) {
    return arguments.length ? ((radius = +_), my) : radius;
  };
  return my;
};
