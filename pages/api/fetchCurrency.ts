export const fetchCurrency = async (idPath: string) => {
  try {
    const res = await fetch(
      `https://api.coingecko.com/api/v3/coins/${idPath}?localization=false&tickers=false&market_data=true&community_data=true&developer_data=true&sparkline=false`
    );
    if (!res.ok) throw new Error("Problem with fetching data");
    const data = await res.json();
    return data;
  } catch (error) {
    return error;
  }
};
