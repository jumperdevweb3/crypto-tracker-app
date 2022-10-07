import { CompaniesType } from "../../../types/types";
import classes from "./Companies.module.scss";

interface Props {
  items: CompaniesType[];
  modalAction: (item: CompaniesType) => void;
}

export const CompaniesList = ({ items, modalAction }: Props) => {
  const companies = items.map((item, index) => (
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
  return <>{companies}</>;
};
