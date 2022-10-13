import classes from "./TrendingStatsCard.module.scss";
import TrendingCoinCard from "./TrendingCoinCard";
import { memo, useState } from "react";
import { FcFlashOn, FcRightDown, FcRightUp } from "react-icons/fc";
import { Modal } from "../../ui/modals/Modal";
//types
import { CurrencyItem } from "../../../types/types";

let trendingStatsModal: any;
if (process.browser) {
  trendingStatsModal = document.getElementById("stats-modal");
}
interface Props {
  kind: string;
  title: string;
  items: CurrencyItem[];
}
const TrendingStatsCard = ({ kind, title, items }: Props) => {
  const [modalActive, setModalActive] = useState(false);

  let icon;
  let filterType: CurrencyItem[] = [];

  const trending = kind === "trending";
  const losers = kind === "losers";
  const gainers = kind === "gainers";

  if (trending) {
    icon = <FcFlashOn fontSize="1.3rem" />;
    filterType = items.filter((item) => item.price_change_7d > 0);
  }
  if (losers) {
    icon = <FcRightDown fontSize="1.3rem" />;
    filterType = items.filter((item) => item.price_change_24h < 0);
  }
  if (gainers) {
    icon = <FcRightUp fontSize="1.3rem" />;
    filterType = items.filter((item) => item.price_change_24h > 0.01);
  }
  const topThreeView = filterType.slice(0, 3).map((item, index: number) => {
    const percentage = trending ? item.price_change_7d : item.price_change_24h;
    return (
      <TrendingCoinCard
        key={item.id}
        id={item.id}
        number={index + 1}
        image={item.image}
        name={item.name}
        alias={item.symbol}
        percentage={percentage}
      />
    );
  });
  const moreItems = filterType.map((item, index: number) => {
    const percentage = trending ? item.price_change_7d : item.price_change_24h;
    return (
      <TrendingCoinCard
        key={item.id}
        id={item.id}
        number={index + 1}
        image={item.image}
        name={item.name}
        alias={item.symbol}
        percentage={percentage}
      />
    );
  });
  const moreStatsHandler = () => {
    setModalActive((state) => !state);
    if (!modalActive) {
      trendingStatsModal.classList.add("show");
    }
    if (modalActive) {
      trendingStatsModal.classList.remove("show");
    }
  };

  let boxContent;
  if (filterType.length !== 0) {
    boxContent = modalActive && (
      <Modal onClose={moreStatsHandler} id="stats-modal">
        <h3>{title}</h3>
        {moreItems}
      </Modal>
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
        <button onClick={moreStatsHandler} disabled={!items.length && true}>
          More
        </button>
      </div>
      {boxContent}

      {topThreeView}
    </div>
  );
};

export default memo(TrendingStatsCard);
