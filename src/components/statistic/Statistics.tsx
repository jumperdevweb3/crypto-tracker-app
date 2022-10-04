import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  fetchCompaniesData,
  fetchExchangesList,
  fetchNftList,
} from "../../store/statistic-actions";
import { Exchanges } from "./exchanges/Exchanges";
import { Companies } from "./companies/Companies";
import { AppDispatch } from "../../store/store";
import classes from "./Statistic.module.scss";
import { NftList } from "./nft/NftList";

export const Statistics = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchExchangesList());
    dispatch(fetchCompaniesData());
    dispatch(fetchNftList());
  }, [dispatch]);

  return (
    <div className={classes.statistic}>
      <Exchanges />
      <Companies />
      <NftList />
    </div>
  );
};
