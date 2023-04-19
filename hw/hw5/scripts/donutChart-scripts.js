
// manual way to parse data, use a different way to parse same data set in bar chart
const data = [
    { group: "Excellent", values: [2, 1, 0, 1, 3, 3, 21] },
    { group: "Great", values: [11, 0, 2, 1, 0, 16, 58] },
    { group: "Good", values: [20, 1, 6, 4, 5, 36, 63] },
    { group: "Average", values: [55, 2, 0, 14, 4, 9, 4] },
    { group: "Poor", values: [42, 0, 1, 1, 1, 1, 3] },
];

// Donut chart configuration
const donutConfig = {
    width: 180,
    height: 180,
    radius: 80,
    colors: ['#ff998d','#ffb43d','#efff54','#66f036','#36f0d8','#5092ef','#a770f6'],
    innerRadius: 50,
};

// Loop through each data point and create a donut chart
data.forEach((d, i) => {
    const svg = d3.select(`#chart${i + 1}`)
    .append("svg")
    .attr("width", donutConfig.width)
    .attr("height", donutConfig.height)
    .append("g")
    .attr("transform", `translate(${donutConfig.width / 2}, ${donutConfig.height / 2})`);

    const pie = d3.pie().value((data) => data)(d.values);

    const arc = d3.arc()
        .innerRadius(donutConfig.innerRadius)
        .outerRadius(donutConfig.radius);

    // Select the arcs
    const arcs = svg.selectAll("arc")
        .data(pie)
        .enter()
        .append("g")
        .attr("class", "arc");

    arcs.append("path")
        .attr("d", arc)
        .attr("fill", (data, index) => donutConfig.colors[index]);

    // show data value on arcs
    // arcs.append("text")
    //     .attr("transform", (data) => `translate(${arc.centroid(data)})`)
    //     .attr("text-anchor", "middle")
    //     .text((data) => data.data);

    // arcs.on("mouseover", arcMouseOver)
    //     .on("mouseout", arcMouseOut);

    // // Add a transition animation to the arcs
    // arcs.transition()
    //     .duration(1000) // specify the duration of the animation in milliseconds
    //     .attrTween("d", (data) => {
    //         const interpolate = d3.interpolate(data.startAngle, data.endAngle);
    //             return (t) => {
    //                 data.endAngle = interpolate(t);
    //                 return arc(data);
    //             };
    //         });


    // show percentage instead of data value on arcs, also add animation on text
    arcs.append("text")
        .attr("transform", (data) => `translate(${arc.centroid(data)})`)
        .attr("text-anchor", "middle")
        .text((data) => {
          const percentage = ((data.endAngle - data.startAngle) / (2 * Math.PI)) * 100;
          return `${percentage.toFixed(1)}%`;
        })
        .style("opacity", 0)
        .transition()
        .duration(1000)
        .style("opacity", 1);
      
});
