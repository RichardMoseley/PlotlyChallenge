d3.json('../data/samples.json').then((d) => {
    console.log(d);
    var dropdown = d3.select('#selDataset')
    var otu_idArr = []
    d.metadata.forEach(i => {
        otu_idArr.push(i.id)
        dropdown.append('option').text(i.id)
    })
    console.log(otu_idArr)
});

function buildPlots(userInput) {
    d3.json('../data/samples.json').then((d) => {
        var filter = d.samples.filter(i => i.id == userInput)
        var filtered_ids = filter[0].otu_ids
        var filtered_sample_values = filter[0].sample_values
        var filtered_labels = filter[0].otu_labels
        var top_ten_ids = filtered_ids.slice(0, 10).reverse()
        var top_ten_samples = filtered_sample_values.slice(0, 10).reverse()
        var top_ten_labels = filtered_labels.slice(0, 10).reverse()
        var trace1 =
        {
            y: top_ten_ids.map(i => `OTU ${i}`),
            x: top_ten_samples,
            text: top_ten_labels,
            type: "bar",
            orientation: "h",
        }
        Plotly.newPlot('bar', [trace1])
    })
}

function optionChanged(option) {
    buildPlots(option)
}
// Use sample_values as the values for the bar chart.


// Use otu_ids as the labels for the bar chart.


// Use otu_labels as the hovertext for the chart.