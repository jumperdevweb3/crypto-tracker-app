import classes from "./TrendingStatsBox.module.scss";
import TrendingStatsCard from "../../cards/trendingStatsCard/TrendingStatsCard";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";

export const TrendingStatsBox = () => {
  const { losersItems, gainersItems, trendingItems } = useSelector(
    (state: RootState) => state.currencies
  );
  return (
    <div className={classes.container}>
      <TrendingStatsCard
        title="Trending (7d)"
        kind="trending"
        items={trendingItems}
      />
      <TrendingStatsCard
        title="Losers (24h)"
        kind="losers"
        items={losersItems}
      />
      <TrendingStatsCard
        title="Gainers (24h)"
        kind="gainers"
        items={gainersItems}
      />
    </div>
  );
};
