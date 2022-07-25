import { useState } from "react";
import { useDispatch } from "react-redux";
import { BiStar } from "react-icons/bi";
import { useWindowSize } from "../../Hooks/use-windowSize";
import { watchlistActions } from "../../Store/watchlist-slice";
import { CoinModal } from "../UI/Modals/CoinModal";
import classes from "./CoinData.module.scss";
export const CoinData = ({
  id,
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
  ath,
  last_updated,
  ath_change_percentage,
}) => {
  const [showDetail, setShowDetail] = useState(false);
  const { width } = useWindowSize();
  const dispatch = useDispatch();
  const interNumberFormat = new Intl.NumberFormat("en-US");
  // const data = useSelector((state) => state.watchlist.watchItems);
  // console.log("data");
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

  const addToWatchlistHandler = () => {
    dispatch(
      watchlistActions.updateItems({
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
      })
    );
  };
  const showCoinDetailHandler = () => {
    setShowDetail((state) => !state);
  };
  return (
    <div className={classes.coin}>
      <div className={classes.star}>
        <button className={classes.star} onClick={addToWatchlistHandler}>
          <BiStar color="#8d9904" fontSize="1.1rem" />
        </button>
      </div>
      <div className={classes.rank}>
        <p>{market_cap_rank}</p>
      </div>
      <div className={classes.name}>
        <img src={image} alt="" />
        <button
          className={classes["details-btn"]}
          onClick={showCoinDetailHandler}
        >
          {name}
        </button>
        <span>{symbol.toUpperCase()}</span>
      </div>
      <div className={classes.price}>
        <p>${interNumberFormat.format(current_price)}</p>
      </div>
      <div className={timeStyle1h}>
        <p>{price_change_1h.toFixed(2)}%</p>
      </div>
      {width >= 768 && (
        <>
          <div className={timeStyle24h}>
            <p>{price_change_24h.toFixed(2)}%</p>
          </div>
          <div className={timeStyle7d}>
            <p>{price_change_7d.toFixed(2)}%</p>
          </div>
        </>
      )}
      {width >= 1024 && (
        <>
          <div className={classes["market-cup"]}>
            <p>${interNumberFormat.format(market_cap)}</p>
          </div>
          <div className={classes.volume}>
            <p>${interNumberFormat.format(total_volume)}</p>
          </div>
        </>
      )}
      {showDetail && (
        <CoinModal
          id={id}
          onClose={showCoinDetailHandler}
          image={image}
          name={name}
          symbol={symbol}
          price={interNumberFormat.format(current_price)}
          rank={market_cap_rank}
          change1h={price_change_1h}
          change24h={price_change_24h}
          change7d={price_change_7d}
          marketCap={interNumberFormat.format(market_cap)}
          ath={interNumberFormat.format(ath)}
          athChange={ath_change_percentage.toFixed(2)}
          updated={last_updated.replace(
            /(\d{4})-(\d{2})-(\d{2})T(.{8}).*/,
            "$2 $3 $1, $4"
          )}
        />
      )}
    </div>
  );
};
