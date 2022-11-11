import { NftsListTypes } from "../../../types/types";
import classes from "./NftList.module.scss";

interface Props {
  items: NftsListTypes[];
  modalAction: (id: string) => void;
}

export const NftsList = ({ items, modalAction }: Props) => {
  const RenderItems = items.map((item, index) => (
    <li
      key={item.id}
      className={classes["list-item"]}
      onClick={() => modalAction(item.id)}
    >
      <p className={classes.name}>
        {index + 1}. {item.name}
      </p>
      <span className={classes.symbol}>{item.symbol}</span>
    </li>
  ));
  return <>{RenderItems}</>;
};
