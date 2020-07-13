import React, { useRef, useEffect, useState } from 'react';
import { select, scaleLinear, axisBottom, axisRight, scaleBand } from 'd3';

import './App.css';

function App() {
  const [data, setData] = useState([25, 30, 45, 60, 20, 65, 75]);
  const svgRef = useRef();

  useEffect(() => {
    const svg = select(svgRef.current);
    const xScale = scaleBand()
      .domain(data.map((value, index) => index))
      .range([0, 300])
      .padding(0.5);

    const yScale = scaleLinear().domain([0, 150]).range([150, 0]);
    const colorScale = scaleLinear()
      .domain([75, 100, 150])
      .range(['green', 'orange', 'red'])
      .clamp(true);

    const xAxis = axisBottom(xScale)
      .ticks(data.length)
      .tickFormat((index) => index + 1);

    const yAxis = axisRight(yScale);

    svg.select('.x-axis').style('transform', 'translateY(150px)').call(xAxis);
    svg.select('.y-axis').style('transform', 'translateX(300px)').call(yAxis);

    svg
      .selectAll('.bar')
      .data(data)
      .join('rect')
      .attr('class', 'bar')

      .style('transform', 'scale(1, -1)')
      .attr('x', (value, index) => xScale(index))
      .attr('y', -150)
      .attr('width', xScale.bandwidth())
      .transition()
      .attr('fill', colorScale)
      .attr('height', (value) => 150 - yScale(value));
  }, [data]);

  return (
    <div style={{ marginLeft: 10, marginTop: 50 }}>
      <svg ref={svgRef} style={{ background: 'lightgray' }}>
        <g className="x-axis" />
        <g className="y-axis" />
      </svg>
      <br />
      <br />
      <br />
      <button onClick={() => setData(data.map((value) => value + 5))}>
        Update data
      </button>
      <button onClick={() => setData(data.filter((value) => value <= 35))}>
        Filter data
      </button>
    </div>
  );
}

export default App;
