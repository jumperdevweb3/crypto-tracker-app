import Link from "next/link";
import classes from "./Chart.module.scss";
import dynamic from "next/dynamic";
import { useQuery } from "react-query";
import { getChart } from "./getChart";
import { LoadingFire } from "@/components/ui/loadingFire/LoadingFire";

const TradingViewChart = dynamic(() => import("./TradingViewChart"), {
  ssr: false,
});

export const Chart = ({ id }: { id: string }) => {
  const {
    data: chartData,
    isError,
    isLoading,
    status,
  } = useQuery<[]>([`chart`, id], () => getChart(id), {
    refetchInterval: 35000,
    keepPreviousData: true,
  });
  const LoadingContent = isLoading && <LoadingFire />;
  const errorContent = isError && (
    <p className="center">Chart is not available</p>
  );
  const chartContent = status === "success" && (
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
  return (
    <>
      <div className={classes["chart-box"]}>
        <div id="chart">
          {chartContent}
          {LoadingContent}
          {errorContent}
        </div>
      </div>
    </>
  );
};
