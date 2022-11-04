export const fetchCoinByQuery = async (query: string) => {
  try {
    const res = await fetch(
      `https://api.coingecko.com/api/v3/search/?query=${query}`
    );
    if (!res.ok) {
      throw new Error("Problem with fetch data");
    }
    const data = await res.json();
    return data.coins;
  } catch (error) {
    return error;
  }
};
