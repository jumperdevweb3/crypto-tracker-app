import { Fragment } from "react";
import { useWindowSize } from "../../Hooks/use-windowSize";
import classes from "./CoinData.module.scss";

export const CoinData = () => {
  const { width } = useWindowSize();
  return (
    <div className={classes.coin}>
      <div className={classes.rank}>
        <p>1</p>
      </div>
      <div className={classes.name}>
        <img
          src="https://s2.coinmarketcap.com/static/img/coins/64x64/1.png"
          alt="asd"
        />
        <p>Bitcoin</p>
        <span>BTC</span>
      </div>
      <div className={classes.price}>
        <p>23,123,22</p>
      </div>
      <div className={classes.time}>
        <p>12 %</p>
      </div>
      {width >= 768 && (
        <Fragment>
          <div className={classes.time}>
            <p>24 %</p>
          </div>
          <div className={classes.time}>
            <p>73 %</p>
          </div>
        </Fragment>
      )}
      {width >= 1024 && (
        <Fragment>
          <div className={classes["market-cup"]}>
            <p>$440,653,780,866</p>
          </div>
          <div className={classes.volume}>
            <p>$30,752,532,795</p>
          </div>
        </Fragment>
      )}
    </div>
  );
};
