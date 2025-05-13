// // Final Plot Prototype

// const margin = { top: 60, right: 30, bottom: 60, left: 70 },
//       width = 800 - margin.left - margin.right,
//       height = 500 - margin.top - margin.bottom;

// const svg = d3.select("#chart")
//   .append("g")
//   .attr("transform", `translate(${margin.left},${margin.top})`);

// const x = d3.scaleBand().padding(0.2).range([0, width]);
// const y = d3.scaleLinear().range([height, 0]);

// const xAxis = svg.append("g")
//   .attr("transform", `translate(0,${height})`);
// const yAxis = svg.append("g");

// const tooltip = d3.select("body").append("div")
//   .attr("class", "tooltip")
//   .style("opacity", 0);

// d3.csv("data/fem_temp.csv").then(data => {
//   const longData = [];
//   data.forEach((row, i) => {
//     for (const mouse in row) {
//       longData.push({
//         MouseID: mouse,
//         Hour: Math.floor(i / 60),
//         Minute: i,
//         Temperature: +row[mouse]
//       });
//     }
//   });

//   const hours = Array.from(new Set(longData.map(d => d.Hour))).sort((a, b) => a - b);

//   const hourSelect = d3.select("#hourSelect");
//   hourSelect.selectAll("option")
//     .data(hours)
//     .enter()
//     .append("option")
//     .attr("value", d => d)
//     .text(d => `Hour ${d}`);

//   updateChart(hours[0]);

//   hourSelect.on("change", function () {
//     updateChart(+this.value);
//   });

//   function updateChart(hour) {
//     const filtered = longData.filter(d => d.Hour === hour);

//     x.domain(filtered.map(d => d.MouseID));
//     y.domain([35, d3.max(filtered, d => d.Temperature) + 0.5]);

//     xAxis.transition().duration(800).call(d3.axisBottom(x));
//     yAxis.transition().duration(800).call(d3.axisLeft(y));

//     svg.selectAll(".x-axis-label").remove();
//     svg.selectAll(".y-axis-label").remove();
//     svg.selectAll(".title").remove();

//     // Add explicit axis labels
//     svg.append("text")
//       .attr("class", "x-axis-label")
//       .attr("x", width / 2)
//       .attr("y", height + 45)
//       .attr("text-anchor", "middle")
//       .style("font-size", "14px")
//       .text("Mouse ID");

//     svg.append("text")
//       .attr("class", "y-axis-label")
//       .attr("transform", "rotate(-90)")
//       .attr("x", -height / 2)
//       .attr("y", -50)
//       .attr("text-anchor", "middle")
//       .style("font-size", "14px")
//       .text("Core Temp (°C)");

//     // Add chart title
//     svg.append("text")
//       .attr("class", "title")
//       .attr("x", width / 2)
//       .attr("y", -20)
//       .attr("text-anchor", "middle")
//       .style("font-size", "18px")
//       .style("font-weight", "bold")
//       .text("Mice in Motion: How has female and male temperatures changed as circadian time progresses?");

//     const bars = svg.selectAll(".bar")
//       .data(filtered, d => d.MouseID);

//     bars.exit().remove();

//     bars.enter()
//       .append("rect")
//       .attr("class", "bar")
//       .attr("x", d => x(d.MouseID))
//       .attr("width", x.bandwidth())
//       .attr("y", y(0))
//       .attr("height", 0)
//       .on("mouseover", function (event, d) {
//         tooltip.transition().duration(200).style("opacity", 0.9);
//         tooltip.html(`Mouse: ${d.MouseID}<br>Temp: ${d.Temperature.toFixed(2)}°C`)
//           .style("left", (event.pageX) + "px")
//           .style("top", (event.pageY - 28) + "px");
//       })
//       .on("mouseout", () => tooltip.transition().duration(500).style("opacity", 0))
//       .merge(bars)
//       .transition()
//       .duration(800)
//       .attr("x", d => x(d.MouseID))
//       .attr("y", d => y(d.Temperature))
//       .attr("height", d => height - y(d.Temperature));
//   }
// });

const margin = { top: 60, right: 30, bottom: 60, left: 70 },
      width = 800 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom;

const svg = d3.select("#chart")
  .append("g")
  .attr("transform", `translate(${margin.left},${margin.top})`);

const x = d3.scaleBand().padding(0.2).range([0, width]);
const y = d3.scaleLinear().range([height, 0]);

