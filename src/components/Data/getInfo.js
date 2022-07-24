export const getInfo = (item) => {
  return {
    id: item.id,
    image: item.image,
    name: item.name,
    symbol: item.symbol,
    current_price: item.current_price,
    market_cap_rank: item.market_cap_rank,
    price_change_1h: item.price_change_percentage_1h_in_currency,
    price_change_24h: item.price_change_percentage_24h_in_currency,
    price_change_7d: item.price_change_percentage_7d_in_currency,
    market_cap: item.market_cap,
    total_volume: item.total_volume,
  };
};
