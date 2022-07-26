import { useSelector } from "react-redux";
import { CoinData } from "../Card/CoinData";

export const Watchlist = () => {
  const data = useSelector((state) => state.watchlist.watchItems);
  // const getData = localStorage.getItem("watchlist");
  // const datas = JSON.parse(getData);
  // console.log(data);
  return (
    <>
      {data.length !== 0 && (
        <h2 className="center-item">Your's watch list items.</h2>
      )}
      {data.length !== 0 &&
        data.map((item) => {
          return <CoinData key={Math.random() * 100} {...item} />;
        })}
      {data.length === 0 && (
        <h2 className="center-item">
          No items, add some coin to your watchlist!
        </h2>
      )}
    </>
  );
};
