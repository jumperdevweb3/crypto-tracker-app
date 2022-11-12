import { CompaniesType } from "../../../../types/types";
import classes from "../../CommonBoxStyle.module.scss";
import { currencyValueFormat } from "../../../../helpers/numberFromat";

export const Company = ({ item }: { item: CompaniesType }) => {
  const {
    name,
    symbol,
    country,
    total_holdings,
    total_entry_value_usd,
    total_current_value_usd,
    percentage_of_total_supply,
  } = item as CompaniesType;

  const SymbolContent = !!symbol && (
    <p>
      Symbol: <span>{symbol}</span>
    </p>
  );
  const CountryContent = !!country && (
    <p>
      Country: <span>{country}</span>
    </p>
  );
  const TotalHoldingsContent = !!total_holdings && (
    <p>
      Total holdings: <span>{total_holdings} BTC</span>
    </p>
  );
  const SupplyPercentContent = !!percentage_of_total_supply && (
    <p className={classes.volume}>
      Percentage of total supply:{" "}
      <span>{percentage_of_total_supply.toFixed(4)} BTC</span>
    </p>
  );
  const EntryValueContent = !!total_entry_value_usd && (
    <p>
      Total entry value USD:{" "}
      <span>{currencyValueFormat.format(total_entry_value_usd)}</span>
    </p>
  );
  const CurrentValueContent = !!total_current_value_usd && (
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
        {SymbolContent}
        {CountryContent}
        {TotalHoldingsContent}
        {SupplyPercentContent}
        {EntryValueContent}
        {CurrentValueContent}
      </div>
    </div>
  );
};
