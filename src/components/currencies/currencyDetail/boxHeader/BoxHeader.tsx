import classes from "./BoxHeader.module.scss";
import Image from "next/image";
import { ICoin } from "../../../../types/types";
import Price from "../../../cards/coinCard/price/PriceChange";

export const BoxHeader = ({ item }: { item: ICoin }) => {
  const { symbol, name, image, market_data } = item;
  return (
    <div className={classes.header}>
      <div className={classes["main-title"]}>
        <Image src={image.thumb} alt={name} width={"21px"} height={"21px"} />
        <p className={classes.name}>{name}</p>
        <p>{symbol.toUpperCase()}</p>
      </div>

      <div className={classes["price-data"]}>
        <div className={classes["values-box"]}>
          <div className={classes.price}>
            <Price price={market_data.current_price.usd} />
          </div>
        </div>
      </div>
    </div>
  );
};
