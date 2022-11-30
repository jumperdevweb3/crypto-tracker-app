import classes from "./BoxHeader.module.scss";
import Image from "next/image";
import { ICoin } from "../../../../types/types";
import Price from "../../../cards/coinCard/price/PriceChange";

export const BoxHeader = ({ item }: { item: ICoin }) => {
  const { symbol, name, image, market_data } = item;
  const rank = market_data.market_cap_rank;
  return (
    <div className={classes.header}>
      <p className={classes.rank}>{rank ? `Rank #${rank}` : "Rank -?-"}</p>
      <div className={classes["main-title"]}>
        <Image src={image.thumb} alt={name} width={"21px"} height={"21px"} />
        <p className={classes.name}>{name}</p>
        <p>{symbol.toUpperCase()}</p>
      </div>

      <div className={classes["price-data"]}>
        <p className={classes.head}>
          {name} Price ({symbol.toUpperCase()})
        </p>
        <div className={classes["values-box"]}>
          <div className={classes.price}>
            <Price price={market_data.current_price.usd} />
          </div>
        </div>
      </div>
    </div>
  );
};
