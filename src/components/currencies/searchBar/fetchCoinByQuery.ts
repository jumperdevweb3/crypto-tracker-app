export const fetchCoinByQuery = async (query: string) => {
  const res = await fetch(
    `https://api.coingecko.com/api/v3/search/?query=${query}`
  );
  const data = await res.json();
  return data.coins;
};
