function parseCsv(d) {
    if(+d.Price_USD >= 100) {
        return {
            brand: d.Brand,
            model: d.Model,
            riding_style: d.Riding_Style,
            shape: d.Shape,
            profile: d.Camber_Profile, 
            stance: d.Stance, 
            flex: d.Flex,
            price: +d.Price_USD,
            powder_performance: d.Powder
        }    
    }
}

d3.csv("Snowboard2.csv", parseCsv).then(function(data) {

    console.log(data);

    /*
    DEFINE DIMENSIONS OF SVG + CREATE SVG CANVAS
    */
    const width = document.querySelector("#chart").clientWidth;
    const height = document.querySelector("#chart").clientHeight;
    const margin = {top: 100, left: 150, right: 150, bottom: 20};

    const svg = d3.select("#chart")
        .append("svg")
        .attr("viewBox", `0 0 ${width} ${height}`)             //${} template literal, to inset the computed width and height variables above 
        .attr("preserveAspectRatio", "xMidYMid meet");         //The value xMidYMid meet means “scale the SVG uniformly in the x- and ydirection as the viewport changes size”
        // .attr("width", width)
        // .attr("height", height);

    /*  
    DETERMINE MIN AND MAX VALUES OF VARIABLES
    */

    const price = {
        min: d3.min(data, function(d) { return d.price; }),
        max: d3.max(data, function(d) { return d.price; })
    };

    console.log(price);

    /* 
    SIDE NOTE: Unique values for a categorical variable
    */

    const profiles = ["Continuous Rocker","Directional Camber","Flat to Rocker","Hybrid Camber","Hybrid Rocker","Mostly Camber", "Traditional Camber"];

    //const performance = ["Excellent","Great","Good","Average","Poor"]

    /*
    CREATE SCALES
    */

    const xScale = d3.scaleLinear()
        .domain([price.min, price.max])
        .range([margin.left, width-margin.right]);

    const yScale = d3.scaleBand()
        .domain(["Alloy","Arbor","Bataleon","Borealish","Burton","Capita","Cardiff","DC","Decathlon","Dinosaurs","Elevated","Endeavor","Gentemstick","Gilson","Gnu","Jones","K2","Korua","Lib Tech","Loaded","Lobster","Moss","Never Summer","Niche","Nidecker","Nitro","Osin","Prior","Ride","Rome","Rossignol","Salomon","Season","Sims","Slash","SnoPlanks","Soul","Stone","Tahoe","Telos","Weston","Yes"])
        .range([margin.left, width-margin.right])
        .padding(0.5); 


    // const rScale = d3.scaleBand()
    //     .dmain("Poor","Average","Good","Great","Excellent")
    //     .range([1,5]);

    const fillScale = d3.scaleOrdinal()
        .domain(profiles)
        .range(['#ff998d','#ffb43d','#efff54','#66f036','#36f0d8','#5092ef','#a770f6']);

    /*
    DRAW AXES
    */
    const xAxis = svg.append("g")
        .attr("class","axis")
        .attr("transform", `translate(0,${height-margin.bottom})`)
        .call(d3.axisBottom().scale(xScale));

    const yAxis = svg.append("g")
        .attr("class","axis")
        .attr("transform", `translate(${margin.left},0)`)
        .call(d3.axisLeft().scale(yScale));


    /*
    DRAW POINTS
    */
    const points = svg.selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
            .attr("cx", function(d) { return xScale(d.price); })
            .attr("cy", function(d) { return yScale(d.brand); })
            .attr("r", 5)
            //.attr("r", function(d) { return rScale(d.powder_performance)})
            .attr("fill-opacity", 0.2)
            .attr("stroke", function(d) { return fillScale(d.profile); })
            .attr("stroke-width", 1.5)
            .attr("fill", function(d) { return fillScale(d.profile); });


    /*
    DRAW AXIS LABELS
    */
    const xAxisLabel = svg.append("text")
        .attr("class","axis--label")
        .attr("x", width/2)
        .attr("y", height-margin.bottom/2)
        .text("Price");

    const yAxisLabel = svg.append("text")
        .attr("class","axis--label")
        .attr("transform","rotate(-90)")
        .attr("x",-height/2)
        .attr("y",margin.left/3)
        .text("Brand");


    /* 
    ADDING A TOOLTIP
    */

    const tooltip = d3.select("#chart")
        .append("div")
        .attr("class", "tooltip");

    points.on("mouseover", function(e,d) {

        // Update style and position of the tooltip div;
        // what are the `+` symbols doing?
        let x = +d3.select(this).attr("cx") + 20;
        let y = +d3.select(this).attr("cy") - 10;

        // Format the display of the numbers,
        // using d3.format()
        // See: https://github.com/d3/d3-format/blob/v3.1.0/README.md#format
        let displayValue = d3.format(",")(d.price);
        
        tooltip.style("visibility", "visible")
            .style("top", `${y}px`)
            .style("left", `${x}px`)
            .html(`<b>${d.brand}</b><br>${d.model}<br>${d.riding_style}<br>${d.flex}<br>${d.stance}<br>USD${displayValue}`);

        // Optionally, visually highlight the selected circle
        points.attr("opacity", 0.1);
        d3.select(this).attr("opacity", 1).raise();

    }).on("mouseout", function() {

        // Make the tooltip invisible when mouse leaves circle
        tooltip.style("visibility", "hidden");

        // Reset the circles' appearance back to original
        points.attr("opacity", 1);

    });


    /* 
    ADD LEGENDS
    */
    // const legendWidth = document.querySelector("#legend").clientWidth;
    const legendWidth = 300;
    const legendHeight = 400;
    const legendMargin = 25;
    const legendSpacing = 50;

    const colorLegend = d3.select("#legend")
        .append("svg")
        .attr("viewBox", `0 0 ${legendWidth} ${legendHeight}`)
        .attr("preserveAspectRatio", "xMidYMid meet");
        // .attr("height", legendHeight)
        // .attr("width", legendWidth);

    profiles.forEach(function(profiles,i){
        colorLegend.append("circle")
            .attr("cx", legendMargin)
            .attr("cy", legendMargin + i*legendSpacing)
            // .attr("cx", -10+legendMargin + i*legendSpacing)
            // .attr("cy", legendMargin)
            .attr("r", 10)
            .attr("fill", fillScale(profiles));

        colorLegend.append("text")
            .attr("class", "legend--label")
            .attr("x", legendMargin + 25)
            .attr("y", legendMargin + i*legendSpacing)
            // .attr("x", -20+legendMargin + i*legendSpacing)
            // .attr("y", legendMargin + 25)
            .text(profiles);
    });
  
    d3.select(window).on("resize", function(e) {

        let tw = svg.node().clientWidth;
        let th = svg.node().clientHeight;
        sx = tw / width;
        sy = th / height;
    });

    /* 
    FILTER BY CHECKBOX  
    */

    d3.selectAll(".powder--performance").on("click", function() {

        let isChecked = d3.select("#filters").property("checked");
        let thisPerformance = d3.select("#filters").property("value");
        // let isChecked = d3.select(this).property("checked");
        // let thisPerformance = d3.select(this).property("value");

        let selection = points.filter(function(d) {
            return d.powder_performance === thisPerformance;
        });

        if (isChecked == true) {

            selection.attr("opacity", 1)
            .attr("pointer-events", "all");

        } else {

            selection.attr("opacity", 0)
            .attr("pointer-events", "none");

        }

    });

    /*
    D3 Zoom and Pan
     */

    function zoomed(e) {
        svg.attr("transform", e.transform);

        svg.selectAll("circle")
            .attr("r", function(d){
                return circleRadius/e.transform.k;
            });```````````` 
    };

    let zoom = d3.zoom()
        .translateExtent([[0, 0], [width, height]])
        .scaleExtent([1, 15])
        .on("zoom", zoomed);

    svg.call(zoom);


});
