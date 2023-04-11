function parseCsv(d) {
    if(d.Powder === 'Excellent' || d.Powder === 'Poor') {
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
    const width = document.querySelector("#barChart").clientWidth;
    const height = document.querySelector("#barChart").clientHeight;
    const margin = {top: 50, left: 150, right: 150, bottom: 100};

    const svg = d3.select("#barChart")
        .append("svg")
        // .attr("viewBox", `0 0 ${width} ${height}`)             //${} template literal, to inset the computed width and height variables above 
        // .attr("preserveAspectRatio", "xMidYMid meet");         //The value xMidYMid meet means “scale the SVG uniformly in the x- and ydirection as the viewport changes size”
        .attr("width", width)
        .attr("height", height);

    /* FILTER THE DATA */
    let filtered_excellent = data.filter(function(d) {
        return d.powder_performance === 'Excellent';
    });
    console.log(filtered_excellent);

    let filtered_poor = data.filter(function(d) {
        return d.powder_performance === 'Poor';
    });
    console.log(filtered_poor);

    /* Calculate the total count of board in different stance */
    
    // 1.count in excellent
    
    // centered
    const filtered_ex_centered = filtered_excellent.filter(function(d){
        return d.stance === 'Centered';
    });
    const count_ex_centered = Object.keys(filtered_ex_centered).length;
    console.log(count_ex_centered);
    
    // setback-5mm
    const filtered_ex_5mm = filtered_excellent.filter(function(d){
        return d.stance === 'Setback -5mm';
    });
    const count_ex_5mm = Object.keys(filtered_ex_5mm).length;
    console.log(count_ex_5mm);

    // setback-10mm
    const filtered_ex_10mm = filtered_excellent.filter(function(d){
        return d.stance === 'Setback -10mm';
    });
    const count_ex_10mm = Object.keys(filtered_ex_10mm).length;
    console.log(count_ex_10mm);

    // setback-12.5mm
    const filtered_ex_125mm = filtered_excellent.filter(function(d){
        return d.stance === 'Setback -12.5mm';
    });
    const count_ex_125mm = Object.keys(filtered_ex_125mm).length;
    console.log(count_ex_125mm);

    // setback-15mm
    const filtered_ex_15mm = filtered_excellent.filter(function(d){
        return d.stance === 'Setback -15mm';
    });
    const count_ex_15mm = Object.keys(filtered_ex_15mm).length;
    console.log(count_ex_15mm);

    // setback-20mm
    const filtered_ex_20mm = filtered_excellent.filter(function(d){
        return d.stance === 'Setback -20mm';
    });
    const count_ex_20mm = Object.keys(filtered_ex_20mm).length;
    console.log(count_ex_20mm);

    // setback over 20mm
    const filtered_ex_over_20mm = filtered_excellent.filter(function(d){
        return d.stance === 'Setback over 20mm';
    });
    const count_ex_over_20mm = Object.keys(filtered_ex_over_20mm).length;
    console.log(count_ex_over_20mm);

    // 2.count in poor
    
    // centered
    const filtered_p_centered = filtered_poor.filter(function(d){
        return d.stance === 'Centered';
    });
    const count_p_centered = Object.keys(filtered_p_centered).length;
    console.log(count_p_centered);
    
    // setback-5mm
    const filtered_p_5mm = filtered_poor.filter(function(d){
        return d.stance === 'Setback -5mm';
    });
    const count_p_5mm = Object.keys(filtered_p_5mm).length;
    console.log(count_p_5mm);

    // setback-10mm
    const filtered_p_10mm = filtered_poor.filter(function(d){
        return d.stance === 'Setback -10mm';
    });
    const count_p_10mm = Object.keys(filtered_p_10mm).length;
    console.log(count_p_10mm);

    // setback-12.5mm
    const filtered_p_125mm = filtered_poor.filter(function(d){
        return d.stance === 'Setback -12.5mm';
    });
    const count_p_125mm = Object.keys(filtered_p_125mm).length;
    console.log(count_p_125mm);

    // setback-15mm
    const filtered_p_15mm = filtered_poor.filter(function(d){
        return d.stance === 'Setback -15mm';
    });
    const count_p_15mm = Object.keys(filtered_p_15mm).length;
    console.log(count_ex_15mm);

    // setback-20mm
    const filtered_p_20mm = filtered_poor.filter(function(d){
        return d.stance === 'Setback -20mm';
    });
    const count_p_20mm = Object.keys(filtered_p_20mm).length;
    console.log(count_ex_20mm);

    // setback over 20mm
    const filtered_p_over_20mm = filtered_poor.filter(function(d){
        return d.stance === 'Setback over 20mm';
    });
    const count_p_over_20mm = Object.keys(filtered_p_over_20mm).length;
    console.log(count_p_over_20mm);

    /*****************************************************************************************/ 
    /*test*/
    /*CREATE NEW ARRAY */
    var trace_ex = [count_ex_centered,count_ex_5mm,count_ex_10mm,count_ex_125mm,count_ex_15mm,count_ex_20mm,count_ex_over_20mm];
    console.log(trace_ex);
    // console.log(d.trace_ex);


    var trace_p = [count_p_centered,count_p_5mm,count_p_10mm,count_p_125mm,count_p_15mm,count_p_20mm,count_p_over_20mm];
    console.log(trace_p);

    // var new_dataset = [trace_ex,trace_p];
    // console.log(new_dataset);

    // var new_ex_dataset = {
    //     new_ex_stance:["Centered","Setback -5mm","Setback -10mm","Setback -12.5mm","Setback -15mm","Setback -20mm","Setback over 20mm"],
    //     new_ex_count:[count_ex_centered,count_ex_5mm,count_ex_10mm,count_ex_125mm,count_ex_15mm,count_ex_20mm,count_ex_over_20mm]
    // };
    // console.log(new_ex_dataset);
    // console.log(new_ex_dataset.new_ex_count);

    var new_ex_dataset = {
        "Centered":count_ex_centered,
        "Setback -5mm":count_ex_5mm,
        "Setback -10mm":count_ex_10mm,
        "Setback -12.5mm":count_ex_125mm,
        "Setback -15mm":count_ex_15mm,
        "Setback -20mm":count_ex_20mm,
        "Setback over 20mm":count_ex_over_20mm
    };
    console.log(new_ex_dataset);
    console.log(Object.keys(new_ex_dataset));
    console.log(Object.values(new_ex_dataset));




    /*CREATE SCALES */
    const xScale = d3.scaleBand()
        .domain(["Centered","Setback -5mm","Setback -10mm","Setback -12.5mm","Setback -15mm","Setback -20mm","Setback over 20mm"])
        // .domain(data.map(function(d){return d.stance}))
        .range([margin.left, width-margin.right])
        .padding(0.5);

    const yScale = d3.scaleLinear()
        .domain([0,50])
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
        .data(new_ex_dataset)                                                                        /* Joins data to the selected elements which is all the rectangles in this case */
        .enter()                                                                                    /* Creates a selection with placeholder references for missing elements */
        .append("rect")                                                                             /* Create rectangles in each place holder */
        .attr("x", function(d) { return xScale("Setback over 20mm"); })
        .attr("y", function(d) { return yScale(21); })
        // .attr("x", function(d) { return xScale(Object.keys(new_ex_dataset)); })
        // .attr("y", function(d) { return yScale(Object.values(new_ex_dataset)); })
        .attr("width", xScale.bandwidth())
        .attr("height", function(d) { return height - margin.bottom - yScale(21); })
        // .attr("height", function(d) { return height - margin.bottom - yScale(Object.values(new_ex_dataset)); })
        .attr("fill", "steelblue");



    /* DRAW AXIS LABELS*/
    const xAxisLabel = svg.append("text")
        .attr("class","axisLabel")
        .attr("x", width/2)
        .attr("y", height-margin.bottom/2)
        .text("Stance");

    const yAxisLabel = svg.append("text")
        .attr("class","axisLabel")
        .attr("transform","rotate(-90)")
        .attr("x",-height/2)
        .attr("y",margin.left/2)
        .text("Count");














    /*****************************************************************************************/

    // /*CREATE SCALES */
    // const xScale = d3.scaleBand()
    //     .domain(["Poor","Average","Good","Great","Excellent"])
    //     .range([margin.left, width-margin.right])
    //     .padding(0.5);

    // const yScale = d3.scaleBand()
    //     .domain(["Centered","Setback -5mm","Setback -10mm","Setback -12.5mm","Setback -15mm","Setback -20mm","Setback over 20mm"])
    //     .range([height-margin.bottom, margin.top]);

    // /* DRAW AXES*/
    // const xAxis = svg.append("g")
    //     .attr("class","axis")
    //     .attr("transform", `translate(0,${height-margin.bottom})`)
    //     .call(d3.axisBottom().scale(xScale));

    // const yAxis = svg.append("g")
    //     .attr("class","axis")
    //     .attr("transform", `translate(${margin.left},0)`)
    //     .call(d3.axisLeft().scale(yScale));
    
    // /* DRAW BARS*/
    // const points = svg.selectAll("rect")
    //     .data(data)                                                                        /* Joins data to the selected elements which is all the rectangles in this case */
    //     .enter()                                                                                    /* Creates a selection with placeholder references for missing elements */
    //     .append("rect")                                                                             /* Create rectangles in each place holder */
    //     .attr("x", function(d) { return xScale(d.powder_performance); })
    //     .attr("y", function(d) { return yScale(d.stance); })
    //     .attr("width", xScale.bandwidth())
    //     .attr("height", function(d) { return height - margin.bottom - yScale(d.stance); })
    //     .attr("fill", "steelblue");

    // /* DRAW AXIS LABELS*/
    // const xAxisLabel = svg.append("text")
    //     .attr("class","axisLabel")
    //     .attr("x", width/2)
    //     .attr("y", height-margin.bottom/2)
    //     .text("Powder Performance");

    // const yAxisLabel = svg.append("text")
    //     .attr("class","axisLabel")
    //     .attr("transform","rotate(-90)")
    //     .attr("x",-height/2)
    //     .attr("y",margin.left/2)
    //     .text("Stance");








    //works
    // const filtered_centered = data.filter(function(d){
    //     return d.stance === 'Centered';
    // });

    // const count_centered = Object.keys(filtered_centered).length;

    // console.log(count_centered)
    
    // does not work
    // const countOccurrences = (arr, val) => arr.reduce((a, v) => (v === val ? a + 1 : a), 0);

    // console.log(countOccurrences(data, 549));

    // does not work
    // const total_centered = data.filter(d.stance === 'Centered').length

    // console.log(total_centered)

    // console.log(function(d){d.stance})







    /*CREATE NEW ARRAY */
    // var trace_ex = {
    //     x:["Centered","Setback -5mm","Setback -10mm","Setback -12.5mm","Setback -15mm","Setback -20mm","Setback over 20mm"],
    //     y:[count_ex_centered,count_ex_5mm,count_ex_10mm,count_ex_125mm,count_ex_15mm,count_ex_20mm,count_ex_over_20mm],
    //     name:'Excellent Podwer Performance'
    // };

    // console.log(trace_ex);

    // var trace_p = {
    //     x:["Centered","Setback -5mm","Setback -10mm","Setback -12.5mm","Setback -15mm","Setback -20mm","Setback over 20mm"],
    //     y:[count_p_centered,count_p_5mm,count_p_10mm,count_p_125mm,count_p_15mm,count_p_20mm,count_p_over_20mm],
    //     name:'Poor Podwer Performance'
    // }

    // var new_data = [trace_ex, tracex-p];

    // var layout = {barmode: 'group'};
    
    // Plotly.newPlot('myDiv', new_data, layout);
})