import { Fragment } from "react";
import { StatsBox } from "../Currencies/StatsBox";
import { CurrenciesList } from "../Currencies/CurrenciesList";

export const Home = () => {
  return (
    <Fragment>
      <StatsBox />
      <CurrenciesList />
    </Fragment>
  );
};
