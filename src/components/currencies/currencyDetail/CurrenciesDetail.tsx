import { Coin } from "../../../types/types";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../store/store";
import { useEffect } from "react";
import { fetchChartData } from "../../../store/currencies/currencies-actions";
import classes from "./CurrenciesDetail.module.scss";
import { CurrencyStats } from "./currencyStats/CurrencyStats";
import { NextSeo } from "next-seo";

export const CurrenciesDetail = ({ item }: { item: Coin }) => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchChartData(item.id));
  }, [dispatch]);
  return (
    <>
      <NextSeo title={`${item.name} | Crypto Tracker App`} />
      <div className={classes.container}>
        <CurrencyStats item={item} />
      </div>
    </>
  );
};
