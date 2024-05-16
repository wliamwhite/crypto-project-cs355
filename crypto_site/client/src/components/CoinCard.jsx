import React, { useEffect, useRef } from 'react';

function CoinCard(props) {


    const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const closePrices = (props.history).reverse();

    const width = canvas.width;
    const height = canvas.height;
    const margin = 20;
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
    ctx.beginPath();
    ctx.moveTo(margin, margin);
    ctx.lineTo(margin, height - margin);
    ctx.lineTo(width - margin, height - margin);
    ctx.stroke();

    // Draw the line chart
    ctx.beginPath();
    ctx.strokeStyle = '#007bff';
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
  }, [props.history]);

  return (<div class="individualCoin"><p id="coinName">{props.coin}</p><h1 id="coinPrice">Current Price: ${props.price}</h1><br/><canvas ref={canvasRef} width={800} height={400}></canvas></div>); 
}

export default CoinCard;