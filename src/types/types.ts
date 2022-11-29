import { ReactNode } from "react";
import { ParsedUrlQuery } from "querystring";

export interface ICurrencyItem {
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

export interface ModalProps {
  onClose: () => void;
  children?: ReactNode;
}

export type PropsChildren = {
  children: ReactNode;
};

export interface IParams extends ParsedUrlQuery {
  id: string;
}

export interface ICoin {
  error?: string;
  id: string;
  symbol: string;
  name: string;
  description: {
    en: string;
  };
  links: {
    homepage: string[];
    blockchain_site: string[];
    official_forum_url: string[];
  };
  genesis_date: string;
  market_data: {
    current_price: {
      usd: number;
    };
    ath: {
      usd: number;
    };
    ath_change_percentage: {
      usd: number;
    };
    ath_date: {
      eur: string;
    };
    market_cap_rank: number | string;
    market_cap: {
      usd: number;
    };
    total_supply: number;
    max_supply: number;
    last_updated: string;
    circulating_supply: number;
    price_change_percentage_24h: number;
    price_change_percentage_7d: number;
    price_change_percentage_14d: number;
    price_change_percentage_30d: number;
    price_change_percentage_60d: number;
    price_change_percentage_200d: number;
    price_change_percentage_1y: number;
  };
  image: {
    thumb: string;
  };
  community_data: {
    twitter_followers: number | null;
    reddit_accounts_active_48: number | null;
    reddit_subscribers: number | null;
    reddit_accounts_active_48h: number | null;
    reddit_average_posts_48h: number | null;
    reddit_average_comments_48h: number | null;
  };
}
