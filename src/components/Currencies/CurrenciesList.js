import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCurrenciesData } from "../../store/currencies-actions";
import { currenciesActions } from "../../store/currencies-slice";
import { CurrenciesOptions } from "./CurrenciesOptions";
import { CoinCard } from "../cards/coinCard/CoinCard";
import { LoadingSpinner } from "../ui/LoadingSpinner";
import Notification from "../ui/Notification";

const SECOND_TO_REFRESH = 15;
const TIME_TO_REFRESH_DATA = SECOND_TO_REFRESH * 1000;

export const CurrenciesList = () => {
  const currenciesData = useSelector((state) => state.currencies.items);
  const isLoading = useSelector((state) => state.uiSlice.isLoading);
  const notification = useSelector(
    (state) => state.uiSlice.notification.message
  );
  const typeSort = useSelector((state) => state.currencies.sortActive);
  const dispatch = useDispatch();

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
        return <CoinCard key={item.id} item={item} />;
      })}
    </div>
  );
};
