import React, { useEffect, useRef } from 'react';
import { Stock } from '../../types/stock';

interface StockChartProps {
  stock: Stock;
}

const StockChart: React.FC<StockChartProps> = ({ stock }) => {
  const chartRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!chartRef.current) return;
    
    // Get chart data from stock
    const data = stock.historicalData.map(point => ({
      x: new Date(point.date).getTime(),
      y: point.price
    }));
    
    // Clear previous chart if any
    chartRef.current.innerHTML = '';
    
    // Create chart
    createChart(data, stock.change >= 0);
  }, [stock]);
  
  const createChart = (data: { x: number, y: number }[], isPositive: boolean) => {
    if (!chartRef.current) return;
    
    const width = chartRef.current.clientWidth;
    const height = 200;
    const padding = { top: 20, right: 20, bottom: 30, left: 40 };
    
    // Create SVG element
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', width.toString());
    svg.setAttribute('height', height.toString());
    chartRef.current.appendChild(svg);
    
    // Find min and max values
    const xValues = data.map(d => d.x);
    const yValues = data.map(d => d.y);
    const xMin = Math.min(...xValues);
    const xMax = Math.max(...xValues);
    const yMin = Math.min(...yValues) * 0.95;
    const yMax = Math.max(...yValues) * 1.05;
    
    // Create scales
    const xScale = (x: number) => (
      (x - xMin) / (xMax - xMin) * (width - padding.left - padding.right) + padding.left
    );
    
    const yScale = (y: number) => (
      height - ((y - yMin) / (yMax - yMin) * (height - padding.top - padding.bottom) + padding.bottom)
    );
    
    // Create line generator
    const line = data.map((d, i) => {
      return (i === 0)
        ? `M ${xScale(d.x)},${yScale(d.y)}`
        : `L ${xScale(d.x)},${yScale(d.y)}`;
    }).join(' ');
    
    // Create path element
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', line);
    path.setAttribute('fill', 'none');
    path.setAttribute('stroke', isPositive ? '#3E885B' : '#E53E3E');
    path.setAttribute('stroke-width', '2');
    svg.appendChild(path);
    
    // Create area path (for fill)
    const areaPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    const areaLine = line + ` L ${xScale(data[data.length-1].x)},${height - padding.bottom} L ${xScale(data[0].x)},${height - padding.bottom} Z`;
    areaPath.setAttribute('d', areaLine);
    areaPath.setAttribute('fill', isPositive ? 'rgba(62, 136, 91, 0.1)' : 'rgba(229, 62, 62, 0.1)');
    areaPath.setAttribute('stroke', 'none');
    svg.insertBefore(areaPath, path);
    
    // Add X axis
    const xAxis = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    xAxis.setAttribute('x1', padding.left.toString());
    xAxis.setAttribute('y1', (height - padding.bottom).toString());
    xAxis.setAttribute('x2', (width - padding.right).toString());
    xAxis.setAttribute('y2', (height - padding.bottom).toString());
    xAxis.setAttribute('stroke', '#E2E8F0');
    svg.appendChild(xAxis);
    
    // Add Y axis
    const yAxis = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    yAxis.setAttribute('x1', padding.left.toString());
    yAxis.setAttribute('y1', padding.top.toString());
    yAxis.setAttribute('x2', padding.left.toString());
    yAxis.setAttribute('y2', (height - padding.bottom).toString());
    yAxis.setAttribute('stroke', '#E2E8F0');
    svg.appendChild(yAxis);
    
    // Add Y axis labels
    const yTicks = 5;
    for (let i = 0; i <= yTicks; i++) {
      const yValue = yMin + (yMax - yMin) * (i / yTicks);
      const y = yScale(yValue);
      
      const label = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      label.setAttribute('x', (padding.left - 10).toString());
      label.setAttribute('y', y.toString());
      label.setAttribute('text-anchor', 'end');
      label.setAttribute('dominant-baseline', 'middle');
      label.setAttribute('font-size', '10');
      label.setAttribute('fill', '#718096');
      label.textContent = `$${yValue.toFixed(2)}`;
      svg.appendChild(label);
      
      const tick = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      tick.setAttribute('x1', padding.left.toString());
      tick.setAttribute('y1', y.toString());
      tick.setAttribute('x2', (width - padding.right).toString());
      tick.setAttribute('y2', y.toString());
      tick.setAttribute('stroke', '#EDF2F7');
      tick.setAttribute('stroke-dasharray', '2,2');
      svg.insertBefore(tick, path);
    }
    
    // Add X axis labels (dates)
    const xTicks = Math.min(data.length, 6);
    for (let i = 0; i < xTicks; i++) {
      const index = Math.floor(i * (data.length - 1) / (xTicks - 1));
      const xValue = data[index].x;
      const x = xScale(xValue);
      
      const label = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      label.setAttribute('x', x.toString());
      label.setAttribute('y', (height - padding.bottom + 15).toString());
      label.setAttribute('text-anchor', 'middle');
      label.setAttribute('font-size', '10');
      label.setAttribute('fill', '#718096');
      
      const date = new Date(xValue);
      const month = date.toLocaleString('default', { month: 'short' });
      label.textContent = month;
      svg.appendChild(label);
    }
    
    // Add data points
    data.forEach(d => {
      const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      circle.setAttribute('cx', xScale(d.x).toString());
      circle.setAttribute('cy', yScale(d.y).toString());
      circle.setAttribute('r', '0');
      circle.setAttribute('fill', isPositive ? '#3E885B' : '#E53E3E');
      svg.appendChild(circle);
    });
  };

  return (
    <div className="mt-4 bg-white p-4 rounded-lg shadow-sm">
      <h3 className="text-lg font-semibold mb-2">Price History</h3>
      <div ref={chartRef} className="w-full h-[200px]"></div>
    </div>
  );
};

export default StockChart;