import { useSelector } from "react-redux";
import { CoinData } from "../Card/CoinData";

export const Watchlist = () => {
  const data = useSelector((state) => state.watchlist.watchItems);
  return (
    <>
      {data.map((item) => {
        return <CoinData key={Math.random() * 100} {...item} />;
      })}
    </>
  );
};
