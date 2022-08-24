import { useSelector } from "react-redux";
import { CoinCard } from "../cards/coinCard/CoinCard";
import { Link } from "react-router-dom";
//types
import { RootState } from "../../store";
import { CurrencyItem } from "../types/types";

export const Watchlist = () => {
  const data = useSelector((state: RootState) => state.watchlist.watchItems);

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
          No items, you can add coin from <Link to="/">Home Page</Link> to your
          watchlist.
        </p>
      )}
    </>
  );
};
