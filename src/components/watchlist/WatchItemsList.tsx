import { ICurrencyItem } from "../../types/types";
import CoinCard from "../cards/coinCard/CoinCard";
import { CurrenciesSortMenu } from "../currencies/currenciesList/currenciesSortMenu/CurrenciesSortMenu";
import classes from "../currencies/currenciesList/CurrenciesList.module.scss";

export const WatchItemsList = ({ items }: { items: ICurrencyItem[] }) => {
  const ItemsList = items.map((item) => {
    return <CoinCard key={item.id} item={item} />;
  });
  return (
    <>
      <h2 className="center-item">
        Your <span>watchlist</span> items.
      </h2>
      <div className={classes["market-list"]}>
        <CurrenciesSortMenu page={"watchlist"} />
        {ItemsList}
      </div>
    </>
  );
};
