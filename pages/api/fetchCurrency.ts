export const fetchCurrency = async (idPath: string) => {
  const res = await fetch(
    `https://api.coingecko.com/api/v3/coins/${idPath}?localization=false&tickers=false&market_data=true&community_data=true&developer_data=true&sparkline=false`
  );
  const data = res.json();
  return data;
};
