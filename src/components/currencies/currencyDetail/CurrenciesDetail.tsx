import dynamic from "next/dynamic";
import { CurrencyItem } from "../../../types/types";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";
import { useEffect } from "react";
import { fetchChartData } from "../../../store/currencies-actions";
import classes from "./CurrenciesDetail.module.scss";
import { LoadingSpinner } from "../../ui/loadingSpinner/LoadingSpinner";
import { CurrencyStats } from "./CurrencyStats";
import { NextSeo } from "next-seo";
import Link from "next/link";

const TradingViewChart = dynamic(() => import("./TradingViewChart"), {
  ssr: false,
});

export const CurrenciesDetail = ({ item }: { item: CurrencyItem }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { chartData, chartIsUpdating } = useSelector(
    (state: RootState) => state.currencies
  );

  useEffect(() => {
    dispatch(fetchChartData(item.id));
  }, [dispatch]);
  return (
    <>
      <NextSeo title={`${item.name} | Crypto Tracker App`} />
      <div className={classes.container}>
        <CurrencyStats item={item} />
        <div className={classes["chart-box"]}>
          <div id="chart">
            {chartIsUpdating ? (
              <LoadingSpinner />
            ) : chartData.length !== 0 ? (
              <>
                <TradingViewChart chartData={chartData} />
                <p className={classes["chart-info"]}>
                  The chart used comes from{" "}
                  <Link href="https://www.tradingview.com/" passHref>
                    <a target="_blank"> https://www.tradingview.com/</a>
                  </Link>
                </p>
              </>
            ) : (
              <p className="center">Faild load chart</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
