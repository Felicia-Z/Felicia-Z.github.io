
// Data for the radar chart
var radardata = [
  {category: "Carving",value: 7},
  {category: "Freestyle",value: 5},
  {category: "Backcountry",value: 10},
  {category: "Powder",value: 10},
  {category: "Performance",value: 10}
];

// Set up the radar chart dimensions
var width = 400;
var height = 400;
var margin = { top: 50, right: 150, bottom: 50, left: 150 };
var radius = Math.min(width - margin.left - margin.right, height - margin.top - margin.bottom) / 2;

// Create the SVG container for the chart
var svg = d3.select("#chart-container")
            .append("svg")
            .attr("width", width)
            .attr("height", height)
            .append("g")
            .attr("transform", "translate(" + (width / 2) + "," + (height / 2) + ")");

// Create the radar chart scales
var scale = d3.scaleLinear()
                .domain([0, 10]) // Set the data domain
                .range([0, radius]); // Set the radius range

// Create the radar chart axes
var axis = d3.axisLeft(scale)
                .ticks(5) // Set the number of ticks on the axes
                .tickSize(0); // Hide the tick lines

// Create the radar chart lines
var line = d3.lineRadial()
                .angle(function(d, i) { return i * Math.PI * 2 / radardata.length; }) // Set the angle of the lines
                .radius(function(d) { return scale(d.value); }) // Set the radius of the lines
                .curve(d3.curveLinearClosed); // Set the line curve

// Append the radar chart lines
svg.append("path")
    .datum(radardata)
    .attr("class", "radar-line")
    .attr("d", line);

// Append the radar chart axes
svg.append("g")
    .attr("class", "radar-axis")
    .call(axis);


