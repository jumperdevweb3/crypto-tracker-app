import { useState } from "react";
import { useDispatch } from "react-redux";
import classes from "./CoinCard.module.scss";
import { useWindowSize } from "../../../hooks/use-windowSize";
import { watchlistActions } from "../../../store/watchlist-slice";
import { CoinModal } from "../../ui/modals/CoinModal";
import { PriceTimeChange } from "./PriceTimeChange";
import { WatchlistButton } from "./WatchlistButton";

const currencyDetail = document.getElementById("currency-detail");

export const CoinCard = ({ item }) => {
  const [showDetail, setShowDetail] = useState(false);
  const { width } = useWindowSize();
  const dispatch = useDispatch();
  const interNumberFormat = new Intl.NumberFormat("en-US");

  const addToWatchlistHandler = () => {
    dispatch(watchlistActions.updateItems(item));
  };

  const showCoinDetailHandler = () => {
    setShowDetail((state) => !state);
    if (!showDetail) {
      currencyDetail.classList.add("show");
    }
    if (showDetail) {
      currencyDetail.classList.remove("show");
    }
  };

  return (
    <div className={classes.coin}>
      <WatchlistButton
        classes={classes}
        onClick={addToWatchlistHandler}
        id={item.id}
      />
      <div className={classes.rank}>
        <p>{item.market_cap_rank}</p>
      </div>
      <div className={classes.name}>
        <img src={item.image} alt="" />
        <button
          className={classes["details-btn"]}
          onClick={showCoinDetailHandler}
        >
          {item.name}
        </button>
        <span>{item.symbol.toUpperCase()}</span>
      </div>
      <div className={classes.price}>
        <p>${interNumberFormat.format(item.current_price)}</p>
      </div>
      <PriceTimeChange time={item.price_change_1h} classes={classes} />
      {width >= 768 && (
        <>
          <PriceTimeChange time={item.price_change_24h} classes={classes} />
          <PriceTimeChange time={item.price_change_7d} classes={classes} />
        </>
      )}
      {width >= 1024 && (
        <>
          <div className={classes["market-cup"]}>
            <p>${interNumberFormat.format(item.market_cap)}</p>
          </div>
          <div className={classes.volume}>
            <p>${interNumberFormat.format(item.total_volume)}</p>
          </div>
        </>
      )}
      {showDetail && <CoinModal onClose={showCoinDetailHandler} item={item} />}
    </div>
  );
};
