export const getCurrenecies = async (page: number | string) => {
  const res = await fetch(
    `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=5&page=${page}&sparkline=false&price_change_percentage=1h%2C24h%2C7d`
  );
  const data = res.json();

  return data;
};
