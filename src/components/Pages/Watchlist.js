import { useSelector } from "react-redux";
import { CoinCard } from "../cards/coinCard/CoinCard";

export const Watchlist = () => {
  const data = useSelector((state) => state.watchlist.watchItems);

  return (
    <>
      {data.length !== 0 && (
        <>
          <h2 className="center-item">Your watch list items.</h2>
          {data.map((item) => {
            return <CoinCard key={item.id} item={item} />;
          })}
        </>
      )}
      {data.length === 0 && (
        <h2 className="center-item">
          No items, you can add coin from Home Page to Watchlist.
        </h2>
      )}
    </>
  );
};
