import { currenciesActions } from "./currencies-slice";
import { uiActions } from "./ui-slice";
import { scannerActions } from "./etherscan-slice";

export const fetchCurrenciesData = (isFirstLoading) => {
  return async (dispatch) => {
    if (isFirstLoading) {
      dispatch(uiActions.showLoading(true));
    }
    const fetchData = async () => {
      const response = await fetch(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=false&price_change_percentage=1h%2C24h%2C7d"
      );
      if (!response.ok) {
        throw new Error("Could not fetch cart data!");
      }
      const data = await response.json();
      if (isFirstLoading) {
        dispatch(uiActions.showLoading(false));
      }
      return data;
    };
    try {
      const currenciesData = await fetchData();
      dispatch(currenciesActions.setItems(currenciesData));
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          message: "Fetch data faild!!",
        })
      );
    }
  };
};

export const fetchChartData = (id) => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=14&interval=daily`
      );
      if (!response.ok) {
        throw new Error("Could not fetch chart data, try later.");
      }
      const data = await response.json();

      return data;
    };
    try {
      const chartData = await fetchData();
      dispatch(currenciesActions.setChart(chartData.prices));
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          message: "Fetch chart data faild!!",
        })
      );
    }
  };
};

export const fetchEtherScanData = (address) => {
  return async (dispatch) => {
    const fetchData = async () => {
      dispatch(scannerActions.setIsLoading(true));
      const response = await fetch(
        `https://api.etherscan.io/api?module=account&action=balance&address=${address}&tag=latest&apikey=${process.env.REACT_APP_SCAN_API}`
      );
      if (!response.ok) {
        throw new Error(
          "Could not fetch ether scan data, try later or slow down (5 rq per sec)."
        );
      }
      const data = await response.json();

      return data;
    };
    try {
      const scanData = await fetchData();
      if (scanData.status === "1") {
        dispatch(scannerActions.setErrorMsg(""));
        dispatch(scannerActions.setResult(scanData.result));
      }
      if (scanData.status === "0") {
        dispatch(scannerActions.setErrorMsg(scanData.result));
      }
      dispatch(scannerActions.setIsLoading(false));
    } catch (error) {
      dispatch(scannerActions.setErrorMsg(error.message));
      dispatch(scannerActions.setIsLoading(false));
    }
  };
};
