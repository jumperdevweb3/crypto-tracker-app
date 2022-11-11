import classes from "./CoinCard.module.scss";
import PriceTimeChange from "./price/PriceTimeChange";
import { WatchlistButton } from "./WatchlistButton";
import Link from "next/link";
import { currencyValueFormat } from "../../../helpers/numberFromat";
import Price from "./price/PriceChange";
import Image from "next/image";
//types
import { CurrencyItem } from "../../../types/types";
import { memo } from "react";

const CoinCard = ({ item }: { item: CurrencyItem }) => {
  const {
    id,
    market_cap_rank,
    image,
    name,
    symbol,
    current_price,
    price_change_1h,
    price_change_24h,
    price_change_7d,
    total_volume,
    market_cap,
  } = item;
  return (
    <div className={classes.coin}>
      <Link href={`/currency/${id}`}>
        <a className={classes.overlay}></a>
      </Link>
      <WatchlistButton classes={classes} id={id} item={item} />
      <div className={classes.rank}>
        <p>{market_cap_rank || "?"}</p>
      </div>
      <div className={classes.name}>
        <Image
          src={image}
          alt={name}
          width={"21px"}
          height={"21px"}
          unoptimized
        />
        <p className={classes.title}>{name}</p>
      </div>
      <div className={classes.symbol}>
        <span>{symbol.length < 30 ? symbol.toUpperCase() : "?"}</span>
      </div>
      <div className={classes.price}>
        <Price price={current_price} />
      </div>
      <PriceTimeChange time={price_change_1h} classes={classes} />
      <PriceTimeChange time={price_change_24h} classes={classes} />
      <PriceTimeChange time={price_change_7d} classes={classes} />
      <div className={classes["market-cup"]}>
        <p>{market_cap ? currencyValueFormat.format(market_cap) : "?"}</p>
      </div>
      <div className={classes.volume}>
        <p>{total_volume ? currencyValueFormat.format(total_volume) : "?"}</p>
      </div>
    </div>
  );
};
export default memo(CoinCard);
