import classes from "./StatsCard.module.scss";
import { StatsCoinCard } from "./StatsCoinCard";
import { useSelector } from "react-redux";
import { useState } from "react";
import { FcFlashOn, FcRightDown, FcRightUp } from "react-icons/fc";
import { StatsModal } from "../../ui/modals/StatsModal";
import { RootState } from "../../../store";
const statsModal: any = document.getElementById("stats-modal");

export const StatsCard = ({ kind, title }: { kind: string; title: string }) => {
  const [modalActive, setModalActive] = useState(false);

  interface I {
    id: string;
    image: string;
    name: string;
    symbol: string;
    price: string;
  }

  let icon;
  let price = "price_change_24h";
  let filterType: [] | any;

  const items = useSelector((state: RootState) => {
    if (kind === "trending") return state.currencies.trendingItems;
    if (kind === "losers") return state.currencies.losersItems;
    if (kind === "gainers") return state.currencies.gainersItems;
  });

  if (kind === "trending") {
    price = "price_change_7d";
    icon = <FcFlashOn fontSize="1.3rem" />;
    filterType = items.filter(
      (item: { price_change_7d: number }) => item.price_change_7d > 0
    );
  }

  if (kind === "losers") {
    icon = <FcRightDown fontSize="1.3rem" />;
    filterType = items.filter(
      (item: { price_change_24h: number }) => item.price_change_24h <= 0
    );
  }
  if (kind === "gainers") {
    icon = <FcRightUp fontSize="1.3rem" />;
    filterType = items.filter(
      (item: { price_change_24h: number }) => item.price_change_24h > 0.01
    );
  }

  const topThreeView = filterType.slice(0, 3).map((item: I, index: number) => {
    return (
      <StatsCoinCard
        key={item.id}
        number={index + 1}
        image={item.image}
        name={item.name}
        alias={item.symbol}
        percentage={item[price as keyof I]}
      />
    );
  });
  const moreItems = filterType.map((item: I, index: number) => {
    return (
      <StatsCoinCard
        key={item.id}
        number={index + 1}
        image={item.image}
        name={item.name}
        alias={item.symbol}
        percentage={item[price as keyof I]}
      />
    );
  });
  const moreStatsHandler = () => {
    setModalActive((state) => !state);
    if (!modalActive) {
      statsModal.classList.add("show");
    }
    if (modalActive) {
      statsModal.classList.remove("show");
    }
  };

  let boxContent;
  if (filterType.length !== 0) {
    boxContent = modalActive && (
      <StatsModal onClose={moreStatsHandler}>{moreItems}</StatsModal>
    );
  }
  if (filterType.length === 0) {
    boxContent = <h3 className={classes.empty}>No {kind}</h3>;
  }
  return (
    <div className={classes.box}>
      <div className={classes.titles}>
        <div className={classes["title-box"]}>
          <h2>{title}</h2>
          {icon}
        </div>
        <button onClick={moreStatsHandler}>More</button>
      </div>
      {boxContent}

      {topThreeView}
    </div>
  );
};
