import classes from "./StatsCard.module.scss";
import { CurrencyCard } from "./CurrencyCard";
import { useSelector } from "react-redux";
import { useState } from "react";
import { FcFlashOn, FcRightDown, FcRightUp } from "react-icons/fc";

export const StatsCard = (props) => {
  const type = props.type;
  let icon;
  let price = "price_change_24h";

  if (type === "trending") {
    price = "price_change_7d";
  }

  const [typeItems, setTypeItems] = useState(() => {
    if (type === "trending") {
      icon = <FcFlashOn fontSize="1.3rem" />;
      return "trendingItems";
    }
    if (type === "losers") {
      icon = <FcRightDown fontSize="1.3rem" />;

      return "losersItems";
    }
    if (type === "gainers") {
      icon = <FcRightUp fontSize="1.3rem" />;

      return "gainersItems";
    }
  });

  const items = useSelector((state) => state.currencies[typeItems]);

  const topItems = items.map((item, index) => {
    return (
      <CurrencyCard
        key={item.id}
        number={index + 1}
        image={item.image}
        name={item.name}
        alias={item.symbol}
        percentage={item[price]}
      />
    );
  });

  return (
    <div className={classes.box}>
      <div className={classes.titles}>
        <div className={classes["title-box"]}>
          <h2>{props.title}</h2>
          {icon}
        </div>
        <a href="/">More</a>
      </div>
      {topItems}
    </div>
  );
};
