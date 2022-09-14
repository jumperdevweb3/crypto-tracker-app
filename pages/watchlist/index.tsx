import { useSelector, useDispatch } from "react-redux";
import { CoinCard } from "../../components/cards/coinCard/CoinCard";
import Link from "next/link";
import { fetchCurrenciesData } from "../../store/currencies-actions";
import { useEffect } from "react";
import { watchlistActions } from "../../store/watchlist-slice";
//types
import { AppDispatch } from "../../store";
import { RootState } from "../../store";
import { CurrencyItem } from "../../components/types/types";

export default function WatchlistPage() {
  const dispatch = useDispatch<AppDispatch>();

  const data = useSelector((state: RootState) => state.watchlist.watchItems);

  useEffect(() => {
    const local = localStorage.getItem("watchlist");
    if (local !== null) {
      dispatch(watchlistActions.setItem(JSON.parse(local)));
    }
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem("watchlist", JSON.stringify(data));
  }, [data]);

  return (
    <>
      {data.length !== 0 && (
        <>
          <h2 className="center-item">Your watch list items.</h2>
          {data.map((item: CurrencyItem) => {
            return <CoinCard key={item.id} item={item} />;
          })}
        </>
      )}
      {data.length === 0 && (
        <p className="center-item xl">
          No items, you can add coin from <Link href="/">Home Page</Link> to
          your watchlist.
        </p>
      )}
    </>
  );
}
