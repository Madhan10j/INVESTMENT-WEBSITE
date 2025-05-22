import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { useStock } from '../context/StockContext';
import StockDetails from '../components/stocks/StockDetails';
import StockChart from '../components/stocks/StockChart';
import { Stock } from '../types/stock';

const StockDetailPage: React.FC = () => {
  const { symbol } = useParams<{ symbol: string }>();
  const { getStockBySymbol } = useStock();
  const [stock, setStock] = useState<Stock | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  useEffect(() => {
    const fetchStock = async () => {
      if (!symbol) return;
      
      try {
        setLoading(true);
        const stockData = await getStockBySymbol(symbol);
        
        if (!stockData) {
          setError(`Stock with symbol ${symbol} not found`);
          return;
        }
        
        setStock(stockData);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };
    
    fetchStock();
  }, [symbol, getStockBySymbol]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link to="/" className="inline-flex items-center text-[#0A2463] hover:underline">
          <ChevronLeft className="h-5 w-5 mr-1" />
          Back to Stocks
        </Link>
      </div>
      
      {loading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#0A2463]"></div>
        </div>
      ) : error ? (
        <div className="bg-red-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold text-red-700 mb-2">Error</h2>
          <p className="text-red-600">{error}</p>
          <Link 
            to="/" 
            className="mt-4 inline-block px-4 py-2 bg-[#0A2463] text-white rounded-md hover:bg-[#081C4E] transition-colors"
          >
            Back to Home
          </Link>
        </div>
      ) : stock ? (
        <div className="space-y-6">
          <StockDetails stock={stock} />
          <StockChart stock={stock} />
        </div>
      ) : null}
    </div>
  );
};

export default StockDetailPage;