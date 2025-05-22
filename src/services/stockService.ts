// Mock stock service - would be replaced with actual API calls in a real application

import { Stock, StockTransaction } from '../types/stock';

// Helper function to simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Mock stock data
const MOCK_STOCKS: Stock[] = [
  {
    symbol: 'AAPL',
    name: 'Apple Inc.',
    price: 178.72,
    change: 1.47,
    changePercent: 0.83,
    volume: 52619324,
    marketCap: 2800000000000,
    pe: 29.42,
    dividend: 0.92,
    sector: 'Technology',
    description: 'Apple Inc. designs, manufactures, and markets smartphones, personal computers, tablets, wearables, and accessories worldwide.',
    historicalData: [
      { date: '2023-01-01', price: 131.25 },
      { date: '2023-02-01', price: 143.80 },
      { date: '2023-03-01', price: 158.15 },
      { date: '2023-04-01', price: 165.02 },
      { date: '2023-05-01', price: 170.73 },
      { date: '2023-06-01', price: 180.95 },
      { date: '2023-07-01', price: 178.72 },
    ],
  },
  {
    symbol: 'MSFT',
    name: 'Microsoft Corporation',
    price: 381.53,
    change: 2.50,
    changePercent: 0.66,
    volume: 22588412,
    marketCap: 2840000000000,
    pe: 35.18,
    dividend: 1.10,
    sector: 'Technology',
    description: 'Microsoft Corporation develops, licenses, and supports software, services, devices, and solutions worldwide.',
    historicalData: [
      { date: '2023-01-01', price: 240.22 },
      { date: '2023-02-01', price: 252.75 },
      { date: '2023-03-01', price: 280.51 },
      { date: '2023-04-01', price: 305.05 },
      { date: '2023-05-01', price: 328.39 },
      { date: '2023-06-01', price: 357.80 },
      { date: '2023-07-01', price: 381.53 },
    ],
  },
  {
    symbol: 'GOOGL',
    name: 'Alphabet Inc.',
    price: 142.65,
    change: -0.35,
    changePercent: -0.24,
    volume: 20457854,
    marketCap: 1790000000000,
    pe: 27.43,
    dividend: 0,
    sector: 'Technology',
    description: 'Alphabet Inc. provides various products and platforms in the United States, Europe, the Middle East, Africa, the Asia-Pacific, Canada, and Latin America.',
    historicalData: [
      { date: '2023-01-01', price: 90.86 },
      { date: '2023-02-01', price: 95.58 },
      { date: '2023-03-01', price: 103.71 },
      { date: '2023-04-01', price: 108.22 },
      { date: '2023-05-01', price: 124.08 },
      { date: '2023-06-01', price: 133.74 },
      { date: '2023-07-01', price: 142.65 },
    ],
  },
  {
    symbol: 'AMZN',
    name: 'Amazon.com Inc.',
    price: 134.91,
    change: 1.05,
    changePercent: 0.78,
    volume: 39531215,
    marketCap: 1380000000000,
    pe: 104.58,
    dividend: 0,
    sector: 'Consumer Cyclical',
    description: 'Amazon.com, Inc. engages in the retail sale of consumer products and subscriptions in North America and internationally.',
    historicalData: [
      { date: '2023-01-01', price: 85.82 },
      { date: '2023-02-01', price: 93.76 },
      { date: '2023-03-01', price: 103.29 },
      { date: '2023-04-01', price: 106.96 },
      { date: '2023-05-01', price: 120.58 },
      { date: '2023-06-01', price: 129.96 },
      { date: '2023-07-01', price: 134.91 },
    ],
  },
  {
    symbol: 'TSLA',
    name: 'Tesla, Inc.',
    price: 215.49,
    change: -4.36,
    changePercent: -1.98,
    volume: 103858472,
    marketCap: 684000000000,
    pe: 52.31,
    dividend: 0,
    sector: 'Consumer Cyclical',
    description: 'Tesla, Inc. designs, develops, manufactures, leases, and sells electric vehicles, and energy generation and storage systems.',
    historicalData: [
      { date: '2023-01-01', price: 123.18 },
      { date: '2023-02-01', price: 189.98 },
      { date: '2023-03-01', price: 207.46 },
      { date: '2023-04-01', price: 160.31 },
      { date: '2023-05-01', price: 203.93 },
      { date: '2023-06-01', price: 256.60 },
      { date: '2023-07-01', price: 215.49 },
    ],
  },
  {
    symbol: 'JPM',
    name: 'JPMorgan Chase & Co.',
    price: 157.61,
    change: 1.28,
    changePercent: 0.82,
    volume: 9125463,
    marketCap: 460000000000,
    pe: 11.73,
    dividend: 4.20,
    sector: 'Financial Services',
    description: 'JPMorgan Chase & Co. operates as a financial services company worldwide.',
    historicalData: [
      { date: '2023-01-01', price: 134.12 },
      { date: '2023-02-01', price: 138.73 },
      { date: '2023-03-01', price: 130.16 },
      { date: '2023-04-01', price: 138.92 },
      { date: '2023-05-01', price: 140.47 },
      { date: '2023-06-01', price: 145.44 },
      { date: '2023-07-01', price: 157.61 },
    ],
  },
];

