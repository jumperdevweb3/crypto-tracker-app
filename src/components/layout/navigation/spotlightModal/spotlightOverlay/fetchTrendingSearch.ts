export const getTrendingSearch = async () => {
  const res = await fetch("https://api.coingecko.com/api/v3/search/trending");
  const data = await res.json();
  return data.coins;
};
