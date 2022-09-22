import dynamic from "next/dynamic";
import { CurrencyItem } from "../types/types";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { useEffect } from "react";
import { fetchChartData } from "../../store/currencies-actions";
import classes from "./CurrenciesDetail.module.scss";
import { LoadingSpinner } from "../ui/LoadingSpinner";

const TradingViewChart = dynamic(() => import("./TradingViewChart"), {
  ssr: false,
});

export const CurrenciesDetail = ({ item }: { item: CurrencyItem }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { chartData, chartIsUpdating } = useSelector(
    (state: RootState) => state.currencies
  );

  const {
    id,
    image,
    name,
    symbol,
    current_price,
    market_cap_rank,
    price_change_24h,
    market_cap,
    ath,
    ath_change_percentage,
    last_updated,
  } = item;
  const interNumberFormat = new Intl.NumberFormat("en-US");

  const timeStyle =
    price_change_24h <= 0
      ? `${classes.time} ${classes.decr}`
      : `${classes.time} ${classes.incr}`;
  const timeStyleAth =
    ath_change_percentage <= 0
      ? `${classes.time} ${classes.decr}`
      : `${classes.time} ${classes.incr}`;

  useEffect(() => {
    dispatch(fetchChartData(id));
  }, [dispatch]);

  return (
    <>
      <div className={classes.container}>
        <div className={classes["box-container"]}>
          <div className={classes.box}>
            <div className={classes.data}>
              <img src={image} />
              <p>{name}</p>
              <p>{symbol.toUpperCase()}</p>
            </div>

            <p className={classes.rank}>Rank #{market_cap_rank}</p>
            <div className={classes["second-data"]}>
              <p className={classes.price}>
                {interNumberFormat.format(current_price)}$
              </p>
              <p className={timeStyle}>{price_change_24h.toFixed(2)}%</p>
            </div>
          </div>
          <div className={classes["detail-box"]}>
            <p>
              Market Cap: <span>${interNumberFormat.format(market_cap)}</span>
            </p>
            <p>
              All Time High: <span>${interNumberFormat.format(ath)}</span>
            </p>
            <p>
              Price change from ATH:
              <span className={timeStyleAth}>
                {interNumberFormat.format(ath_change_percentage)} %
              </span>
            </p>
            <p>
              Last update date (UTC):
              <span className={classes.date}>
                {last_updated.replace(
                  /(\d{4})-(\d{2})-(\d{2})T(.{8}).*/,
                  "$2.$3.$1, $4"
                )}
              </span>
            </p>
          </div>
          <div id="chart">
            {chartIsUpdating ? (
              <LoadingSpinner />
            ) : chartData.length !== 0 ? (
              <>
                <TradingViewChart chartData={chartData} />
                <p className={classes["chart-info"]}>
                  The chart is library used from{" "}
                  <a href="https://www.tradingview.com/">
                    https://www.tradingview.com/
                  </a>
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
