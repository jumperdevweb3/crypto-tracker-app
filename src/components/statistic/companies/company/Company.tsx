import { ICompaniesItems } from "../../../../types/types";
import classes from "../../CommonBoxStyle.module.scss";
import { currencyValueFormat } from "src/utils/numberFromat";

export const Company = ({ item }: { item: ICompaniesItems }) => {
  const {
    name,
    symbol,
    country,
    total_holdings,
    total_entry_value_usd,
    total_current_value_usd,
    percentage_of_total_supply,
  } = item;

  const symbolContent = !!symbol && (
    <p>
      Symbol: <span>{symbol}</span>
    </p>
  );
  const countryContent = !!country && (
    <p>
      Country: <span>{country}</span>
    </p>
  );
  const totalHoldingsContent = !!total_holdings && (
    <p>
      Total holdings: <span>{total_holdings} BTC</span>
    </p>
  );
  const supplyPercentContent = !!percentage_of_total_supply && (
    <p className={classes.volume}>
      Percentage of total supply:{" "}
      <span>{percentage_of_total_supply.toFixed(4)} BTC</span>
    </p>
  );
  const entryValueContent = !!total_entry_value_usd && (
    <p>
      Total entry value USD:{" "}
      <span>{currencyValueFormat.format(total_entry_value_usd)}</span>
    </p>
  );
  const currentValueContent = !!total_current_value_usd && (
    <p>
      Total Current value USD:{" "}
      <span>{currencyValueFormat.format(total_current_value_usd)}</span>
    </p>
  );
  return (
    <div className={classes.container}>
      <div className={classes["name-box"]}>
        <p>{name} </p>
      </div>
      <div className={classes["data-box"]}>
        {symbolContent}
        {countryContent}
        {totalHoldingsContent}
        {supplyPercentContent}
        {entryValueContent}
        {currentValueContent}
      </div>
    </div>
  );
};
