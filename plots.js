// // import * as d3 from 'https://cdn.jsdelivr.net/npm/d3@7.9.0/+esm';
// Time Series commented out due to readability, may use for future analysis
// // PLOT 1

// // Add data
// async function loadData() {
//   const rawData = await d3.csv("data/fem_temp.csv");

//   const subjects = rawData.columns;

//   // Add 'minute' index to each row
//   rawData.forEach((d, i) => d.minute = i);

//   // Transform into: [{name: 'f1', values: [{minute: 0, temp: 37.11}, ...]}, ...]
//   const formattedData = subjects.map(name => ({
//     name,
//     values: rawData.map((d, i) => ({
//       minute: i,
//       temp: +d[name]
//     }))
//   }));

//   return { formattedData, rawData };
// }

// function drawChart(formattedData, rawData) {
//     const container = d3.select("#chart-container1");

//  const svg = container.append("svg")
//   .attr("width", 1500)
//   .attr("height", 500);

// const margin = { top: 20, right: 100, bottom: 30, left: 50 },
//       width = +svg.attr("width") - margin.left - margin.right,
//       height = +svg.attr("height") - margin.top - margin.bottom;

// const g = svg.append("g")
//   .attr("transform", `translate(${margin.left},${margin.top})`);

//   const x = d3.scaleLinear()
//     .domain([0, rawData.length - 1])
//     .range([0, width]);

//   const y = d3.scaleLinear()
//     .domain([
//       d3.min(formattedData, s => d3.min(s.values, d => d.temp)) - 0.5,
//       d3.max(formattedData, s => d3.max(s.values, d => d.temp)) + 0.5
//     ])
//     .range([height, 0]);

//   const color = d3.scaleOrdinal(d3.schemeTableau10);

//   const line = d3.line()
//     .x(d => x(d.minute))
//     .y(d => y(d.temp));

//   g.append("g")
//     .attr("transform", `translate(0,${height})`)
//     .call(d3.axisBottom(x).ticks(10).tickFormat(d => `${d} min`));

//   g.append("g")
//     .call(d3.axisLeft(y));

//   const subjectGroup = g.selectAll(".subject")
//     .data(formattedData)
//     .enter().append("g")
//     .attr("class", "subject");

//   subjectGroup.append("path")
//     .attr("class", "line")
//     .attr("d", d => line(d.values))
//     .style("stroke", d => color(d.name))
//     .style("fill", "none")
//     .style("stroke-width", 2);

//   subjectGroup.append("text")
//     .datum(d => ({ name: d.name, value: d.values[d.values.length - 1], index: i }))
//     .attr("transform", d => `translate(${x(d.value.minute)},${y(d.value.temp) - d.index * 10})`)
//     .attr("x", 5)
//     .attr("dy", "0.35em")
//     .style("font", "10px sans-serif")
//     .text(d => d.name);
// }

  // loadData().then(({ formattedData, rawData }) => {
  //   drawChart(formattedData, rawData);
  // });


// // PLOT 2
// // Add data
// async function loadData() {
// const rawData = await d3.csv("data/fem_act.csv");

// const subjects = rawData.columns;

// // Add 'minute' index to each row
// rawData.forEach((d, i) => d.minute = i);

// // Transform into: [{name: 'f1', values: [{minute: 0, activity: 5}, ...]}, ...]
// const formattedData = subjects.map(name => ({
//   name,
//   values: rawData.map((d, i) => ({
//     minute: i,
//     activity: +d[name]
//   }))
// }));

// return { formattedData, rawData };
// }

// // Draw chart
// function drawChart(formattedData, rawData) {
//   const container = d3.select("#chart-container2");

// const svg = container.append("svg")
// .attr("width", 1200)
// .attr("height", 500);

// const margin = { top: 20, right: 100, bottom: 30, left: 50 },
//     width = +svg.attr("width") - margin.left - margin.right,
//     height = +svg.attr("height") - margin.top - margin.bottom;

// const g = svg.append("g")
// .attr("transform", `translate(${margin.left},${margin.top})`);

// const x = d3.scaleLinear()
//   .domain([0, rawData.length - 1])
//   .range([0, width]);

// const y = d3.scaleLinear()
//   .domain([
//     d3.min(formattedData, s => d3.min(s.values, d => d.activity)) - 0.5,
//     d3.max(formattedData, s => d3.max(s.values, d => d.activity)) + 0.5
//   ])
//   .range([height, 0]);

