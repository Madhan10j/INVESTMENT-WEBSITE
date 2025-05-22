export interface HistoricalDataPoint {
  date: string;
  price: number;
}

export interface Stock {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
  marketCap: number;
  pe: number;
  dividend: number;
  sector: string;
  description: string;
  historicalData: HistoricalDataPoint[];
}

export interface StockTransaction {
  id: string;
  symbol: string;
  quantity: number;
  price: number;
  type: 'buy' | 'sell';
  date: string;
  total: number;
}