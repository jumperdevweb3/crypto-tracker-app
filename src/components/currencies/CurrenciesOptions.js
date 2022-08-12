import { useWindowSize } from "../../hooks/use-windowSize";
import { currenciesActions } from "../../store/currencies-slice";
import { useDispatch, useSelector } from "react-redux";
import classes from "./CurrenciesOptions.module.scss";

export const CurrenciesOptions = () => {
  const dispatch = useDispatch();
  const { width } = useWindowSize();
  const sortType = useSelector((state) => state.currencies.sortActive.sortType);

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
      </div>
      <div className={classes.name}>
        <button
          className={classes["option-btn"]}
          onClick={sortByRankHandler("name")}
        >
          Name
        </button>
      </div>
      <div className={classes.price}>
        <button
          className={classes["option-btn"]}
          onClick={sortByRankHandler("current_price")}
        >
          Price
        </button>
      </div>
      <div className={classes.time}>
        <button
          className={classes["option-btn"]}
          onClick={sortByRankHandler("price_change_1h")}
        >
          1h %
        </button>
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
          </div>
          <div className={classes.time}>
            <button
              className={classes["option-btn"]}
              onClick={sortByRankHandler("price_change_7d")}
            >
              7d %
            </button>
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
          </div>
          <div className={classes.volume}>
            <button
              className={classes["option-btn"]}
              onClick={sortByRankHandler("total_volume")}
            >
              Total Volume
            </button>
          </div>
        </>
      )}
    </div>
  );
};
