import { currenciesActions } from "./currencies-slice";
import { uiActions } from "./ui-slice";
import { scannerActions } from "./etherscan-slice";
import { AppDispatch } from "./store";
import { urlFetchList } from "../helpers/urlFetchList";
import { useFetchData } from "../helpers/fetchData";

export const fetchCurrenciesData = (isFirstLoading: boolean) => {
  return async (dispatch: AppDispatch) => {
    if (isFirstLoading) {
      dispatch(uiActions.showLoading(true));
    }
    const fetchData = useFetchData({
      url: urlFetchList.currenciesList,
      message: "Currencies Data",
    });
    try {
      const currenciesData = await fetchData;
      dispatch(
        uiActions.showNotification({
          message: "",
        })
      );
      dispatch(currenciesActions.setItems(currenciesData));
      if (isFirstLoading) {
        dispatch(uiActions.showLoading(false));
      }
    } catch (error) {
      dispatch(uiActions.showLoading(false));
      dispatch(
        uiActions.showNotification({
          message: `Coingeco API is not responding, try again later.`,
        })
      );
    }
  };
};

export const fetchChartData = (id: string) => {
  return async (dispatch: AppDispatch) => {
    dispatch(currenciesActions.setLoading(true));
    const fetchData = useFetchData({
      url: `${
        urlFetchList.chartData.firstPhrase +
        id +
        urlFetchList.chartData.secondPhrase
      }`,
      message: "Chart Data",
    });
    try {
      const chartData = await fetchData;
      dispatch(currenciesActions.setChart(chartData.prices));
      dispatch(currenciesActions.setLoading(false));
    } catch (error) {
      dispatch(currenciesActions.setLoading(false));
      dispatch(currenciesActions.setChart([]));
    }
  };
};

export const fetchEtherScanData = (address: string) => {
  return async (dispatch: AppDispatch) => {
    dispatch(scannerActions.setIsLoading(true));
    const fetchData = useFetchData({
      url: `${urlFetchList.etherScan + address}`,
      message: "Ether Scan",
    });
    try {
      const scanData = await fetchData;
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
//           "Could not fetch fiat data"
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
