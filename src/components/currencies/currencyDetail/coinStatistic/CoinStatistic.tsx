import { currencyValueFormat } from "../../../../helpers/numberFromat";
import { Coin } from "../../../../types/types";
import PriceTimeChange from "../../../cards/coinCard/price/PriceTimeChange";
import classes from "./CoinStatistic.module.scss";

export const CoinStatistic = ({ item }: { item: Coin }) => {
  const { symbol, market_data, genesis_date } = item;

  const marketCap = market_data.market_cap.usd;
  const totalSupply = market_data.total_supply;
  const maxSupply = market_data.max_supply;
  const ath = market_data.ath.usd;
  const athPercent = market_data.ath_change_percentage.usd;
  const lastUpdate = market_data.last_updated;
  const circulatingSupply = market_data.circulating_supply;

  const GenesisDateContent = !!genesis_date && (
    <div className={classes.wrapper}>
      <p> Genesis date:</p> <span>{genesis_date}</span>
    </div>
  );
  const MarketCapContent = !!marketCap && (
    <div className={classes.wrapper}>
      <p> Market Cap:</p> <span>{currencyValueFormat.format(marketCap)}</span>
    </div>
  );
  const TotalSupplyContent = !!totalSupply && (
    <div className={classes.wrapper}>
      <p>Total supply: </p>
      <span>{totalSupply + " " + symbol.toUpperCase()}</span>
    </div>
  );
  const MaxSupplyContent = !!maxSupply && (
    <div className={classes.wrapper}>
      <p>
        Max supply:
        <span>{market_data.max_supply + " " + symbol.toUpperCase()}</span>
      </p>
    </div>
  );
  const CirculatingSupplyContent = !!circulatingSupply && (
    <div className={classes.wrapper}>
      <p> Circulating Supply:</p>{" "}
      <span>{circulatingSupply + " " + symbol.toUpperCase()}</span>
    </div>
  );
  const AthContent = !!ath && (
    <div className={classes.wrapper}>
      <p>All Time High:</p>
      <span>
        {currencyValueFormat.format(ath) === "$0.00"
          ? ath.toFixed(7)
          : currencyValueFormat.format(ath)}
      </span>
    </div>
  );
  const AthPercentageContent = !!athPercent && (
    <div className={classes.wrapper}>
      <p>Price change from ATH:</p>
      <PriceTimeChange time={athPercent} classes={classes} />
    </div>
  );
  const LastUpdateContent = !!lastUpdate && (
    <div className={classes["date-box"]}>
      <p>Last update date (UTC): </p>
      <span className={classes.date}>
        {lastUpdate.replace(/(\d{4})-(\d{2})-(\d{2})T(.{8}).*/, "$2.$3.$1, $4")}
      </span>
    </div>
  );
  return (
    <div className={classes["stats-box"]}>
      {GenesisDateContent}
      {MarketCapContent}
      {TotalSupplyContent}
      {MaxSupplyContent}
      {CirculatingSupplyContent}
      {AthContent}
      {AthPercentageContent}
      {LastUpdateContent}
    </div>
  );
};
