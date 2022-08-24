import { createChart, ColorType } from "lightweight-charts";
import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import { RootState } from "../../store";
export const TradingViewChart = () => {
  const chartData = useSelector(
    (state: RootState) => state.currencies.chartData
  );

  const filterChartData = chartData.filter(
    (item: any, index) =>
      chartData.findIndex((searchItem: any) => {
        return (
          dayjs(item[0]).format("YYYY-MM-DD") ===
          dayjs(searchItem[0]).format("YYYY-MM-DD")
        );
      }) === index
  );

  const renderData = filterChartData.map((item: any) => {
    const formatDate = dayjs(item[0]).format("YYYY-MM-DD");
    return {
      time: formatDate,
      value: item[1].toFixed(2),
    };
  });

  const data = {
    renderData,
    colors: {
      backgroundColor: "#2B2B43",
      lineColor: "rgba(32, 226, 47, 1)",
      textColor: "#D9D9D9",
      areaTopColor: "rgba(32, 226, 47, 0.56)",
      areaBottomColor: "rgba(32, 226, 47, 0.04)",
    },
  };

  const chartContainerRef: any = useRef();

  useEffect(() => {
    const handleResize = () => {
      chart.applyOptions({ width: chartContainerRef.current.clientWidth });
    };

    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: {
          type: ColorType.Solid,
          color: data.colors.backgroundColor,
        },
        textColor: data.colors.textColor,
      },
      grid: {
        vertLines: {
          color: "#2B2B43",
        },
        horzLines: {
          color: "#363C4E",
        },
      },
      width: chartContainerRef.current.clientWidth,
      height: 300,
    });
    chart.timeScale().fitContent();

    const newSeries = chart.addAreaSeries({
      lineColor: data.colors.lineColor,
      topColor: data.colors.areaTopColor,
      bottomColor: data.colors.areaBottomColor,
      lineWidth: 3,
    });

    newSeries.setData(renderData);

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);

      chart.remove();
    };
  }, [chartData]);

  return <div ref={chartContainerRef} />;
};
