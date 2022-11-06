import Link from "next/link";
import { LoadingSpinner } from "../../../ui/loadingSpinner/LoadingSpinner";
import classes from "./Chart.module.scss";
import dynamic from "next/dynamic";

const TradingViewChart = dynamic(() => import("./TradingViewChart"), {
  ssr: false,
});

export const Chart = ({
  isUpdating,
  chartData,
}: {
  isUpdating: boolean;
  chartData: any;
}) => {
  const chartDataExist = chartData.length;
  const ChartContent = (
    <>
      <TradingViewChart chartData={chartData} />
      <p className={classes["chart-info"]}>
        The chart used comes from{" "}
        <Link href="https://www.tradingview.com/" passHref>
          <a target="_blank"> https://www.tradingview.com/</a>
        </Link>
      </p>
    </>
  );
  const ChartStatus = isUpdating ? (
    <LoadingSpinner />
  ) : chartDataExist ? (
    ChartContent
  ) : (
    <p className="center">Chart is not available</p>
  );
  return (
    <div className={classes["chart-box"]}>
      <div id="chart">{ChartStatus}</div>
    </div>
  );
};
