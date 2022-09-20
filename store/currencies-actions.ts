import { currenciesActions } from "./currencies-slice";
import { uiActions } from "./ui-slice";
import { scannerActions } from "./etherscan-slice";
import { AppDispatch } from "./store";

export const fetchCurrenciesData = (isFirstLoading: boolean) => {
  return async (dispatch: AppDispatch) => {
    if (isFirstLoading) {
      dispatch(uiActions.showLoading(true));
    }
    const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1&sparkline=false&price_change_percentage=1h%2C24h%2C7d`;

    const fetchData = async () => {
      const response = await fetch(url);
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
      dispatch(
        uiActions.showNotification({
          message: "",
        })
      );
      dispatch(currenciesActions.setItems(currenciesData));
    } catch (error) {
      dispatch(uiActions.showLoading(false));
      dispatch(
        uiActions.showNotification({
          message: `Problem: ${error}`,
        })
      );
    }
  };
};

export const fetchChartData = (id: string) => {
  return async (dispatch: AppDispatch) => {
    const fetchData = async () => {
      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=30&interval=daily`
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
      dispatch(currenciesActions.setChart([]));
    }
  };
};

export const fetchEtherScanData = (address: string) => {
  return async (dispatch: AppDispatch) => {
    const fetchData = async () => {
      dispatch(scannerActions.setIsLoading(true));
      const response = await fetch(
        `https://api.etherscan.io/api?module=account&action=balance&address=${address}&tag=latest&apikey=${process.env.REACT_APP_SCAN_API}`
      );
      if (!response.ok) {
        throw new Error(
          "Could not fetch ether scan data, try later or slow down (5 req per sec)."
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
    } catch (error: unknown) {
      if (error instanceof Error)
        dispatch(scannerActions.setErrorMsg(error.message));
      dispatch(scannerActions.setIsLoading(false));
    }
  };
};

//in future
// export const fetchFiatCurrencies = () => {
//   return async (dispatch) => {
//     const fetchData = async () => {
//       const response = await fetch(
//         `https://api.freecurrencyapi.com/v1/latest?apikey=${process.env.REACT_APP_FIAT_KEY}&currencies=EUR%2CUSD%2CPLN`
//       );
//       if (!response.ok) {
//         throw new Error(
//           "Could not fetch fiat data, try later or slow down (5 rq per sec)."
//         );
//       }
//       const data = await response.json();

//       return data;
//     };
//     try {
//       const fiatData = await fetchData();
//       dispatch(convertActions.setFiatData(fiatData.data));
//     } catch (error) {
//       dispatch(
//         uiActions.showNotification({
//           message: "Fetch fiat data faild!",
//         })
//       );
//     }
//   };
// };
