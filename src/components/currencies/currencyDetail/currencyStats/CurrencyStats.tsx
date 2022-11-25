import classes from "./CurrencyStats.module.scss";
import { ICoin } from "../../../../types/types";
import { BoxHeader } from "../boxHeader/BoxHeader";
import { CoinStatistic } from "../coinStatistic/CoinStatistic";
import { CoinLinks } from "../coinLinks/CoinLinks";
import { Chart } from "../chart/Chart";
import { Community } from "../communityBox/Community";
import { CoinDescription } from "../coinDescription/CoinDescription";
import { PriceChangeTable } from "../priceChangeTable/PriceChangeTable";

interface IProps {
  item: ICoin;
}
export const CurrencyStats = ({ item }: IProps) => {
  return (
    <div className={classes["box-container"]}>
      <BoxHeader item={item} />
      <PriceChangeTable market_data={item.market_data} />
      <div className={classes["box-wrapper"]}>
        <div className={classes.detials}>
          <CoinStatistic item={item} />
          <CoinLinks item={item} />
        </div>
        <Chart id={item.id} />
      </div>
      <Community item={item} />
      <CoinDescription description={item.description.en} />
    </div>
  );
};
