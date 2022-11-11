export const getItems = async () => {
  const reqArr = [
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1&sparkline=false&price_change_percentage=1h%2C24h%2C7d",
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=2&sparkline=false&price_change_percentage=1h%2C24h%2C7d",
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=3&sparkline=false&price_change_percentage=1h%2C24h%2C7d",
  ];
  const data = Promise.all(
    reqArr.map((req) => {
      return fetch(req)
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          return data;
        });
    })
  ).then((items) => {
    return items.concat(...items);
  });
  return data;
};
