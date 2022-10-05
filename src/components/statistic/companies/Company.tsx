import { CompaniesType } from "../../../types/types";
import classes from "../exchanges/Exchange.module.scss";

export const Company = ({ ...props }) => {
  const {
    name,
    symbol,
    country,
    total_holdings,
    total_entry_value_usd,
    total_current_value_usd,
    percentage_of_total_supply,
  } = props.item as CompaniesType;
  const interNumberFormat = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });
  return (
    <div className={classes.container}>
      <div className={classes["name-box"]}>
        <p>{name} </p>
      </div>
      <div className={classes["data-box"]}>
        <p>
          Symbol: <span>{symbol}</span>
        </p>
        <p>
          Country: <span>{country}</span>
        </p>
        <p>
          Total holdings: <span>{total_holdings} BTC</span>
        </p>
        <p className={classes.volume}>
          Percentage of total supply:{" "}
          <span>{percentage_of_total_supply.toFixed(4)} BTC</span>
        </p>
        <p>
          Total entry value USD:{" "}
          <span>{interNumberFormat.format(total_entry_value_usd)}</span>
        </p>
        <p>
          Total Current value USD:{" "}
          <span>{interNumberFormat.format(total_current_value_usd)}</span>
        </p>
      </div>
    </div>
  );
};
