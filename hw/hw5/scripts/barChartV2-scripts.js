d3.csv("sb_stance_count.csv").then(function(data) {
    console.log(data);

    // set the dimensions and margins of the graph
    var margin = {top: 10, right: 30, bottom: 20, left: 50},
        width = 787 - margin.left - margin.right,
        height = 443 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    var svg = d3.select("#barChart")
        .append("svg")
            // .attr("viewBox", `0 0 ${width} ${height}`)
            // .attr("preserveAspectRatio", "xMidYMid meet"); 
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
        .append("g")
            .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

    // List of subgroups = header of the csv files = different stance here
    var subgroups = data.columns.slice(1);
    console.log(subgroups);

    // List of groups = powder performance here = value of the first column called group -> will show them on the X axis
    // var groups = d3.map(data, function(d){return(d.group)}).keys()
    var groups = ["Excellent","Great","Good","Average","Poor"];
    console.log(groups);

    // Add X axis
    var x = d3.scaleBand()
        .domain(groups)
        .range([0, width])
        .padding([0.05])
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x).tickSize(0));

    // Add Y axis
    var y = d3.scaleLinear()
        .domain([0, 65])
        .range([ height, 0 ]);
    svg.append("g")
        .call(d3.axisLeft(y));

    // Another scale for subgroup position?
    var xSubgroup = d3.scaleBand()
        .domain(subgroups)
        .range([0, x.bandwidth()])
        .padding([0.05])

    // color palette = one color per subgroup
    var color = d3.scaleOrdinal()
        .domain(subgroups)
        .range(['#ff998d','#ffb43d','#efff54','#66f036','#36f0d8','#5092ef','#a770f6'])
 
    // Show the bars
    const points = svg.append("g")
        .selectAll("g")
        // Enter in data = loop group per group
        .data(data)
        .enter()
        .append("g")
            .attr("transform", function(d) { return "translate(" + x(d.group) + ",0)"; })
        .selectAll("rect")
        .data(function(d) { return subgroups.map(function(key) { return {key: key, value: d[key]}; }); })
        .enter().append("rect")
            .attr("x", function(d) { return xSubgroup(d.key); })
            .attr("y", function(d) { return y(d.value); })
            .attr("width", xSubgroup.bandwidth())
            .attr("height", function(d) { return height - y(d.value); })
            .attr("fill", function(d) { return color(d.key); })    

    /*DRAW AXIS LABELS*/
    const xAxisLabel = svg.append("text")
        .attr("class","axis--label")
        .attr("x", width/2)
        .attr("y", height+margin.bottom)
        .text("Powder Performance");

    const yAxisLabel = svg.append("text")
        .attr("class","axis--label")
        .attr("transform","rotate(-90)")
        .attr("x",-height/2)
        .attr("y",-margin.left/5)
        .text("Count");   

    /*ADDING A TOOLTIP*/

    const tooltip = d3.select("#barChart")
        .append("div")
        .attr("class", "tooltip")

    points.on("mouseover", function(e,d) {

        // Update style and position of the tooltip div;
        let x = +d3.select(this).attr("x") + 20;
        let y = +d3.select(this).attr("y") - 10;

        tooltip
            .style("visibility", "visible")
            .style("top", `${y}px`)
            .style("left", `${x}px`)
            .style("opacity", 1)
            .html("Count: " + d.value);

        // Optionally, visually highlight the selected circle
        points.attr("opacity", 0.1);
        d3.select(this).attr("opacity", 1).raise();

    }).on("mouseout", function() {

        // Make the tooltip invisible when mouse leaves circle
        bar_tooltip.style("visibility", "hidden");

        // Reset the circles' appearance back to original
        points.attr("opacity", 1);
 
    });

    /* 
    ADDING LEGENDS
    */

    const legendWidth = 300;
    const legendHeight = 400;
    const legendMargin = 25;
    const legendSpacing = 50;

    const colorLegend = d3.select("#barLegend")
        .append("svg")
        .attr("height", legendHeight)
        .attr("width", legendWidth);

    const setbackLegend = ["Centered","Setback-5mm","Setback-10mm","Setback-12.5mm","Setback-15mm","Setback-20mm","Setback-over-20mm"];

    setbackLegend.forEach(function(setbackLegend,i){
        colorLegend.append("circle")
            .attr("cx", legendMargin)
            .attr("cy", legendMargin + i*legendSpacing)
            .attr("r", 10)
            .attr("fill", color(setbackLegend));

        colorLegend.append("text")
            .attr("class", "legend--label")
            .attr("x", legendMargin + 25)
            .attr("y", legendMargin + i*legendSpacing)
            .text(setbackLegend);  
    });  

})