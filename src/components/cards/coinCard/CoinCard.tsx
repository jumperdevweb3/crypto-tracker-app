import classes from "./CoinCard.module.scss";
import PriceTimeChange from "./price/PriceTimeChange";
import { WatchlistButton } from "./watchlistButton/WatchlistButton";
import Link from "next/link";
import { currencyValueFormat } from "src/utils/numberFromat";
import Price from "./price/PriceChange";
import Image from "next/image";
import { memo } from "react";
//types
import { ICurrencyItem } from "@/types/types";

const CoinCard = ({ item }: { item: ICurrencyItem }) => {
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
  const symbolContent = symbol.length < 30 ? symbol.toUpperCase() : "?";
  const marketCapContent = !!market_cap
    ? currencyValueFormat.format(market_cap)
    : "?";
  const totalVolumeContent = !!total_volume
    ? currencyValueFormat.format(total_volume)
    : "?";
  const marketRankContent = !!market_cap_rank ? market_cap_rank : "?";

  const img = image.length < 20 ? "/missing_large.png" : image;

  return (
    <div className={classes.coin}>
      <Link href={`/currency/${id}`}>
        <a className={classes.overlay}></a>
      </Link>
      <WatchlistButton classes={classes} id={id} item={item} />
      <div className={classes.rank}>
        <p>{marketRankContent}</p>
      </div>
      <div className={classes.name}>
        <Image src={img} alt={name} width={"21px"} height={"21px"} />
        <p className={classes.title}>{name}</p>
      </div>
      <div className={classes.symbol}>
        <span>{symbolContent}</span>
      </div>
      <div className={classes.price}>
        <Price price={current_price} />
      </div>
      <PriceTimeChange time={price_change_1h} classes={classes} />
      <PriceTimeChange time={price_change_24h} classes={classes} />
      <PriceTimeChange time={price_change_7d} classes={classes} />
      <div>
        <p>{marketCapContent}</p>
      </div>
      <div className={classes.volume}>
        <p>{totalVolumeContent}</p>
      </div>
    </div>
  );
};
export default memo(CoinCard);
