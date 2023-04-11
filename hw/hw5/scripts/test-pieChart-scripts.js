let data = [48, 21, 65, 30, 16, 2];
// let colors = colorbrewer.Spectral[data.length];
var colors = d3.scaleOrdinal()
.domain(data)
.range(['#ff998d','#ffb43d','#efff54','#66f036','#36f0d8','#5092ef'])


let sizes = {
  innerRadius: 50,
  outerRadius: 100
};

let durations = {
  entryAnimation: 2000
};

draw();

function draw() {
  d3.select("#pieChart").html("");
  
  let generator = d3.pie()
    .sort(null);

  let chart = generator(data);

  let arcs = d3.select("#pieChart")
    .append("g")
    .attr("transform", "translate(100, 100)")
    .selectAll("path")
    .data(chart)
    .enter()
    .append("path")
    .style("fill", (d, i) => colors[i]);

  let angleInterpolation = d3.interpolate(generator.startAngle()(), generator.endAngle()());

  let innerRadiusInterpolation = d3.interpolate(0, sizes.innerRadius);
  let outerRadiusInterpolation = d3.interpolate(0, sizes.outerRadius);

  let arc = d3.arc();

  arcs.transition()
    .duration(durations.entryAnimation)
    .attrTween("d", d => {
      let originalEnd = d.endAngle;
      return t => {
        let currentAngle = angleInterpolation(t);
        if (currentAngle < d.startAngle) {
          return "";
        }

        d.endAngle = Math.min(currentAngle, originalEnd);

        return arc(d);
      };
    });

  d3.select("#pieChart")
    .transition()
    .duration(durations.entryAnimation)
    .tween("arcRadii", () => {
      return t => arc
        .innerRadius(innerRadiusInterpolation(t))
        .outerRadius(outerRadiusInterpolation(t));
    });

  console.log(3333333333);
}