const xAxis = svg.append("g").attr("transform", `translate(0,${height})`);
const yAxis = svg.append("g");

const tooltip = d3.select("body").append("div")
  .attr("class", "tooltip")
  .style("opacity", 0);

// Initial load
let currentData = [];

function loadAndProcessData(file) {
  d3.csv(`data/${file}`).then(data => {
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

    // Group by MouseID and Hour to get unique entries
    const nested = d3.groups(longData, d => d.Hour, d => d.MouseID);

    const aggregated = [];
    nested.forEach(([hour, mouseGroup]) => {
    mouseGroup.forEach(([mouseID, values]) => {
        const avgTemp = d3.mean(values, d => d.Temperature);
        aggregated.push({ MouseID: mouseID, Hour: hour, Temperature: avgTemp });
        });
    });

    currentData = aggregated;

    const hours = Array.from(new Set(longData.map(d => d.Hour))).sort((a, b) => a - b);
    const hourSelect = d3.select("#hourSelect");

    hourSelect.selectAll("option").remove();
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
    
    let isPlaying = false;
    let currentHourIndex = 0;
    let interval;
    
    const playButton = d3.select("#playButton");
    
    playButton.on("click", () => {
      if (!isPlaying) {
        isPlaying = true;
        playButton.text("Stop");
    
        interval = setInterval(() => {
          currentHourIndex = (currentHourIndex + 1) % hours.length;
    
          const currentHour = hours[currentHourIndex];
          hourSelect.property("value", currentHour);
          updateChart(currentHour);
        }, 1000); // 4 seconds
      } else {
        isPlaying = false;
        playButton.text("Play");
        clearInterval(interval);
      }
    });

  });
}

function updateChart(hour) {
  d3.select("#currentHourDisplay").text(`Hour: ${hour}`);

  const filtered = currentData.filter(d => d.Hour === hour);

  console.log("Filtered data for hour:", hour, filtered);

  x.domain(filtered.map(d => d.MouseID));
  y.domain([35, d3.max(filtered, d => d.Temperature) + 0.5]);

  xAxis.transition().duration(800).call(d3.axisBottom(x));
  yAxis.transition().duration(800).call(d3.axisLeft(y));

  svg.selectAll(".x-axis-label").remove();
  svg.selectAll(".y-axis-label").remove();
  svg.selectAll(".title").remove();

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

  svg.append("text")
    .attr("class", "title")
    .attr("x", width / 2)
    .attr("y", -20)
    .attr("text-anchor", "middle")
    .style("font-size", "18px")
    .style("font-weight", "bold")
    .text("Mice in Motion: How do mice's temperature change as circadian time progresses?");

  const bars = svg.selectAll(".bar").data(filtered, d => d.MouseID);
  
  // Exit: remove old bars
  bars.exit()
    .transition().duration(500)
    .attr("y", y(0))
    .attr("height", 0)
    .remove();

    // Add color scale
    const color = d3.scaleLinear()
    .domain([35, 39]) // temp range
    .range(["blue", "red"]);
  
  // Update + Enter merged
  const barsEnter = bars.enter()
    .append("rect")
    .attr("class", "bar")
    .attr("x", d => x(d.MouseID))
    .attr("width", x.bandwidth())
    .attr("y", y(0))
    .attr("height", 0)
    .attr("fill", d => color(d.Temperature))
    .attr('opacity', 0.5);

    
  
  
  // Merge and apply shared behaviors
  barsEnter.merge(bars)
    .on("mouseover", function (event, d) {
      d3.select(this).attr('opacity', 1); // Highlight on hover
      tooltip.transition().duration(200).style("opacity", 0.9);
      tooltip.html(`Mouse: ${d.MouseID}<br>Temp: ${d.Temperature.toFixed(2)}°C`)
        .style("left", (event.pageX) + "px")
        .style("top", (event.pageY - 28) + "px");
    })
    .on("mouseout", function () {
      d3.select(this).attr("opacity", 0.5); // Reset color
      tooltip.transition().duration(500).style("opacity", 0);
    })
    .transition()
    .duration(800)
    .attr("x", d => x(d.MouseID))
    .attr("y", d => y(d.Temperature))
    .attr("height", d => height - y(d.Temperature))
    .attr("fill", d => color(d.Temperature));
}

// Dropdown event for dataset
document.getElementById("datasetSelect").addEventListener("change", function () {
  loadAndProcessData(this.value);
});

// Load initial dataset
loadAndProcessData("fem_temp.csv");