// const color = d3.scaleOrdinal(d3.schemeTableau10);

// const line = d3.line()
//   .x(d => x(d.minute))
//   .y(d => y(d.activity));

// g.append("g")
//   .attr("transform", `translate(0,${height})`)
//   .call(d3.axisBottom(x).ticks(10).tickFormat(d => `${d} min`));

// g.append("g")
//   .call(d3.axisLeft(y));

// const subjectGroup = g.selectAll(".subject")
//   .data(formattedData)
//   .enter().append("g")
//   .attr("class", "subject");

// subjectGroup.append("path")
//   .attr("class", "line")
//   .attr("d", d => line(d.values))
//   .style("stroke", d => color(d.name))
//   .style("fill", "none")
//   .style("stroke-width", 2);

// subjectGroup.append("text")
//   .datum(d => ({ name: d.name, value: d.values[d.values.length - 1], index: i }))
//   .attr("transform", d => `translate(${x(d.value.minute)},${y(d.value.activity) - d.index * 10})`)
//   .attr("x", 5)
//   .attr("dy", "0.35em")
//   .style("font", "10px sans-serif")
//   .text(d => d.name);
// }

// loadData().then(({ formattedData, rawData }) => {
//   drawChart(formattedData, rawData);
// });

// // PLOT 3

// // Add data
// async function loadData() {
// const rawData = await d3.csv("data/male_temp.csv");

// const subjects = rawData.columns;

// // Add 'minute' index to each row
// rawData.forEach((d, i) => d.minute = i);

// // Transform into: [{name: 'f1', values: [{minute: 0, temp: 37.11}, ...]}, ...]
// const formattedData = subjects.map(name => ({
//   name,
//   values: rawData.map((d, i) => ({
//     minute: i,
//     temp: +d[name]
//   }))
// }));

// return { formattedData, rawData };
// }

// function drawChart(formattedData, rawData) {
//   const container = d3.select("#chart-container3");

// const svg = container.append("svg")
// .attr("width", 1200)
// .attr("height", 500);

// const margin = { top: 20, right: 100, bottom: 30, left: 50 },
//     width = +svg.attr("width") - margin.left - margin.right,
//     height = +svg.attr("height") - margin.top - margin.bottom;

// const g = svg.append("g")
// .attr("transform", `translate(${margin.left},${margin.top})`);

//   const x = d3.scaleLinear()
//     .domain([0, rawData.length - 1])
//     .range([0, width]);

//   const y = d3.scaleLinear()
//     .domain([
//       d3.min(formattedData, s => d3.min(s.values, d => d.temp)) - 0.5,
//       d3.max(formattedData, s => d3.max(s.values, d => d.temp)) + 0.5
//     ])
//     .range([height, 0]);

//   const color = d3.scaleOrdinal(d3.schemeTableau10);

//   const line = d3.line()
//     .x(d => x(d.minute))
//     .y(d => y(d.temp));

//   g.append("g")
//     .attr("transform", `translate(0,${height})`)
//     .call(d3.axisBottom(x).ticks(10).tickFormat(d => `${d} min`));

//   g.append("g")
//     .call(d3.axisLeft(y));

//   const subjectGroup = g.selectAll(".subject")
//     .data(formattedData)
//     .enter().append("g")
//     .attr("class", "subject");

//   subjectGroup.append("path")
//     .attr("class", "line")
//     .attr("d", d => line(d.values))
//     .style("stroke", d => color(d.name))
//     .style("fill", "none")
//     .style("stroke-width", 2);

//   subjectGroup.append("text")
//     .datum(d => ({ name: d.name, value: d.values[d.values.length - 1], index: i }))
//     .attr("transform", d => `translate(${x(d.value.minute)},${y(d.value.temp) - d.index * 10})`)
//     .attr("x", 5)
//     .attr("dy", "0.35em")
//     .style("font", "10px sans-serif")
//     .text(d => d.name);
// }

// loadData().then(({ formattedData, rawData }) => {
//   drawChart(formattedData, rawData);
// });


// // PLOT 4
// // Add data
// async function loadData() {
// const rawData = await d3.csv("data/male_act.csv");

// const subjects = rawData.columns;

// // Add 'minute' index to each row
// rawData.forEach((d, i) => d.minute = i);

