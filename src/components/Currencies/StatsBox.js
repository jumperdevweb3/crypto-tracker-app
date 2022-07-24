import classes from "./StatsBox.module.scss";
import { StatsCard } from "../Card/Stats/StatsCard";

export const StatsBox = () => {
  return (
    <div className={classes.container}>
      <StatsCard title="Trending (7d)" type="trending" />
      <StatsCard title="Losers (24h)" type="losers" />
      <StatsCard title="Gainers (24h)" type="gainers" />
    </div>
  );
};
