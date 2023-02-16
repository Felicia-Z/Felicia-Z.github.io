d3.csv("new.csv").then(function(data) {

    /*DEFINE DIMENSIONS OF SVG + CREATE SVG CANVAS*/
    const width = document.querySelector("#chart").clientWidth;
    const height = document.querySelector("#chart").clientHeight;
    const margin = {top: 50, left: 100, right: 50, bottom: 100};

    const svg = d3.select("#chart")
        .append("svg")
        .attr("width", width)
        .attr("height", height);

    /* FILTER THE DATA */

    let filtered_data_sex_1900 = data.filter(function(d) {
        return d.Sex === '1' && d.Year === '1900';
    });

    console.log(filtered_data_sex_1900);
    
    let filtered_data_sex_2000 = data.filter(function(d) {
        return d.Sex === '1' && d.Year === '2000';  
    });

    /*DETERMINE MIN AND MAX VALUES OF VARIABLES*/
    const pop1900 = {
        min: d3.min(filtered_data_sex_1900, function(d) { return +d.People; }),
        max: d3.max(filtered_data_sex_1900, function(d) { return +d.People; }),
    };
    //console.log(pop1900);
    
    const pop2000 = {
        min: d3.min(filtered_data_sex_2000, function(d) { return +d.People; }),
        max: d3.max(filtered_data_sex_2000, function(d) { return +d.People; })
    };
    //console.log(pop2000)

    /*CREATE SCALES*/
    const xScale = d3.scaleBand()
        .domain(["0","5","10","15","20","25","30","30","35","40","45","50","55","60","65","70","75","80","85","90"])
        .range([margin.left, width-margin.right])
        .padding(0.5);

    const yScale = d3.scaleLinear()
        .domain([pop1900.min, pop1900.max])
        .range([height-margin.bottom, margin.top]);

    //console.log(yScale(filtered_data_sex_1900));  

    /*DRAW AXES*/
    const xAxis = svg.append("g")
        .attr("class","axis")
        .attr("transform", `translate(0,${height-margin.bottom})`)
        .call(d3.axisBottom().scale(xScale));

    const yAxis = svg.append("g")
        .attr("class","axis")
        .attr("transform", `translate(${margin.left},0)`)
        .call(d3.axisLeft().scale(yScale));

    /* DRAW BARS*/
    const points1900 = svg.selectAll("rect")
        .data(filtered_data_sex_1900)                                                                        /* Joins data to the selected elements which is all the rectangles in this case */
        .enter()                                                                                    /* Creates a selection with placeholder references for missing elements */
        .append("rect")                                                                             /* Create rectangles in each place holder */
        .attr("x", function(d) { return xScale(+.Year); })
        .attr("y", function(d) { return yScale(+d.People) }); })
        .attr("width", xScale.bandwidth())
        .attr("height", function(d) { return height - margin.bottom - yScale(+d.People); })
        .attr("fill", "orange");

    const points2000 = svg.selectAll("rect")
        .data(filtered_data_sex_2000)                                                                        /* Joins data to the selected elements which is all the rectangles in this case */
        .enter()                                                                                    /* Creates a selection with placeholder references for missing elements */
        .append("rect")                                                                             /* Create rectangles in each place holder */
        .attr("x", function(d) { return xScale(+d.Year); })
        .attr("y", function(d) { return yScale(+d.People); })
        .attr("width", xScale.bandwidth())
        .attr("height", function(d) { return height - margin.bottom - yScale(+d.People); })
        .attr("fill", "steelblue");
    
    /*DRAW AXIS LABELS*/
    const xAxisLabel = svg.append("text")
        .attr("class","axisLabel")
        .attr("x", width/2)
        .attr("y", height-margin.bottom/2)
        .text("Age Group");

    const yAxisLabel = svg.append("text")
        .attr("class","axisLabel")
        .attr("transform","rotate(-90)")
        .attr("x",-height/2)
        .attr("y",margin.left/2)
        .text("Population");


});





























