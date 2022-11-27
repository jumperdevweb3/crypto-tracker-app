import { ICompaniesItems } from "@/types/types";
import classes from "./CompaniesList.module.scss";

interface Props {
  items: ICompaniesItems[];
  modalAction: (item: ICompaniesItems) => void;
}

export const CompaniesList = ({ items, modalAction }: Props) => {
  const Companies = items.map((item, index) => (
    <li
      key={item.symbol}
      className={classes["list-item"]}
      onClick={() => modalAction(item)}
    >
      <div className={classes["name-box"]}>
        {index + 1}. {item.name}
      </div>
      <p className={classes.holdings}>{item.total_holdings} BTC</p>
    </li>
  ));
  return <>{Companies}</>;
};
