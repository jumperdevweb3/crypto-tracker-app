import { ReactNode } from "react";
import { ParsedUrlQuery } from "querystring";

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

export interface Modal {
  onClose: () => void;
  children: ReactNode;
}

export interface NewsItems {
  id: string;
  published_at: string;
  author: {
    name: string;
  };
  content: string;
  tags: string[] | string;
  title: string;
  url: string;
}

export interface NewsList {
  items: NewsItems[];
}

export type PropsChildren = {
  children: ReactNode;
};

export interface IParams extends ParsedUrlQuery {
  id: string;
}

export interface CompaniesItems {
  symbol: string;
  country: string;
  name: string;
  total_holdings: number;
  total_entry_value_usd: number;
  total_current_value_usd: number;
  percentage_of_total_supply: number;
}

export interface ExchangesItems {
  id: string;
  name: string;
  year_established: number;
  country: string;
  description: string;
  url: string;
  image: string;
  trust_score: number;
  trust_score_rank: number;
  trade_volume_24h_btc: number;
  trade_volume_24h_btc_normalized: number;
}

export interface NftsListItems {
  id: string;
  contract_address: string;
  name: string;
  asset_platform_id: string;
  symbol: string;
}

export interface Nft {
  id: string;
  contract_address: string;
  asset_platform_id: string;
  name: string;
  image: {
    small: string;
  };
  description: string;
  native_currency: string;
  floor_price: {
    native_currency: number;
    usd: number;
  };
  market_cap: {
    native_currency: number;
    usd: number;
  };
  volume_24h: {
    native_currency: number;
    usd: number;
  };
  number_of_unique_addresses: number;
  number_of_unique_addresses_24h_percentage_change: number;
  floor_price_in_usd_24h_percentage_change: number;
  total_supply: number;
}

export interface Coin {
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
