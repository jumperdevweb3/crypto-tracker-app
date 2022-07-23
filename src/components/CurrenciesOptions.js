import { Fragment } from "react";
import { useWindowSize } from "../Hooks/use-windowSize";
import classes from "./CurrenciesOptions.module.scss";

export const CurrenciesOptions = () => {
  const { width } = useWindowSize();

  return (
    <div className={classes.options}>
      <div className={classes.rank}>
        <p>#</p>
        {/* <span>^</span> */}
      </div>
      <div className={classes.name}>
        <p>Name</p>
        {/* <span>^</span> */}
      </div>
      <div className={classes.price}>
        <p>Price</p>
        {/* <span>^</span> */}
      </div>
      <div className={classes.time}>
        <p>1h %</p>
        {/* <span>^</span> */}
      </div>
      {width >= 768 && (
        <Fragment>
          <div className={classes.time}>
            <p>24h %</p>
            {/* <span>^</span> */}
          </div>
          <div className={classes.time}>
            <p>7d %</p>
            {/* <span>^</span> */}
          </div>
        </Fragment>
      )}
      {width >= 1024 && (
        <Fragment>
          <div className={classes["market-cup"]}>
            <p>Market Cup</p>
            {/* <span>^</span> */}
          </div>
          <div className={classes.volume}>
            <p>Volume (24h)</p>
            {/* <span>^</span> */}
          </div>
        </Fragment>
      )}
    </div>
  );
};
