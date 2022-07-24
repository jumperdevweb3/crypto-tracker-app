import { Fragment } from "react";
import { useWindowSize } from "../../Hooks/use-windowSize";
import classes from "./CoinData.module.scss";

export const CoinData = ({
  image,
  name,
  symbol,
  current_price,
  market_cap_rank,
  price_change_1h,
  price_change_24h,
  price_change_7d,
  market_cap,
  total_volume,
}) => {
  const { width } = useWindowSize();

  const interNumberFormat = new Intl.NumberFormat("en-US");

  const timeStyle1h =
    price_change_1h <= 0
      ? `${classes.time} ${classes.decr}`
      : `${classes.time} ${classes.incr}`;
  const timeStyle24h =
    price_change_24h <= 0
      ? `${classes.time} ${classes.decr}`
      : `${classes.time} ${classes.incr}`;
  const timeStyle7d =
    price_change_7d <= 0
      ? `${classes.time} ${classes.decr}`
      : `${classes.time} ${classes.incr}`;

  return (
    <div className={classes.coin}>
      <div className={classes.rank}>
        <p>{market_cap_rank}</p>
      </div>
      <div className={classes.name}>
        <img src={image} alt="" />
        <p>{name}</p>
        <span>{symbol.toUpperCase()}</span>
      </div>
      <div className={classes.price}>
        <p>${interNumberFormat.format(current_price)}</p>
      </div>
      <div className={timeStyle1h}>
        <p>{price_change_1h.toFixed(2)}%</p>
      </div>
      {width >= 768 && (
        <Fragment>
          <div className={timeStyle24h}>
            <p>{price_change_24h.toFixed(2)}%</p>
          </div>
          <div className={timeStyle7d}>
            <p>{price_change_7d.toFixed(2)}%</p>
          </div>
        </Fragment>
      )}
      {width >= 1024 && (
        <Fragment>
          <div className={classes["market-cup"]}>
            <p>${interNumberFormat.format(market_cap)}</p>
          </div>
          <div className={classes.volume}>
            <p>${interNumberFormat.format(total_volume)}</p>
          </div>
        </Fragment>
      )}
    </div>
  );
};
