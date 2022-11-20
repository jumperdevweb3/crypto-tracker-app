import { Coin } from "../../../../types/types";
import PriceTimeChange from "../../../cards/coinCard/price/PriceTimeChange";
import classes from "./PriceChangeTable.module.scss";

export const PriceChangeTable = ({ item }: { item: Coin }) => {
  const prices = [
    item.market_data.price_change_percentage_24h,
    item.market_data.price_change_percentage_7d,
    item.market_data.price_change_percentage_14d,
    item.market_data.price_change_percentage_30d,
    item.market_data.price_change_percentage_60d,
    item.market_data.price_change_percentage_1y,
  ];
  const PriceContent = prices.map((price) => (
    <PriceTimeChange time={price} classes={classes} />
  ));
  const titles = ["24 h", "7 days", "14 days", "30 days", "60 days", "1 year"];
  const TitlesContent = titles.map((title) => (
    <p className={classes.title}>{title}</p>
  ));
  return (
    <div className={classes.container}>
      <div className={classes["title-row"]}>{TitlesContent}</div>
      <div className={classes["value-row"]}>{PriceContent}</div>
    </div>
  );
};
