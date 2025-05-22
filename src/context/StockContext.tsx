import React, { createContext, useContext, useState, useEffect } from 'react';
import { stockService } from '../services/stockService';
import { Stock, StockTransaction } from '../types/stock';

interface StockContextType {
  trendingStocks: Stock[];
  portfolioStocks: StockTransaction[];
  loading: boolean;
  buyStock: (symbol: string, quantity: number, pricePerShare: number) => Promise<void>;
  sellStock: (symbol: string, quantity: number, pricePerShare: number) => Promise<void>;
  getStockBySymbol: (symbol: string) => Promise<Stock | null>;
}

const StockContext = createContext<StockContextType | undefined>(undefined);

export const StockProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [trendingStocks, setTrendingStocks] = useState<Stock[]>([]);
  const [portfolioStocks, setPortfolioStocks] = useState<StockTransaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrendingStocks = async () => {
      try {
        const stocks = await stockService.getTrendingStocks();
        setTrendingStocks(stocks);
      } catch (error) {
        console.error('Failed to fetch trending stocks:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTrendingStocks();
  }, []);

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const portfolio = await stockService.getPortfolio();
        setPortfolioStocks(portfolio);
      } catch (error) {
        console.error('Failed to fetch portfolio:', error);
      }
    };

    // Only fetch portfolio if we have a token in localStorage
    if (localStorage.getItem('token')) {
      fetchPortfolio();
    }
  }, []);

  const buyStock = async (symbol: string, quantity: number, pricePerShare: number) => {
    try {
      const transaction = await stockService.buyStock(symbol, quantity, pricePerShare);
      setPortfolioStocks(prev => [...prev, transaction]);
      return transaction;
    } catch (error) {
      console.error('Failed to buy stock:', error);
      throw error;
    }
  };

  const sellStock = async (symbol: string, quantity: number, pricePerShare: number) => {
    try {
      const transaction = await stockService.sellStock(symbol, quantity, pricePerShare);
      
      // Update portfolio after selling
      const updatedPortfolio = await stockService.getPortfolio();
      setPortfolioStocks(updatedPortfolio);
      
      return transaction;
    } catch (error) {
      console.error('Failed to sell stock:', error);
      throw error;
    }
  };

  const getStockBySymbol = async (symbol: string): Promise<Stock | null> => {
    try {
      return await stockService.getStockBySymbol(symbol);
    } catch (error) {
      console.error(`Failed to get stock with symbol ${symbol}:`, error);
      return null;
    }
  };

  return (
    <StockContext.Provider 
      value={{ 
        trendingStocks, 
        portfolioStocks, 
        loading, 
        buyStock, 
        sellStock, 
        getStockBySymbol 
      }}
    >
      {children}
    </StockContext.Provider>
  );
};

export const useStock = (): StockContextType => {
  const context = useContext(StockContext);
  if (context === undefined) {
    throw new Error('useStock must be used within a StockProvider');
  }
  return context;
};