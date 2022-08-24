import classes from "./StatsBox.module.scss";
import { StatsCard } from "../cards/statsCard/StatsCard";

export const StatsBox = () => {
  return (
    <div className={classes.container}>
      <StatsCard title="Trending (7d)" kind="trending" />
      <StatsCard title="Losers (24h)" kind="losers" />
      <StatsCard title="Gainers (24h)" kind="gainers" />
    </div>
  );
};
