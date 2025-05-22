import React, { useState } from 'react';
import { ArrowUpRight, ArrowDownRight, Briefcase, DollarSign, BarChart2, TrendingUp, Search } from 'lucide-react';
import { Stock } from '../../types/stock';
import { useAuth } from '../../context/AuthContext';
import { useStock } from '../../context/StockContext';
import { useNavigate } from 'react-router-dom';

interface StockDetailsProps {
  stock: Stock;
}

const StockDetails: React.FC<StockDetailsProps> = ({ stock }) => {
  const [quantity, setQuantity] = useState(1);
  const [transactionType, setTransactionType] = useState<'buy' | 'sell'>('buy');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const { user } = useAuth();
  const { buyStock, sellStock, portfolioStocks } = useStock();
  const navigate = useNavigate();
  
  const isPositive = stock.change >= 0;
  const total = quantity * stock.price;
  
  // Calculate owned shares for this stock
  const ownedShares = portfolioStocks
    .filter(t => t.symbol === stock.symbol)
    .reduce((total, transaction) => {
      if (transaction.type === 'buy') return total + transaction.quantity;
      if (transaction.type === 'sell') return total - transaction.quantity;
      return total;
    }, 0);
  
  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (value > 0) {
      setQuantity(value);
    } else {
      setQuantity(1);
    }
  };
  
  const handleTransaction = async () => {
    if (!user) {
      navigate('/login');
      return;
    }
    
    if (quantity <= 0) {
      setError('Quantity must be greater than zero');
      return;
    }
    
    if (transactionType === 'sell' && quantity > ownedShares) {
      setError(`You only own ${ownedShares} shares of ${stock.symbol}`);
      return;
    }
    
    setError('');
    setSuccess('');
    setIsSubmitting(true);
    
    try {
      if (transactionType === 'buy') {
        await buyStock(stock.symbol, quantity, stock.price);
        setSuccess(`Successfully purchased ${quantity} shares of ${stock.symbol}`);
      } else {
        await sellStock(stock.symbol, quantity, stock.price);
        setSuccess(`Successfully sold ${quantity} shares of ${stock.symbol}`);
      }
      // Reset form after successful transaction
      setQuantity(1);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const formatLargeNumber = (num: number) => {
    if (num >= 1000000000000) {
      return `$${(num / 1000000000000).toFixed(2)}T`;
    }
    if (num >= 1000000000) {
      return `$${(num / 1000000000).toFixed(2)}B`;
    }
    if (num >= 1000000) {
      return `$${(num / 1000000).toFixed(2)}M`;
    }
    return `$${num.toLocaleString()}`;
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      <div className="lg:w-2/3">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-4">
            <div>
              <h2 className="text-2xl font-bold">{stock.name}</h2>
              <p className="text-gray-500">{stock.symbol} • {stock.sector}</p>
            </div>
            <div className="mt-3 sm:mt-0 flex flex-col items-end">
              <p className="text-3xl font-bold">${stock.price.toFixed(2)}</p>
              <div className={`flex items-center ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                {isPositive ? (
                  <ArrowUpRight className="h-4 w-4 mr-1" />
                ) : (
                  <ArrowDownRight className="h-4 w-4 mr-1" />
                )}
                <span>{isPositive ? '+' : ''}{stock.change.toFixed(2)} ({stock.changePercent.toFixed(2)}%)</span>
              </div>
            </div>
          </div>

          <p className="text-gray-600 mb-6">{stock.description}</p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-gray-50 p-3 rounded-lg">
              <div className="flex items-center text-gray-500 mb-1">
                <BarChart2 className="h-4 w-4 mr-1" />
                <span className="text-sm">Volume</span>
              </div>
              <p className="font-semibold">{stock.volume.toLocaleString()}</p>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg">
              <div className="flex items-center text-gray-500 mb-1">
                <Briefcase className="h-4 w-4 mr-1" />
                <span className="text-sm">Market Cap</span>
              </div>
              <p className="font-semibold">{formatLargeNumber(stock.marketCap)}</p>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg">
              <div className="flex items-center text-gray-500 mb-1">
                <Search className="h-4 w-4 mr-1" />
                <span className="text-sm">P/E Ratio</span>
              </div>
              <p className="font-semibold">{stock.pe.toFixed(2)}</p>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg">
              <div className="flex items-center text-gray-500 mb-1">
                <DollarSign className="h-4 w-4 mr-1" />
                <span className="text-sm">Dividend</span>
              </div>
              <p className="font-semibold">{stock.dividend.toFixed(2)}%</p>
            </div>
          </div>
        </div>
      </div>

      <div className="lg:w-1/3">
        <div className="bg-white p-6 rounded-lg shadow-sm mb-4">
          <h3 className="text-lg font-semibold mb-4">Trade {stock.symbol}</h3>
          
          {user ? (
            <>
              <div className="mb-4">
                <div className="flex border border-gray-300 rounded-md overflow-hidden">
                  <button
                    className={`w-1/2 py-2 ${transactionType === 'buy' ? 'bg-[#0A2463] text-white' : 'bg-gray-100 text-gray-700'}`}
                    onClick={() => setTransactionType('buy')}
                  >
                    Buy
                  </button>
                  <button
                    className={`w-1/2 py-2 ${transactionType === 'sell' ? 'bg-[#0A2463] text-white' : 'bg-gray-100 text-gray-700'}`}
                    onClick={() => setTransactionType('sell')}
                    disabled={ownedShares <= 0}
                  >
                    Sell
                  </button>
                </div>
                {transactionType === 'sell' && ownedShares <= 0 && (
                  <p className="text-sm text-red-500 mt-1">You don't own any shares of {stock.symbol}</p>
                )}
              </div>
              
              <div className="mb-4">
                <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-1">
                  Quantity
                </label>
                <input
                  type="number"
                  id="quantity"
                  min="1"
                  value={quantity}
                  onChange={handleQuantityChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0A2463]"
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Market Price
                </label>
                <p className="text-lg font-semibold">${stock.price.toFixed(2)}</p>
              </div>
              
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Estimated {transactionType === 'buy' ? 'Cost' : 'Credit'}
                </label>
                <p className="text-xl font-bold">${total.toFixed(2)}</p>
              </div>
              
              {error && (
                <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-md">
                  {error}
                </div>
              )}
              
              {success && (
                <div className="mb-4 p-3 bg-green-50 text-green-700 rounded-md">
                  {success}
                </div>
              )}
              
              <button
                onClick={handleTransaction}
                disabled={isSubmitting || (transactionType === 'sell' && ownedShares <= 0)}
                className={`w-full py-3 rounded-md font-medium flex justify-center items-center
                  ${isSubmitting ? 'bg-gray-300 cursor-not-allowed' : transactionType === 'buy' 
                    ? 'bg-[#3E885B] hover:bg-[#2D6A45] text-white' 
                    : 'bg-[#0A2463] hover:bg-[#081C4E] text-white'}`}
              >
                {isSubmitting ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </span>
                ) : (
                  <>
                    {transactionType === 'buy' ? 'Buy ' : 'Sell '} 
                    {stock.symbol}
                  </>
                )}
              </button>
            </>
          ) : (
            <div className="text-center py-4">
              <p className="mb-4 text-gray-700">Log in to start trading {stock.symbol}</p>
              <button
                onClick={() => navigate('/login')}
                className="w-full py-2 bg-[#0A2463] text-white rounded-md hover:bg-[#081C4E] transition-colors"
              >
                Log In
              </button>
              <button
                onClick={() => navigate('/signup')}
                className="w-full mt-2 py-2 border border-[#0A2463] text-[#0A2463] rounded-md hover:bg-gray-50 transition-colors"
              >
                Sign Up
              </button>
            </div>
          )}
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Your Position</h3>
          {user ? (
            ownedShares > 0 ? (
              <>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Shares Owned:</span>
                  <span className="font-semibold">{ownedShares}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Current Value:</span>
                  <span className="font-semibold">${(ownedShares * stock.price).toFixed(2)}</span>
                </div>
              </>
            ) : (
              <p className="text-gray-500">You don't own any shares of {stock.symbol} yet.</p>
            )
          ) : (
            <p className="text-gray-500">Log in to view your position.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default StockDetails;