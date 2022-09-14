import { TradingViewChart } from "./TradingViewChart";
//types
import { CurrencyItem } from "../types/types";
import classes from "./CurrenciesDetail.module.scss";

export const CurrenciesDetail = ({
  item,
}: {
  item: CurrencyItem | undefined;
}) => {
  if (typeof item === "undefined") return <h2>Faild load coin data</h2>;

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
          <div className={classes["other-box"]}>
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
              Last update date:
              <span className={classes.date}>
                {last_updated.replace(
                  /(\d{4})-(\d{2})-(\d{2})T(.{8}).*/,
                  "$2.$3.$1, $4"
                )}
              </span>
            </p>
          </div>
          {/* <div id="chart">{<TradingViewChart />}</div> */}
          <p className="center">Chart will be addes soon.</p>
        </div>
      </div>
    </>
  );
};
