import { currenciesActions } from "@/store/currencies/currencies-slice";
import { watchlistActions } from "@/store/watchlist/watchlist-slice";
import { useDispatch, useSelector } from "react-redux";
import classes from "./CurrenciesSortMenu.module.scss";
import { FaAngleUp, FaAngleDown } from "react-icons/fa";
import { useState } from "react";
import { RootState } from "@/store/store";

export const CurrenciesSortMenu = ({ page }: { page: string }) => {
  const [sortActiveIcon, setSortActiveIcon] = useState({
    sortBy: "market_cap_rank",
    sortTypeIcon: <FaAngleDown />,
  });
  const dispatch = useDispatch();

  const sortType = useSelector((state: RootState) =>
    page === "home"
      ? state.currencies.sortActive.sortType
      : state.watchlist.sortActive.sortType
  );
  const actions = page === "home" ? currenciesActions : watchlistActions;

  const sortByRankHandler = (name: string) => {
    return () => {
      setSortActiveIcon({
        sortBy: name,
        sortTypeIcon:
          sortType === "ascending" ? <FaAngleUp /> : <FaAngleDown />,
      });
      dispatch(
        actions.updateSort({
          sortType: sortType === "ascending" ? "descending" : "ascending",
          sortBy: name,
        })
      );
    };
  };

  return (
    <div className={classes.options}>
      <div></div>
      <div className={classes.rank}>
        <button
          className={classes["option-btn"]}
          onClick={sortByRankHandler("market_cap_rank")}
        >
          #
          {sortActiveIcon.sortBy === "market_cap_rank" &&
            sortActiveIcon.sortTypeIcon}
        </button>
      </div>
      <div className={classes.name}>
        <button
          className={classes["option-btn"]}
          onClick={sortByRankHandler("name")}
        >
          Name
          {sortActiveIcon.sortBy === "name" && sortActiveIcon.sortTypeIcon}
        </button>
      </div>
      <div></div>
      <div className={classes.price}>
        <button
          className={classes["option-btn"]}
          onClick={sortByRankHandler("current_price")}
        >
          Price{" "}
          {sortActiveIcon.sortBy === "current_price" &&
            sortActiveIcon.sortTypeIcon}
        </button>
      </div>
      <div className={classes.time}>
        <button
          className={classes["option-btn"]}
          onClick={sortByRankHandler("price_change_1h")}
        >
          1h %{" "}
          {sortActiveIcon.sortBy === "price_change_1h" &&
            sortActiveIcon.sortTypeIcon}
        </button>
      </div>
      <div className={classes.time}>
        <button
          className={classes["option-btn"]}
          onClick={sortByRankHandler("price_change_24h")}
        >
          24h %{" "}
          {sortActiveIcon.sortBy === "price_change_24h" &&
            sortActiveIcon.sortTypeIcon}
        </button>
      </div>
      <div className={classes.time}>
        <button
          className={classes["option-btn"]}
          onClick={sortByRankHandler("price_change_7d")}
        >
          7d %{" "}
          {sortActiveIcon.sortBy === "price_change_7d" &&
            sortActiveIcon.sortTypeIcon}
        </button>
      </div>
      <div className={classes["market-cap"]}>
        <button
          className={classes["option-btn"]}
          onClick={sortByRankHandler("market_cap")}
        >
          Market Cap{" "}
          {sortActiveIcon.sortBy === "market_cap" &&
            sortActiveIcon.sortTypeIcon}
        </button>
      </div>
      <div className={classes.volume}>
        <button
          className={classes["option-btn"]}
          onClick={sortByRankHandler("total_volume")}
        >
          Total Volume
          {sortActiveIcon.sortBy === "total_volume" &&
            sortActiveIcon.sortTypeIcon}
        </button>
      </div>
    </div>
  );
};
