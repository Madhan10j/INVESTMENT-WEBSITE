import React, { useState } from 'react';
import { Search, TrendingUp, LineChart, Zap, DollarSign } from 'lucide-react';
import StockCard from '../components/stocks/StockCard';
import { useStock } from '../context/StockContext';

const HomePage: React.FC = () => {
  const { trendingStocks, loading } = useStock();
  const [searchQuery, setSearchQuery] = useState('');
  
  const filteredStocks = trendingStocks.filter(stock => 
    stock.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    stock.symbol.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="mb-12">
        <div className="bg-[#0A2463] rounded-xl overflow-hidden shadow-lg">
          <div className="p-8 md:p-12 lg:p-16">
            <div className="max-w-3xl">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
                Your Path to Financial Growth Starts Here
              </h1>
              <p className="text-blue-100 text-lg mb-8">
                Trade stocks with confidence on our secure platform. Get real-time market data and make informed investment decisions.
              </p>
              <div className="relative max-w-lg">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search for stocks..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-transparent rounded-md leading-5 bg-white/10 backdrop-blur-sm text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-300 transition duration-150 ease-in-out"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="mb-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <div className="h-12 w-12 bg-[#0A2463]/10 rounded-full flex items-center justify-center mb-4">
              <TrendingUp className="h-6 w-6 text-[#0A2463]" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Realtime Market Data</h3>
            <p className="text-gray-600">
              Stay ahead with real-time stock prices, market trends, and performance metrics.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <div className="h-12 w-12 bg-[#3E885B]/10 rounded-full flex items-center justify-center mb-4">
              <LineChart className="h-6 w-6 text-[#3E885B]" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Advanced Analytics</h3>
            <p className="text-gray-600">
              Make informed decisions with our powerful charting and analytical tools.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <div className="h-12 w-12 bg-[#0A2463]/10 rounded-full flex items-center justify-center mb-4">
              <Zap className="h-6 w-6 text-[#0A2463]" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Fast Execution</h3>
            <p className="text-gray-600">
              Execute trades quickly and securely with our streamlined trading platform.
            </p>
          </div>
        </div>
      </section>

      {/* Trending Stocks Section */}
      <section>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">
            {searchQuery ? 'Search Results' : 'Trending Stocks'}
          </h2>
          {!searchQuery && (
            <div className="flex items-center text-[#3E885B]">
              <TrendingUp className="h-5 w-5 mr-1" />
              <span className="font-medium">Market Movers</span>
            </div>
          )}
        </div>
        
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#0A2463]"></div>
          </div>
        ) : filteredStocks.length === 0 ? (
          <div className="bg-white p-8 rounded-lg shadow-sm text-center">
            <DollarSign className="h-12 w-12 mx-auto text-gray-400 mb-4" />
            <h3 className="text-xl font-semibold mb-2">No Results Found</h3>
            <p className="text-gray-500 mb-4">
              We couldn't find any stocks matching your search query.
            </p>
            <button 
              onClick={() => setSearchQuery('')}
              className="px-4 py-2 bg-[#0A2463] text-white rounded-md hover:bg-[#081C4E] transition-colors"
            >
              View All Stocks
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredStocks.map(stock => (
              <StockCard key={stock.symbol} stock={stock} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default HomePage;