// // Transform into: [{name: 'f1', values: [{minute: 0, activity: 5}, ...]}, ...]
// const formattedData = subjects.map(name => ({
//   name,
//   values: rawData.map((d, i) => ({
//     minute: i,
//     activity: +d[name]
//   }))
// }));

// return { formattedData, rawData };
// }

// // Draw chart
// function drawChart(formattedData, rawData) {
// const container = d3.select("#chart-container4");

// const svg = container.append("svg")
// .attr("width", 1200)
// .attr("height", 500);

// const margin = { top: 20, right: 100, bottom: 30, left: 50 },
//     width = +svg.attr("width") - margin.left - margin.right,
//     height = +svg.attr("height") - margin.top - margin.bottom;

// const g = svg.append("g")
// .attr("transform", `translate(${margin.left},${margin.top})`);

// const x = d3.scaleLinear()
//   .domain([0, rawData.length - 1])
//   .range([0, width]);

// const y = d3.scaleLinear()
//   .domain([
//     d3.min(formattedData, s => d3.min(s.values, d => d.activity)) - 0.5,
//     d3.max(formattedData, s => d3.max(s.values, d => d.activity)) + 0.5
//   ])
//   .range([height, 0]);

// const color = d3.scaleOrdinal(d3.schemeTableau10);

// const line = d3.line()
//   .x(d => x(d.minute))
//   .y(d => y(d.activity));

// g.append("g")
//   .attr("transform", `translate(0,${height})`)
//   .call(d3.axisBottom(x).ticks(10).tickFormat(d => `${d} min`));

// g.append("g")
//   .call(d3.axisLeft(y));

// const subjectGroup = g.selectAll(".subject")
//   .data(formattedData)
//   .enter().append("g")
//   .attr("class", "subject");

// subjectGroup.append("path")
//   .attr("class", "line")
//   .attr("d", d => line(d.values))
//   .style("stroke", d => color(d.name))
//   .style("fill", "none")
//   .style("stroke-width", 2);

// subjectGroup.append("text")
//   .datum(d => ({ name: d.name, value: d.values[d.values.length - 1], index: i }))
//   .attr("transform", d => `translate(${x(d.value.minute)},${y(d.value.activity) - d.index * 10})`)
//   .attr("x", 5)
//   .attr("dy", "0.35em")
//   .style("font", "10px sans-serif")
//   .text(d => d.name);
// }

// loadData().then(({ formattedData, rawData }) => {
// drawChart(formattedData, rawData);
// });


// // Set dimensions and margins for the chart

// const margin = { top: 70, right: 30, bottom: 40, left: 80 };
// const width = 1200 - margin.left - margin.right;
// const height = 500 - margin.top - margin.bottom;

// // Set up the x and y scales

// const x = d3.scaleTime()
//   .range([0, width]);

// const y = d3.scaleLinear()
//   .domain([
//     d3.min(formattedData, s => d3.min(s.values, d => d.temp)) - 0.5,
//     d3.max(formattedData, s => d3.max(s.values, d => d.temp)) + 0.5
//   ])
//   .range([height, 0]);

// const color = d3.scaleOrdinal(d3.schemeTableau10);

// const line = d3.line()
//   .x(d => x(d.minute))
//   .y(d => y(d.temp));

// g.append("g")
//   .attr("transform", `translate(0,${height})`)
//   .call(d3.axisBottom(x).ticks(10).tickFormat(d => `${d} min`));

// g.append("g")
//   .call(d3.axisLeft(y));

// const subjectGroup = g.selectAll(".subject")
//   .data(formattedData)
//   .enter().append("g")
//   .attr("class", "subject");

// subjectGroup.append("path")
//   .attr("class", "line")
//   .attr("d", d => line(d.values))
//   .style("stroke", d => color(d.name))
//   .style("fill", "none")
//   .style("stroke-width", 2);

// subjectGroup.append("text")
//   .datum(d => ({ name: d.name, value: d.values[d.values.length - 1], index: i }))
//   .attr("transform", d => `translate(${x(d.value.minute)},${y(d.value.temp) - d.index * 10})`)
//   .attr("x", 5)
//   .attr("dy", "0.35em")
//   .style("font", "10px sans-serif")
//   .text(d => d.name);
// }

// loadData().then(({ formattedData, rawData }) => {
// drawChart(formattedData, rawData);
// });


