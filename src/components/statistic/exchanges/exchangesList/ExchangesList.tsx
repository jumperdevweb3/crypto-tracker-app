import { IExchangesItems } from "../../../../types/types";
import classes from "./ExchangesList.module.scss";
import Image from "next/image";

interface Props {
  items: IExchangesItems[];
  modalAction: (item: IExchangesItems) => void;
}
export const ExchangesList = ({ items, modalAction }: Props) => {
  const RenderItems = items.map((item, index) => (
    <li
      key={item.id}
      className={classes["list-item"]}
      onClick={() => modalAction(item)}
    >
      <div className={classes["name-box"]}>
        <span className={classes.index}>{index + 1}.</span>
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
