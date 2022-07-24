import { currenciesActions } from "./currencies-slice";
import { uiActions } from "./ui-slice";

export const fetchCurrenciesData = (isFirstLoading, sortState) => {
  return async (dispatch) => {
    if (isFirstLoading) {
      dispatch(uiActions.showLoading(true));
    }
    const fetchData = async () => {
      const response = await fetch(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=5&page=1&sparkline=false&price_change_percentage=1h%2C24h%2C7d"
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
      if (sortState !== "") {
        console.log(sortState);
        return dispatch(
          currenciesActions.sortData({
            items: currenciesData,
            type: sortState,
          })
        );
      } else {
        console.log(sortState);
        dispatch(currenciesActions.pushItems(currenciesData || []));
      }
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          message: "Fetch data faild!!",
        })
      );
    }
  };
};