// // PLOT 4
// // Add data
// async function loadData() {
// const rawData = await d3.csv("data/male_act.csv");

// const subjects = rawData.columns;

// // Add 'minute' index to each row
// rawData.forEach((d, i) => d.minute = i);

// // Transform into: [{name: 'f1', values: [{minute: 0, activity: 5}, ...]}, ...]
// const formattedData = subjects.map(name => ({
// name,
// values: rawData.map((d, i) => ({
//   minute: i,
//   activity: +d[name]
// }))
// }));

// return { formattedData, rawData };
// }

// // Draw chart
// function drawChart(formattedData, rawData) {
// const container = d3.select("#chart-container4");

// const svg = container.append("svg")
// .attr("width", 1200)
// .attr("height", 500);

// const margin = { top: 20, right: 100, bottom: 30, left: 50 },
//   width = +svg.attr("width") - margin.left - margin.right,
//   height = +svg.attr("height") - margin.top - margin.bottom;

// const g = svg.append("g")
// .attr("transform", `translate(${margin.left},${margin.top})`);

// const x = d3.scaleLinear()
// .domain([0, rawData.length - 1])
// .range([0, width]);

// const y = d3.scaleLinear()
// .domain([
//   d3.min(formattedData, s => d3.min(s.values, d => d.activity)) - 0.5,
//   d3.max(formattedData, s => d3.max(s.values, d => d.activity)) + 0.5
// ])
// .range([height, 0]);

// const color = d3.scaleOrdinal(d3.schemeTableau10);

// const line = d3.line()
// .x(d => x(d.minute))
// .y(d => y(d.activity));

// g.append("g")
// .attr("transform", `translate(0,${height})`)
// .call(d3.axisBottom(x).ticks(10).tickFormat(d => `${d} min`));

// g.append("g")
// .call(d3.axisLeft(y));

// const subjectGroup = g.selectAll(".subject")
// .data(formattedData)
// .enter().append("g")
// .attr("class", "subject");

// subjectGroup.append("path")
// .attr("class", "line")
// .attr("d", d => line(d.values))
// .style("stroke", d => color(d.name))
// .style("fill", "none")
// .style("stroke-width", 2);

// subjectGroup.append("text")
// .datum(d => ({ name: d.name, value: d.values[d.values.length - 1], index: i }))
// .attr("transform", d => `translate(${x(d.value.minute)},${y(d.value.activity) - d.index * 10})`)
// .attr("x", 5)
// .attr("dy", "0.35em")
// .style("font", "10px sans-serif")
// .text(d => d.name);
// }

// loadData().then(({ formattedData, rawData }) => {
// drawChart(formattedData, rawData);
// });


// // // Set dimensions and margins for the chart

// // const margin = { top: 70, right: 30, bottom: 40, left: 80 };
// // const width = 1200 - margin.left - margin.right;
// // const height = 500 - margin.top - margin.bottom;

// // // Set up the x and y scales

// // const x = d3.scaleTime()
// //   .range([0, width]);

// // const y = d3.scaleLinear()
// //   .range([height, 0]);

// // // Create the SVG element and append it to the chart container

// // const svg = d3.select("#chart-container")
// //   .append("svg")
// //     .attr("width", width + margin.left + margin.right)
// //     .attr("height", height + margin.top + margin.bottom)
// //   .append("g")
// //     .attr("transform", `translate(${margin.left},${margin.top})`);

// // // Create a fake dataset

// // const dataset = [
// //   { date: new Date("2022-01-01"), value: 200 },
// //   { date: new Date("2022-02-01"), value: 250 },
// //   { date: new Date("2022-03-01"), value: 180 },
// //   { date: new Date("2022-04-01"), value: 300 },
// //   { date: new Date("2022-05-01"), value: 280 },
// //   { date: new Date("2022-06-01"), value: 220 },
// //   { date: new Date("2022-07-01"), value: 300 },
// //   { date: new Date("2022-08-01"), value: 450 },
// //   { date: new Date("2022-09-01"), value: 280 },
// //   { date: new Date("2022-10-01"), value: 600 },
// //   { date: new Date("2022-11-01"), value: 780 },
// //   { date: new Date("2022-12-01"), value: 320 }
// // ];

// // // Define the x and y domains

// // x.domain(d3.extent(dataset, d => d.date));
// // y.domain([0, d3.max(dataset, d => d.value)]);

// // // Add the x-axis

