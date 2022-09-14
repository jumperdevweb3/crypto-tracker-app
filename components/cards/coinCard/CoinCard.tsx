import { useDispatch } from "react-redux";
import classes from "./CoinCard.module.scss";
import { useWindowSize } from "../../../hooks/use-windowSize";
import { watchlistActions } from "../../../store/watchlist-slice";
import { PriceTimeChange } from "./PriceTimeChange";
import { WatchlistButton } from "./WatchlistButton";
import Link from "next/link";
//types
import { CurrencyItem } from "../../types/types";
import { AppDispatch } from "../../../store";

export const CoinCard = ({ item }: { item: CurrencyItem }) => {
  const { width } = useWindowSize();
  const dispatch = useDispatch<AppDispatch>();
  const interNumberFormat = new Intl.NumberFormat("en-US");

  const addToWatchlistHandler = () => {
    dispatch(watchlistActions.updateItems(item));
  };

  // const showCoinDetailHandler = () => {
  //   setModalActive((state) => !state);
  //   if (!modalActive) {
  //     currencyDetail.classList.add("show");
  //   }
  //   if (modalActive) {
  //     currencyDetail.classList.remove("show");
  //   }
  // };

  return (
    <div className={classes.coin}>
      <Link href={`/${item.id}`}>
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
        {width >= 768 && <span>{item.symbol.toUpperCase()}</span>}
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
      {/* {modalActive && <CoinModal onClose={showCoinDetailHandler} item={item} />} */}
    </div>
  );
};
