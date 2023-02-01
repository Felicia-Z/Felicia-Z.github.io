/*
QUESTION 1:
                                                           Personal note section:
Examine the d3.csv().then() pattern below                  . chain syntax: d3 use . to chain all the methods together, 
and discuss the following questions:                                       the output of the first method is passes as an input to the next method in the chain
    - What is the "./data/gapminder.csv" inside of         d3.csv().then(): the first method .csv() filters out the csv file we target, 
        inside of the parentheses for d3.csv()                              and provides a reference to the csv file we just loaded to the next method .then()
        referring to?
    
        Answer: load gapminder.csv under data folder and executes callback function with parsed csv data objects.

    - What is the parameter named `data` inside of
        the function expression within .then()
        referring to?
    
        Answer: the data elements that is bounded to the csv we just selected

    - What kind of JS data structure is `data`?
    
        Answer: array list

    - Where does the entire d3.csv().then() pattern
        open and close in this document?
    
        Answer: line 32 and line 306

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
            
        Answer: The Document method querySelector() returns the first Element within the document that matches the specified selector, or group of selectors. If no matches are found, null is returned.
                Parameter: #chart, select the element with id = "chart"


        - `clientWidth` and `clientHeight` are properties of
            elements in the DOM (Document Object Model).
            What do these properties measure?
                
        Answer: The Element.clientWidth property is zero for inline elements and elements with no CSS; 
                otherwise, it's the inner width of an element in pixels. 
                It includes padding but excludes borders, margins, and vertical scrollbars (if present).
                The Element.clientHeight read-only property is zero for elements with no CSS or inline layout boxes; 
                otherwise, it's the inner height of an element in pixels. 
                It includes padding but excludes borders, margins, and horizontal scrollbars (if present).

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
            
        Answer: The filter() method creates a shallow copy of a portion of a given array, 
                filtered down to just the elements from the given array that pass the test implemented by the provided function.
                If no elements pass the test, an empty array will be returned.
                In this case, filters country name equal to United States.

    - Inside the parentheses for .filter(), there is
        a function expression with a parameter
        named `d`. What is `d` a reference to?
            
        Answer: d refers to current data element, in this case, go through all the country data

    - Does that parameter *have to be* named `d`?
        Can it be named something else?
            
        Answer: No, it doesn't.
                Yes, it can. 
                d is a anonymous function call, 
                it could be replaced with more standard function definitionsand specified the name of the function to be called in the d3 call.

    - What is the purpose of the statement inside
        the function expression? What is this doing?

        return d.year === '2007';
            
        Answer: data() function requires an array or a function;
                Comparison operators are used in logical statements to determine equality or difference between variables or values.
                === equal value and type
                it is comparing all the data in country column and find out which one is equal to United States


    - Why are we storing the result of data.filter(...)
        inside a variable (filtered_data)?
            
        Answer: Because a variable is a data storage location that has a value that can change during program execution.
                A constant has a fixed value that can't change.

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
                
        Answer: d3.min(): returns the minimum value from the given iterable of values.
                d3.max(): returns the maximum value
                2 arguments: filtered_data, function(d) { return +d.lifeExp; }: find minumum and maximum of lifeExp in the filtered_data

        - In the second argument for both d3.min() and d3.max(),
            the function expression has a parameter named `d`.
            What is `d` a reference to?
                
        Answer: data element bounded in filtered_data

        - Why is there a plus sign (+) in front of d.lifeExp?
            
        Answer: The + operator returns the numeric representation of the object.


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
    
        Answer: Construct continuous linear scale where input data (domain) maps to specified output range.
                
        - What does d3.scaleBand() do?
            
        Answer: Band scales are like ordinal scales except the output range is continuous and numeric.

        - What is the purpose of the .padding() in d3.scaleBand()?
            
        Answer: The padding function allows you to set padding between the bands, and above and below. 
                band.padding: setting the inner and outer padding to the same padding vale.

        - For each scale below, what does the domain
            represent, and what does the range represent?
                
        Answer: Domain denotes minimum and maximum values of your input data.
                Range is the output range that you would like your input values to map to

        - For each scale below, how many values are in
            the domain and range?
    
        Answer: domain: xScale : 12 ; yScale : [50,78.242]
                Range: xScale : [margin.left, width-margin.right] ; yScale : [height-margin.bottom, margin.top]

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
            
        Answer: Group element holds the corresponding bar and axis together.

        - What is the purpose of the "transform" attribute being defined?
            
        Answer: To modify xAxis and yAxis to desired location in svg

        - What do the d3.axisBottom() and d3.axisLeft() methods do?
            
        Answer: d3.axisBottom() : Creates bottom horizontal axis.
                d3.axisLeft() : Creates left vertical axis.

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
            
        Answer: svg.selectAll().data().enter().append()
                svg.selectAll() : returns all the matching elements in svg based on specified selector in () which is rectangle in this case 
                .data() : Joins data to the selected elements 
                .enter() : Creates a selection with placeholder references for missing elements
                .append() : Adds an element inside the selected element but just before the end of the selected element

        - Each attribute defined below is defined using things called
            "accessor functions." In each accessor function, what is
            the parameter named `d` a reference to?
                
        Answer: for each rectangle element, 
                set "x" to be the result of calling xScale on the data element d.year;
                set "y" to be the result of calling yScale on the data element d.lifeExp;
                set "width" to be the result of calling xScale on the data element bandwidth;
                set "height" to be the result of (height - margin.bottom - calling yScale on the data element d.lifeExp));
                set "fill" to be steelblue.

        - Inside each accessor function, what is the purpose of
            each "return ___;" statement?
                
        Answer: use the data already bounded to it

        - What does xScale.bandwidth() compute? How is that value being used here?
            
        Answer: The width of the bars.

        - What is going on with the calculation for the "height" attribute?
            Explain how the expression inside the accessor function for this
            attribute works.
    
        Answer: the height of the SVG minus the bottom margin minus the corresponding y-value of the bar from the y-scale. 

    */
    const points = svg.selectAll("rect")
        .data(filtered_data)                                                                        /* Joins data to the selected elements which is all the rectangles in this case */
        .enter()                                                                                    /* Creates a selection with placeholder references for missing elements */
        .append("rect")                                                                             /* Create rectangles in each place holder */
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

    Answer: add text into svg, set attribute class: axisLabel to the text, rotate it -90 degree, 
            x coordinate = -height/2, y coordinate = margin.left/2, add text "Life Expectancy (Years)"

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
