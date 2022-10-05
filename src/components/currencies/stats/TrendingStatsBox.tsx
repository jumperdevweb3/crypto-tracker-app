import classes from "./TrendingStatsBox.module.scss";
import { TrendingStatsCard } from "../../cards/trendingStatsCard/TrendingStatsCard";

export const TrendingStatsBox = () => {
  return (
    <div className={classes.container}>
      <TrendingStatsCard title="Trending (7d)" kind="trending" />
      <TrendingStatsCard title="Losers (24h)" kind="losers" />
      <TrendingStatsCard title="Gainers (24h)" kind="gainers" />
    </div>
  );
};
