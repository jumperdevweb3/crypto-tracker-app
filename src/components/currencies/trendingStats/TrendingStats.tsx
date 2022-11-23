import classes from "./TrendingStats.module.scss";
import TrendingStatsBox from "./trendingStatsBox/TrendingStatsBox";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { getItems } from "./fetchItems";
import { useEffect } from "react";
import { useQuery } from "react-query";
import { currenciesActions } from "../../../store/currencies/currencies-slice";
import { changeDataVariables } from "../currenciesList/changeDataVariables";
import { ICurrencyItem } from "../../../types/types";

export const TrendingStats = () => {
  const dispatch = useDispatch();
  const { data, status, isError, isLoading } = useQuery(
    "trendItems",
    getItems,
    {
      refetchInterval: 600000,
      refetchOnWindowFocus: false,
      keepPreviousData: true,
      refetchOnMount: false,
    }
  );
  const { losersItems, gainersItems, trendingItems } = useSelector(
    (state: RootState) => state.currencies
  );
  const itemsExist =
    status === "success" && !!data.length && !isError && !isLoading;

  useEffect(() => {
    if (status === "success") {
      const items = data.map((i) => changeDataVariables(i) as ICurrencyItem);
      dispatch(currenciesActions.setTrends(items));
    }
  }, [status, data]);
  return (
    <>
      {itemsExist && (
        <div className={classes.container}>
          <h2 className={classes.title}>
            Gainers & Losers from <span>TOP 750</span>
          </h2>
          <div className={classes.wrapper}>
            <TrendingStatsBox
              title="Trending (7d)"
              kind="trending"
              items={trendingItems}
            />
            <TrendingStatsBox
              title="Losers (24h)"
              kind="losers"
              items={losersItems}
            />
            <TrendingStatsBox
              title="Gainers (24h)"
              kind="gainers"
              items={gainersItems}
            />
          </div>
        </div>
      )}
    </>
  );
};
