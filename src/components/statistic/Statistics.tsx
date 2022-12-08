import { Exchanges } from "./exchanges/Exchanges";
import { Companies } from "./companies/Companies";
import classes from "./Statistic.module.scss";
import { Nfts } from "./nft/Nfts";
import Link from "next/link";

interface IProps {
  initNfts: [] | null;
  initCompanies: [] | null;
  initExchanges: [] | null;
}
export const Statistics = ({
  initNfts,
  initCompanies,
  initExchanges,
}: IProps) => {
  return (
    <>
      <p className={classes.title}>
        <span>BETA</span> Statistic data from{" "}
        <Link href={"https://www.coingecko.com/en/api/documentation"} passHref>
          <a target="_blank">CoinGeco</a>
        </Link>
      </p>
      <div className={classes.statistic}>
        <Exchanges initItems={initExchanges} />
        <Companies initItems={initCompanies} />
        <Nfts initItems={initNfts} />
      </div>
    </>
  );
};
