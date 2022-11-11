export const getChart = async (id: string) => {
  const res = await fetch(
    `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=450&interval=daily`
  );
  const data: { prices: [] } = await res.json();
  const prices = data.prices;
  return prices;
};
