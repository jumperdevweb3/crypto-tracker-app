import classes from "./CurrencyStats.module.scss";
import PriceTimeChange from "../../cards/coinCard/price/PriceTimeChange";
import { currencyValueFormat } from "../../../helpers/numberFromat";
import Price from "../../cards/coinCard/price/Price";
//types
import Image from "next/image";
import { Coin } from "../../../types/types";
import { ReactNode } from "react";

interface Props {
  item: Coin;
  children?: ReactNode;
}
export const CurrencyStats = ({ item, children }: Props) => {
  const {
    id,
    symbol,
    name,
    description,
    links,
    genesis_date,
    image,
    community_data,
    market_data,
  } = item;
  console.log(links);
  return (
    <div className={classes["box-container"]}>
      <div className={classes.header}>
        <div className={classes["main-title"]}>
          <Image
            src={image.thumb}
            alt={name}
            width={"21px"}
            height={"21px"}
            unoptimized
          />
          <p>{name}</p>
          <p>{symbol.toUpperCase()}</p>
        </div>

        <p className={classes.rank}>Rank #{market_data.market_cap_rank}</p>

        <div className={classes["price-data"]}>
          <p className={classes.head}>
            {name} Price ({symbol.toUpperCase()})
          </p>
          <div className={classes["values-box"]}>
            <div className={classes.price}>
              <Price price={market_data.current_price.usd} />
            </div>
            {/* <PriceTimeChange time={price_change_24h} classes={classes} /> */}
          </div>
        </div>
      </div>

      <div className={classes.detials}>
        <div className={classes["first-box"]}>
          <div className={classes.wrapper}>
            <p> Market Cap:</p>{" "}
            <span>
              {currencyValueFormat.format(market_data.market_cap.usd)}
            </span>
          </div>
          <div className={classes.wrapper}>
            <p>
              Total supply:
              <span>
                {market_data.total_supply + " " + symbol.toUpperCase()}
              </span>
            </p>
          </div>
          <div className={classes.wrapper}>
            <p>
              Max supply:
              <span>
                {market_data.max_supply
                  ? market_data.max_supply + " " + symbol.toUpperCase()
                  : "-"}
              </span>
            </p>
          </div>
          <div className={classes.wrapper}>
            <p>All Time High:</p>
            <span>
              {currencyValueFormat.format(market_data.ath.usd) === "$0.00"
                ? market_data.ath.usd.toFixed(7)
                : currencyValueFormat.format(market_data.ath.usd)}
            </span>
          </div>
          <div className={classes.wrapper}>
            <p>Price change from ATH:</p>
            <PriceTimeChange
              time={market_data.ath_change_percentage.usd}
              classes={classes}
            />
          </div>

          <div className={classes["date-box"]}>
            <p>Last update date (UTC):</p>
            <span className={classes.date}>
              {market_data.last_updated.replace(
                /(\d{4})-(\d{2})-(\d{2})T(.{8}).*/,
                "$2.$3.$1, $4"
              )}
            </span>
          </div>
        </div>
        <div className={classes["second-box"]}>
          <div className={classes.wrapper}>
            <p>Links: </p>
            {/* <div className={classes.links}>
              {links.blockchain_site.map((i) => (
                <a href={i}>{i}</a>
              ))}
            </div> */}
          </div>
          <div className={classes.wrapper}>
            <p>?</p>
          </div>
          <div className={classes.wrapper}>
            <p>?</p>
          </div>
          <div className={classes.wrapper}></div>
        </div>
      </div>
    </div>
  );
};
