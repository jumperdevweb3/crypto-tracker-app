import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BiStar } from "react-icons/bi";
import { FcApproval } from "react-icons/fc";
import { useWindowSize } from "../../Hooks/use-windowSize";
import { watchlistActions } from "../../Store/watchlist-slice";
import { CoinModal } from "../Ui/Modals/CoinModal";
import classes from "./CoinData.module.scss";

export const CoinData = ({ item }) => {
  const [showDetail, setShowDetail] = useState(false);
  const { width } = useWindowSize();
  const dispatch = useDispatch();
  const interNumberFormat = new Intl.NumberFormat("en-US");
  const watchList = useSelector((state) => state.watchlist.watchItems);
  const existItem = watchList.find((watchItem) => {
    return watchItem.id === item.id;
  });
  let stateIcon = <BiStar color="#8d9904" fontSize="1.1rem" />;
  if (existItem) {
    stateIcon = <FcApproval fontSize="1.1rem" />;
  }
  const addToWatchlistHandler = () => {
    dispatch(watchlistActions.updateItems(item));
  };

  const showCoinDetailHandler = () => {
    setShowDetail((state) => !state);
  };

  const timeStyle1h =
    item.price_change_1h <= 0
      ? `${classes.time} ${classes.decr}`
      : `${classes.time} ${classes.incr}`;
  const timeStyle24h =
    item.price_change_24h <= 0
      ? `${classes.time} ${classes.decr}`
      : `${classes.time} ${classes.incr}`;
  const timeStyle7d =
    item.price_change_7d <= 0
      ? `${classes.time} ${classes.decr}`
      : `${classes.time} ${classes.incr}`;
  return (
    <div className={classes.coin}>
      <div className={classes.star}>
        <button className={classes.star} onClick={addToWatchlistHandler}>
          {stateIcon}
        </button>
      </div>
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
      <div className={timeStyle1h}>
        <p>{item.price_change_1h.toFixed(2)}%</p>
      </div>
      {width >= 768 && (
        <>
          <div className={timeStyle24h}>
            <p>{item.price_change_24h.toFixed(2)}%</p>
          </div>
          <div className={timeStyle7d}>
            <p>{item.price_change_7d.toFixed(2)}%</p>
          </div>
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
