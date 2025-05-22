import React from 'react';
import { Wallet, BarChart2, Clock, ArrowRight } from 'lucide-react';
import { useStock } from '../context/StockContext';
import PortfolioTable from '../components/stocks/PortfolioTable';

const PortfolioPage: React.FC = () => {
  const { portfolioStocks, loading } = useStock();

  // Get unique transactions by date (for recent activity)
  const recentTransactions = [...portfolioStocks]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8">Portfolio Dashboard</h1>
      
      {loading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#0A2463]"></div>
        </div>
      ) : (
        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <div className="flex items-center mb-2">
                <div className="h-10 w-10 bg-[#0A2463]/10 rounded-full flex items-center justify-center mr-3">
                  <Wallet className="h-5 w-5 text-[#0A2463]" />
                </div>
                <h3 className="font-semibold text-gray-500">Total Assets</h3>
              </div>
              <p className="text-2xl font-bold">
                ${portfolioStocks
                  .filter(t => t.type === 'buy')
                  .reduce((sum, t) => sum + t.total, 0)
                  .toFixed(2)}
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <div className="flex items-center mb-2">
                <div className="h-10 w-10 bg-[#3E885B]/10 rounded-full flex items-center justify-center mr-3">
                  <BarChart2 className="h-5 w-5 text-[#3E885B]" />
                </div>
                <h3 className="font-semibold text-gray-500">Stocks Owned</h3>
              </div>
              <p className="text-2xl font-bold">
                {new Set(portfolioStocks.map(t => t.symbol)).size}
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <div className="flex items-center mb-2">
                <div className="h-10 w-10 bg-[#0A2463]/10 rounded-full flex items-center justify-center mr-3">
                  <Clock className="h-5 w-5 text-[#0A2463]" />
                </div>
                <h3 className="font-semibold text-gray-500">Transactions</h3>
              </div>
              <p className="text-2xl font-bold">{portfolioStocks.length}</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <PortfolioTable transactions={portfolioStocks} />
            </div>
            
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold">Recent Activity</h3>
              </div>
              
              {recentTransactions.length > 0 ? (
                <div className="divide-y divide-gray-200">
                  {recentTransactions.map(transaction => (
                    <div key={transaction.id} className="p-4 hover:bg-gray-50">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium">{transaction.symbol}</p>
                          <p className="text-sm text-gray-500">
                            {transaction.date} • {transaction.type === 'buy' ? 'Bought' : 'Sold'} {transaction.quantity} shares
                          </p>
                        </div>
                        <div className={`text-right ${transaction.type === 'buy' ? 'text-red-600' : 'text-green-600'}`}>
                          <p className="font-semibold">
                            {transaction.type === 'buy' ? '-' : '+'} ${transaction.total.toFixed(2)}
                          </p>
                          <p className="text-sm">${transaction.price.toFixed(2)}/share</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-6 text-center text-gray-500">
                  No recent activity
                </div>
              )}
              
              {recentTransactions.length > 0 && (
                <div className="p-4 border-t border-gray-200">
                  <a href="#" className="text-[#0A2463] hover:text-[#081C4E] font-medium flex items-center justify-center">
                    View All Transactions
                    <ArrowRight className="h-4 w-4 ml-1" />
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PortfolioPage;