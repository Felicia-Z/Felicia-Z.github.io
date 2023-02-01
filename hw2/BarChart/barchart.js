
d3.csv("gapminder.csv")                                                                 /*load data set*/
    .then(function(data) {               

        /* DEFINE DIMENSIONS OF SVG + CREATE SVG CANVAS*/

        const width = document.querySelector("#chart").clientWidth;
        const height = document.querySelector("#chart").clientHeight;
        const margin = {top: 50, left: 100, right: 50, bottom: 100};

        const svg = d3.select("#chart")
            .append("svg")
            .attr("width", width)
            .attr("height", height);

        /* FILTER THE DATA */
        let filtered_data = data.filter(function(d) {
            return d.country === 'United States';
        });

        /* DETERMINE MIN AND MAX VALUES OF VARIABLES */
        const lifeExp = {
            min: d3.min(filtered_data, function(d) { return +d.lifeExp; }),
            max: d3.max(filtered_data, function(d) { return +d.lifeExp; })
        };

        /*CREATE SCALES */
        const xScale = d3.scaleBand()
            .domain(["1952","1957","1962","1967","1972","1977","1982","1987","1992","1997","2002","2007"])
            .range([margin.left, width-margin.right])
            .padding(0.5);

        const yScale = d3.scaleLinear()
            .domain([50, lifeExp.max])
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
    
        /* DRAW BARS*/
        const points = svg.selectAll("rect")
            .data(filtered_data)                                                                        /* Joins data to the selected elements which is all the rectangles in this case */
            .enter()                                                                                    /* Creates a selection with placeholder references for missing elements */
            .append("rect")                                                                             /* Create rectangles in each place holder */
            .attr("x", function(d) { return xScale(d.year); })
            .attr("y", function(d) { return yScale(d.lifeExp); })
            .attr("width", xScale.bandwidth())
            .attr("height", function(d) { return height - margin.bottom - yScale(d.lifeExp); })
            .attr("fill", "steelblue");
            
        /* DRAW AXIS LABELS*/
        const xAxisLabel = svg.append("text")
            .attr("class","axisLabel")
            .attr("x", width/2)
            .attr("y", height-margin.bottom/2)
            .text("Year");

        const yAxisLabel = svg.append("text")
            .attr("class","axisLabel")
            .attr("transform","rotate(-90)")
            .attr("x",-height/2)
            .attr("y",margin.left/2)
            .text("Life Expectancy (Years)");

    });
