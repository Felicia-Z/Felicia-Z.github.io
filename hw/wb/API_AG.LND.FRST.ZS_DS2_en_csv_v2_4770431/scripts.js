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
    DEFINE DIMENSIONS OF SVG + CREATE SVG CANVAS
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


    const regions = ["East Asia & Pacific", "Europe & Central Asia", "Latin America & Caribbean","Middle East & North Africa","North America","South Asia","Sub-Saharan Africa"];


    /*

    Adding Legends

    */

    // const legendWidth = 300;
    // const legendHeight = 200;
    // const legendMargin = 25;
    // const legendSpacing = 50;

    // const colorLegend = d3.select("#legend")
    //     .append("svg")
    //     // .attr("width", legendWidth)
    //     // .attr("height", 300);
    //     .attr("viewBox", `0 0 ${legendWidth} ${legendHeight}`)
    //     .attr("preserveAspectRatio", "xMidYMid meet");

    // regions.forEach(function(region, i) {

    //     colorLegend.append("circle")
    //         .attr("cx", legendMargin)
    //         .attr("cy", legendMargin + i*legendSpacing)
    //         .attr("r", 10)
    //         .attr("fill", fillScale(region));

    //     colorLegend.append("text")
    //         .attr("class", "legend--label")
    //         .attr("x", legendMargin + 25)
    //         .attr("y", legendMargin + i*legendSpacing)
    //         .text(region);
    // });

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