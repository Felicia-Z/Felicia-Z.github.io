/* 
PRE-PROCESSING THE DATA

In many demonstrations, we've found ourselves grappling with
one of the idiosyncracies of d3.csv(): that all values loaded
from a CSV file are interpreted as String values.

This causes problems for us when values should be Number types,
because weird things can happen when interacting with numeric values
that are encoded as Strings (e.g., incorrect minimum and maximum
values returned with d3.min() or d3.max()).

One solution to this problem is to coerce these numeric values
back into Number types in isolated places, where the type of the 
values matters for the calculation being performed.

However, a more streamlined solution to this is to preprocess the 
Data directly with d3.csv(), or with any other data loading method
for other file types that d3 provides (e.g., txt, json, xml).

See file types: https://github.com/d3/d3/blob/main/API.md#fetches-d3-fetch


In general, we can preprocess the data directly with d3.csv(), so that
before the data are loaded, we can do the following kinds of things:

    - Rename columns to more user-friendly names
    - Select only a slice of columns to include
    - Coerce values to different types
    - Calculate new values and columns

As we saw in class, to do this preprocessing we supply a function expression 
as the second argument to d3.csv(), e.g.,

    d3.csv("./path/to/data.csv", function() { ... }).then( ... )

This function expression is called a parse function and is meant to directly act
and alter the provided data set. The best way to handle this is by writing your
own parse function, e.g., parseCsv.

    d3.csv("./path/to/data.csv", parseCsv).then( ... )

Note, this function is called for each original ROW in the csv file. Thus, after it acts
on all rows, it returns a modified version of the original data set.  

*/

/*

TASK 1

Write a function for preprocessing the dataset (see on Canvas):

	YoutubeTrendingVideos-ARTG5430.csv

Your function should do the following:
    - Select only a subset of columns to include
        in the data loading (e.g., you should remove 1 or 2 columns)
    - Rename some of the columns
    - Cast some of the values to Number types when appropriate
    - Filter the rows to only include videos
        where the number of likes is at least 1,000,000 likes

Notice the parameter named `d` in the named function. This `d` refers 
to each original row of data from the CSV file, represented as 
an object -- in other words, this `d` is effectively the exact same 
`d` that we've seen elsewhere in our code, e.g., in accessor functions
for defining attributes of shapes in the data join pattern.

With this `d`, we can access the original values of columns
in the CSV file by their original name, and use them to
construct a NEW object that will represent each individual row.

*/


function parseCsv(d) {
   // Your Code here
    if(d.likes>1000000){                                    //filter rows to only the number of likes is at least 1,000,000 likes
        return{
            video_id: d.video_id,
            title: d.title,
            trending_date: d.trending_date,
            //channelTitle: d.channelTitle,                 //comment out or remove this line to remove the channelTitle column
            category: d.category,
            views: +d.view_count,                           //change column name from view_count to views, converts string to numbers 
            comments: +d.comment_count,                     //change column name from comment_count to comments, converts string to numbers
            likes: +d.likes,                                //converts string to numbers
            dislikes: +d.dislikes,                          //converts string to numbers
        }
  	
    }

}

