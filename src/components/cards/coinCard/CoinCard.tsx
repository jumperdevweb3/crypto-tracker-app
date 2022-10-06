import { useDispatch } from "react-redux";
import classes from "./CoinCard.module.scss";
import { watchlistActions } from "../../../store/watchlist-slice";
import { PriceTimeChange } from "./PriceTimeChange";
import { WatchlistButton } from "./WatchlistButton";
import Link from "next/link";
//types
import { CurrencyItem } from "../../../types/types";
import { AppDispatch } from "../../../store/store";

export const CoinCard = ({ item }: { item: CurrencyItem }) => {
  const dispatch = useDispatch<AppDispatch>();
  const interNumberFormat = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });
  const addToWatchlistHandler = () => {
    dispatch(watchlistActions.updateItems(item));
  };

  return (
    <div className={classes.coin}>
      <Link href={`/currency/${item.id}`}>
        <div className={classes.overlay}></div>
      </Link>
      <WatchlistButton
        classes={classes}
        onClick={addToWatchlistHandler}
        id={item.id}
      />
      <div className={classes.rank}>
        <p>{item.market_cap_rank}</p>
      </div>
      <div className={classes.name}>
        <img src={item.image} alt="" aria-hidden={true} />
        <p className={classes.title}>{item.name}</p>
      </div>
      <div className={classes.symbol}>
        <span>{item.symbol.toUpperCase()}</span>
      </div>
      <div className={classes.price}>
        <p>
          {interNumberFormat.format(item.current_price) === "$0.00"
            ? "$" + item.current_price.toFixed(9)
            : interNumberFormat.format(item.current_price)}
        </p>
      </div>
      <PriceTimeChange time={item.price_change_1h} classes={classes} />
      <PriceTimeChange time={item.price_change_24h} classes={classes} />
      <PriceTimeChange time={item.price_change_7d} classes={classes} />
      <div className={classes["market-cup"]}>
        <p>
          {interNumberFormat.format(item.market_cap) === "$0.00"
            ? item.market_cap.toFixed(7)
            : interNumberFormat.format(item.market_cap)}
        </p>
      </div>
      <div className={classes.volume}>
        <p>{interNumberFormat.format(item.total_volume)}</p>
      </div>
    </div>
  );
};
