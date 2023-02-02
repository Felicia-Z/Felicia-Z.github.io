d3.csv("YoutubeTrendingVideos-ARTG5430.csv")                                                                 /*load data set*/
    .then(function(data) { 

// exclude 1 or 2 column


// converts strings into numbers when appropriate
data(dataset.map(function(d) { return +d; }))

// changes the name of one column/property


// ignore the data point if it has fewer than 1,000,000 likes
let filtered_data_likes = data.filter(function(d) {
    return d.likes >= '1000000';
});

       
    });