import classes from "./StatsCard.module.scss";
import { CurrencyCard } from "./CurrencyCard";
import { useSelector } from "react-redux";
import { useState } from "react";
import { FcFlashOn, FcRightDown, FcRightUp } from "react-icons/fc";
import { StatsModal } from "../../ui/Modals/StatsModal";

export const StatsCard = (props) => {
  const [modalActive, setModalActive] = useState(false);

  const type = props.type;
  let icon;
  let price = "price_change_24h";
  let filterType;

  const items = useSelector((state) => state.currencies[type + "Items"]);

  if (type === "trending") {
    price = "price_change_7d";
    icon = <FcFlashOn fontSize="1.3rem" />;
    filterType = items.filter((item) => item.price_change_7d > 0);
  }

  if (type === "losers") {
    icon = <FcRightDown fontSize="1.3rem" />;
    filterType = items.filter((item) => item.price_change_24h <= 0);
  }
  if (type === "gainers") {
    icon = <FcRightUp fontSize="1.3rem" />;
    filterType = items.filter((item) => item.price_change_24h > 0.01);
  }

  const topThreeView = filterType.slice(0, 3).map((item, index) => {
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
  const moreItems = filterType.map((item, index) => {
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
  const moreStatsHandler = () => {
    setModalActive((state) => !state);
  };

  let content;
  if (filterType.length !== 0) {
    content = modalActive && (
      <StatsModal onClose={moreStatsHandler}>{moreItems}</StatsModal>
    );
  }
  if (filterType.length === 0) {
    content = <h3 className={classes.empty}>No {type}</h3>;
  }
  return (
    <div className={classes.box}>
      <div className={classes.titles}>
        <div className={classes["title-box"]}>
          <h2>{props.title}</h2>
          {icon}
        </div>
        <button onClick={moreStatsHandler}>More</button>
      </div>
      {content}

      {topThreeView}
    </div>
  );
};
