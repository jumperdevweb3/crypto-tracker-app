import { Coin } from "../../../types/types";
import classes from "./CurrenciesDetail.module.scss";
import { CurrencyStats } from "./currencyStats/CurrencyStats";
import { NextSeo } from "next-seo";

export const CurrenciesDetail = ({ item }: { item: Coin }) => {
  return (
    <>
      <NextSeo title={`${item.name} | Crypto Tracker`} />
      <div className={classes.container}>
        <CurrencyStats item={item} />
      </div>
    </>
  );
};
