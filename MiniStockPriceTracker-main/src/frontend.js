import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [selectedStock, setSelectedStock] = useState('tcs');
  const [stockData, setStockData] = useState([]);

  const fetchPrices = async () => {
    try {
      const response = await axios.get('https://mini-stock-price-tracker-backend-6dmxlhba1-gankit1.vercel.app/api/stock_prices');
      console.log(response, "responseee")
      setStockData(response.data);
    } catch (error) {
      console.error('Failed to fetch stock prices:', error);
    }
  };
  console.log(stockData, "stockData")
  useEffect(() => {
    fetchPrices();
    const interval = setInterval(fetchPrices, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <h1>Mini Stock Price Tracker</h1>
      <select
        value={selectedStock}
        onChange={(e) => setSelectedStock(e.target.value)}
      >
        <option value="tcs">TCS</option>
        <option value="reliance">RELIANCE</option>
        <option value="wipro">WIPRO</option>
        <option value="infosys">INFOSYS</option>

      </select>
      <p>Selected Stock: {selectedStock?.toUpperCase()}</p>
      <p>Current Price: ₹{stockData[selectedStock]?.toFixed(2)}</p>
    </div>
  );
}

export default App;
