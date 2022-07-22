import { Fragment } from "react";
import { CurrenciesOptions } from "./CurrenciesOptions";
import { CoinData } from "./Card/CoinData";

export const CurrenciesList = () => {
  return (
    <div className="market-list">
      <CurrenciesOptions />
      <CoinData />
    </div>
  );
};
