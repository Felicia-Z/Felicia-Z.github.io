/*
1. Pre-process the Data

    Select only a subset of columns
    Rename some columns
    Coerce some values to Number types
    Filter rows only include 
        world average forest area % of land area in year 2020 is 30.7%,
        filter forest area % of land area > 30.7% in year 2020 
*/

function parseCsv(d) {
    if(+d.Y2020 >= 30) {                                                                    
        return {
            countryName: d.Country_Name,
            countryCode: d.Country_Code,
            region: d.Region,
            incomeGroup: d.IncomeGroup,
            forestArea2020: +d.Y2020,                               //converts string to numbers
        }    
    }
}

d3.csv("API_AG.LND.FRST.ZS_DS2_en_csv_v2_4770431.csv", parseCsv).then(function(data) {

    console.log(data);

    /*
    2. DEFINE DIMENSIONS OF SVG + CREATE SVG CANVAS
    */
    // const width = document.querySelector("#chart").clientWidth;
    // const height = document.querySelector("#chart").clientHeight;
    const width = 1000;
    const height = 600;
    const margin = {top: 50, left: 100, right: 150, bottom: 100};

    const svg = d3.select("#chart")
    .append("svg")
    // .attr("width", width)
    // .attr("height", height);
    .attr("viewBox", `0 0 ${width} ${height}`)
    .attr("preserveAspectRatio", "xMidYMid meet"); 

    /*
    3. DETERMINE MIN AND MAX VALUES OF VARIABLES
    */
    const forestAreaPercent = {
        min: d3.min(data,function(d){return d.forestArea2020}),
        max: d3.max(data,function(d){return d.forestArea2020})
    };
    console.log(forestAreaPercent.min);
    console.log(forestAreaPercent.max);

    const incomeGroups = ["Low income","Lower middle income","Upper middle income","High income","General"];

    const regions = ["East Asia & Pacific", "Europe & Central Asia", "Latin America & Caribbean","Middle East & North Africa","North America","South Asia","Sub-Saharan Africa","General"];

    /*
    4. CREATE SCALES
    */
    //scale x axis by income group
    const xScale = d3.scaleBand()
        .domain(["Low income","Lower middle income","Upper middle income","High income","General"])
        .range([margin.left, width-margin.right])
        .padding(1);

    //scale y axis by forest%
    const yScale = d3.scaleLinear()
        .domain([20, forestAreaPercent.max])
        .range([height-margin.bottom, margin.top]);

    //scale the dots by forest%    
    const rScale = d3.scaleSqrt()
        .domain([forestAreaPercent.min, forestAreaPercent.max])
        .range([2, 10]);
    
    //scale fill cole by regions
    const fillScale = d3.scaleOrdinal()
        .domain(regions)
        .range(['#ff998d','#ffb43d','#efff54','#66f036','#36f0d8','#5092ef',,'#f9b1ff']);

    /*
    5. DRAW AXES
    */
    const xAxis = svg.append("g")
        .attr("class","axis")
        .attr("transform", `translate(0,${height-margin.bottom})`)
        .call(d3.axisBottom().scale(xScale));

    const yAxis = svg.append("g")
        .attr("class","axis")
        .attr("transform", `translate(${margin.left},0)`)
        .call(d3.axisLeft().scale(yScale).ticks(5).tickFormat(d3.format("~s")));

    /*
    6. DRAW POINTS
    */
    const points = svg.selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
            .attr("cx", function(d) { return xScale(d.incomeGroup); })
            .attr("cy", function(d) { return yScale(d.forestArea2020); })
            .attr("r", function(d) { return rScale(d.forestArea2020)})
            .attr("fill-opacity", 0.2)
            .attr("stroke", function(d) { return fillScale(d.region); })
            .attr("stroke-width", 1.5)
            .attr("fill", function(d) { return fillScale(d.region); });

    /*
    7. DRAW AXIS LABELS
    */
    const xAxisLabel = svg.append("text")
        .attr("class","axis--label")
        .attr("x", width/2)
        .attr("y", height-margin.bottom/2)
        .text("Income Groups");

    const yAxisLabel = svg.append("text")
        .attr("class","axis--label")
        .attr("transform","rotate(-90)")
        .attr("x",-height/2)
        .attr("y",margin.left/3)
        .text("Forest Area % of Land Area");

    /* 
    8. TOOLTIP 
    */
    const tooltip = d3.select("#chart")
        .append("div")
        .attr("class", "tooltip");

    /* 
    9. CREATING SCALE FACTORS
    */
    let tw = svg.node().clientWidth;
    let th = svg.node().clientHeight;
    let sx = tw / width;
    let sy = th / height;

    points.on("mouseover", function(e,d) {

        let x = sx*(+d3.select(this).attr("cx")) + 20;
        let y = sy*(+d3.select(this).attr("cy")) - 10;

        let displayValue = d3.format(",")(d.forestArea2020);

         tooltip.style("visibility", "visible")
            .style("top", `${y}px`)
            .style("left", `${x}px`)
            .html(`<b>${d.countryName}</b><br>${displayValue} %`);

        points.attr("opacity", 0.1);
        d3.select(this).attr("opacity", 1).raise();

    }).on("mouseout", function() {
        tooltip.style("visibility", "hidden");
        points.attr("opacity", 1);
    });

    /*
    10. Adding Legends
    */

    // const legendWidth = document.querySelector("#legend").clientWidth;
    const legendWidth = 300;
    const legendHeight = 200;
    const legendMargin = 25;
    const legendSpacing = 50;

    const colorLegend = d3.select("#legend")
        .append("svg")
        // .attr("width", legendWidth)
        // .attr("height", 300);
        .attr("viewBox", `0 0 ${legendWidth} ${legendHeight}`)
        .attr("preserveAspectRatio", "xMidYMid meet");

    regions.forEach(function(region, i) {
        
        colorLegend.append("circle")
    //         .attr("cx", legendMargin)
    //         .attr("cy", legendMargin + i*legendSpacing)
    //         .attr("r", 10)
    //         .attr("fill", fillScale(region));

    //     colorLegend.append("text")
    //         .attr("class", "legend--label")
    //         .attr("x", legendMargin + 25)
    //         .attr("y", legendMargin + i*legendSpacing)
    //         .text(region);
    });

    // const sizeLegend = d3.select("#legend")
    //     .append("svg")
    //     // .attr("width", legendWidth)
    //     // .attr("height", 300);
    //     .attr("viewBox", `0 0 ${legendWidth} ${legendHeight}`)
    //     .attr("preserveAspectRatio", "xMidYMid meet");


    // const commentLevels = [comments.min, (comments.max-comments.min)/2, comments.max];

    // commentLevels.forEach(function(commentCount, i) {

    //     let displayCount = d3.format(",")(Math.round(commentCount));

    //     sizeLegend.append("circle")
    //         .attr("cx", legendMargin)
    //         .attr("cy", legendMargin + i*legendSpacing)
    //         .attr("r", rScale(commentCount))
    //         .attr("fill", "#CCCCCC");

    //     sizeLegend.append("text")
    //         .attr("class", "legend--label")
    //         .attr("x", legendMargin + 25)
    //         .attr("y", legendMargin + i*legendSpacing)
    //         .text(`${displayCount} Comments`);
    // });

});