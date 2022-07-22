import { Fragment } from "react";
import { StatsBox } from "../StatsBox";
import { CurrenciesList } from "../CurrenciesList";

export const Home = () => {
  return (
    <Fragment>
      <StatsBox />
      <CurrenciesList />
    </Fragment>
  );
};
