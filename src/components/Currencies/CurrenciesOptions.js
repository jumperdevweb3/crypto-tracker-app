import { useWindowSize } from "../../Hooks/use-windowSize";
import { currenciesActions } from "../../Store/currencies-slice";
import { useDispatch, useSelector } from "react-redux";
import classes from "./CurrenciesOptions.module.scss";

export const CurrenciesOptions = () => {
  const dispatch = useDispatch();
  const { width } = useWindowSize();
  const sortType = useSelector((state) => state.currencies.sortActive.sortType);
  // const currentType = useSelector(
  //   (state) => state.currencies.sortActive.sortBy
  // );
  const sortByRankHandler = (name) => {
    return () => {
      dispatch(
        currenciesActions.updateSort({
          sortType: sortType === "ascending" ? "descending" : "ascending",
          sortBy: name,
        })
      );
    };
  };
  // if (currentType) {
  //   const active = `${classes["option-btn"]} ${classes["active"]}`;
  // }
  return (
    <div className={classes.options}>
      <div></div>
      <div className={classes.rank}>
        <button
          className={classes["option-btn"]}
          onClick={sortByRankHandler("market_cap_rank")}
        >
          #
        </button>
        {/* <span>^</span> */}
      </div>
      <div className={classes.name}>
        <p>Name</p>
        {/* <span>^</span> */}
      </div>
      <div className={classes.price}>
        <button
          className={classes["option-btn"]}
          onClick={sortByRankHandler("current_price")}
        >
          Price
        </button>
        {/* <span>^</span> */}
      </div>
      <div className={classes.time}>
        <button
          className={classes["option-btn"]}
          onClick={sortByRankHandler("price_change_1h")}
        >
          1h %
        </button>
        {/* <span>^</span> */}
      </div>
      {width >= 768 && (
        <>
          <div className={classes.time}>
            <button
              className={classes["option-btn"]}
              onClick={sortByRankHandler("price_change_24h")}
            >
              24h %
            </button>
            {/* <span>^</span> */}
          </div>
          <div className={classes.time}>
            <button
              className={classes["option-btn"]}
              onClick={sortByRankHandler("price_change_7d")}
            >
              7d %
            </button>
            {/* <span>^</span> */}
          </div>
        </>
      )}
      {width >= 1024 && (
        <>
          <div className={classes["market-cap"]}>
            <button
              className={classes["option-btn"]}
              onClick={sortByRankHandler("market_cap")}
            >
              Market Cap
            </button>
            {/* <span>^</span> */}
          </div>
          <div className={classes.volume}>
            <button
              className={classes["option-btn"]}
              onClick={sortByRankHandler("total_volume")}
            >
              Total Volume
            </button>
            {/* <span>^</span> */}
          </div>
        </>
      )}
    </div>
  );
};
