import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { useSelector } from "react-redux";
import dayjs from "dayjs";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Price Chart",
    },
  },
};

export function CurrChart() {
  const chartData = useSelector((state) => state.currencies.chartData);
  const labels = chartData.map((item) => {
    const formatDays = dayjs(item[0]).format("YYYY-MM-DD");
    return formatDays;
  });
  const price = chartData.map((item) => item[1].toFixed(5));
  const data = {
    labels,
    datasets: [
      {
        fill: true,
        label: "Price $",
        data: price,
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };
  return (
    <Line
      options={options}
      data={data}
      style={{ width: "600px", height: "500px" }}
    />
  );
}
