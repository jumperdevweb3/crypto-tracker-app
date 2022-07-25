import { useEffect } from "react";
import { CurrenciesOptions } from "./CurrenciesOptions";
import { useDispatch } from "react-redux";
import { CoinData } from "../Card/CoinData";
import { LoadingSpinner } from "../Ui/LoadingSpinner";
import { useSelector } from "react-redux";
import { fetchCurrenciesData } from "../../Store/currencies-actions";
import Notification from "../Ui/Notification";
import { currenciesActions } from "../../Store/currencies-slice";

let isFirstLoading = true;
const SECOND_TO_REFRESH = 15;
const TIME_TO_REFRESH_DATA = SECOND_TO_REFRESH * 1000;

export const CurrenciesList = () => {
  // console.log("test");
  const currenciesData = useSelector((state) => state.currencies.items);
  const isLoading = useSelector((state) => state.uiSlice.isLoading);
  const notification = useSelector(
    (state) => state.uiSlice.notification.message
  );
  const typeSort = useSelector((state) => state.currencies.sortActive);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCurrenciesData(isFirstLoading));
  }, [dispatch]);

  useEffect(() => {
    const refreshData = setInterval(() => {
      dispatch(fetchCurrenciesData(false));
    }, TIME_TO_REFRESH_DATA);

    return () => {
      clearInterval(refreshData);
    };
  }, [dispatch]);

  useEffect(() => {
    dispatch(currenciesActions.sortData());
  }, [dispatch, typeSort]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (notification !== "") {
    return <Notification message={notification} />;
  }
  return (
    <div className="market-list">
      <CurrenciesOptions />
      {currenciesData.map((item) => {
        return <CoinData key={item.id} {...item} />;
      })}
    </div>
  );
};
