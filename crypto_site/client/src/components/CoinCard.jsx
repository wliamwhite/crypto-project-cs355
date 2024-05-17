import React, { useEffect, useRef } from 'react';

const currentTime = new Date().toLocaleTimeString();

function CoinCard(props) {
    const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const closePrices = (props.history).reverse();

    const width = canvas.width;
    const height = canvas.height;
    const margin = 75;
    const chartWidth = width - 2 * margin;
    const chartHeight = height - 2 * margin;

    // Calculate the maximum and minimum prices
    const maxPrice = Math.max(...closePrices);
    const minPrice = Math.min(...closePrices);

    // Function to convert price to Y coordinate
    function getPriceY(price) {
      return chartHeight - ((price - minPrice) / (maxPrice - minPrice)) * chartHeight + margin;
    }

    // Clear the canvas
    ctx.clearRect(0, 0, width, height);

    // Draw X and Y axis
    ctx.strokeStyle = '#000000';
    ctx.beginPath();
    ctx.moveTo(margin, margin);
    ctx.lineTo(margin, height - margin);
    ctx.lineTo(width - margin, height - margin);
    ctx.stroke();

    // Draw the line chart
    ctx.beginPath();

    //Change color based on price change
    if(closePrices[0] > closePrices[closePrices.length - 1]){
        ctx.strokeStyle = '#ff1313';
    }
    else{
        ctx.strokeStyle = '#03A619';
    }
    ctx.lineWidth = 2;
    closePrices.forEach((price, index) => {
      const x = margin + (index / (closePrices.length - 1)) * chartWidth;
      const y = getPriceY(price);
      if (index === 0) {
      ctx.moveTo(x, y);
      } else {
      ctx.lineTo(x, y);
      }
    });
    ctx.stroke();

    // Draw X-axis labels
    ctx.fillStyle = '#000000';
    ctx.font = '12px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    const newLocal = interval.value;
    const intervalNumber = parseInt(newLocal.match(/\d+/)[0]);
    const intervalString = newLocal.match(/[a-zA-Z]+/)[0];
    const vertexNumber = closePrices.length;
    const xLabels = [intervalNumber*vertexNumber + ' ' + intervalString + 's ago', intervalNumber*vertexNumber*.75 + ' ' + intervalString + 's ago', intervalNumber*vertexNumber*(.5) + ' ' + intervalString + 's ago', intervalNumber*vertexNumber*.25 + ' ' + intervalString + 's ago', 'Now']; // Replace with your own labels
    xLabels.forEach((label, index) => {
      const x = margin + (index / (xLabels.length - 1)) * chartWidth;
      const y = height - margin + 5;
      ctx.fillText(label, x, y);
    });

    // Draw Y-axis labels
    ctx.textAlign = 'right';
    ctx.textBaseline = 'middle';
    const yLabels = [minPrice, (minPrice + maxPrice) / 2, maxPrice]; // Replace with your own labels
    yLabels.forEach((label, index) => {
      const x = margin - 5;
      const y = getPriceY(label);
      ctx.fillText(label.toFixed(2), x, y);
    })
  }, [props.history]);

  return (<div class="individualCoin"><p id="coinName">{props.coin}</p><h1 id="coinPrice">Current Price: ${props.price}</h1><br/><canvas ref={canvasRef} width={800} height={400}></canvas></div>);
}

export default CoinCard;