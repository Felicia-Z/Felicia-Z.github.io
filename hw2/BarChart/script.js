/*
QUESTION 1:
                                                           Personal note section:
Examine the d3.csv().then() pattern below                  . chain syntax: d3 use . to chain all the methods together, 
and discuss the following questions:                                       the output of the first method is passes as an input to the next method in the chain
    - What is the "./data/gapminder.csv" inside of         d3.csv().then(): the first method .csv() filters out the csv file we target, 
        inside of the parentheses for d3.csv()                              and provides a reference to the csv file we just loaded to the next method .then()
        referring to?
    
        Answer:

    - What is the parameter named `data` inside of
        the function expression within .then()
        referring to?
    
        Answer:

    - What kind of JS data structure is `data`?
    
        Answer:

    - Where does the entire d3.csv().then() pattern
        open and close in this document?
    
        Answer:

    You may find it useful to examine the contents
    of `data` with console.log(data)

*/
                                                            /* this chained method could also written in a more readable format by writing each method on a new line */
d3.csv("./data/gapminder.csv").then(function(data) {        /* d3.csv("./data/gapminder.csv") */          
                                                            /*   .then(function(data) {....} */
    /*
    DEFINE DIMENSIONS OF SVG + CREATE SVG CANVAS

    QUESTION 2:
        - What is document.querySelector("#chart") doing?
            
        Answer:


        - `clientWidth` and `clientHeight` are properties of
            elements in the DOM (Document Object Model).
            What do these properties measure?
                
        Answer:


    */
    const width = document.querySelector("#chart").clientWidth;
    const height = document.querySelector("#chart").clientHeight;
    const margin = {top: 50, left: 100, right: 50, bottom: 100};

    const svg = d3.select("#chart")
        .append("svg")
        .attr("width", width)
        .attr("height", height);


    /* FILTER THE DATA 
    
    This data set is large and includes data from multiple years.

    Let's filter the data to only select data for the United States,
    and then subsequently use those data to draw the bar chart.

    To filter the data, we can use the .filter() method for arrays.

    QUESTION 3:

    `.filter()` is a JavaScript array method.
    - What does this method do/how does this method work?
        (What do we get back from using this method?)
            
        Answer:

    - Inside the parentheses for .filter(), there is
        a function expression with a parameter
        named `d`. What is `d` a reference to?
            
        Answer:

    - Does that parameter *have to be* named `d`?
        Can it be named something else?
            
        Answer:

    - What is the purpose of the statement inside
        the function expression? What is this doing?

        return d.year === '2007';
            
        Answer:


    - Why are we storing the result of data.filter(...)
        inside a variable (filtered_data)?
            
        Answer:


    */

    let filtered_data = data.filter(function(d) {
        return d.country === 'United States';
    });


    /*
    DETERMINE MIN AND MAX VALUES OF VARIABLES

    In the following section, we'll use the methods d3.min() and d3.max()
    to calculate minimum and maximum values of the variables in our data set.

    Note that to keep things clean, we're organizing the minimum and maximum
    values inside of objects, and storing those min/max values in properties
    named inside those objects. This helps make it easier to refer to these
    values later in our code.


    QUESTION 4:
        - What does d3.min() do? What does d3.max() do?
            What are the 2 arguments we supply to d3.min()/d3.max()?
                
        Answer:

        - In the second argument for both d3.min() and d3.max(),
            the function expression has a parameter named `d`.
            What is `d` a reference to?
                
        Answer:

        - Why is there a plus sign (+) in front of d.lifeExp?
            
        Answer:


    */

    const lifeExp = {
        min: d3.min(filtered_data, function(d) { return +d.lifeExp; }),
        max: d3.max(filtered_data, function(d) { return +d.lifeExp; })
    };




    /*
    CREATE SCALES

    We'll use the computed min and max values to create scales for
    our scatter plot.

    QUESTION 5:
        - What does d3.scaleLinear() do?
    
        Answer:

        - What does d3.scaleBand() do?
            
        Answer:

        - What is the purpose of the .padding() in d3.scaleBand()?
            
        Answer:

        - For each scale below, what does the domain
            represent, and what does the range represent?
                
        Answer:

        - For each scale below, how many values are in
            the domain and range?
    
        Answer:

    */

    const xScale = d3.scaleBand()
        .domain(["1952","1957","1962","1967","1972","1977","1982","1987","1992","1997","2002","2007"])
        .range([margin.left, width-margin.right])
        .padding(0.5);

    const yScale = d3.scaleLinear()
        .domain([50, lifeExp.max])
        .range([height-margin.bottom, margin.top]);


    /*
    DRAW AXES

    QUESTION 6:
    
    The following chunks of code draw 2 axes -- an x- an y-axis.
        - What is the purpose of the "g" element being appended?
            
        Answer:

        - What is the purpose of the "transform" attribute being defined?
            
        Answer:

        - What do the d3.axisBottom() and d3.axisLeft() methods do?
            
        Answer:

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
    DRAW BARS

    In this bar chart, each bar will represent a single year for the United States;
    the horizontal position of the bar will represent the year of data,
    vand the height of the bar will represent the life expectancy for that year.

    QUESTION 7:

    The following chunk of code is the standard D3 data join pattern.
        - What is the purpose of the pattern svg.selectAll().data().enter().append()?
            
        Answer:

        - Each attribute defined below is defined using things called
            "accessor functions." In each accessor function, what is
            the parameter named `d` a reference to?
                
        Answer:

        - Inside each accessor function, what is the purpose of
            each "return ___;" statement?
                
        Answer:

        - What does xScale.bandwidth() compute? How is that value being used here?
            
        Answer:

        - What is going on with the calculation for the "height" attribute?
            Explain how the expression inside the accessor function for this
            attribute works.
    
        Answer:

    */
    const points = svg.selectAll("rect")
        .data(filtered_data)
        .enter()
        .append("rect")
            .attr("x", function(d) { return xScale(d.year); })
            .attr("y", function(d) { return yScale(d.lifeExp); })
            .attr("width", xScale.bandwidth())
            .attr("height", function(d) { return height - margin.bottom - yScale(d.lifeExp); })
            .attr("fill", "steelblue");
    
    /*
    DRAW AXIS LABELS

    QUESTION 8:

    The chunks of code below draw text labels for the axes.

    Examine the yAxisLabel. What is going on with the 
    "transform", "x", and "y" attributes, in terms of
    how their values are computed to control the rotated
    placement of the label?

    */
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