// // svg.append("g")
// //   .attr("transform", `translate(0,${height})`)
// //   .call(d3.axisBottom(x)
// //     .ticks(d3.timeMonth.every(1)) 
// //     .tickFormat(d3.timeFormat("%b %Y"))); 


// // // Add the y-axis

// // svg.append("g")
// //   .call(d3.axisLeft(y))

// // // Create the line generator

// // const line = d3.line()
// //   .x(d => x(d.date))
// //   .y(d => y(d.value));

// // // Add the line path to the SVG element

// // svg.append("path")
// //   .datum(dataset)
// //   .attr("fill", "none")
// //   .attr("stroke", "steelblue")
// //   .attr("stroke-width", 1)
// //   .attr("d", line);

// Final Plot Prototype

const margin = { top: 60, right: 30, bottom: 60, left: 70 },
      width = 800 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom;

const svg = d3.select("#chart")
  .append("g")
  .attr("transform", `translate(${margin.left},${margin.top})`);

const x = d3.scaleBand().padding(0.2).range([0, width]);
const y = d3.scaleLinear().range([height, 0]);

const xAxis = svg.append("g")
  .attr("transform", `translate(0,${height})`);
const yAxis = svg.append("g");

const tooltip = d3.select("body").append("div")
  .attr("class", "tooltip")
  .style("opacity", 0);

d3.csv("data/fem_temp.csv").then(data => {
  const longData = [];
  data.forEach((row, i) => {
    for (const mouse in row) {
      longData.push({
        MouseID: mouse,
        Hour: Math.floor(i / 60),
        Minute: i,
        Temperature: +row[mouse]
      });
    }
  });

  const hours = Array.from(new Set(longData.map(d => d.Hour))).sort((a, b) => a - b);

  const hourSelect = d3.select("#hourSelect");
  hourSelect.selectAll("option")
    .data(hours)
    .enter()
    .append("option")
    .attr("value", d => d)
    .text(d => `Hour ${d}`);

  updateChart(hours[0]);

  hourSelect.on("change", function () {
    updateChart(+this.value);
  });

  function updateChart(hour) {
    const filtered = longData.filter(d => d.Hour === hour);

    x.domain(filtered.map(d => d.MouseID));
    y.domain([35, d3.max(filtered, d => d.Temperature) + 0.5]);

    xAxis.transition().duration(800).call(d3.axisBottom(x));
    yAxis.transition().duration(800).call(d3.axisLeft(y));

    svg.selectAll(".x-axis-label").remove();
    svg.selectAll(".y-axis-label").remove();
    svg.selectAll(".title").remove();

    // Add explicit axis labels
    svg.append("text")
      .attr("class", "x-axis-label")
      .attr("x", width / 2)
      .attr("y", height + 45)
      .attr("text-anchor", "middle")
      .style("font-size", "14px")
      .text("Mouse ID");

    svg.append("text")
      .attr("class", "y-axis-label")
      .attr("transform", "rotate(-90)")
      .attr("x", -height / 2)
      .attr("y", -50)
      .attr("text-anchor", "middle")
      .style("font-size", "14px")
      .text("Core Temp (°C)");

    // Add chart title
    svg.append("text")
      .attr("class", "title")
      .attr("x", width / 2)
      .attr("y", -20)
      .attr("text-anchor", "middle")
      .style("font-size", "18px")
      .style("font-weight", "bold")
      .text("Mice in Motion: How has female and male temperatures changed as circadian time progresses?");

    const bars = svg.selectAll(".bar")
      .data(filtered, d => d.MouseID);

    bars.exit().remove();

    bars.enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", d => x(d.MouseID))
      .attr("width", x.bandwidth())
      .attr("y", y(0))
      .attr("height", 0)
      .on("mouseover", function (event, d) {
        tooltip.transition().duration(200).style("opacity", 0.9);
        tooltip.html(`Mouse: ${d.MouseID}<br>Temp: ${d.Temperature.toFixed(2)}°C`)
          .style("left", (event.pageX) + "px")
          .style("top", (event.pageY - 28) + "px");
      })
      .on("mouseout", () => tooltip.transition().duration(500).style("opacity", 0))
      .merge(bars)
      .transition()
      .duration(800)
      .attr("x", d => x(d.MouseID))
      .attr("y", d => y(d.Temperature))
      .attr("height", d => height - y(d.Temperature));
  }
});




