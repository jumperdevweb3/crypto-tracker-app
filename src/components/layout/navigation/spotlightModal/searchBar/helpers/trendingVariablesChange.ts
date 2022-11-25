interface ITrendingCoin {
  id: string;
  coin_id: number;
  name: string;
  symbol: string;
  market_cap_rank: number;
  thumb: string;
  slug: string;
}
export const trendingVariablesChange = (item: ITrendingCoin) => {
  return {
    id: item.id,
    name: item.name,
    thumb: item.thumb,
    symbol: item.symbol,
    market_cap_rank: item.market_cap_rank,
  };
};