// Mock portfolio data
let MOCK_PORTFOLIO: StockTransaction[] = [
  {
    id: '1',
    symbol: 'AAPL',
    quantity: 10,
    price: 165.35,
    type: 'buy',
    date: '2023-03-15',
    total: 1653.50,
  },
  {
    id: '2',
    symbol: 'MSFT',
    quantity: 5,
    price: 305.17,
    type: 'buy',
    date: '2023-04-10',
    total: 1525.85,
  },
  {
    id: '3',
    symbol: 'GOOGL',
    quantity: 8,
    price: 110.25,
    type: 'buy',
    date: '2023-04-22',
    total: 882.00,
  }
];

export const stockService = {
  async getTrendingStocks(): Promise<Stock[]> {
    await delay(800); // Simulate network delay
    return MOCK_STOCKS;
  },
  
  async getStockBySymbol(symbol: string): Promise<Stock | null> {
    await delay(500); // Simulate network delay
    const stock = MOCK_STOCKS.find(s => s.symbol === symbol);
    return stock || null;
  },
  
  async getPortfolio(): Promise<StockTransaction[]> {
    await delay(700); // Simulate network delay
    
    // In a real app, this would be filtered by user ID from JWT
    return MOCK_PORTFOLIO;
  },
  
  async buyStock(symbol: string, quantity: number, pricePerShare: number): Promise<StockTransaction> {
    await delay(1000); // Simulate network delay
    
    const stock = MOCK_STOCKS.find(s => s.symbol === symbol);
    
    if (!stock) {
      throw new Error(`Stock with symbol ${symbol} not found`);
    }
    
    const transaction: StockTransaction = {
      id: String(Date.now()),
      symbol,
      quantity,
      price: pricePerShare,
      type: 'buy',
      date: new Date().toISOString().split('T')[0],
      total: quantity * pricePerShare,
    };
    
    // Add to portfolio
    MOCK_PORTFOLIO.push(transaction);
    
    return transaction;
  },
  
  async sellStock(symbol: string, quantity: number, pricePerShare: number): Promise<StockTransaction> {
    await delay(1000); // Simulate network delay
    
    // Check if user owns the stock
    const ownedStock = MOCK_PORTFOLIO.filter(t => t.symbol === symbol && t.type === 'buy')
      .reduce((total, transaction) => total + transaction.quantity, 0) -
      MOCK_PORTFOLIO.filter(t => t.symbol === symbol && t.type === 'sell')
      .reduce((total, transaction) => total + transaction.quantity, 0);
    
    if (ownedStock < quantity) {
      throw new Error(`You don't own enough ${symbol} shares to sell ${quantity}`);
    }
    
    const transaction: StockTransaction = {
      id: String(Date.now()),
      symbol,
      quantity,
      price: pricePerShare,
      type: 'sell',
      date: new Date().toISOString().split('T')[0],
      total: quantity * pricePerShare,
    };
    
    // Add to portfolio
    MOCK_PORTFOLIO.push(transaction);
    
    return transaction;
  },
};