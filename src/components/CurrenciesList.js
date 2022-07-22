import { useEffect, useState } from "react";
import { useFetchData } from "../Hooks/use-fetchData";
import { CurrenciesOptions } from "./CurrenciesOptions";
import { CoinData } from "./Card/CoinData";
import { LoadingSpinner } from "./Ui/LoadingSpinner";

export const CurrenciesList = () => {
  const [fetchedData, setFetchedData] = useState([]);

  const data = useFetchData(
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=1&page=1&sparkline=false&price_change_percentage=1h%2C24h%2C7d"
  );
  useEffect(() => {
    const getData = async () => {
      await data;
      data.then(function (value) {
        setFetchedData(value);
        console.log(value);
      });
    };
    getData();
  }, []);

  const items = fetchedData.map((item) => {
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

    return (
      <CoinData
        key={item.id}
        image={image}
        name={name}
        symbol={symbol}
        current_price={current_price}
        market_cap_rank={market_cap_rank}
        price_change_1h={price_change_percentage_1h_in_currency}
        price_change_24h={price_change_percentage_24h_in_currency}
        price_change_7d={price_change_percentage_7d_in_currency}
        market_cap={market_cap}
        total_volume={total_volume}
      />
    );
  });
  return (
    <div className="market-list">
      <CurrenciesOptions />
      {items}
      <button>Fetch data </button>
    </div>
  );
};
