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
import { Nfts } from "./nft/Nfts";
import Link from "next/link";

export const Statistics = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchExchangesList());
    dispatch(fetchCompaniesData());
    dispatch(fetchNftList());
  }, [dispatch]);

  return (
    <>
      <p className={classes.title}>
        <span>BETA</span> Statistic data from{" "}
        <Link href={"https://www.coingecko.com/en/api/documentation"}>
          CoinGeco
        </Link>
      </p>
      <div className={classes.statistic}>
        <Exchanges />
        <Companies />
        <Nfts />
      </div>
    </>
  );
};
