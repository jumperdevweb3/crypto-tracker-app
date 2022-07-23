import { useEffect, useState } from "react";
import { useFetchData } from "../Hooks/use-fetchData";
import { CurrenciesOptions } from "./CurrenciesOptions";
import { CoinData } from "./Card/CoinData";
import { LoadingSpinner } from "./Ui/LoadingSpinner";
import { getInfo } from "./Data/getInfo";

export const CurrenciesList = () => {
  const [fetchedData, setFetchedData] = useState([]);
  const [isLoading, setIsLoading] = useState();

  const data = useFetchData(
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=5&page=1&sparkline=false&price_change_percentage=1h%2C24h%2C7d"
  );
  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      const result = await data;
      setFetchedData(result);
      setIsLoading(false);
    };
    getData();
  }, []);

  const items = fetchedData.map((item) => {
    const info = getInfo(item);
    return <CoinData key={item.id} {...info} />;
  });

  return (
    <div className="market-list">
      <CurrenciesOptions />
      {items}
      {isLoading && <LoadingSpinner />}
    </div>
  );
};
