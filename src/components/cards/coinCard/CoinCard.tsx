import classes from "./CoinCard.module.scss";
import PriceTimeChange from "./price/PriceTimeChange";
import { WatchlistButton } from "./WatchlistButton";
import Link from "next/link";
import { currencyValueFormat } from "../../../helpers/numberFromat";
import Price from "./price/PriceChange";
import Image from "next/image";
import { memo } from "react";
//types
import { CurrencyItem } from "../../../types/types";

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
  const SymbolContent = symbol.length < 30 ? symbol.toUpperCase() : "?";
  const MarketCapContent = !!market_cap
    ? currencyValueFormat.format(market_cap)
    : "?";
  const TotalVolumeContent = !!total_volume
    ? currencyValueFormat.format(total_volume)
    : "?";
  const MarketRankContent = !!market_cap_rank ? market_cap_rank : "?";
  return (
    <div className={classes.coin}>
      <Link href={`/currency/${id}`}>
        <a className={classes.overlay}></a>
      </Link>
      <WatchlistButton classes={classes} id={id} item={item} />
      <div className={classes.rank}>
        <p>{MarketRankContent}</p>
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
        <span>{SymbolContent}</span>
      </div>
      <div className={classes.price}>
        <Price price={current_price} />
      </div>
      <PriceTimeChange time={price_change_1h} classes={classes} />
      <PriceTimeChange time={price_change_24h} classes={classes} />
      <PriceTimeChange time={price_change_7d} classes={classes} />
      <div>
        <p>{MarketCapContent}</p>
      </div>
      <div className={classes.volume}>
        <p>{TotalVolumeContent}</p>
      </div>
    </div>
  );
};
export default memo(CoinCard);
