function parseLOG(d){
    console.log(d);
}

d3.text("dataset\file.txt").then(parseLOG);


d3.csv("dataset\cities-sm.csv").then(parseLOG);

d3.json("dataset\countrycode-en.json").then(parseLOG);

