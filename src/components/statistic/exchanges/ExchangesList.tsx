import { ExchangeType } from "../../../types/types";
import classes from "./Exchanges.module.scss";
import Image from "next/image";

interface Props {
  items: ExchangeType[];
  modalAction: (item: ExchangeType) => void;
}
export const ExchangesList = ({ items, modalAction }: Props) => {
  const RenderItems = items.map((item) => (
    <li
      key={item.id}
      className={classes["list-item"]}
      onClick={() => modalAction(item)}
    >
      <div className={classes["name-box"]}>
        <Image
          src={item.image}
          alt={item.name}
          width={"21px"}
          height={"21px"}
          unoptimized
        />
        <p>{item.name}</p>
      </div>
      <p className={classes.value}>
        {item.trade_volume_24h_btc_normalized.toFixed(2)} <span>BTC</span>
      </p>
    </li>
  ));
  return <>{RenderItems}</>;
};
