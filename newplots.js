import * as d3 from 'https://cdn.jsdelivr.net/npm/d3@7.9.0/+esm';

async function loadData() {
    const rawData = await d3.csv("data/fem_temp.csv");
  
    const subjects = rawData.columns;
  
    // Add 'minute' index to each row
    rawData.forEach((d, i) => d.minute = i);
  
    // Transform into: [{name: 'f1', values: [{minute: 0, temp: 37.11}, ...]}, ...]
    const formattedData = subjects.map(name => ({
      name,
      values: rawData.map((d, i) => ({
        minute: i,
        temp: +d[name]
      }))
    }));

    return formattedData;
}

function renderPlot(data){
    // define dimensions
    let width = 500;
    let height = 200;

    // create svg
    const svg = d3
        .select('#plot-container')
        .append('svg')
        .attr('viewBox', `0 0 ${width} ${height}`)
        .style('overflow', 'visible');

    console.log(data);

    // create x and y scale
    const allMinutes = data.flatMap(d => d.values.map(v => v.minute));

    let xScale = d3
        .scaleLinear()
        .domain(d3.extent(allMinutes))
        .range([0, width])
        .nice();

    const allTemps = data.flatMap(d => d.values.map(v => v.temp));

    let yScale = d3
        .scaleLinear()
        .domain(d3.extent(allTemps))
        .range([height, 0]);

    // define margin
    const margin = { top: 20, right: 20, bottom: 40, left: 30 };

    const usableArea = {
        top: margin.top,
        right: width - margin.right,
        bottom: height - margin.bottom,
        left: margin.left,
        width: width - margin.left - margin.right,
        height: height - margin.top - margin.bottom,
    };

    // update scales with new ranges
    xScale.range([usableArea.left, usableArea.right]);
    yScale.range([usableArea.bottom, usableArea.top]);

    // add gridlines
    const gridlines = svg
    .append('g')
    .attr('class', 'gridlines')
    .attr('transform', `translate(${usableArea.left}, 0)`);

    // create gridlines as an axis with no labels and full-width ticks
    gridlines
        .call(d3.axisLeft(yScale).tickFormat('').tickSize(-usableArea.width))
        .attr('opacity',0.2);

    // create axis
    const xAxis = d3.axisBottom(xScale)
    const yAxis = d3.axisLeft(yScale)

    svg
    .append('g')
    .attr('transform', `translate(0, ${usableArea.bottom})`)
    .call(xAxis);

    svg
    .append('g')
    .attr('transform', `translate(${usableArea.left}, 0)`)
    .call(yAxis);

    // create line
    const lines = svg.append('g').attr('class', 'lines');

    const line = d3.line()
    .x(d => x(d.minute))
    .y(d => y(d.temp));

    lines.selectAll(".line")
    .data(data)
    .enter()
    .append("path")
    .attr("class", "line")
    .attr("fill", "none")
    .attr("stroke", (d, i) => d3.schemeCategory10[i % 10]) // different color per line
    .attr("stroke-width", 1.5)
    .attr("d", d => line(d.values));




    // const line = d3.line()
    // .x(d => x(allMinutes))
    // .y(d => y(allTemps));

    // svg
    // .append('path')
    // .datum(data)
    // .attr('fill', 'none')
    // .attr('stroke', 'steelblue')
    // .attr('stroke-width', 1)
    // .attr('d', line);

    // plot data
    // const dots = svg.append('g').attr('class', 'dots');
    // dots
    // .selectAll('circle')
    // .data(data)
    // .join('circle')
    // .attr('cx', (d) => xScale(d.minute))
    // .attr('cy', (d) => yScale(d.temp))
    // .style('fill-opacity', 0.7)
    // .attr('fill', 'steelblue')
}

// let data = loadData();

loadData().then(data => {
    renderPlot(data)
});

// renderPlot(data);