d3.csv('data/2021-youtube-trending-videos_entertainment-gaming-music.csv', parseCsv).then(function(data) {

    console.log(data);

    //console.log(data.likes);                              // why not working?
    

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

    In this section, we are computing minimum and maximum values
    of variables in the data so that we can use these values to
    construct scales. 

    Notice 2 things:
        - The properties `d.comments` and `d.views` represent
            the new names of the columns that were originally named
            `comment_count` and `view_count`
        - None of the instances of d3.min() or d3.max() use a 
            plus sign (+) to coerce these values to Number types

    These 2 things are the result of our data preprocessing
    earlier in the code!

    */

    const likes = {
        min: d3.min(data, function(d) { return d.likes; }),
        max: d3.max(data, function(d) { return d.likes; })
    };

    // console.log(likes);

    const comments = {
        min: d3.min(data, function(d) { return d.comments; }),
        max: d3.max(data, function(d) { return d.comments; })
    };

    // console.log(comments);

    const views = {
        min: d3.min(data, function(d) { return d.views; }),
        max: d3.max(data, function(d) { return d.views; })
    };

    // console.log(views);

    /* 

    GETTING UNIQUE VALUES FOR A CATEGORICAL VARIABLE: MANUAL WAY

    In many visualization situations, we need to know
    what the unique values of a categorical variable are --
    e.g., for defining the domain of d3.scaleOrdinal(), or
    For drawing legends.

    In this demonstration, we'll use the color of each circle
    to encode the `category` of each variable. Thus, for
    later parts in our code, we will need an array of the
    unique values of `category`, i.e., 

        "Entertainment", "Music", "Gaming"

    This is stored in an array below.

    */

    const categories = ["Gaming", "Entertainment", "Music"];
    
    //console.log(categories);

    /*

    GETTING UNIQUE VALUES FOR A CATEGORICAL VARIABLE: AUTOMATED WAY
    
    Recall the JS ARRAY.map() method: it creates a new array from
    calling a function for every element in a given array. The function
    is called once for each element.

    See: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map 

    So, one approach would be to do this:

        const allCategories = data.map(function(d) {
            return d.category;
        });


    QUESTION 1: What does the variable allCategories store after the above
    	 	computation? Why is it not the result we want?

    ANSWER 1:

    */

    // const allCategories = data.map(function(d) {
    //     return d.category;
    // });
   
    // console.log(allCategories);
    

    // The variable allCategories store after the above computation are each element in the category. "Gaming", "Entertainment", "Music" are repeated multiple times and match the sequence of each row. 
    // Because map() call the function for each element in an array. It keeps iterating through each element. That's why we are getting duplicated elements.

    /*

    TASK 2

    Use the data structure SETS and the SPREAD OPERATOR your learned in class
    to retrieve the unique categories from the dataset. In particular, store
    the array containing the unique categories in a constant variable:
   
    */

    // Your Code here
    // Set is a collection of unique balue
    // convert the list to set can remove duplicates
    // then convert the set back to a list
    // ... spread operator allows us to quickly copy all or part of an existing array or object into another array or object

    // const uniqueCategories = [...new Set(allCategories)]        
   
    // console.log(uniqueCategories);

    //console.log(uniqueCategory);          

    /*
    CREATE SCALES

    In the following scale functions, the minimum and
    maximum values of variables named `likes`, `views`,
    and `comments` are used to define the domains.

    The array named `categories` is used to define
    the domain of the d3.scaleOrdinal() function.

    QUESTION 2: Notice below the variables `likes`, `views`, and `comments`.
                What do these variables represent? What values do they store?

    ANSWER 2: likes: represent the constant variable we created in line 136, 
                     it stores the minimum and maximum number of likes from the csv after filtered elements with likes greater than 1,000,000, 
                     the value it stores is min likes : 1,003,441, max likes : 16,021,534
              views: represent the constant variable we created in line 136, 
                     it stores the minimum and maximum number of likes from the csv after filtered elements with likes greater than 1,000,000, 
                     the value it stores is min views : 1,134, max views : 6,738,537
              comments: represent the constant variable we created in line 150, 
                     it stores the minimum and maximum number of comments from the csv after filtered elements with likes greater than 1,000,000, 
                     the value it stores is min comments : 4,754,154, max comments : 264,407,389

    QUESTION 3: Notice the variable `fillScale`. What does it store? In which
		cases in this demonstration is this variable being used?

    ANSWER 3: 'fillScale' store the RBG color, it is assigning color to categories respectively, 
              "Gaming" - '#1b9e77' - a greenish color, "Entertainment" - '#d95f02' - a orangeish color, "Music" - '#7570b3' - a blueish color

    */

    const xScale = d3.scaleLinear()
        .domain([likes.min, likes.max])
        .range([margin.left, width-margin.right]);

    const yScale = d3.scaleLinear()
        .domain([views.min, views.max])
        .range([height-margin.bottom, margin.top]);

    const rScale = d3.scaleSqrt()
        .domain([comments.min, comments.max])
        .range([2, 10]);

    const fillScale = d3.scaleOrdinal()
        .domain(categories)
        .range(['#1b9e77','#d95f02','#7570b3']);


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

    QUESTION 4:

    In this scatter plot, the data points are visualized as circles
    and they represent YouTube videos.  
    
    - What is the parameter `d` referring to?
    - What is the purpose of `return fillScale(d.category)`?

    ANSWER 4: d is refering to each row in our filtered 'data' array, d3.csv(), in line 96
              to apply the function we defined in line 279 to stroke

    */

    const points = svg.selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
            .attr("cx", function(d) { return xScale(d.likes); })
            .attr("cy", function(d) { return yScale(d.views); })
            .attr("r", function(d) { return rScale(d.comments)})
            .attr("fill-opacity", 0.2)
            .attr("stroke", function(d) { return fillScale(d.category); })
            .attr("stroke-width", 1.5)
            .attr("fill", function(d) { return fillScale(d.category); });

    
    /*
    DRAW AXIS LABELS
    */

    const xAxisLabel = svg.append("text")
        .attr("class","axis--label")
        .attr("x", width/2)
        .attr("y", height-margin.bottom/2)
        .text("Likes");

    const yAxisLabel = svg.append("text")
        .attr("class","axis--label")
        .attr("transform","rotate(-90)")
        .attr("x",-height/2)
        .attr("y",margin.left/3)
        .text("Views");


    /* 

    TASK 3: ADDING A TOOLTIP

    Following the demonstration we did in class, implement a tooltip
    for this YouTube Trending Videos dataset visualization. Your tooltip
    should include at least 2 pieces of information, one of which should
    be the precise number of likes of a video; this number should be 
    formatted with the comma (,) notation. 

    -> Begin by creating a new div element inside the #chart container, 
    giving it class 'tooltip'; note that this newly created div inherits 
    (receives) the CSS properties defined by the .tooltip { ... } rule 
    in the stylesheet (this css implementation is already provided).  

    */


    // Your Code here


    /*

    -> Then, you must implement user interactivity which determines when 
    the tooltip becomes visible or invisible. You may consider also
    adding a visual effect, e.g., highlight the data point you are
    currently interacting with by reducing the opacity of the rest of
    the data points.   

    QUESTION 5:

    - In the following empty code you see two events called "mouseover"
    and "mouseout". What is the meaning of these two events?
    - What is the meaning of the input variable `d`? 
    - What is the variable `points` referring to? What does it "hold"?

    ANSWER 5: 

    */

    points.on("mouseover", function(e, d) {

        // Your Code here

    }).on("mouseout", function() {

        // Your Code here

    });


    /* 

    TASK 4: ADDING LEGENDS

    As you saw in class, making a custom legend with D3 and SVG 
    requires a mixture of plain JavaScript, drawing basic SVG shapes, 
    and some customization with CSS.

    Following the demonstration we did in class, implement a legend
    for this YouTube Trending Videos dataset visualization. Your legend
    should at minimum visualize a categorical variable, in particular,
    the variable representing the three categories: gaming, entertainment, and music.

    */


    /* 

    -> Start by adding a new SVG canvas to the page;
    notice that this is being inserted in a <div> element
    with ID "legend", and the size and position of this
    <div> on the page is being controlled by the CSS

    */


    // Your Code here


    /*

    -> Next, iterate over each of the values for which
    you want to display a legend, using ARRAY.forEach().

    Create a color legend that shows what category each color represents.
    Draw a text element that will serve as the label for each color in the
    legend.

    */

    // Your Code here


    /* 
    
    TASK 5 (Optional): ADDING LEGENDS FOR NUMERICAL VARIABLES

    Optionally, your legend should visualize a numerical variable that
    represents the `size` of the data points. One numerical variable you may
    consider that is associated with the size of each data point is the number
    of `comments`. 

    Note, in this case you must decide how you distinguish between different sizes.
    For example, define an array containing 3 different sizes using some simple 
    math with the .min and .max methods for the number of comments.
    To create the size legend, you can follow much of the same procedure above.
    */

    // Your Code here


    /* 

    TASK 6 (Optional): FILTER DATASET BY CHECKBOX

    Optionally, add the option of filtering the scatter plot
    by checkbox. For example, you can do this using the three categories
    we defined previously: gaming, entertainment, and music. Create a checkbox
    for each category. When you check a checkbox, the data points belonging 
    to that category are visible. When you uncheck a checkbox, the data points
    belonging to that category are invisible.      

    To implement this, you need the following pieces:

        - Some <input> checkbox elements in the HTML
            that represent the values we want to filter 
            the visualization by
        - A way of detecting when those <input> elements
            have been clicked
        - A way of manipulating which shapes in the visualization
            are visible or invisible, in response to these
            clicks of the checkboxes

        Note: Below you see ".category--option" which is a reference to some
              kind of class. This class must be assigned to each checkbox
              object which is of HTML type "input", So, to create 3 checkboxes
              you need 3 "input" HTML elements and each one must be assigned
              to a class called "category--option" so that your d3.selectAll
              method below can actually select and iterate over them.

              Thus, you need to somehow implement these checkboxes in your
              HTML file and then consider how to implement the interaction
              with them using the following code in JavaScript.

              Some guidelins for how to do it are given below in comments.
    
    */

    d3.selectAll(".category--option").on("click", function() {

        /* 
        -> For the checkbox that has just been clicked,
        determine the value associated with it and
        whether it is currently checked or unchecked
        */

        
        // Your code here
        

        /*
        -> Filter the points in the scatter plot to only
        select the circles whose category matches the
        value of the checkbox that was just checked
        */

        
        // Your code here


        /*
        -> Depending on whether the checkbox is checked
        or unchecked, you either:
            - Make the circles in the filtered selection
                all visible by setting their opacity
                to 1 (if checkbox is checked), or
            - Make the circles in the filtered selection
                all invisible by setting their opacity
                to 0 (if checkbox is unchecked)

        Note: the `pointer-events` CSS attribute can be used
        here to control whether an element can respond to
        mouse interaction events or not.

            `pointer-events` set to "none": 
                Allow NO response to mouse pointer interaction
            `pointer-events` set to "all":
                Allow any and all responses to mouse
                pointer interaction

        The reason for including this is that we want to
        disable to the automatic tooltip event for
        circles that are hidden in the visualization
        if they've been filtered out from a checkbox!
        
        */

        // Your code here

    });

});
