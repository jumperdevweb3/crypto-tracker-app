import { currenciesActions } from "./currencies-slice";
import { uiActions } from "./ui-slice";
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
