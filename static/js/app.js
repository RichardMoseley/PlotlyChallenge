function buildPlots(userInput) {
    d3.json('https://richardmoseley.github.io/PlotlyChallenge/data/samples.json').then((d) => {
        var filter = d.samples.filter(i => i.id == userInput)
        var filtered_ids = filter[0].otu_ids
        var filtered_sample_values = filter[0].sample_values
        var filtered_labels = filter[0].otu_labels
        var top_ten_ids = filtered_ids.slice(0, 10).reverse()
        var top_ten_samples = filtered_sample_values.slice(0, 10).reverse()
        var top_ten_labels = filtered_labels.slice(0, 10).reverse()
        var trace1 = {
            x: top_ten_samples,
            y: top_ten_ids.map(i => `OTU ${i}`),
            text: top_ten_labels,
            type: "bar",
            orientation: "h",
        }
        Plotly.newPlot('bar', [trace1])
        var trace2 = {
            x: filtered_ids,
            y: filtered_sample_values,
            text: filtered_labels,
            mode: 'markers',
            marker: {
                size: filtered_sample_values,
                color: filtered_ids
            }
        }
        Plotly.newPlot('bubble', [trace2])
        var demo_card_li = d3.select('#sample-metadata')
        var selected_data = d.metadata.filter(i => i.id == userInput)
        selected_data.forEach(i => {
            demo_card_li.html('')
            demo_card_li.append('li').html(`ID: ${i.id}<br>`)
            demo_card_li.append('li').html(`Ethnicity: ${i.ethnicity}<br>`)
            demo_card_li.append('li').html(`Gender: ${i.gender}<br>`)
            demo_card_li.append('li').html(`Age: ${i.age}<br>`)
            demo_card_li.append('li').html(`Location: ${i.location}<br>`)
            demo_card_li.append('li').html(`Belly Button Type: ${i.bbtype}<br>`)
            demo_card_li.append('li').html(`Wash Frequency: ${i.wfreq}<br>`)
        })
    })
}

function optionChanged(option) {
    buildPlots(option)
}

d3.json('https://richardmoseley.github.io/PlotlyChallenge/data/samples.json').then((d) => {
    console.log(d);
    var dropdown = d3.select('#selDataset')
    var otu_idArr = []
    d.metadata.forEach(i => {
        otu_idArr.push(i.id)
        dropdown.append('option').text(i.id)
    })
    console.log(otu_idArr)
});