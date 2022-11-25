import PriceTimeChange from "../../../cards/coinCard/price/PriceTimeChange";
import classes from "./PriceChangeTable.module.scss";

interface IProps {
  price_change_percentage_24h: number;
  price_change_percentage_7d: number;
  price_change_percentage_14d: number;
  price_change_percentage_30d: number;
  price_change_percentage_60d: number;
  price_change_percentage_200d: number;
  price_change_percentage_1y: number;
}
export const PriceChangeTable = ({ market_data }: { market_data: IProps }) => {
  const priceTable = [
    {
      title: "24h",
      price: market_data.price_change_percentage_24h,
    },
    {
      title: "7 days",
      price: market_data.price_change_percentage_7d,
    },
    {
      title: "14 days",
      price: market_data.price_change_percentage_14d,
    },
    {
      title: "30 days",
      price: market_data.price_change_percentage_30d,
    },
    {
      title: "60 days",
      price: market_data.price_change_percentage_60d,
    },
    {
      title: "1 year",
      price: market_data.price_change_percentage_1y,
    },
  ];

  const PriceTableContent = priceTable.map((item) => (
    <div className={classes["table-row"]} key={item.title}>
      <p className={classes["row-title"]}>{item.title}</p>
      <PriceTimeChange time={item.price} classes={classes} key={item.price} />
    </div>
  ));
  return (
    <div className={classes.container}>
      <div className={classes.table}>{PriceTableContent}</div>
    </div>
  );
};
