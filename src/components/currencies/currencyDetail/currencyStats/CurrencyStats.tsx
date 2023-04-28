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
      <div className={classes.test1}>
        <div className={classes.test}>
          <BoxHeader item={item} />
          <CoinLinks links={item.links} />
        </div>
        <div className={classes.details}>
          <CoinStatistic item={item} />
          <PriceChangeTable market_data={item.market_data} />
        </div>
      </div>

      <Chart id={item.id} />
      <div className={classes.test2}>
        <CoinDescription description={item.description.en} />
        <Community community={item.community_data} />
      </div>
    </div>
  );
};
