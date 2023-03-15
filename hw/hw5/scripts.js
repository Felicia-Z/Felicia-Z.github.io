function parseCsv(d) {
    if(+d.Price_USD >= 100) {
        return {
            brand: d.Brand,
            model: d.Model,
            riding_style: d.Riding_Style,
            shape: d.Shape,
            profile: +d.Camber_Profile, 
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
    const margin = {top: 50, left: 200, right: 150, bottom: 100};

    const svg = d3.select("#chart")
        .append("svg")
        .attr("width", width)
        .attr("height", height);

    /*  
    DETERMINE MIN AND MAX VALUES OF VARIABLES
    */

    const price = {
        min: d3.min(data, function(d) { return d.price; }),
        max: d3.max(data, function(d) { return d.price; })
    };

    console.log(price);

    // const brand = {
    //     data,function(d){return d.brand;}
    // };
    // console.log(brand);

    // const comments = {
    //     min: d3.min(data, function(d) { return d.comments; }),
    //     max: d3.max(data, function(d) { return d.comments; })
    // };

    // const views = {
    //     min: d3.min(data, function(d) { return d.views; }),
    //     max: d3.max(data, function(d) { return d.views; })
    // };

    /* 
    SIDE NOTE: Unique values for a categorical variable
    */

    const profiles = ["Continuous Rocker","Directional Camber","Flat to Rocker","Hybrid Camber","Hybrid Rocker","Mostly Camber", "Traditional Camber"];

    /*
    CREATE SCALES
    */

    const xScale = d3.scaleLinear()
        .domain([price.min, price.max])
        .range([margin.left, width-margin.right]);

    const yScale = d3.scaleBand()
        .domain(["Alloy","Arbor","Bataleon","Borealish","Burton","Capita","Cardiff","DC","Decathlon","Elevated","Endeavor","Gentemstick","Gilson","Gnu","Jones","K2","Korua","Lib Tech","Loaded","Moss","Never Summer","Niche","Nidecker","Nitro","Osin","Prior","Ride","Rome","Rossignol","Salomon","Season","Sims","Slash","SnoPlanks","Soul","Stone","Tahoe","Telos","Weston","Yes"])
        .range([margin.left, width-margin.right])
        .padding(0.5); 

    // const yScale = d3.scaleLinear()
    //     .domain([views.min, views.max])
    //     .range([height-margin.bottom, margin.top]);

    // const rScale = d3.scaleSqrt()
    //     .domain([comments.min, comments.max])
    //     .range([2, 10]);

    const fillScale = d3.scaleOrdinal()
        .domain(profiles)
        .range(['#ff998d','#ffb43d','#efff54','#66f036','#36f0d8','#5092ef','#a770f6','#f9b1ff']);

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
            .attr("cy", function(d) { return yScale(d.profiles); })
            .attr("r", 10)
            // .attr("r", function(d) { return rScale(d.comments)})
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
            .html(`<b>${d.model}</b><br>${d.riding_style}<br>${d.flex}<br>${d.stance}<br> USD ${displayValue}`);

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
    FILTER BY CHECKBOX  
    */

    d3.selectAll(".powder--performance").on("click", function() {

        /* 
        */
       
        let isChecked = d3.select(this).property("checked");
        let thisProfile = d3.select(this).property("value");

        /*
        */

        let selection = points.filter(function(d) {
            return d.profile === thisProfile;
        });

        /*
        */

        if (isChecked == true) {

            selection.attr("opacity", 1)
            .attr("pointer-events", "all");

        } else {

            selection.attr("opacity", 0)
            .attr("pointer-events", "none");

        }

        /*
        */

    });



});
