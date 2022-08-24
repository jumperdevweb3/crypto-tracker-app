import React, { ReactNode } from "react";

export interface CurrencyItem {
  id: string;
  ath: number;
  market_cap_rank: number;
  image: string;
  name: string;
  symbol: string;
  current_price: number;
  price_change_1h: number;
  price_change_24h: number;
  price_change_7d: number;
  market_cap: number;
  total_volume: number;
  price_change_percentage_1h_in_currency: number;
  price_change_percentage_24h_in_currency: number;
  price_change_percentage_7d_in_currency: number;
  last_updated: string;
  ath_change_percentage: number;
}

export interface CurrenciesState {
  items: CurrencyItem[];
  trendingItems: CurrencyItem[];
  losersItems: CurrencyItem[];
  gainersItems: CurrencyItem[];
  chartData: CurrencyItem[];
  sortActive: {
    sortType: string;
    sortBy: string;
  };
}

export interface ModalTypes {
  onClose: () => void;
  children: ReactNode;
}
