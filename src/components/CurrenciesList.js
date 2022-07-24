import { useEffect } from "react";
import { CurrenciesOptions } from "./CurrenciesOptions";
import { useDispatch } from "react-redux";
import { CoinData } from "./Card/CoinData";
import { LoadingSpinner } from "./Ui/LoadingSpinner";
import { getInfo } from "./Data/getInfo";
import { useSelector } from "react-redux";
import { fetchCurrenciesData } from "../Store/currencies-actions";
import Notification from "./Ui/Notification";

let isFirstLoading = true;

export const CurrenciesList = () => {
  const currenciesData = useSelector((state) => state.currencies.items);
  const isLoading = useSelector((state) => state.uiSlice.isLoading);
  const notification = useSelector(
    (state) => state.uiSlice.notification.message
  );
  const sortState = useSelector(
    (state) => state.currencies.sortActive.sortType
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCurrenciesData(isFirstLoading, sortState));
  }, [dispatch]);

  useEffect(() => {
    const refreshData = setInterval(() => {
      dispatch(fetchCurrenciesData(false, sortState));
    }, 10000);
    return () => {
      clearInterval(refreshData);
    };
  }, []);

  const items = currenciesData.map((item) => {
    const info = getInfo(item);
    return <CoinData key={item.id} {...info} />;
  });

  return (
    <div className="market-list">
      <CurrenciesOptions />
      {items}
      {isLoading && <LoadingSpinner />}
      {notification !== "" && <Notification message={notification} />}
    </div>
  );
};
