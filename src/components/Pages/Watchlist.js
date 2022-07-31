import { useSelector } from "react-redux";
import { CoinCard } from "../cards/coinCard/CoinCard";

export const Watchlist = () => {
  const data = useSelector((state) => state.watchlist.watchItems);

  return (
    <>
      {data.length !== 0 && (
        <>
          <h2 className="center-item">Your's watch list items.</h2>
          {data.map((item) => {
            return <CoinCard key={Math.random() * 100} item={item} />;
          })}
        </>
      )}
      {data.length === 0 && (
        <h2 className="center-item">
          No items, add some coin to your watchlist!
        </h2>
      )}
    </>
  );
};
