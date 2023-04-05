d3.csv("sb_stance_count.csv").then(function(data) {
    console.log(data);
    console.log(data.keys);

    // set the dimensions and margins of the graph
    var margin = {top: 10, right: 30, bottom: 20, left: 50},
        width = 787 - margin.left - margin.right,
        height = 443 - margin.top - margin.bottom;

    // const width = document.querySelector("#barChart").clientWidth;
    // const height = document.querySelector("#barChart").clientHeight;
    // const margin = {top: 50, left: 150, right: 150, bottom: 100};
    

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
            .attr("fill", function(d) { return color(d.key); });

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

    var tooltip = d3.select("#barChart")
        .append("div")
        .style("opacity", 0)
        .attr("class", "tooltip")
        .style("background-color", "white")
        .style("border", "solid")
        .style("border-width", "1px")
        .style("border-radius", "5px")
        .style("padding", "10px")

    // Three function that change the tooltip when user hover / move / leave a cell
    var mouseover = function(d) {
        var subgroupName = d3.select(this.parentNode).datum().key;
        var subgroupValue = d.data[subgroupName];
        tooltip
            .html("subgroup: " + subgroupName + "<br>" + "Value: " + subgroupValue)
            .style("opacity", 1)
    }
    var mousemove = function(d) {
        tooltip
        .style("left", (d3.mouse(this)[0]+90) + "px") // It is important to put the +90: other wise the tooltip is exactly where the point is an it creates a weird effect
        .style("top", (d3.mouse(this)[1]) + "px")
    }
    var mouseleave = function(d) {
        tooltip
        .style("opacity", 0)
    }


    /*ADDING A TOOLTIP*/

    // const tooltip = d3.select("#barChart")
    //     .append("div")
    //     .attr("class", "tooltip");

    // points.on("mouseover", function(e,d) {

    //     // Update style and position of the tooltip div;
    //     // what are the `+` symbols doing?
    //     let x = +d3.select(this).attr("cx") + 20;
    //     let y = +d3.select(this).attr("cy") - 10;

    //     // Format the display of the numbers,
    //     // using d3.format()
    //     // See: https://github.com/d3/d3-format/blob/v3.1.0/README.md#format
    //     let displayValue = d3.format(",")(d.value);
        
    //     tooltip.style("visibility", "visible")
    //         .style("top", `${y}px`)
    //         .style("left", `${x}px`)
    //         .html(`<b>${d.group}</b><br>${d.value}`);

    //     // Optionally, visually highlight the selected circle
    //     points.attr("opacity", 0.1);
    //     d3.select(this).attr("opacity", 1).raise();

    // }).on("mouseout", function() {

    //     // Make the tooltip invisible when mouse leaves circle
    //     tooltip.style("visibility", "hidden");

    //     // Reset the circles' appearance back to original
    //     points.attr("opacity", 1);

    // });



})