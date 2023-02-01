d3.csv("USPopulation-Dataset-ARTG5430.csv")
    .then(function(data) { 

        /* DEFINE DIMENSIONS OF SVG + CREATE SVG CANVAS*/

        const width = document.querySelector("#chart").clientWidth;
        const height = document.querySelector("#chart").clientHeight;
        const margin = {top: 50, left: 100, right: 50, bottom: 100};

        const svg = d3.select("#chart")
            .append("svg")
            .attr("width", width)
            .attr("height", height);

        /* DETERMINE MIN AND MAX VALUES OF VARIABLES */
        const malePop1900 = {
            min: d3.min(d.Male1900),
            max: d3.max(d.Male1900)
        };

        const malePop2000 = {
            min: d3.min(d.Male2000),
            max: d3.max(d.Male2000)
        };

        /*CREATE SCALES */
        const xScale = d3.scaleBand()
            .domain(["0","5","10","15","20","25","30","30","35","40","45","50","55","60","65","70","75","80","85","90"])
            .range([margin.left, width-margin.right])
            .padding(0.5);

        const yScale = d3.scaleLinear()
            .domain([0, malePop2000.max])
            .range([height-margin.bottom, margin.top]);
       
        /* DRAW AXES*/
        const xAxis = svg.append("g")
            .attr("class","axis")
            .attr("transform", `translate(0,${height-margin.bottom})`)
            .call(d3.axisBottom().scale(xScale));

        const yAxis = svg.append("g")
            .attr("class","axis")
            .attr("transform", `translate(${margin.left},0)`)
            .call(d3.axisLeft().scale(yScale));

    });
    