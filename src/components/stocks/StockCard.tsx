import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, ArrowDownRight, TrendingUp } from 'lucide-react';
import { Stock } from '../../types/stock';

interface StockCardProps {
  stock: Stock;
}

const StockCard: React.FC<StockCardProps> = ({ stock }) => {
  const isPositive = stock.change >= 0;

  return (
    <Link 
      to={`/stock/${stock.symbol}`} 
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 border border-gray-100"
    >
      <div className="p-5">
        <div className="flex justify-between items-start mb-3">
          <div>
            <h3 className="text-lg font-semibold">{stock.name}</h3>
            <p className="text-gray-500 text-sm">{stock.symbol}</p>
          </div>
          <div className={`flex items-center ${isPositive ? 'text-green-600' : 'text-red-600'} font-medium text-sm`}>
            {isPositive ? (
              <ArrowUpRight className="h-4 w-4 mr-1" />
            ) : (
              <ArrowDownRight className="h-4 w-4 mr-1" />
            )}
            {Math.abs(stock.changePercent).toFixed(2)}%
          </div>
        </div>
        
        <div className="flex justify-between items-end">
          <div>
            <p className="text-2xl font-bold">${stock.price.toFixed(2)}</p>
            <p className={`text-sm ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
              {isPositive ? '+' : ''}{stock.change.toFixed(2)}
            </p>
          </div>
          <div className="bg-gray-100 rounded-full p-2">
            <TrendingUp className="h-5 w-5 text-[#0A2463]" />
          </div>
        </div>
      </div>
      
      <div className="h-1 w-full bg-gray-100">
        <div 
          className={`h-full ${isPositive ? 'bg-green-500' : 'bg-red-500'}`} 
          style={{ width: `${Math.min(Math.abs(stock.changePercent) * 10, 100)}%` }}
        ></div>
      </div>
    </Link>
  );
};

export default StockCard;