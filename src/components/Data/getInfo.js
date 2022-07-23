export const getInfo = (item) => {
  const {
    image,
    name,
    symbol,
    current_price,
    market_cap_rank,
    price_change_percentage_1h_in_currency,
    price_change_percentage_24h_in_currency,
    price_change_percentage_7d_in_currency,
    market_cap,
    total_volume,
  } = item;
  return {
    image,
    name,
    symbol,
    current_price,
    market_cap_rank,
    price_change_1h: price_change_percentage_1h_in_currency,
    price_change_24h: price_change_percentage_24h_in_currency,
    price_change_7d: price_change_percentage_7d_in_currency,
    market_cap,
    total_volume,
  };
};
