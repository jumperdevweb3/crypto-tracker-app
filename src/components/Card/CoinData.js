import { Fragment } from "react";
import { useWindowSize } from "../../Hooks/use-windowSize";
import classes from "./CoinData.module.scss";

export const CoinData = (props) => {
  const { width } = useWindowSize();
  const {
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
  } = props;
  const interNumberFormat = new Intl.NumberFormat("en-US");
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
      <div className={classes.time}>
        <p>{price_change_1h.toFixed(2)}%</p>
      </div>
      {width >= 768 && (
        <Fragment>
          <div className={classes.time}>
            <p>{price_change_24h.toFixed(2)}%</p>
          </div>
          <div className={classes.time}>
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
