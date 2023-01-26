function parseLOG(d){
    console.log(d);
}

d3.text("file.txt").then(parseLOG);


d3.csv("cities-sm.csv").then(parseLOG);

d3.json("countrycode-en.json").then(parseLOG);

d3.csv();


function parseCSVIntoNum(d){
    //
    //
    //
    return {
        "city":d.city,
        "state":d.state,
        "population":+d.population,
        "land area":+d["land area"]
    }
}

d3.csv("cities-sm.csv",parseCSVIntoNum).then(parseLOG);


d3.csv("cities-sm.csv",parseCSVIntoNum).then(function(data) {
    console.log(data[0]);


data.forEach(function(d) {
    d.population = +d.population;
    d["land area"]=+d["land area"];
});

let filtered_data = data.filter(function(d){
    //
    return d.state === "WA";
});

let grouped_data = d3.group(data, function(d){
    return d.city;
});

console.log(grouped_data);

});