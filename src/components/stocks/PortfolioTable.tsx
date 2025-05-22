import React from 'react';
import { Link } from 'react-router-dom';
import { StockTransaction } from '../../types/stock';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { useStock } from '../../context/StockContext';

interface PortfolioTableProps {
  transactions: StockTransaction[];
}

const PortfolioTable: React.FC<PortfolioTableProps> = ({ transactions }) => {
  const { trendingStocks } = useStock();
  
  // Group transactions by symbol
  const portfolioBySymbol = transactions.reduce((acc, transaction) => {
    const { symbol, quantity, type } = transaction;
    
    if (!acc[symbol]) {
      acc[symbol] = {
        symbol,
        quantity: 0,
        buyValue: 0,
        sellValue: 0,
      };
    }
    
    if (type === 'buy') {
      acc[symbol].quantity += quantity;
      acc[symbol].buyValue += transaction.total;
    } else {
      acc[symbol].quantity -= quantity;
      acc[symbol].sellValue += transaction.total;
    }
    
    return acc;
  }, {} as Record<string, { symbol: string; quantity: number; buyValue: number; sellValue: number }>);
  
  // Convert to array and calculate current values
  const portfolio = Object.values(portfolioBySymbol)
    .filter(item => item.quantity > 0)
    .map(item => {
      const stock = trendingStocks.find(s => s.symbol === item.symbol);
      const currentPrice = stock?.price || 0;
      const currentValue = item.quantity * currentPrice;
      const avgBuyPrice = (item.buyValue - item.sellValue) / item.quantity;
      const profit = currentValue - (avgBuyPrice * item.quantity);
      const profitPercent = ((currentValue / (avgBuyPrice * item.quantity)) - 1) * 100;
      
      return {
        ...item,
        currentPrice,
        currentValue,
        avgBuyPrice,
        profit,
        profitPercent,
      };
    });
  
  // Sort by current value (highest first)
  portfolio.sort((a, b) => b.currentValue - a.currentValue);
  
  // Calculate total portfolio value
  const totalValue = portfolio.reduce((sum, item) => sum + item.currentValue, 0);
  const totalCost = portfolio.reduce((sum, item) => sum + (item.avgBuyPrice * item.quantity), 0);
  const totalProfit = totalValue - totalCost;
  const totalProfitPercent = ((totalValue / totalCost) - 1) * 100;

  if (portfolio.length === 0) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-sm text-center">
        <h3 className="text-xl font-semibold mb-2">Your Portfolio</h3>
        <p className="text-gray-500 mb-4">You don't own any stocks yet.</p>
        <Link 
          to="/" 
          className="inline-block px-4 py-2 bg-[#0A2463] text-white rounded-md hover:bg-[#081C4E] transition-colors"
        >
          Browse Stocks
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-xl font-semibold">Your Portfolio</h3>
        <div className="mt-3 flex flex-col sm:flex-row sm:justify-between">
          <div>
            <p className="text-gray-500 text-sm">Total Value</p>
            <p className="text-2xl font-bold">${totalValue.toFixed(2)}</p>
          </div>
          <div className="mt-3 sm:mt-0">
            <p className="text-gray-500 text-sm">Total Profit/Loss</p>
            <div className={`flex items-center ${totalProfit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              <p className="text-xl font-semibold">
                {totalProfit >= 0 ? '+' : ''}{totalProfit.toFixed(2)} ({totalProfitPercent.toFixed(2)}%)
              </p>
              {totalProfit >= 0 ? (
                <ArrowUpRight className="h-5 w-5 ml-1" />
              ) : (
                <ArrowDownRight className="h-5 w-5 ml-1" />
              )}
            </div>
          </div>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Shares</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Avg. Price</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Current Price</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Market Value</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Profit/Loss</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {portfolio.map(item => (
              <tr key={item.symbol} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <Link to={`/stock/${item.symbol}`} className="font-medium text-[#0A2463] hover:underline">
                    {item.symbol}
                  </Link>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{item.quantity}</td>
                <td className="px-6 py-4 whitespace-nowrap">${item.avgBuyPrice.toFixed(2)}</td>
                <td className="px-6 py-4 whitespace-nowrap">${item.currentPrice.toFixed(2)}</td>
                <td className="px-6 py-4 whitespace-nowrap font-medium">${item.currentValue.toFixed(2)}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className={`flex items-center ${item.profit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {item.profit >= 0 ? (
                      <ArrowUpRight className="h-4 w-4 mr-1" />
                    ) : (
                      <ArrowDownRight className="h-4 w-4 mr-1" />
                    )}
                    <span>{item.profit >= 0 ? '+' : ''}{item.profit.toFixed(2)} ({item.profitPercent.toFixed(2)}%)</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PortfolioTable;